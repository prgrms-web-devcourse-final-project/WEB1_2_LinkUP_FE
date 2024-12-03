/* eslint-disable @typescript-eslint/no-explicit-any */
export class WebSocketService {
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  constructor(private url: string) {}

  connect(
    onMessage: (data: any) => void,
    onOpen?: () => void,
    onClose?: () => void,
    onError?: (error: any) => void
  ) {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log('WebSocket connected');
      if (onOpen) onOpen();
      this.reconnectAttempts = 0; // 성공적으로 연결되면 재시도 횟수 초기화
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (onMessage) onMessage(data);
    };

    this.socket.onclose = () => {
      console.log('WebSocket disconnected');
      if (onClose) onClose();
      this.reconnect();
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      if (onError) onError(error);
    };
  }

  send(destination: string, message: any) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket is not connected');
      return;
    }

    const payload = JSON.stringify({ destination, message });
    console.log(`Sending message to ${destination}:`, payload);
    this.socket.send(payload);
  }

  close() {
    if (this.socket) {
      this.socket.close();
      console.log('WebSocket connection closed');
    }
  }

  private reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(
        `Reconnecting... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
      );
      setTimeout(() => {
        this.connect(
          () => {},
          () => {},
          () => {},
          () => {}
        );
      }, 3000); // 3초 후 재연결 시도
    } else {
      console.error('Max reconnect attempts reached');
    }
  }
}

export const webSocketService = new WebSocketService(
  'ws://your-api-endpoint.com/websocket'
);

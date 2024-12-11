/* eslint-disable @typescript-eslint/no-explicit-any */
export class WebSocketService {
  private socket: WebSocket | null = null;
  private subscriptions: Map<string, (data: any) => void> = new Map(); // 구독 채널 관리
  private reconnectSubscriptions: Set<string> = new Set(); // 재구독이 필요한 채널 관리
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
      if (onOpen) onOpen();
      this.reconnectAttempts = 0; // 성공적으로 연결되면 재시도 횟수 초기화
      this.resubscribe(); // 재연결 시 특정 구독 복구
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const destination = data.destination;
      if (destination && this.subscriptions.has(destination)) {
        const callback = this.subscriptions.get(destination);
        if (callback) callback(data.message);
      }
    };

    this.socket.onclose = () => {
      if (onClose) onClose();
      this.reconnect();
    };

    this.socket.onerror = (error) => {
      if (onError) onError(error);
    };
  }

  subscribe(
    destination: string,
    callback: (data: any) => void,
    enableReconnect = false
  ) {
    if (!this.subscriptions.has(destination)) {
      this.subscriptions.set(destination, callback);
    }
    // 재구독이 필요한 경우에만 추가
    if (enableReconnect) {
      this.reconnectSubscriptions.add(destination);
    }
  }

  unsubscribe(destination: string) {
    if (this.subscriptions.has(destination)) {
      this.subscriptions.delete(destination);
      this.reconnectSubscriptions.delete(destination);
    }
  }

  send(destination: string, message: any) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      return;
    }

    const payload = JSON.stringify({ destination, message });
    this.socket.send(payload);
  }

  isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }

  close() {
    if (this.socket) {
      this.socket.close();
    }
  }

  private reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {}, 3000); // 3초 후 재연결 시도
    }
  }

  private resubscribe() {
    if (this.reconnectSubscriptions.size > 0) {
      this.reconnectSubscriptions.forEach((destination) => {
        const callback = this.subscriptions.get(destination);
        if (callback) {
          this.subscribe(destination, callback); // 구독 복구
        }
      });
    }
  }
}

export const webSocketService = new WebSocketService(
  'ws://http://15.164.5.135:8080/websocket'
);

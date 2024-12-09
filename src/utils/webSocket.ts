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
      console.log('WebSocket connected');
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
      } else {
        console.warn('No subscription found for destination:', destination);
      }
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

  subscribe(
    destination: string,
    callback: (data: any) => void,
    enableReconnect = false
  ) {
    if (!this.subscriptions.has(destination)) {
      this.subscriptions.set(destination, callback);
      console.log(`Subscribed to ${destination}`);
    } else {
      console.warn(`Already subscribed to ${destination}`);
    }
    // 재구독이 필요한 경우에만 추가
    if (enableReconnect) {
      this.reconnectSubscriptions.add(destination);
    }
  }

  unsubscribe(destination: string) {
    if (this.subscriptions.has(destination)) {
      this.subscriptions.delete(destination);
      this.reconnectSubscriptions.delete(destination); // 재구독 목록에서도 제거
      console.log(`Unsubscribed from ${destination}`);
    } else {
      console.warn(`No subscription found for ${destination}`);
    }
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

  isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
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
          (data) => console.log('Reconnected message:', data), // onMessage
          () => console.log('Reconnected successfully'), // onOpen
          () => console.log('Reconnection closed'), // onClose
          (error) => console.error('Reconnection error:', error) // onError
        );
      }, 3000); // 3초 후 재연결 시도
    } else {
      console.error('Max reconnect attempts reached');
    }
  }

  private resubscribe() {
    if (this.reconnectSubscriptions.size > 0) {
      console.log('Resubscribing to specific channels after reconnect');
      this.reconnectSubscriptions.forEach((destination) => {
        const callback = this.subscriptions.get(destination);
        if (callback) {
          console.log(`Resubscribing to ${destination}`);
          this.subscribe(destination, callback); // 구독 복구
        }
      });
    }
  }
}

export const webSocketService = new WebSocketService(
  'ws://http://15.164.5.135:8080/websocket'
);

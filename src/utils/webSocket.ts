interface WebSocketMessage<T = unknown> {
  destination: string;
  message: T;
}

export class WebSocketService<T = unknown> {
  private socket: WebSocket | null = null;
  private subscriptions: Map<string, (data: T) => void> = new Map();
  private reconnectSubscriptions: Set<string> = new Set();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  constructor(private url: string) {}

  connect(
    onMessage: (data: WebSocketMessage<T>) => void,
    onOpen?: () => void,
    onClose?: () => void,
    onError?: (error: Event) => void
  ) {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      onOpen?.();
      this.reconnectAttempts = 0;
      this.resubscribe();
    };

    this.socket.onmessage = (event) => {
      try {
        const data: WebSocketMessage<T> = JSON.parse(event.data);
        const callback = this.subscriptions.get(data.destination);
        callback?.(data.message);
      } catch (error) {
        console.error('Invalid WebSocket message format', error);
      }
    };

    this.socket.onclose = () => {
      onClose?.();
      this.reconnect();
    };

    this.socket.onerror = (error) => {
      onError?.(error);
    };
  }

  subscribe(
    destination: string,
    callback: (data: T) => void,
    enableReconnect = false
  ) {
    this.subscriptions.set(destination, callback);
    if (enableReconnect) {
      this.reconnectSubscriptions.add(destination);
    }
  }

  unsubscribe(destination: string) {
    this.subscriptions.delete(destination);
    this.reconnectSubscriptions.delete(destination);
  }

  send(destination: string, message: T) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return;
    const payload: WebSocketMessage<T> = { destination, message };
    this.socket.send(JSON.stringify(payload));
  }

  isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }

  close() {
    this.socket?.close();
  }

  private reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => this.connect(() => {}), 3000);
    }
  }

  private resubscribe() {
    this.reconnectSubscriptions.forEach((destination) => {
      const callback = this.subscriptions.get(destination);
      if (callback) {
        this.subscribe(destination, callback);
      }
    });
  }
}

export const webSocketService = new WebSocketService<string>(
  'ws://15.164.5.135:8080/websocket'
);

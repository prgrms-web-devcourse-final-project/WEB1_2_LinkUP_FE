import { Client, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface Message {
  roomId?: number;
  userName: string;
  message: string;
  time: string;
}

export class WebSocketService<T = Message> {
  private socket: WebSocket | null = null;
  private stompClient: Client | null = null;
  private subscriptions: Map<string, StompSubscription> = new Map();
  private messageHandlers: Map<string, (message: T) => void> = new Map();

  private readonly SOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL;

  constructor() {
    this.socket = null;
    this.stompClient = null;
  }

  connect(
    onMessage: (data: T) => void,
    onOpen?: () => void,
    onClose?: () => void,
    onError?: (error: Event) => void
  ) {
    this.stompClient = new Client({
      webSocketFactory: () =>
        new SockJS(this.SOCKET_URL, {
          transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
          timeout: 60000,
          sessionId: () => {
            return Math.random().toString(36).substring(2, 15);
          },
        }),
      connectHeaders: {
        login: 'user',
        passcode: 'password',
      },
      debug: () => {},
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      connectionTimeout: 30000,
      onStompError: () => {
        onError?.(new Event('WebSocket error'));
      },
      onWebSocketError: (event) => {
        onError?.(event);
      },
      onWebSocketClose: () => {
        onClose?.();
      },
      onConnect: () => {
        onOpen?.();
      },
      onDisconnect: () => {
        onClose?.();
      },
    });

    this.stompClient.activate();
  }

  subscribe(destination: string, callback: (data: T) => void) {
    if (!this.stompClient?.connected) {
      this.messageHandlers.set(destination, callback);
      return;
    }

    try {
      const subscription = this.stompClient.subscribe(
        `/sub/message/${destination}`,
        (message) => {
          try {
            const data = JSON.parse(message.body);
            callback(data);
          } catch {
            //에러 무시
          }
        }
      );

      this.subscriptions.set(destination, subscription);
      this.messageHandlers.set(destination, callback);
    } catch (error) {
      console.error('Error subscribing to destination:', error);
    }
  }

  unsubscribe(destination: string) {
    try {
      const subscription = this.subscriptions.get(destination);
      if (subscription) {
        subscription.unsubscribe();
        this.subscriptions.delete(destination);
      }
      this.messageHandlers.delete(destination);
    } catch (error) {
      console.error('Error unsubscribing from destination:', error);
    }
  }

  send(destination: string, data: T) {
    if (!this.stompClient?.connected) {
      return;
    }

    this.stompClient.publish({
      destination: `/pub/message/${destination}`,
      body: JSON.stringify(data),
    });
  }

  isConnected(): boolean {
    return this.stompClient?.connected || false;
  }

  close() {
    this.stompClient?.deactivate();
  }

  disconnect() {
    this.close();
    this.subscriptions.clear();
    this.messageHandlers.clear();
  }
}

export const webSocketService = new WebSocketService<Message>();

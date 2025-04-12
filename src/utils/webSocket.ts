import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface Message {
  roomId?: number;
  userName: string;
  message: string;
  time: string;
}

export class WebSocketService<T = Message> {
  private stompClient: Client | null = null;
  private connectionStatus = false;

  constructor() {
    this.stompClient = null;
  }

  connect(
    onMessage: (data: T) => void,
    onOpen?: () => void,
    onClose?: () => void,
    onError?: (error: Event) => void
  ) {
    try {
      console.log('WebSocket 연결 시도 시작');

      const accessToken =
        sessionStorage.getItem('token') || localStorage.getItem('token');

      // SockJS 인스턴스 생성
      const socket = new SockJS('https://goodbuyus.store/websocket/', null, {
        transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
        timeout: 10000,
        sessionId: () => {
          return 'websocket-' + Math.random().toString(36).substring(2, 9);
        },
      });

      // STOMP 클라이언트 생성
      this.stompClient = new Client({
        webSocketFactory: () => socket,
        connectHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
        debug: (str) => {
          console.log('STOMP Debug:', str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        brokerURL: 'https://goodbuyus.store/websocket/',
        onStompError: (frame) => {
          console.error('STOMP 에러:', frame);
        },
        onWebSocketError: (event) => {
          console.error('WebSocket 에러:', event);
        },
        onWebSocketClose: (event) => {
          console.log('WebSocket 연결 종료:', event);
        },
      });

      // 연결 이벤트 핸들러 설정
      this.stompClient.onConnect = (frame) => {
        console.log('WebSocket 연결 성공:', frame);
        this.connectionStatus = true;
        onOpen?.();
      };

      // 연결 활성화
      this.stompClient.activate();
      console.log('WebSocket 연결 시도 완료');
    } catch (error) {
      console.error('WebSocket 연결 시도 중 에러:', error);
      onError?.(error as Event);
    }
  }

  subscribe(destination: string, callback: (data: T) => void) {
    if (!this.stompClient?.connected) {
      console.error('WebSocket이 연결되지 않았습니다');
      return;
    }

    try {
      console.log(`채널 구독 시도: ${destination}`);
      this.stompClient.subscribe(`/sub/${destination}`, (message) => {
        try {
          const data = JSON.parse(message.body);
          callback(data);
        } catch (error) {
          console.error('메시지 파싱 오류:', error);
        }
      });
    } catch (error) {
      console.error('구독 오류:', error);
    }
  }

  send(destination: string, data: T) {
    if (!this.stompClient?.connected) {
      console.error('WebSocket이 연결되지 않았습니다');
      return;
    }

    try {
      console.log(`메시지 전송: ${destination}`);
      this.stompClient.publish({
        destination: `/pub/${destination}`,
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('메시지 전송 오류:', error);
    }
  }

  disconnect() {
    if (this.stompClient) {
      console.log('WebSocket 연결 해제');
      this.stompClient.deactivate();
      this.stompClient = null;
      this.connectionStatus = false;
    }
  }

  isConnected(): boolean {
    return this.connectionStatus;
  }
}

export const webSocketService = new WebSocketService<Message>();

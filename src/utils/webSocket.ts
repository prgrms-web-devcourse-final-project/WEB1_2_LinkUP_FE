import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

class WebSocketService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private stompClient: any;

  connect(url: string, onConnect: () => void) {
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, (frame: string) => {
      console.log('Connected: ' + frame);
      onConnect();
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscribe(destination: string, callback: (message: any) => void) {
    this.stompClient.subscribe(destination, callback);
  }

  send(destination: string, message: string) {
    this.stompClient.send(destination, {}, message);
  }

  unsubscribe(destination: string) {
    this.stompClient.unsubscribe(destination);
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
  }
}

export const webSocketService = new WebSocketService();

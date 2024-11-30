export const connectWebSocket = (
  path: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onMessage: (data: any) => void
): WebSocket => {
  const ws = new WebSocket(`wss://your-backend-domain.com${path}`);

  ws.onopen = () => {
    console.log('WebSocket connection established');
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data); // 메시지 처리
  };

  ws.onclose = (event) => {
    console.log('WebSocket connection closed:', event);
  };

  ws.onerror = (error) => {
    console.error('WebSocket error occurred:', error);
  };

  return ws;
};

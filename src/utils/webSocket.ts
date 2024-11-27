export const connectWebSocket = (path: string): WebSocket => {
  const wws = new WebSocket(`wss://your-backend-domain.com${path}`);

  wws.onopen = () => {
    console.log('WebSocket connection established');
  };

  wws.onclose = (event) => {
    console.log('WebSocket connection closed:', event);
  };

  wws.onerror = (error) => {
    console.error('WebSocket error occurred:', error);
  };

  return wws;
};

import { WS_BASE_URL } from '../constants/api.constants';

type WebSocketMessageHandler = (data: string) => void;

class WebSocketClient {
  private socket: WebSocket | null = null;
  private messageHandlers = new Set<WebSocketMessageHandler>();

  connect(): void {
    if (this.socket) {
      const state = this.socket.readyState;
      if (
        state === WebSocket.OPEN ||
        state === WebSocket.CONNECTING ||
        state === WebSocket.CLOSING
      ) {
        return;
      }
    }

    this.socket = new WebSocket(WS_BASE_URL);

    this.socket.onopen = () => {
      console.log('Connection opened');
    };

    this.socket.onmessage = (event: MessageEvent<string>) => {
      this.messageHandlers.forEach((handler) => handler(event.data));
    };

    this.socket.onclose = () => {
      console.log('Connection closed');
      this.socket = null;
    };

    this.socket.onerror = (error) => {
      console.log('WebSocket error:', error);
    };
  }

  disconnect(): void {
    if (!this.socket) {
      return;
    }

    this.socket.close();
    this.socket = null;
  }

  onMessage(handler: WebSocketMessageHandler): () => void {
    this.messageHandlers.add(handler);

    return () => {
      this.messageHandlers.delete(handler);
    };
  }
}

const websocketClient = new WebSocketClient();

export const connectWebSocket = (): void => {
  websocketClient.connect();
};

export const disconnectWebSocket = (): void => {
  websocketClient.disconnect();
};

export const onWebSocketMessage = (
  handler: WebSocketMessageHandler
): (() => void) => {
  return websocketClient.onMessage(handler);
};

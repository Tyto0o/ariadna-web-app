import { useEffect } from 'react';
import { useAppDispatch } from '../../../hooks';
import {
  connectWebSocket,
  disconnectWebSocket,
  onWebSocketMessage,
} from '../../../shared/websocket/websocketClient';
import { updateRobotPosition } from '../slices/robotsSlice';

interface RobotPositionUpdateMessage {
  robotId: string;
  x: number;
  y: number;
}

const isRobotPositionUpdateMessage = (
  value: unknown
): value is RobotPositionUpdateMessage => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const payload = value as Partial<RobotPositionUpdateMessage>;

  return (
    typeof payload.robotId === 'string' &&
    typeof payload.x === 'number' &&
    Number.isFinite(payload.x) &&
    typeof payload.y === 'number' &&
    Number.isFinite(payload.y)
  );
};

export const useRobotPositionUpdates = (): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    connectWebSocket();

    const unsubscribe = onWebSocketMessage((data: string) => {
      let parsed: unknown;

      try {
        parsed = JSON.parse(data);
      } catch {
        return;
      }

      if (!isRobotPositionUpdateMessage(parsed)) {
        return;
      }

      dispatch(updateRobotPosition(parsed));
    });

    return () => {
      unsubscribe();
      disconnectWebSocket();
    };
  }, [dispatch]);
};

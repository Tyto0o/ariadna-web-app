import { ReactNode } from 'react';

export interface Position {
  x: number;
  y: number;
}

export interface RobotPathRequest {
  robotId: string;
  target: Position;
}

export interface RobotPathResponse {
  path: Position[];
}

export interface Robot {
  _id: string;
  name: string;
  position: Position;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type RobotWritableFields = Omit<
  Robot,
  '_id' | 'createdAt' | 'updatedAt' | '__v'
>;

export interface Obstacle {
  _id: string;
  name: string;
  position: Position;
  width: number;
  length: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type ObstacleWritableFields = Omit<
  Obstacle,
  '_id' | 'createdAt' | 'updatedAt' | '__v'
>;

export interface EntityItemProps {
  entity: Robot | Obstacle;
  markerColor: string;
  isSelected?: boolean;
  onClick?: () => void;
  action?: ReactNode;
}

export interface EntitySectionProps {
  title: string;
  entities: Robot[] | Obstacle[];
  isOpen: boolean;
  onToggle: () => void;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  renderItemAction?: (entity: Robot | Obstacle) => ReactNode;
  icon: ReactNode;
  markerColor: string;
}

// State types
export interface RobotsState {
  items: Robot[];
  selectedId: string | null;
  loading: boolean;
  error: string | null;
}

export interface ObstaclesState {
  items: Obstacle[];
  selectedId: string | null;
  loading: boolean;
  error: string | null;
}

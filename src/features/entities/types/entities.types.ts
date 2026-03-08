import { ReactNode } from 'react';

export interface Position {
  x: number;
  y: number;
}

export interface Robot {
  _id: string;
  name: string;
  position: Position;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

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

export interface EntityItemProps {
  entity: Robot | Obstacle;
  markerColor: string;
}

export interface EntitySectionProps {
  title: string;
  entities: Robot[] | Obstacle[];
  isOpen: boolean;
  onToggle: () => void;
  icon: ReactNode;
  markerColor: string;
}

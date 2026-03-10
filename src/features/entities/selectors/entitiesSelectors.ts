import { RootState } from '../../../store';
import { Robot, Obstacle } from '../types/entities.types';

// Robots selectors
export const selectRobots = (state: RootState): Robot[] => state.robots.items;
export const selectRobotsLoading = (state: RootState): boolean =>
  state.robots.loading;
export const selectRobotsError = (state: RootState): string | null =>
  state.robots.error;
export const selectSelectedRobotId = (state: RootState): string | null =>
  state.robots.selectedId;
export const selectRobotById =
  (id: string) =>
  (state: RootState): Robot | undefined =>
    state.robots.items.find((robot) => robot._id === id);

// Obstacles selectors
export const selectObstacles = (state: RootState): Obstacle[] =>
  state.obstacles.items;
export const selectObstaclesLoading = (state: RootState): boolean =>
  state.obstacles.loading;
export const selectObstaclesError = (state: RootState): string | null =>
  state.obstacles.error;
export const selectSelectedObstacleId = (state: RootState): string | null =>
  state.obstacles.selectedId;
export const selectObstacleById =
  (id: string) =>
  (state: RootState): Obstacle | undefined =>
    state.obstacles.items.find((obstacle) => obstacle._id === id);

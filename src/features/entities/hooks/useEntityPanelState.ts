import { useState } from 'react';
import { useAppSelector } from '../../../hooks';
import {
  selectRobots,
  selectObstacles,
  selectRobotsLoading,
  selectObstaclesLoading,
} from '../selectors/entitiesSelectors';

export const useEntityPanelState = () => {
  const [robotsOpen, setRobotsOpen] = useState(false);
  const [obstaclesOpen, setObstaclesOpen] = useState(false);

  const robots = useAppSelector(selectRobots);
  const obstacles = useAppSelector(selectObstacles);
  const robotsLoading = useAppSelector(selectRobotsLoading);
  const obstaclesLoading = useAppSelector(selectObstaclesLoading);

  return {
    robots,
    obstacles,
    robotsOpen,
    obstaclesOpen,
    robotsLoading,
    obstaclesLoading,
    toggleRobots: () => setRobotsOpen((prev) => !prev),
    toggleObstacles: () => setObstaclesOpen((prev) => !prev),
  };
};

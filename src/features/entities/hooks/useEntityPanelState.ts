import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  selectRobots,
  selectObstacles,
  selectRobotsLoading,
  selectObstaclesLoading,
  selectSelectedRobotId,
} from '../selectors/entitiesSelectors';
import { selectRobot } from '../slices/robotsSlice';

export const useEntityPanelState = () => {
  const dispatch = useAppDispatch();
  const [robotsOpen, setRobotsOpen] = useState(false);
  const [obstaclesOpen, setObstaclesOpen] = useState(false);

  const robots = useAppSelector(selectRobots);
  const obstacles = useAppSelector(selectObstacles);
  const selectedRobotId = useAppSelector(selectSelectedRobotId);
  const robotsLoading = useAppSelector(selectRobotsLoading);
  const obstaclesLoading = useAppSelector(selectObstaclesLoading);

  return {
    robots,
    obstacles,
    selectedRobotId,
    robotsOpen,
    obstaclesOpen,
    robotsLoading,
    obstaclesLoading,
    toggleRobots: () => setRobotsOpen((prev) => !prev),
    toggleObstacles: () => setObstaclesOpen((prev) => !prev),
    selectRobotById: (id: string) => dispatch(selectRobot(id)),
  };
};

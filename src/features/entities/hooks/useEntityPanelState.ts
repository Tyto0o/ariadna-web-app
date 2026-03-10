import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  selectRobots,
  selectObstacles,
  selectRobotsLoading,
  selectObstaclesLoading,
} from '../selectors/entitiesSelectors';
import { fetchRobots } from '../thunks/robotsThunks';
import { fetchObstacles } from '../thunks/obstaclesThunks';

export const useEntityPanelState = () => {
  const dispatch = useAppDispatch();
  const [robotsOpen, setRobotsOpen] = useState(false);
  const [obstaclesOpen, setObstaclesOpen] = useState(false);

  const robots = useAppSelector(selectRobots);
  const obstacles = useAppSelector(selectObstacles);
  const robotsLoading = useAppSelector(selectRobotsLoading);
  const obstaclesLoading = useAppSelector(selectObstaclesLoading);

  useEffect(() => {
    dispatch(fetchRobots());
    dispatch(fetchObstacles());
  }, [dispatch]);

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

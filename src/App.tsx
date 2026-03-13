import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { initScene } from './features/scene/setup';
import { UserPanel } from './features/entities/components/UserPanel';
import { useAppDispatch, useAppSelector } from './hooks';
import {
  selectObstacles,
  selectRobots,
} from './features/entities/selectors/entitiesSelectors';
import { fetchRobots } from './features/entities/thunks/robotsThunks';
import { fetchObstacles } from './features/entities/thunks/obstaclesThunks';

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRuntimeRef = useRef<ReturnType<typeof initScene> | null>(null);
  const dispatch = useAppDispatch();
  const robots = useAppSelector(selectRobots);
  const obstacles = useAppSelector(selectObstacles);

  useEffect(() => {
    dispatch(fetchRobots());
    dispatch(fetchObstacles());
  }, [dispatch]);

  useEffect(() => {
    if (!containerRef.current) return;

    sceneRuntimeRef.current = initScene(containerRef.current);

    return () => {
      sceneRuntimeRef.current?.dispose();
      sceneRuntimeRef.current = null;
    };
  }, []);

  useEffect(() => {
    sceneRuntimeRef.current?.syncRobots(robots);
  }, [robots]);

  useEffect(() => {
    sceneRuntimeRef.current?.syncObstacles(obstacles);
  }, [obstacles]);

  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <Box ref={containerRef} sx={{ flex: '0 0 80%' }} />
      <Box sx={{ flex: '0 0 20%', overflow: 'auto', height: '100%' }}>
        <UserPanel />
      </Box>
    </Box>
  );
}

export default App;

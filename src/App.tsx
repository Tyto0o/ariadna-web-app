import { Box } from '@mui/material';
import { UserPanel } from './features/entities/components/panel/UserPanel';
import { useRobotPositionUpdates } from './features/entities/hooks/useRobotPositionUpdates';
import { useSceneController } from './features/scene/hooks/useSceneController';

function App() {
  useRobotPositionUpdates();

  const { containerRef, robotPathLoading, startTargetSelectionForRobot } =
    useSceneController();

  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <Box ref={containerRef} sx={{ flex: '0 0 80%', position: 'relative' }} />
      <Box sx={{ flex: '0 0 20%', overflow: 'auto', height: '100%' }}>
        <UserPanel
          robotPathLoading={robotPathLoading}
          onStartTargetSelectionForRobot={startTargetSelectionForRobot}
        />
      </Box>
    </Box>
  );
}

export default App;

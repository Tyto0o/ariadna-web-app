import { UserPanelOverlayLayout } from './features/entities/components/panel/UserPanelOverlayLayout';
import { useRobotPositionUpdates } from './features/entities/hooks/useRobotPositionUpdates';
import { useSceneController } from './features/scene/hooks/useSceneController';

function App() {
  useRobotPositionUpdates();

  const {
    containerRef,
    robotPathLoading,
    startTargetSelectionForRobot,
    resetCameraView,
  } = useSceneController();

  return (
    <UserPanelOverlayLayout
      sceneContainerRef={containerRef}
      robotPathLoading={robotPathLoading}
      onStartTargetSelectionForRobot={startTargetSelectionForRobot}
      onResetCameraView={resetCameraView}
    />
  );
}

export default App;

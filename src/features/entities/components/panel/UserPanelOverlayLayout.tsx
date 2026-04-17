import { Box } from '@mui/material';
import { type RefObject, useState } from 'react';
import { UserPanelToggleButton } from './UserPanelToggleButton';
import { UserPanel } from './UserPanel';

interface UserPanelOverlayLayoutProps {
  sceneContainerRef: RefObject<HTMLDivElement | null>;
  robotPathLoading: boolean;
  onStartTargetSelectionForRobot: (robotId: string) => void;
  onResetCameraView: () => void;
}

export const UserPanelOverlayLayout = ({
  sceneContainerRef,
  robotPathLoading,
  onStartTargetSelectionForRobot,
  onResetCameraView,
}: UserPanelOverlayLayoutProps) => {
  const [panelOpen, setPanelOpen] = useState(true);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
      }}
    >
      <Box
        ref={sceneContainerRef}
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          minWidth: 360,
          width: `25vw`,
          maxWidth: '90vw',
          height: '100%',
          overflow: 'visible',
          zIndex: 8,
          transform: panelOpen
            ? 'translateX(0)'
            : 'translateX(calc(100% - 1px))',
          transition: 'transform 280ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <UserPanelToggleButton
          panelOpen={panelOpen}
          onToggle={() => setPanelOpen((prev) => !prev)}
        />
        <Box
          sx={{
            width: '100%',
            height: '100%',
            overflow: 'auto',
            backgroundColor: 'background.paper',
            boxShadow: 6,
          }}
        >
          <UserPanel
            robotPathLoading={robotPathLoading}
            onStartTargetSelectionForRobot={onStartTargetSelectionForRobot}
            onResetCameraView={onResetCameraView}
          />
        </Box>
      </Box>
    </Box>
  );
};

import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

interface CameraResetActionProps {
  disabled?: boolean;
  onResetCameraView: () => void;
}

export const CameraResetAction = ({
  disabled = false,
  onResetCameraView,
}: CameraResetActionProps) => (
  <Tooltip title="Reset camera view">
    <span>
      <IconButton
        size="small"
        aria-label="Reset camera view"
        disabled={disabled}
        onClick={(event) => {
          event.stopPropagation();
          onResetCameraView();
        }}
      >
        <CenterFocusStrongIcon fontSize="small" />
      </IconButton>
    </span>
  </Tooltip>
);

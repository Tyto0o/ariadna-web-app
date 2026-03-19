import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { useSnackbar } from '../../../shared/snackbar/SnackbarProvider';

interface RobotDestinationActionProps {
  robotId: string;
  disabled: boolean;
  onStartTargetSelectionForRobot: (robotId: string) => void;
}

export const RobotDestinationAction = ({
  robotId,
  disabled,
  onStartTargetSelectionForRobot,
}: RobotDestinationActionProps) => {
  const { showSnackbar } = useSnackbar();

  return (
    <Tooltip title="Set destination point">
      <span>
        <IconButton
          size="small"
          aria-label="Set destination point"
          onClick={(event) => {
            event.stopPropagation();
            onStartTargetSelectionForRobot(robotId);
            showSnackbar(
              'Click on the map to set the robot destination',
              'info',
              Infinity
            );
          }}
          disabled={disabled}
        >
          <GpsFixedIcon fontSize="small" />
        </IconButton>
      </span>
    </Tooltip>
  );
};

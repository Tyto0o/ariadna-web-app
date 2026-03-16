import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

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
  return (
    <Tooltip title="Set destination point">
      <span>
        <IconButton
          size="small"
          aria-label="Set destination point"
          onClick={(event) => {
            event.stopPropagation();
            onStartTargetSelectionForRobot(robotId);
          }}
          disabled={disabled}
        >
          <GpsFixedIcon fontSize="small" />
        </IconButton>
      </span>
    </Tooltip>
  );
};

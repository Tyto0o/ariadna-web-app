import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Stack from '@mui/material/Stack';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CategoryIcon from '@mui/icons-material/Category';
import { useTheme } from '@mui/material/styles';
import { useEntityCrudActions } from '../../hooks/useEntityCrudActions';
import { useEntityPanelState } from '../../hooks/useEntityPanelState';
import { EntityDeleteAction } from '../actions/EntityDeleteAction';
import { RobotDestinationAction } from '../actions/RobotDestinationAction';
import { EntityEditMenu } from '../menu/EntityEditMenu';
import { EntitySection } from './EntitySection';

interface UserPanelProps {
  robotPathLoading: boolean;
  onStartTargetSelectionForRobot: (robotId: string) => void;
}

export const UserPanel = ({
  robotPathLoading,
  onStartTargetSelectionForRobot,
}: UserPanelProps) => {
  const theme = useTheme();
  const {
    robots,
    obstacles,
    selectedRobotId,
    robotsOpen,
    obstaclesOpen,
    toggleRobots,
    toggleObstacles,
    selectRobotById,
  } = useEntityPanelState();
  const {
    handleRobotCreateRequest,
    handleObstacleCreateRequest,
    getRobotSaveHandler,
    getObstacleSaveHandler,
    getRobotDeleteHandler,
    getObstacleDeleteHandler,
  } = useEntityCrudActions({ obstacles });

  return (
    <List
      sx={{
        height: '100%',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        paddingTop: 0,
      }}
    >
      <ListSubheader
        sx={{
          textAlign: 'center',
          fontSize: '1.4em',
          fontWeight: 600,
          padding: '8px',
          borderBottom: `2px solid ${theme.palette.divider}`,
          letterSpacing: '0.5px',
        }}
      >
        User Panel
      </ListSubheader>

      <EntitySection
        title="Robots"
        entities={robots}
        isOpen={robotsOpen}
        onToggle={toggleRobots}
        selectedId={selectedRobotId}
        onSelect={selectRobotById}
        headerAction={
          <EntityEditMenu
            title="Robot"
            name={`Robot ${robots.length + 1}`}
            position={{ x: 0, y: 0 }}
            disabled={robotPathLoading}
            mode="add"
            onSave={handleRobotCreateRequest}
          />
        }
        renderItemAction={(entity) => (
          <Stack direction="row" spacing={0.5}>
            <RobotDestinationAction
              robotId={entity._id}
              disabled={robotPathLoading}
              onStartTargetSelectionForRobot={onStartTargetSelectionForRobot}
            />
            <EntityEditMenu
              title="Robot"
              name={entity.name}
              position={entity.position}
              disabled={robotPathLoading}
              onSave={getRobotSaveHandler(entity)}
            />
            <EntityDeleteAction
              title="Robot"
              disabled={robotPathLoading}
              onDelete={getRobotDeleteHandler(entity)}
            />
          </Stack>
        )}
        icon={<SmartToyIcon sx={{ color: theme.palette.icons.robot }} />}
        markerColor={theme.palette.info.light}
      />

      <EntitySection
        title="Obstacles"
        entities={obstacles}
        isOpen={obstaclesOpen}
        onToggle={toggleObstacles}
        selectedId={null}
        headerAction={
          <EntityEditMenu
            title="Obstacle"
            name={`Obstacle ${obstacles.length + 1}`}
            position={{ x: 0, y: 0 }}
            mode="add"
            onSave={handleObstacleCreateRequest}
          />
        }
        renderItemAction={(entity) => (
          <Stack direction="row" spacing={0.5}>
            <EntityEditMenu
              title="Obstacle"
              name={entity.name}
              position={entity.position}
              onSave={getObstacleSaveHandler(entity)}
            />
            <EntityDeleteAction
              title="Obstacle"
              onDelete={getObstacleDeleteHandler(entity)}
            />
          </Stack>
        )}
        icon={<CategoryIcon sx={{ color: theme.palette.icons.obstacle }} />}
        markerColor={theme.palette.success.light}
      />
    </List>
  );
};

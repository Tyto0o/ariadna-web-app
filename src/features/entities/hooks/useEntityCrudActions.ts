import { useAppDispatch } from '../../../hooks';
import { useSnackbar } from '../../../shared/snackbar/SnackbarProvider';
import {
  createObstacle,
  deleteObstacle,
  updateObstacleById,
} from '../thunks/obstaclesThunks';
import {
  createRobot,
  deleteRobot,
  updateRobotById,
} from '../thunks/robotsThunks';
import { Obstacle, Robot } from '../types/entities.types';
import { EntityEditFormData } from '../components/menu/types';

type EntityFormData = {
  name: string;
  position: { x: number; y: number };
};

interface UseEntityCrudActionsParams {
  obstacles: Obstacle[];
}

export const useEntityCrudActions = ({
  obstacles,
}: UseEntityCrudActionsParams) => {
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbar();

  const handleRobotUpdate = async (robot: Robot, data: EntityFormData) => {
    await dispatch(
      updateRobotById({
        id: robot._id,
        data,
      })
    ).unwrap();
    showSnackbar('Robot updated', 'success');
  };

  const handleObstacleUpdate = async (
    obstacle: Obstacle,
    data: EntityFormData
  ) => {
    await dispatch(
      updateObstacleById({
        id: obstacle._id,
        data,
      })
    ).unwrap();
    showSnackbar('Obstacle updated', 'success');
  };

  const handleRobotCreateRequest = async (data: EntityEditFormData) => {
    try {
      await dispatch(createRobot(data)).unwrap();
      showSnackbar('Robot created', 'success');
    } catch {
      showSnackbar('Failed to create robot', 'error');
    }
  };

  const handleObstacleCreateRequest = async (data: EntityEditFormData) => {
    const firstObstacle = obstacles[0];
    const obstacleDimensions = firstObstacle
      ? { width: firstObstacle.width, length: firstObstacle.length }
      : { width: 100, length: 100 };

    try {
      await dispatch(
        createObstacle({
          ...data,
          ...obstacleDimensions,
        })
      ).unwrap();
      showSnackbar('Obstacle created', 'success');
    } catch {
      showSnackbar('Failed to create obstacle', 'error');
    }
  };

  const getRobotSaveHandler =
    (robot: Robot) => async (data: EntityFormData) => {
      try {
        await handleRobotUpdate(robot, data);
      } catch {
        showSnackbar('Failed to update robot', 'error');
      }
    };

  const getObstacleSaveHandler =
    (obstacle: Obstacle) => async (data: EntityFormData) => {
      try {
        await handleObstacleUpdate(obstacle, data);
      } catch {
        showSnackbar('Failed to update obstacle', 'error');
      }
    };

  const getRobotDeleteHandler = (robot: Robot) => async () => {
    const shouldDelete = window.confirm(
      `Delete robot "${robot.name}"? This action cannot be undone.`
    );
    if (!shouldDelete) {
      return;
    }

    try {
      await dispatch(deleteRobot(robot._id)).unwrap();
      showSnackbar('Robot deleted', 'success');
    } catch {
      showSnackbar('Failed to delete robot', 'error');
    }
  };

  const getObstacleDeleteHandler = (obstacle: Obstacle) => async () => {
    const shouldDelete = window.confirm(
      `Delete obstacle "${obstacle.name}"? This action cannot be undone.`
    );
    if (!shouldDelete) {
      return;
    }

    try {
      await dispatch(deleteObstacle(obstacle._id)).unwrap();
      showSnackbar('Obstacle deleted', 'success');
    } catch {
      showSnackbar('Failed to delete obstacle', 'error');
    }
  };

  return {
    handleRobotCreateRequest,
    handleObstacleCreateRequest,
    getRobotSaveHandler,
    getObstacleSaveHandler,
    getRobotDeleteHandler,
    getObstacleDeleteHandler,
  };
};

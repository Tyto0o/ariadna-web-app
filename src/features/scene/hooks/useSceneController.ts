import { type RefObject, useEffect, useRef, useState } from 'react';
import { initScene } from '../setup';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  selectObstacles,
  selectRobots,
  selectSelectedRobotId,
} from '../../entities/selectors/entitiesSelectors';
import { fetchRobots } from '../../entities/thunks/robotsThunks';
import { fetchObstacles } from '../../entities/thunks/obstaclesThunks';
import { selectRobot } from '../../entities/slices/robotsSlice';
import { pathApi } from '../../entities/api/pathApi';
import { simulationApi } from '../../entities/api/simulationApi';
import { Position } from '../../entities/types/entities.types';
import { useSnackbar } from '../../../shared/snackbar/useSnackbar';
import { CAMERA_DEFAULT_POSITION, DEFAULT_CAMERA_TARGET } from '../constants';

interface UseSceneControllerResult {
  containerRef: RefObject<HTMLDivElement | null>;
  robotPathLoading: boolean;
  setView: (
    x: number,
    y: number,
    z: number,
    lookAtX?: number,
    lookAtY?: number,
    lookAtZ?: number
  ) => void;
  resetCameraView: () => void;
  startTargetSelectionForRobot: (robotId: string) => void;
}

const PATH_COMPLETION_DISTANCE_THRESHOLD = 0.1; // This is a threshold distance to consider the robot has reached the destination, adjust as needed

const hasReachedPathDestination = (
  currentPosition: Position,
  destination: Position
): boolean => {
  return (
    Math.hypot(
      currentPosition.x - destination.x,
      currentPosition.y - destination.y
    ) <= PATH_COMPLETION_DISTANCE_THRESHOLD
  );
};

export const useSceneController = (): UseSceneControllerResult => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRuntimeRef = useRef<ReturnType<typeof initScene> | null>(null);
  const selectedRobotIdRef = useRef<string | null>(null);
  const targetSelectionModeRef = useRef(false);
  const dispatch = useAppDispatch();
  const robots = useAppSelector(selectRobots);
  const obstacles = useAppSelector(selectObstacles);
  const selectedRobotId = useAppSelector(selectSelectedRobotId);

  const [targetSelectionMode, setTargetSelectionMode] = useState(false);
  const [robotPath, setRobotPath] = useState<Position[]>([]);
  const [pathRobotId, setPathRobotId] = useState<string | null>(null);
  const [robotPathLoading, setRobotPathLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    selectedRobotIdRef.current = selectedRobotId;
    setRobotPath([]);
    setPathRobotId(null);
  }, [selectedRobotId]);

  useEffect(() => {
    targetSelectionModeRef.current = targetSelectionMode;
    sceneRuntimeRef.current?.setTargetPreviewEnabled(targetSelectionMode);
  }, [targetSelectionMode]);

  useEffect(() => {
    dispatch(fetchRobots());
    dispatch(fetchObstacles());
  }, [dispatch]);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    sceneRuntimeRef.current = initScene(containerRef.current, {
      onGroundClick: async (target) => {
        if (!targetSelectionModeRef.current) {
          return;
        }

        targetSelectionModeRef.current = false;
        setTargetSelectionMode(false);

        const currentRobotId = selectedRobotIdRef.current;
        if (!currentRobotId) {
          return;
        }

        setRobotPath([]);
        setRobotPathLoading(true);

        try {
          const response = await pathApi.generateRobotPath({
            robotId: currentRobotId,
            target,
          });

          setRobotPath(response.path);
          setPathRobotId(currentRobotId);

          await simulationApi.startSimulation({
            robotId: currentRobotId,
            path: response.path,
          });

          showSnackbar(
            'Robot path generated and simulation started successfully',
            'success'
          );
        } catch {
          setRobotPath([]);
          setPathRobotId(null);
          showSnackbar(
            'Failed to generate robot path or start simulation',
            'error'
          );
        } finally {
          setRobotPathLoading(false);
        }
      },
    });

    return () => {
      sceneRuntimeRef.current?.dispose();
      sceneRuntimeRef.current = null;
    };
  }, [dispatch, showSnackbar]);

  useEffect(() => {
    sceneRuntimeRef.current?.syncRobots(robots);
  }, [robots]);

  useEffect(() => {
    sceneRuntimeRef.current?.syncObstacles(obstacles);
  }, [obstacles]);

  useEffect(() => {
    sceneRuntimeRef.current?.syncPath(robotPath);
  }, [robotPath]);

  useEffect(() => {
    if (!pathRobotId || robotPath.length === 0) {
      return;
    }

    const robot = robots.find((item) => item._id === pathRobotId);
    if (!robot) {
      return;
    }

    const destination = robotPath[robotPath.length - 1];
    if (!destination) {
      return;
    }

    if (hasReachedPathDestination(robot.position, destination)) {
      setRobotPath([]);
      setPathRobotId(null);
    }
  }, [pathRobotId, robotPath, robots]);

  const startTargetSelectionForRobot = (robotId: string): void => {
    if (!robotId) {
      return;
    }

    dispatch(selectRobot(robotId));
    selectedRobotIdRef.current = robotId;
    setTargetSelectionMode(true);
  };

  const setView = (
    x: number,
    y: number,
    z: number,
    lookAtX: number = DEFAULT_CAMERA_TARGET.x,
    lookAtY: number = DEFAULT_CAMERA_TARGET.y,
    lookAtZ: number = DEFAULT_CAMERA_TARGET.z
  ): void => {
    sceneRuntimeRef.current?.setCameraView({
      position: { x, y, z },
      lookAt: {
        x: lookAtX,
        y: lookAtY,
        z: lookAtZ,
      },
    });
  };

  const resetCameraView = (): void => {
    targetSelectionModeRef.current = false;
    setTargetSelectionMode(false);
    sceneRuntimeRef.current?.setTargetPreviewEnabled(false);

    setView(
      CAMERA_DEFAULT_POSITION.x,
      CAMERA_DEFAULT_POSITION.y,
      CAMERA_DEFAULT_POSITION.z,
      DEFAULT_CAMERA_TARGET.x,
      DEFAULT_CAMERA_TARGET.y,
      DEFAULT_CAMERA_TARGET.z
    );
  };

  return {
    containerRef,
    robotPathLoading,
    setView,
    resetCameraView,
    startTargetSelectionForRobot,
  };
};

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

interface UseSceneControllerResult {
  containerRef: RefObject<HTMLDivElement | null>;
  robotPathLoading: boolean;
  startTargetSelectionForRobot: (robotId: string) => void;
}

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
  const [robotPathLoading, setRobotPathLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    selectedRobotIdRef.current = selectedRobotId;
    setRobotPath([]);
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

  const startTargetSelectionForRobot = (robotId: string): void => {
    if (!robotId) {
      return;
    }

    dispatch(selectRobot(robotId));
    selectedRobotIdRef.current = robotId;
    setTargetSelectionMode(true);
  };

  return {
    containerRef,
    robotPathLoading,
    startTargetSelectionForRobot,
  };
};

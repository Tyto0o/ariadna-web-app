import { describe, expect, it } from 'vitest';
import {
  selectObstacleById,
  selectObstacles,
  selectObstaclesError,
  selectObstaclesLoading,
  selectRobotById,
  selectRobots,
  selectRobotsError,
  selectRobotsLoading,
  selectSelectedObstacleId,
  selectSelectedRobotId,
} from '../../../../src/features/entities/selectors/entitiesSelectors';
import { RootState } from '../../../../src/store';

const state: RootState = {
  robots: {
    items: [
      {
        _id: 'r1',
        name: 'Robot 1',
        position: { x: 10, y: 20 },
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
        __v: 0,
      },
    ],
    selectedId: 'r1',
    loading: false,
    error: null,
  },
  obstacles: {
    items: [
      {
        _id: 'o1',
        name: 'Obstacle 1',
        position: { x: 5, y: 6 },
        width: 70,
        length: 80,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
        __v: 0,
      },
    ],
    selectedId: 'o1',
    loading: true,
    error: 'timeout',
  },
};

describe('entitiesSelectors', () => {
  it('returns basic robot data', () => {
    expect(selectRobots(state)).toHaveLength(1);
    expect(selectRobotsLoading(state)).toBe(false);
    expect(selectRobotsError(state)).toBeNull();
    expect(selectSelectedRobotId(state)).toBe('r1');
  });

  it('selectRobotById returns robot by id or undefined', () => {
    expect(selectRobotById('r1')(state)?.name).toBe('Robot 1');
    expect(selectRobotById('missing')(state)).toBeUndefined();
  });

  it('returns basic obstacle data', () => {
    expect(selectObstacles(state)).toHaveLength(1);
    expect(selectObstaclesLoading(state)).toBe(true);
    expect(selectObstaclesError(state)).toBe('timeout');
    expect(selectSelectedObstacleId(state)).toBe('o1');
  });

  it('selectObstacleById returns obstacle by id or undefined', () => {
    expect(selectObstacleById('o1')(state)?.name).toBe('Obstacle 1');
    expect(selectObstacleById('missing')(state)).toBeUndefined();
  });
});

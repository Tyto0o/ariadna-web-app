import { describe, expect, it } from 'vitest';
import obstaclesReducer, {
  removeObstacle,
  selectObstacle,
  setObstacles,
  updateObstacle,
} from '../../../../src/features/entities/slices/obstaclesSlice';
import {
  Obstacle,
  ObstaclesState,
} from '../../../../src/features/entities/types/entities.types';

const createObstacle = (id: string, name: string): Obstacle => ({
  _id: id,
  name,
  position: { x: 1, y: 2 },
  width: 100,
  length: 200,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  __v: 0,
});

const createState = (
  overrides: Partial<ObstaclesState> = {}
): ObstaclesState => ({
  items: [
    createObstacle('obstacle-1', 'Obstacle-1'),
    createObstacle('obstacle-2', 'Obstacle-2'),
  ],
  selectedId: null,
  loading: false,
  error: null,
  ...overrides,
});

describe('obstaclesSlice', () => {
  it('setObstacles sets items and clears loading/error', () => {
    const previousState = createState({
      items: [],
      loading: true,
      error: 'old error',
    });

    const obstacles = [createObstacle('obstacle-1', 'Obstacle-1')];

    const nextState = obstaclesReducer(previousState, setObstacles(obstacles));

    expect(nextState.items).toEqual(obstacles);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBeNull();
  });

  it('updateObstacle replaces entity by _id', () => {
    const previousState = createState();

    const updated = {
      ...createObstacle('obstacle-2', 'Obstacle-2'),
      width: 300,
      length: 400,
    };

    const nextState = obstaclesReducer(previousState, updateObstacle(updated));

    expect(nextState.items[0].width).toBe(100);
    expect(nextState.items[1].width).toBe(300);
    expect(nextState.items[1].length).toBe(400);
  });

  it('updateObstacle keeps state unchanged when obstacle does not exist', () => {
    const previousState = createState();

    const updated = {
      ...createObstacle('obstacle-404', 'Obstacle-404'),
      width: 300,
      length: 400,
    };

    const nextState = obstaclesReducer(previousState, updateObstacle(updated));

    expect(nextState.items).toEqual(previousState.items);
  });

  it('removeObstacle deletes entity and clears selectedId for removed one', () => {
    const previousState = createState({ selectedId: 'obstacle-2' });

    const nextState = obstaclesReducer(
      previousState,
      removeObstacle('obstacle-2')
    );

    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0]._id).toBe('obstacle-1');
    expect(nextState.selectedId).toBeNull();
  });

  it('selectObstacle updates selectedId', () => {
    const previousState = createState({
      items: [createObstacle('obstacle-1', 'Obstacle-1')],
    });

    const nextState = obstaclesReducer(
      previousState,
      selectObstacle('obstacle-1')
    );

    expect(nextState.selectedId).toBe('obstacle-1');
  });
});

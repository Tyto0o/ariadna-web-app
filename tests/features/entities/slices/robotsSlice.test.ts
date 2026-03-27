import { describe, expect, it } from 'vitest';
import robotsReducer, {
  removeRobot,
  selectRobot,
  setError,
  setRobots,
  updateRobotPosition,
} from '../../../../src/features/entities/slices/robotsSlice';
import {
  Robot,
  RobotsState,
} from '../../../../src/features/entities/types/entities.types';

const createRobot = (id: string, name: string): Robot => ({
  _id: id,
  name,
  position: { x: 10, y: 20 },
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  __v: 0,
});

const createState = (overrides: Partial<RobotsState> = {}): RobotsState => ({
  items: [createRobot('robot-1', 'Robot-1'), createRobot('robot-2', 'Robot-2')],
  selectedId: null,
  loading: false,
  error: null,
  ...overrides,
});

describe('robotsSlice', () => {
  it('setRobots sets items and clears loading/error', () => {
    const previousState = createState({
      items: [],
      loading: true,
      error: 'boom',
    });

    const robots = [createRobot('robot-1', 'Robot-1')];

    const nextState = robotsReducer(previousState, setRobots(robots));

    expect(nextState.items).toEqual(robots);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBeNull();
  });

  it('updateRobotPosition updates only the targeted robot position', () => {
    const previousState = createState();

    const nextState = robotsReducer(
      previousState,
      updateRobotPosition({ robotId: 'robot-2', x: 111, y: 222 })
    );

    expect(nextState.items[0].position).toEqual({ x: 10, y: 20 });
    expect(nextState.items[1].position).toEqual({ x: 111, y: 222 });
  });

  it('updateRobotPosition keeps state unchanged when robot does not exist', () => {
    const previousState = createState();

    const nextState = robotsReducer(
      previousState,
      updateRobotPosition({ robotId: 'robot-404', x: 111, y: 222 })
    );

    expect(nextState.items).toEqual(previousState.items);
  });

  it('removeRobot deletes robot and clears selectedId if it was selected', () => {
    const previousState = createState({ selectedId: 'robot-2' });

    const nextState = robotsReducer(previousState, removeRobot('robot-2'));

    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0]._id).toBe('robot-1');
    expect(nextState.selectedId).toBeNull();
  });

  it('setError sets error and turns loading off', () => {
    const previousState = createState({
      items: [createRobot('robot-1', 'Robot-1')],
      loading: true,
    });

    const nextState = robotsReducer(previousState, setError('timeout'));

    expect(nextState.error).toBe('timeout');
    expect(nextState.loading).toBe(false);
  });

  it('selectRobot updates selectedId', () => {
    const previousState = createState({
      items: [createRobot('robot-1', 'Robot-1')],
    });

    const nextState = robotsReducer(previousState, selectRobot('robot-1'));

    expect(nextState.selectedId).toBe('robot-1');
  });
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import { obstaclesApi } from '../api/obstaclesApi';
import { ApiError } from '../../../shared/api/types';
import {
  setObstacles,
  setLoading,
  setError,
  addObstacle,
  updateObstacle,
  removeObstacle,
} from '../slices/obstaclesSlice';
import { ObstacleWritableFields } from '../types/entities.types';

export const fetchObstacles = createAsyncThunk(
  'obstacles/fetchObstacles',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const obstacles = await obstaclesApi.get();
      dispatch(setObstacles(obstacles));
      return obstacles;
    } catch (error) {
      const message =
        (error as ApiError)?.message ?? 'Failed to fetch obstacles';
      dispatch(setError(message));
      return rejectWithValue(message);
    }
  }
);

export const createObstacle = createAsyncThunk(
  'obstacles/createObstacle',
  async (obstacle: ObstacleWritableFields, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const newObstacle = await obstaclesApi.create(obstacle);
      dispatch(addObstacle(newObstacle));
      dispatch(setLoading(false));
      return newObstacle;
    } catch (error) {
      const message =
        (error as ApiError)?.message ?? 'Failed to create obstacle';
      dispatch(setError(message));
      return rejectWithValue(message);
    }
  }
);

export const updateObstacleById = createAsyncThunk(
  'obstacles/updateObstacleById',
  async (
    {
      id,
      data,
    }: {
      id: string;
      data: Partial<ObstacleWritableFields>;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setLoading(true));
      const updated = await obstaclesApi.patch(id, data);
      dispatch(updateObstacle(updated));
      dispatch(setLoading(false));
      return updated;
    } catch (error) {
      const message =
        (error as ApiError)?.message ?? 'Failed to update obstacle';
      dispatch(setError(message));
      return rejectWithValue(message);
    }
  }
);

export const replaceObstacleById = createAsyncThunk(
  'obstacles/replaceObstacleById',
  async (
    {
      id,
      data,
    }: {
      id: string;
      data: ObstacleWritableFields;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setLoading(true));
      const updated = await obstaclesApi.put(id, data);
      dispatch(updateObstacle(updated));
      dispatch(setLoading(false));
      return updated;
    } catch (error) {
      const message =
        (error as ApiError)?.message ?? 'Failed to update obstacle';
      dispatch(setError(message));
      return rejectWithValue(message);
    }
  }
);

export const deleteObstacle = createAsyncThunk(
  'obstacles/deleteObstacle',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      await obstaclesApi.delete(id);
      dispatch(removeObstacle(id));
      dispatch(setLoading(false));
      return id;
    } catch (error) {
      const message =
        (error as ApiError)?.message ?? 'Failed to delete obstacle';
      dispatch(setError(message));
      return rejectWithValue(message);
    }
  }
);

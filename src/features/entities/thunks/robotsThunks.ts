import { createAsyncThunk } from '@reduxjs/toolkit';
import { robotsApi } from '../api/robotsApi';
import { ApiError } from '../../../shared/api/types';
import {
  setRobots,
  setLoading,
  setError,
  addRobot,
  updateRobot,
  removeRobot,
} from '../slices/robotsSlice';
import { RobotWritableFields } from '../types/entities.types';

export const fetchRobots = createAsyncThunk(
  'robots/fetchRobots',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const robots = await robotsApi.get();
      dispatch(setRobots(robots));
      return robots;
    } catch (error) {
      const message = (error as ApiError)?.message ?? 'Failed to fetch robots';
      dispatch(setError(message));
      return rejectWithValue(message);
    }
  }
);

export const createRobot = createAsyncThunk(
  'robots/createRobot',
  async (robot: RobotWritableFields, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const newRobot = await robotsApi.create(robot);
      dispatch(addRobot(newRobot));
      dispatch(setLoading(false));
      return newRobot;
    } catch (error) {
      const message = (error as ApiError)?.message ?? 'Failed to create robot';
      dispatch(setError(message));
      return rejectWithValue(message);
    }
  }
);

export const updateRobotById = createAsyncThunk(
  'robots/updateRobotById',
  async (
    {
      id,
      data,
    }: {
      id: string;
      data: Partial<RobotWritableFields>;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setLoading(true));
      const updated = await robotsApi.patch(id, data);
      dispatch(updateRobot(updated));
      dispatch(setLoading(false));
      return updated;
    } catch (error) {
      const message = (error as ApiError)?.message ?? 'Failed to update robot';
      dispatch(setError(message));
      return rejectWithValue(message);
    }
  }
);

export const replaceRobotById = createAsyncThunk(
  'robots/replaceRobotById',
  async (
    {
      id,
      data,
    }: {
      id: string;
      data: RobotWritableFields;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setLoading(true));
      const updated = await robotsApi.put(id, data);
      dispatch(updateRobot(updated));
      dispatch(setLoading(false));
      return updated;
    } catch (error) {
      const message = (error as ApiError)?.message ?? 'Failed to update robot';
      dispatch(setError(message));
      return rejectWithValue(message);
    }
  }
);

export const deleteRobot = createAsyncThunk(
  'robots/deleteRobot',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      await robotsApi.delete(id);
      dispatch(removeRobot(id));
      dispatch(setLoading(false));
      return id;
    } catch (error) {
      const message = (error as ApiError)?.message ?? 'Failed to delete robot';
      dispatch(setError(message));
      return rejectWithValue(message);
    }
  }
);

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Robot, RobotsState } from '../types/entities.types';

const initialState: RobotsState = {
  items: [],
  selectedId: null,
  loading: false,
  error: null,
};

const robotsSlice = createSlice({
  name: 'robots',
  initialState,
  reducers: {
    setRobots: (state, action: PayloadAction<Robot[]>) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    addRobot: (state, action: PayloadAction<Robot>) => {
      state.items.push(action.payload);
    },
    updateRobot: (state, action: PayloadAction<Robot>) => {
      const index = state.items.findIndex((r) => r._id === action.payload._id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeRobot: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((r) => r._id !== action.payload);
      if (state.selectedId === action.payload) {
        state.selectedId = null;
      }
    },
    selectRobot: (state, action: PayloadAction<string | null>) => {
      state.selectedId = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setRobots,
  addRobot,
  updateRobot,
  removeRobot,
  selectRobot,
  setLoading,
  setError,
} = robotsSlice.actions;

export default robotsSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Obstacle, ObstaclesState } from '../types/entities.types';

const initialState: ObstaclesState = {
  items: [],
  selectedId: null,
  loading: false,
  error: null,
};

const obstaclesSlice = createSlice({
  name: 'obstacles',
  initialState,
  reducers: {
    setObstacles: (state, action: PayloadAction<Obstacle[]>) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    addObstacle: (state, action: PayloadAction<Obstacle>) => {
      state.items.push(action.payload);
    },
    updateObstacle: (state, action: PayloadAction<Obstacle>) => {
      const index = state.items.findIndex((o) => o._id === action.payload._id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeObstacle: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((o) => o._id !== action.payload);
      if (state.selectedId === action.payload) {
        state.selectedId = null;
      }
    },
    selectObstacle: (state, action: PayloadAction<string | null>) => {
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
  setObstacles,
  addObstacle,
  updateObstacle,
  removeObstacle,
  selectObstacle,
  setLoading,
  setError,
} = obstaclesSlice.actions;

export default obstaclesSlice.reducer;

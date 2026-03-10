import { configureStore } from '@reduxjs/toolkit';
import robotsReducer from './features/entities/slices/robotsSlice';
import obstaclesReducer from './features/entities/slices/obstaclesSlice';

export const store = configureStore({
  reducer: {
    robots: robotsReducer,
    obstacles: obstaclesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

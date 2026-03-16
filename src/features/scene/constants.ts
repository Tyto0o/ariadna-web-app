import { colors } from '../../theme/theme';

// Grid configuration
export const GRID_SIZE: number = 10000;
export const GRID_CELL: number = 100;
export const GRID_COLOR_PRIMARY: string = colors.scene.gridPrimary;
export const GRID_COLOR_SECONDARY: string = colors.scene.gridSecondary;

// Camera configuration
export const CAMERA_FOV: number = 60;
export const CAMERA_NEAR_PLANE: number = 1;
export const CAMERA_FAR_PLANE: number = 100000;

export const CAMERA_DEFAULT_POSITION: { x: number; y: number; z: number } = {
  x: 0,
  y: 0,
  z: GRID_SIZE,
};

export const DEFAULT_CAMERA_TARGET: { x: number; y: number; z: number } = {
  x: 0,
  y: 0,
  z: 0,
};

// Scene configuration
export const SCENE_BACKGROUND_COLOR: string = colors.scene.background;

// Renderer configuration
export const RENDERER_ENABLE_ANTIALIAS: boolean = true;

// Controls configuration
export const CONTROLS_ENABLE_DAMPING: boolean = true;
export const CONTROLS_MIN_DISTANCE: number = 1000;
export const CONTROLS_MAX_POLAR_ANGLE: number = Math.PI * 0.45;

// Ground plane configuration
export const GROUND_PLANE_COLOR: string = colors.scene.groundPlane;
export const GROUND_PLANE_OPACITY: number = 0;

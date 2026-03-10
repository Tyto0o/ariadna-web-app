export const API_BASE_URL: string = ''; // Default to empty string for relative paths
export const API_PREFIX: string = '/api';
export const API_TIMEOUT: number = 10000;

export const API_ENDPOINTS = {
  ROBOTS: '/robots',
  OBSTACLES: '/obstacles',
} as const;

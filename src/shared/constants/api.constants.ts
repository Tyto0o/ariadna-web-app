export const API_BASE_URL: string = import.meta.env.VITE_API_URL;
export const API_PREFIX: string = '/api';
export const API_TIMEOUT: number = 10000;

export const API_ENDPOINTS: { ROBOTS: string; OBSTACLES: string } = {
  ROBOTS: `${API_PREFIX}/robots`,
  OBSTACLES: `${API_PREFIX}/obstacles`,
} as const;

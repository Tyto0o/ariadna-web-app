import { apiClient } from '../../../shared/api/client';
import { API_ENDPOINTS } from '../../../shared/constants/api.constants';
import { Obstacle, ObstacleWritableFields } from '../types/entities.types';

export const obstaclesApi = {
  get: async (): Promise<Obstacle[]> => {
    return await apiClient.get<Obstacle[]>(API_ENDPOINTS.OBSTACLES);
  },

  create: async (obstacle: ObstacleWritableFields): Promise<Obstacle> => {
    return await apiClient.post<Obstacle>(API_ENDPOINTS.OBSTACLES, obstacle);
  },

  put: async (
    id: string,
    obstacle: ObstacleWritableFields
  ): Promise<Obstacle> => {
    return await apiClient.put<Obstacle>(
      `${API_ENDPOINTS.OBSTACLES}/${id}`,
      obstacle
    );
  },

  patch: async (
    id: string,
    obstacle: Partial<ObstacleWritableFields>
  ): Promise<Obstacle> => {
    return await apiClient.patch<Obstacle>(
      `${API_ENDPOINTS.OBSTACLES}/${id}`,
      obstacle
    );
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`${API_ENDPOINTS.OBSTACLES}/${id}`);
  },
};

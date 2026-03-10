import { apiClient } from '../../../shared/api/client';
import { API_ENDPOINTS } from '../../../shared/constants/api.constants';
import { Robot, RobotWritableFields } from '../types/entities.types';

export const robotsApi = {
  get: async (): Promise<Robot[]> => {
    return await apiClient.get<Robot[]>(API_ENDPOINTS.ROBOTS);
  },

  create: async (robot: RobotWritableFields): Promise<Robot> => {
    return await apiClient.post<Robot>(API_ENDPOINTS.ROBOTS, robot);
  },

  put: async (id: string, robot: RobotWritableFields): Promise<Robot> => {
    return await apiClient.put<Robot>(`${API_ENDPOINTS.ROBOTS}/${id}`, robot);
  },

  patch: async (
    id: string,
    robot: Partial<RobotWritableFields>
  ): Promise<Robot> => {
    return await apiClient.patch<Robot>(`${API_ENDPOINTS.ROBOTS}/${id}`, robot);
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`${API_ENDPOINTS.ROBOTS}/${id}`);
  },
};

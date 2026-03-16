import { apiClient } from '../../../shared/api/client';
import { API_ENDPOINTS } from '../../../shared/constants/api.constants';
import { RobotPathRequest, RobotPathResponse } from '../types/entities.types';

export const pathApi = {
  generateRobotPath: async (
    payload: RobotPathRequest
  ): Promise<RobotPathResponse> => {
    return await apiClient.post<RobotPathResponse>(API_ENDPOINTS.PATH, payload);
  },
};

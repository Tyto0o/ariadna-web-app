import { apiClient } from '../../../shared/api/client';
import { API_ENDPOINTS } from '../../../shared/constants/api.constants';
import { Position } from '../types/entities.types';

interface SimulationRequest {
  robotId: string;
  path: Position[];
}

export const simulationApi = {
  startSimulation: async (payload: SimulationRequest): Promise<void> => {
    await apiClient.post<void>(API_ENDPOINTS.SIMULATION, payload);
  },
};

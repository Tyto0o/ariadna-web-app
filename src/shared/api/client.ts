import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { API_BASE_URL, API_TIMEOUT } from '../constants/api.constants';
import { ApiError } from './types';

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string = API_BASE_URL, timeout: number = API_TIMEOUT) {
    if (typeof baseURL !== 'string') {
      throw new Error('API base URL is not configured');
    }

    this.axiosInstance = axios.create({
      baseURL,
      timeout,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const methodsWithBody = ['post', 'put', 'patch'];
        if (
          config.method &&
          methodsWithBody.includes(config.method.toLowerCase())
        ) {
          config.headers['Content-Type'] = 'application/json';
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const apiError: ApiError = {
          message: 'An error occurred',
          statusCode: error.response?.status,
          details: error.response?.data,
        };

        if (error.code === 'ECONNABORTED') {
          apiError.message = 'Request timeout';
          apiError.statusCode = 408;
        } else if (error.response) {
          const data = error.response.data as { message?: string };
          apiError.message = data?.message || error.message;
        } else if (error.request) {
          apiError.message = 'No response from server';
        } else {
          apiError.message = error.message;
        }

        return Promise.reject(apiError);
      }
    );
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await this.axiosInstance.get<T>(endpoint);
    return response.data;
  }

  async post<T>(endpoint: string, body: unknown): Promise<T> {
    const response = await this.axiosInstance.post<T>(endpoint, body);
    return response.data;
  }

  async put<T>(endpoint: string, body: unknown): Promise<T> {
    const response = await this.axiosInstance.put<T>(endpoint, body);
    return response.data;
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await this.axiosInstance.delete<T>(endpoint);
    return response.data;
  }

  async patch<T>(endpoint: string, body: unknown): Promise<T> {
    const response = await this.axiosInstance.patch<T>(endpoint, body);
    return response.data;
  }
}

export const apiClient = new ApiClient();

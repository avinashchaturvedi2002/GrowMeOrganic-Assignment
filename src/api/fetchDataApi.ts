import type { ApiResponse } from '../types/data';

export const fetchDataApi = async (baseUrl: string, page: number): Promise<ApiResponse> => {
  const response = await fetch(`${baseUrl}?page=${page}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};
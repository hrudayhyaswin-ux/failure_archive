import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add interceptor for logging
api.interceptors.request.use(request => {
  console.log('Starting Request', request.url)
  return request
})

api.interceptors.response.use(response => {
  console.log('Response:', response)
  return response
}, error => {
  console.error('API Error:', error.response || error.message)
  return Promise.reject(error)
})

export interface Failure {
  id: number;
  title: string;
  category: string;
  description: string;
  industry: string;
  year: number;
  failure_reason: string;
  lesson: string;
  created_at: string;
}

export const getFailures = async (): Promise<Failure[]> => {
  const response = await api.get('/failures/');
  return response.data;
};

export const getFailure = async (id: number): Promise<Failure> => {
  const response = await api.get(`/failures/${id}`);
  return response.data;
};

export const analyzeFailure = async (story: string) => {
  const response = await api.post('/analysis/', { story });
  return response.data;
};

export const submitFailure = async (data: { title: string; description: string }) => {
  const response = await api.post('/submissions/', data);
  return response.data;
};

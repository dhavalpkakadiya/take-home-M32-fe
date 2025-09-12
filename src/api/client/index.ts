import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { BASE_URL, DEFAULT_HEADERS, HttpMethod } from '../constants';

type RequestConfig<TBody = unknown> = AxiosRequestConfig<TBody> & {
  method?: HttpMethod;
};

export const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: DEFAULT_HEADERS,
});

axiosClient.interceptors.request.use(async config => {
  console.log('config', config);
  return config;
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async error => {
    return Promise.reject(error);
  },
);

export async function request<TResponse = unknown, TBody = unknown>(
  url: string,
  config: RequestConfig<TBody> = {},
): Promise<TResponse> {
  const response = await axiosClient.request<
    TResponse,
    AxiosResponse<TResponse>,
    TBody
  >({
    url,
    ...config,
  });
  return response.data;
}

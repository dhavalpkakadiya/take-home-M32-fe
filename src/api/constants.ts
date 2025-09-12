export const BASE_URL = `http://192.168.41.151:3000`;

export const TIMEOUT_MS = 20000;

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

export const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

export type HttpMethod = typeof HTTP_METHOD[keyof typeof HTTP_METHOD];



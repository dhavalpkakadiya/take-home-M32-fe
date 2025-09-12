export const BASE_URL = `https://take-home-m32-be.onrender.com`;

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

export type HttpMethod = (typeof HTTP_METHOD)[keyof typeof HTTP_METHOD];

export type DBResponse<T> = {
  status: 'success' | 'error';
  data?: T | string;
};

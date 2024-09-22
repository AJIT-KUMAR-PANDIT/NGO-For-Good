// src/types/axios.d.ts
import { AxiosResponse as Response } from 'axios';

declare module 'axios' {
  export type AxiosResponse<T = any> = Response<T>;
}

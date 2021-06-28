import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type ApiResponseGenericError = { code: string; message: string };

export type ApiResponseErrorPayloadAction = PayloadAction<{
  error: ApiResponseGenericError;
}>;

const httpClient = axios.create({
  baseURL: "/stubs",
});

httpClient.interceptors.response.use(
  (response) => {
    const { data } = response;

    if (!data) {
      return Promise.reject({
        code: 500,
        message: "Unable to handle",
      });
    }
    return Promise.resolve(response);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function apiGet<T = any>(options: { path: string; config: any }) {
  const { path, config } = options;
  const { data, headers } = await httpClient.get<T>(path, config);

  return Promise.resolve({ data, headers });
}
export async function apiPost<T = any>(options: {
  path: string;
  body: string | Record<string, any>;
  config: any;
}) {
  const { path, body, config } = options;
  const { data, headers } = await httpClient.post<T>(path, body, config);

  return Promise.resolve({ data, headers });
}

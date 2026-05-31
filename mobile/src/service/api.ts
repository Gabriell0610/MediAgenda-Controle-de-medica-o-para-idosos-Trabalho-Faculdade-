import axios from "axios";
import { BASE_URL } from "../utils/const";
import { getToken } from "../storage/auth-storage";

interface InterfaceRequest {
  method: string;
  body: string;
}

export const fetchApi = axios.create({
  baseURL: BASE_URL,
});

fetchApi.interceptors.request.use(async (config) => {
  const token = await getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const useFetchApi = () => {
  try {
  } catch (error) {}
};

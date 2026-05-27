import axios from "axios";
import { BASE_URL } from "../utils/const";

interface InterfaceRequest {
  method: string;
  body: string;
}

export const fetchApi = axios.create({
  baseURL: BASE_URL,
});

export const useFetchApi = () => {
  try {
  } catch (error) {}
};

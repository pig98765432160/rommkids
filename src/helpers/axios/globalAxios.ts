import { BASE_URL } from "@/shared/constants";
import { EStatus } from "@/shared/types/Status";
import axios from "axios";

const baseURL = `/api/`;

export const axiosBase = axios.create({
  baseURL,
});

export const axiosAuthBase = axios.create({
  baseURL,
});

export const axiosGet = (url: string, params?: any) => {
  return axiosBase
    .get(url, {
      params,
    })
    .then((res) => {
      if (res?.status === 204) {
        return {
          status: EStatus.SUCCESS,
        };
      }
      return res?.data;
    })
    .catch((error) => {
      return {
        code: error?.response?.status,
        status: error?.response?.data?.status,
        data: error?.response?.data?.message,
      };
    });
};

export const axiosPost = (url: string, payload: any) => {
  return axiosBase
    .post(url, payload)
    .then((res) => {
      return res?.data;
    })
    .catch((error) => {
      return {
        code: error?.response?.status,
        status: error?.response?.data?.status,
        data: error?.response?.data?.message,
      };
    });
};

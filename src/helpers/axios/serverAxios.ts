import { EStatus } from "@/shared/types/Status";
import { axiosBase } from "./globalAxios";

export const serverAuthGet = async (
  token: string,
  url: string,
  params?: any
) => {
  return axiosBase
    .get(url, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res?.status === 204) {
        return {
          status: EStatus.SUCCESS,
        };
      }
      return res?.data;
    })
    .catch(async (error) => {
      return {
        code: error?.response?.status,
        status: error?.response?.data?.status,
        data: error?.response?.data?.message,
      };
    });
};

export const serverAuthPost = async (
  token: string,
  url: string,
  payload: any
) => {
  return axiosBase
    .post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res?.status === 204) {
        return {
          status: EStatus.SUCCESS,
        };
      }
      return res?.data;
    })
    .catch(async (error) => {
      return {
        code: error?.response?.status,
        status: error?.response?.data?.status,
        data: error?.response?.data?.message,
      };
    });
};

export const serverAuthPut = (token: string, url: string, payload: any) => {
  return axiosBase
    .put(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res?.status === 204) {
        return {
          status: EStatus.SUCCESS,
        };
      }
      return res?.data;
    })
    .catch(async (error) => {
      return {
        code: error?.response?.status,
        status: error?.response?.data?.status,
        data: error?.response?.data?.message,
      };
    });
};

export const serverAuthPatch = (
  token: string,
  url: string,
  payload: any = null
) => {
  return axiosBase
    .patch(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res?.status === 204) {
        return {
          status: EStatus.SUCCESS,
        };
      }
      return res?.data;
    })
    .catch(async (error) => {
      return {
        code: error?.response?.status,
        status: error?.response?.data?.status,
        data: error?.response?.data?.message,
      };
    });
};

export const serverAuthDelete = (token: string, url: string) => {
  return axiosBase
    .delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res?.status === 204) {
        return {
          status: EStatus.SUCCESS,
        };
      }
      return res?.data;
    })
    .catch(async (error) => {
      return {
        code: error?.response?.status,
        status: error?.response?.data?.status,
        data: error?.response?.data?.message,
      };
    });
};

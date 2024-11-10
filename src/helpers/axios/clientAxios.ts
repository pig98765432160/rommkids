import { EStatus } from "@/shared/types/Status";
import store from "@/store";
import { axiosAuthBase } from "./globalAxios";

export const clientAuthGet = async (url: string, params?: any) => {
  return axiosAuthBase
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
    .catch(async (error) => {
      return {
        code: error?.response?.status,
        status: error?.response?.data?.status,
        data: error?.response?.data?.message,
      };
    });
};

export const clientAuthPost = async (url: string, payload?: any) => {
  return axiosAuthBase
    .post(url, payload)
    .then((res) => {
      if (res?.status === 204) {
        return {
          status: EStatus.SUCCESS,
        };
      }
      return res?.data;
    })
    .catch(async (error) => {
      switch (error?.response?.status) {
        case 400:
        case 404:
          errorAlert(error?.response?.data?.message);
          break;
      }
      return {
        code: error?.response?.status,
        status: error?.response?.data?.status,
        data: error?.response?.data?.message,
      };
    });
};

export const clientAuthPut = (url: string, payload: any) => {
  return axiosAuthBase
    .put(url, payload)
    .then((res) => {
      if (res?.status === 204) {
        return {
          status: EStatus.SUCCESS,
        };
      }
      return res?.data;
    })
    .catch(async (error) => {
      switch (error?.response?.status) {
        case 400:
        case 404:
          errorAlert(error?.response?.data?.message);
          break;
      }
      return {
        code: error?.response?.status,
        status: error?.response?.data?.status,
        data: error?.response?.data?.message,
      };
    });
};

export const clientAuthPatch = (url: string, payload: any = null) => {
  return axiosAuthBase
    .patch(url, payload)
    .then((res) => {
      if (res?.status === 204) {
        return {
          status: EStatus.SUCCESS,
        };
      }
      return res?.data;
    })
    .catch(async (error) => {
      if (error?.response?.status == 404) {
        errorAlert(error?.response?.data?.message);
      }
      return {
        code: error?.response?.status,
        status: error?.response?.data?.status,
        data: error?.response?.data?.message,
      };
    });
};

export const clientAuthDelete = (url: string) => {
  return axiosAuthBase
    .delete(url)
    .then((res) => {
      if (res?.status === 204) {
        return {
          status: EStatus.SUCCESS,
        };
      }
      return res?.data;
    })
    .catch(async (error) => {
      if (error?.response?.status == 404) {
        errorAlert(error?.response?.data?.message);
      }
      return {
        code: error?.response?.status,
        status: error?.response?.data?.status,
        data: error?.response?.data?.message,
      };
    });
};

const alertHandler = (
  status: EStatus,
  text: string,
  link?: string,
  closeBtn?: boolean,
  routerLink?: any
) => {
  store.dispatch({
    type: "alert/update",
    payload: {
      status,
      open: true,
      text,
      link,
      closeBtn: closeBtn || false,
      routerLink,
    },
  });
};

export const successAlert = (
  text: string,
  link?: string,
  closeBtn?: boolean,
  routerLink?: any
) => {
  alertHandler(EStatus.SUCCESS, text, link, closeBtn, routerLink);
};

export const errorAlert = (text: string, link?: string) => {
  alertHandler(EStatus.ERROR, text, link);
};

export const warningAlert = (text: string) => {
  alertHandler(EStatus.WARNING, text);
};

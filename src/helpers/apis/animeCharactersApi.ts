import {
  clientAuthDelete,
  clientAuthGet,
  clientAuthPost,
  clientAuthPut,
  axiosGet,
  axiosPost,
} from "../baseAxios";

// 取得角色資訊
export const fetchCharacter = (params: any) => {
  return axiosGet("character", params);
};

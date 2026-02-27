import {
  clientAuthDelete,
  clientAuthGet,
  clientAuthPost,
  clientAuthPut,
  axiosGet,
  axiosPost,
} from "../baseAxios";

// 取得角色資訊
export const fetchCharacter = (birthday: string) => {
  return axiosGet("character", { birthday });
};

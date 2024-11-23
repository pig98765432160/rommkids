import {
  clientAuthDelete,
  clientAuthGet,
  clientAuthPost,
  clientAuthPut,
  axiosGet,
  axiosPost,
} from "../baseAxios";

// 取得貼文列表
export const fetchFeed = (c_type?: string) => {
  return axiosGet("feeds", { c_type });
};

// 新增貼文
export const addNewFeed = (newPost: any) => {
  return axiosPost("feeds", { newPost });
};

// 取得貼文詳細資料
export const getFeedDetail = (fid: number) => {
  return axiosGet("feeds", { fid });
};

// 更新貼文
export const updateFeed = (updatePost: any, fid: string) => {
  return clientAuthPut(`feed/${fid}`, updatePost);
};

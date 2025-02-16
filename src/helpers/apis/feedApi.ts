import {
  clientAuthDelete,
  clientAuthGet,
  clientAuthPost,
  clientAuthPut,
  axiosGet,
  axiosPost,
} from "../baseAxios";

// 取得貼文列表
export const fetchFeed = (params: any) => {
  return axiosGet("feeds", params);
};

// 新增貼文
export const addNewFeed = (newPost: any) => {
  return axiosPost("feeds", { newPost });
};

// 取得貼文詳細資料
export const getFeedDetail = (fid: string) => {
  return axiosGet(`feeds/${fid}`);
};

// 更新貼文
export const updateFeed = (updatePost: any, fid: string) => {
  return clientAuthPut(`feed/${fid}`, updatePost);
};

// 取得所有文章的 ID
export const getAllFeedIds = () => {
  return axiosGet("getAllFeedIds");
};

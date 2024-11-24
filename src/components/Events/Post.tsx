import { postSchema } from "@/shared/zod-schema/post";
import { CircularProgress, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  FC,
  useCallback,
  useMemo,
  useReducer,
  useState,
} from "react";
import { EStatus } from "@/shared/types/Status";
import { errorAlert, successAlert } from "@/helpers/baseAxios";
import FroalaEditor from "./FroalaEditor";
import { addNewFeed } from "@/helpers/apis/feedApi";
import SelectType from "./SelectType";

interface Props {
  initialState: any;
  feedId?: string;
}

export enum ActionType {
  SET_TITLE = "SET_TITLE",
  SET_CONTENT = "SET_CONTENT",
  SET_AUTHOR = "SET_AUTHOR",
  SET_TYPE = "SET_TYPE",
}

export interface Action {
  type: ActionType;
  payload: any;
}

const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case ActionType.SET_TITLE:
      return { ...state, title: action.payload.title };
    case ActionType.SET_CONTENT:
      return { ...state, content: action.payload.content };
    case ActionType.SET_AUTHOR:
      return { ...state, author: action.payload.author };
    case ActionType.SET_TYPE:
      return { ...state, c_type: action.payload.c_type };
    default:
      return state;
  }
};

const Post: FC<Props> = (props) => {
  const { feedId, initialState } = props;
  const [state, postDispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const [btnIsLoading, setBtnIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [editorLoading, setEditorLoading] = useState(false);

  const validation = useCallback(() => {
    const post = {
      title: state?.title,
      content: state?.content,
      author: state?.author,
      c_type: state?.c_type,
    };
    try {
      postSchema
        .pick({
          title: true,
          content: true,
          author: true,
          c_type: true,
        })
        .parse(post);
      return true;
    } catch (error) {
      return false;
    }
  }, [state]);

  const isValidate = useMemo(() => validation(), [validation]);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updatePost();
  };

  const updatePost = async () => {
    setIsEdit(false);
    setBtnIsLoading(true);

    if (!isValidate) {
      setIsEdit(true);
      if (!state.title) {
        alert("沒有輸入標題");
      } else if (!state.content) {
        alert("沒有輸入內容");
      } else if (!state.author) {
        alert("沒有輸入作者名字");
      } else if (!state.c_type) {
        alert("沒有選擇分類");
      }
    } else {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = state.content;
      const plainText = tempDiv.textContent || tempDiv.innerText || "";
      const previewText = plainText.slice(0, 30);

      let post = {
        title: state.title,
        content: state.content,
        author: state.author,
        desc: previewText,
        c_type: state.c_type,
      };
      setIsEdit(false);
      if (feedId) {
        // const res = await updateFeed(post, feedId);
        // if (res.status === EStatus.SUCCESS) {
        //   setIsFinish(true);
        //   setBtnIsLoading(false);
        //   successAlert("更新文章成功！");
        //   router.push(
        //     `/${res.data.gameType}/article/${res.data.fid}`,
        //     `/${res.data.gameType}/article-${res.data.fid}`,
        //     { shallow: true }
        //   );
        // } else if (res.code != 403) {
        //   errorAlert("更新文章失敗！");
        //   setIsEdit(true);
        //   setBtnIsLoading(false);
        // }
      } else {
        const res = await addNewFeed(post);
        if (res.status === EStatus.SUCCESS) {
          console.log(res);
          setIsFinish(true);

          successAlert("新增文章成功！");
          router.push(`/article/${res.data.fid}`);
        } else if (res.code != 403) {
          errorAlert("新增文章失敗！");
        }
      }
    }
    setBtnIsLoading(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full lg:max-w-[800px] flex flex-col items-center bg-white px-5 lg:mb-24 lg:px-8 py-2 lg:py-5 my-12 rounded"
      >
        <p className="text-base md:text-2xl font-bold text-gray-900 mt-2 lg:mt-5">
          {!feedId ? "發表文章" : "編輯文章"}
        </p>
        <span className="w-full flex items-center gap-2">
          <p className="shrink-0">標題：</p>
          <TextField
            slotProps={{
              htmlInput: {
                maxLength: 100,
              },
            }}
            sx={{
              flex: 1,
              marginY: "12px",
              "@media (min-width: 375px)": {
                marginY: "8px",
              },
              "& input": {
                padding: "0.875rem",
                fontSize: "0.875rem",
                borderRadius: "0 0 4px 4px",
                "@media (min-width: 375px)": {
                  padding: "0.7rem",
                },
              },
            }}
            placeholder="標題 Title"
            defaultValue={state?.title}
            onChange={(e) => {
              if (e.target.value.length !== 0) {
                setIsEdit(true);
              } else if (e.target.value.length > 100) {
                errorAlert("標題不能超過100字");
              } else {
                setIsEdit(false);
              }
              postDispatch({
                type: ActionType.SET_TITLE,
                payload: { title: e.target.value },
              });
            }}
          />
        </span>
        <span className="w-full flex items-center gap-2">
          <p className="shrink-0">作者：</p>
          <TextField
            slotProps={{
              htmlInput: {
                maxLength: 100,
              },
            }}
            sx={{
              flex: 1,
              marginY: "12px",
              "@media (min-width: 375px)": {
                marginY: "8px",
              },
              "& input": {
                padding: "0.875rem",
                fontSize: "0.875rem",
                borderRadius: "0 0 4px 4px",
                "@media (min-width: 375px)": {
                  padding: "0.7rem",
                },
              },
            }}
            placeholder="你的名字"
            defaultValue={state?.author}
            onChange={(e) => {
              if (e.target.value.length !== 0) {
                setIsEdit(true);
              } else if (e.target.value.length > 100) {
                errorAlert("名字不能超過100字");
              } else {
                setIsEdit(false);
              }
              postDispatch({
                type: ActionType.SET_AUTHOR,
                payload: { author: e.target.value },
              });
            }}
          />
        </span>

        <FroalaEditor
          dispatch={postDispatch}
          content={state?.content}
          setIsEdit={setIsEdit}
          setEditorLoading={setEditorLoading}
        />
        <SelectType dispatch={postDispatch} c_type={state?.c_type} />
        <button
          type="submit"
          className={`${
            editorLoading ? "bg-gray-400" : "bg-primary hover:bg-primary-hover"
          } hidden md:block w-full text-white rounded py-3 my-5`}
          // disabled={btnIsLoading || editorLoading}
        >
          {btnIsLoading ? (
            <div className="w-full flex justify-center items-center">
              <CircularProgress size={20} sx={{ color: "#FFFFFF" }} />
            </div>
          ) : (
            "送出"
          )}
        </button>
      </form>
    </>
  );
};

export default Post;

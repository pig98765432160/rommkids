import Post from "@/components/Events/Post";
import { PageMetadata } from "@/components/PageMetadata";
import { BASE_URL } from "@/shared/constants";
import { EStatus, NewPost } from "@/shared/types";
import { GetServerSideProps } from "next";
import React, { FC, useEffect, useState } from "react";

interface ModifiedContent {
  title: string;
  content: string;
}

interface Props {
  content_id: string;
  modifiedContent: ModifiedContent;
}

const NewPostPage: FC<Props> = (props) => {
  const { content_id, modifiedContent } = props;
  const [initialState, setInitialState] =
    useState<Partial<NewPost>>(modifiedContent);

  useEffect(() => {
    if (modifiedContent && modifiedContent.content) {
      setInitialState({
        title: modifiedContent.title,
        content: modifiedContent.content,
      });
    }
  }, [modifiedContent]);

  return (
    <>
      <PageMetadata
        title="遊戲大亂鬥 - 直播Twitch實況影片・電競・新聞・社群"
        description="遊戲大亂鬥是目前台灣最新最紅的遊戲實況影片的社群網站，網友討論度最熱門的 Twitch 遊戲實況直播、遊戲影片、電競遊戲新聞以及各類遊戲閒聊。"
        ogImage={`${BASE_URL}/img/brand.jpg`}
        ogType="website"
      />
      <article className="w-full flex items-center justify-center bg-cute-beige mt-8 lg:mt-[130px]">
        <Post initialState={initialState} />
      </article>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
  res,
}) => {
  const content_id = query.content_id as string;

  let modifiedContent = {
    title: "",
    content: "",
  };

  if (isNaN(Number(content_id))) {
    return {
      props: {},
    };
  }
  return {
    props: {
      content_id: content_id,
      modifiedContent: modifiedContent,
    },
  };
};

export default NewPostPage;

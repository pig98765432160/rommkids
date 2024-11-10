import Head from "next/head";
import { FC } from "react";

interface Props {
  title: string;
  description?: string;
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
}

export const PageMetadata: FC<Props> = (props) => {
  const { title, description, ogImage, ogType, ogUrl } = props;
  return (
    <Head>
      <title>{title ?? "嗄歐麥麥"}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=yes, viewport-fit=cover, maximum-scale=1.0"
      />
      <meta
        name="keywords"
        content="Twitch,直播,實況,統神,英雄聯盟,League of Legends,LOL,GTA,暴雪英霸,爐石戰記,手遊,手機遊戲,電競"
      />
      <meta
        name="description"
        content={
          description ??
          "遊戲大亂鬥是目前台灣最新最紅的遊戲實況影片的社群網站，網友討論度最熱門的 Twitch 遊戲實況直播、遊戲影片、電競遊戲新聞以及各類遊戲閒聊。"
        }
      />
      <meta property="og:locale" content="zh_TW" />
      <meta property="og:title" content={title ?? "嗄歐麥麥"} />
      <meta property="og:type" content={ogType} />
      <meta
        property="og:description"
        content={
          description ??
          "遊戲大亂鬥是目前台灣最新最紅的遊戲實況影片的社群網站，網友討論度最熱門的 Twitch 遊戲實況直播、遊戲影片、電競遊戲新聞以及各類遊戲閒聊。"
        }
      />
      <meta
        name="image"
        content={ogImage ?? "https://www.league-funny.com/img/brand.jpg"}
      />
      <meta
        property="og:image"
        content={ogImage ?? "https://www.league-funny.com/img/brand.jpg"}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="628" />
      <meta property="og:site_name" content="遊戲大亂鬥" />
      <meta property="og:locale" content="zh_TW" />
      <meta property="og:url" content={ogUrl} />
      <meta
        property="article:author"
        content="https://www.facebook.com/GameSmash/"
      />
    </Head>
  );
};

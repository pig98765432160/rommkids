import { FC, useEffect, useState } from "react";
import article01 from "../../../public/documemt/article1.json";
import Image from "next/image";
import Link from "next/link";

interface Props {
  feed: any;
}

const FeedItem: FC<Props> = (props) => {
  const feed = {
    f_cover: "/assets/image/article/cover_1.png",
    f_desc: "討論話題：用避雷針來發電，可能嗎？",
    content:
      "前幾天一直在下雷雨，我忍不住跟嗄歐討論了一個有趣的問題：為什麼不能用避雷針來發電呢？",
    author: "歐麥麥",
  };
  return (
    <Link
      href="/article/1"
      className="relative w-full flex items-center gap-4 p-4 image-box border-b border-gray-300"
    >
      {feed.f_cover && (
        <div className="flex-shrink-0 w-[300px] h-[180px] overflow-hidden">
          <Image
            loader={({ src }) => src}
            width={172}
            height={99}
            src={feed.f_cover}
            alt="thumbnail"
            className="bg-black w-[300px] h-[180px] object-cover hoverimg"
            priority={true}
            placeholder="blur"
            blurDataURL={"/feed/slider_img_nophoto.jpg"}
            unoptimized={true}
          />
        </div>
      )}
      <div className="h-full flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-black text-brown break-all line-clamp-2">
            {feed.f_desc}
          </h2>
          <p className="text-gray-900 text-sm mb-5 break-all line-clamp-2">
            {feed.content}
          </p>
        </div>
        <p className="text-xs text-gray-500">作者：{feed.author}</p>
      </div>
    </Link>
  );
};

export default FeedItem;

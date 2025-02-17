import { FC, forwardRef, Ref, useEffect, useState } from "react";
import Link from "next/link";
import { ImageWithFallback } from "@/components/Common";
import { FeedDetail } from "@/shared/types/Feed";
import { SunIcon } from "../Icons/headerIcons";

interface Props {
  ref?: Ref<HTMLDivElement>;
  feed: FeedDetail;
}

type BoardType = "knowledge" | "learning" | "funny" | "life";

const BoardLabel = {
  knowledge: "知識・科普",
  learning: "語言學習",
  funny: "休閒娛樂",
  life: "生活・日常",
};

const FeedItem: FC<Props> = forwardRef((props: Props, ref) => {
  const { feed } = props;

  return (
    <li className="flex flex-col gap-3 w-full">
      <Link
        href={`/article/${feed.fid}`}
        className="flex flex-col items-center gap-2 image-box group"
      >
        <div className="aspect-square rounded-lg overflow-hidden border border-gray-500">
          <ImageWithFallback
            src={feed.cover as string}
            alt="thumbnail"
            width={262}
            height={262}
            className="bg-black w-[262px] h-[262px] object-cover hoverimg"
            isBlur={true}
            fallbackSrc="/assets/image/common/slider_img_nophoto.jpg"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-fit flex items-center gap-1 text-sm bg-white px-1 py-0.5 rounded">
            <SunIcon width={16} height={16} className="" />
            <span>{BoardLabel[feed.board as BoardType]}</span>
          </div>
          <h2 className="text-xl text-justify font-black break-all line-clamp-2 group-hover:underline">
            {feed.title}
          </h2>
        </div>
      </Link>
      <div className="w-full py-1 border-y border-dashed border-gray-500">
        {feed.tags.map((tag, index) => (
          <span key={index} className="text-xs text-gray-600 bg-gray-200 mr-3">
            {`#${tag}`}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs">作者：{feed.author}</p>
        <p className="text-xs">
          {new Date(feed.createAt * 1000).toLocaleDateString()}
        </p>
      </div>
    </li>
  );
});

FeedItem.displayName = "FeedItem";

export default FeedItem;

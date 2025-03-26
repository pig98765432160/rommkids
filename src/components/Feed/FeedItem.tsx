import { FC, forwardRef, Ref, useEffect, useState } from "react";
import Link from "next/link";
import { ImageWithFallback } from "@/components/Common";
import { FeedDetail } from "@/shared/types/Feed";
import { EBoardType, EBoardTypeLabel } from "@/shared/types/Board";

interface Props {
  ref?: Ref<HTMLDivElement>;
  feed: FeedDetail;
}

const FeedItem: FC<Props> = forwardRef((props: Props, ref) => {
  const { feed } = props;

  const type = Object.entries(EBoardTypeLabel).map(([key, value], index) => ({
    id: index + 1,
    label: value,
    type: key as EBoardType,
  }));

  return (
    <li className="flex flex-col gap-3 w-full">
      <Link
        href={`/article/${feed.fid}`}
        className="flex flex-col items-center gap-2 image-box group"
      >
        <div className="rounded-lg overflow-hidden border border-gray-500 aspect-[307/202]">
          <ImageWithFallback
            src={feed.cover as string}
            alt="thumbnail"
            width={307}
            height={202}
            className="w-full h-full object-cover hoverimg"
            isBlur={true}
            fallbackSrc="/assets/image/common/slider_img_nophoto.jpg"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-fit flex items-center gap-1 text-sm bg-white px-1 py-0.5 rounded">
            {/* <SunIcon width={16} height={16} className="" /> */}
            {/* <span>{BoardLabel[feed.board as BoardType]}</span> */}
            {/* <span>{EBoardTypeLabel[type[feed.board]]}</span> */}
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

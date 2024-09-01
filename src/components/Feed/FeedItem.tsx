import { FC, forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  ref?: any;
  feed: any;
}

const FeedItem: FC<Props> = forwardRef((props: Props, ref) => {
  const { feed } = props;
  return (
    <Link
      href={`/article/${feed.fid}`}
      className="relative w-full flex items-center gap-4 p-4 image-box border-b border-gray-300"
    >
      {feed.cover && (
        <div className="flex-shrink-0 w-[300px] h-[180px] overflow-hidden">
          <Image
            loader={({ src }) => src}
            width={172}
            height={99}
            src={feed.cover}
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
            {feed.title}
          </h2>
          <p className="text-gray-900 text-sm mb-5 break-all line-clamp-2">
            {feed.desc}
          </p>
        </div>
        <p className="text-xs text-gray-500">作者：{feed.author}</p>
      </div>
    </Link>
  );
});

FeedItem.displayName = "FeedItem";

export default FeedItem;

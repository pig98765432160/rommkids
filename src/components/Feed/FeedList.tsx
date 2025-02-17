import { FeedItem } from "@/components/Feed";
import { FC, Fragment, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import { FeedItemLoading } from "@/components/Loading";

interface Props {
  feed: any;
  isFetching: boolean | undefined;
  isError: boolean | undefined;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
}

const FeedList: FC<Props> = (props) => {
  const { feed, isFetching, isError, hasNextPage, fetchNextPage } = props;
  const router = useRouter();

  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching, hasNextPage, fetchNextPage]
  );

  return (
    <div className="w-full my-5">
      {feed ? (
        <>
          {feed?.pages.map((page: any, pageIndex: number) =>
            page.map((item: any, index: number) => {
              if (page.length === index + 1) {
                return (
                  <ol
                    key={index}
                    className="grid grid-cols-3 gap-x-12 gap-y-12"
                  >
                    <FeedItem ref={lastItemElementRef} feed={item} />
                  </ol>
                );
              } else {
                return (
                  <ol
                    key={index}
                    className="grid grid-cols-3 gap-x-12 gap-y-12.5"
                  >
                    <FeedItem feed={item} />
                  </ol>
                );
              }
            })
          )}
          {isFetching && !isError && <FeedItemLoading />}
          {isError && <p className="text-hot text-center mt-5">請重新整理</p>}
        </>
      ) : (
        <ol className="grid grid-cols-3 gap-x-12 gap-y-12">
          {Array.from({ length: 9 }).map((_, index) => (
            <FeedItemLoading key={index} />
          ))}
        </ol>
      )}
    </div>
  );
};

export default FeedList;

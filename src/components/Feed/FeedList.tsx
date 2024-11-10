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
    [isFetching, hasNextPage]
  );

  return (
    <>
      {feed ? (
        <>
          {feed?.pages.map((page: any, pageIndex: number) =>
            page.map((item: any, index: number) => {
              if (page.length === index + 1) {
                return (
                  <Fragment key={index}>
                    <FeedItem ref={lastItemElementRef} feed={item} />
                  </Fragment>
                );
              } else {
                return (
                  <Fragment key={index}>
                    <FeedItem feed={item} />
                  </Fragment>
                );
              }
            })
          )}
          {isFetching && !isError && <FeedItemLoading />}
          {isError && <p className="text-hot text-center mt-5">請重新整理</p>}
        </>
      ) : (
        Array.from({ length: 10 }).map((_, index) => (
          <FeedItemLoading key={index} />
        ))
      )}
    </>
  );
};

export default FeedList;

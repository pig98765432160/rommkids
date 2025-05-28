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
    <>
      {feed.pages.map((page: any, pageIndex: number) =>
        page.map((item: any, index: number) => {
          if (page.length === index + 1) {
            return (
              <ol key={index}>
                <FeedItem ref={lastItemElementRef} feed={item} />
              </ol>
            );
          } else {
            return (
              <ol key={index}>
                <FeedItem feed={item} />
              </ol>
            );
          }
        })
      )}
    </>
  );
};

export default FeedList;

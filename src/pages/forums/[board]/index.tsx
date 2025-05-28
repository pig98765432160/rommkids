import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { PageMetadata } from "@/components/PageMetadata";
import { BASE_URL } from "@/shared/constants";
import { FeedList } from "@/components/Feed";
import { fetchFeed, getFeedDetail } from "@/helpers/apis/feedApi";
import { useInfiniteQuery } from "react-query";
import { EStatus } from "@/shared/types";
import { useState } from "react";
import { FeedItemLoading } from "@/components/Loading";

const KnowledgePage: NextPage = () => {
  const router = useRouter();
  const [isFetchError, setIsFetchError] = useState(false);

  const {
    data: feed,
    status: fetchFeedStatus,
    isFetching,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ["fetchFeed", router.query?.board],
    ({ pageParam = 1 }) =>
      fetchFeed({
        board: router.query?.board as string,
        page: pageParam,
      }).then((res) => {
        if (res.status === EStatus.SUCCESS) {
          setIsFetchError(false);
          return res.data;
        } else {
          setIsFetchError(true);
          throw new Error(res.data);
        }
      }),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length >= 20 ? allPages.length + 1 : undefined;
      },
      keepPreviousData: true,
      staleTime: 5 * 1000,
      retry: false,
      onError: () => {
        setIsFetchError(true);
      },
      onSuccess: () => {
        setIsFetchError(false);
      },
    }
  );

  return (
    <>
      <PageMetadata
        title={"嗄歐麥麥"}
        description={""}
        ogImage={""}
        ogType="article"
        ogUrl={`${BASE_URL}${router.asPath}`}
      />
      <div className="w-full my-5">
        {isFetchError ? (
          <p className="text-hot text-center mt-5 w-full">請重新整理</p>
        ) : fetchFeedStatus === EStatus.SUCCESS ? (
          <div className="grid grid-cols-3 gap-x-12 gap-y-12">
            <FeedList
              feed={feed}
              isFetching={isFetching}
              isError={isError}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
            />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-x-12 gap-y-12">
            {Array.from({ length: 9 }).map((_, index) => (
              <FeedItemLoading key={index} />
            ))}
          </div>
        )}
        {fetchFeedStatus === EStatus.SUCCESS && feed.pages[0].length === 0 && (
          <p className="text-gray-900 text-center mt-5 w-full">
            目前沒有文章哦~
          </p>
        )}
      </div>
    </>
  );
};

export default KnowledgePage;

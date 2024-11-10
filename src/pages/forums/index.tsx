import { NextPage } from "next";
import { useRouter } from "next/router";
import { PageMetadata } from "@/components/PageMetadata";
import { BASE_URL } from "@/shared/constants";
import { FeedList } from "@/components/Feed";
import { fetchFeed, getFeedDetail } from "@/helpers/apis/feedApi";
import { useInfiniteQuery } from "react-query";
import { EStatus } from "@/shared/types";
import { useState } from "react";

interface FeedProps {
  feed: any;
}

const ForumsPage: NextPage<FeedProps> = (props) => {
  const { feed } = props;
  const router = useRouter();
  const [isFetchError, setIsFetchError] = useState(false);

  const { data, isFetching, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      ["fetchFeed"],
      ({ pageParam = 1 }) =>
        fetchFeed().then((res) => {
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
        staleTime: Infinity,
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
      {isFetchError ? (
        <p className="text-hot text-center mt-5 w-full lg:w-[728px]">
          請重新整理
        </p>
      ) : (
        <FeedList
          feed={data}
          isFetching={isFetching}
          isError={isError}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
    </>
  );
};

export default ForumsPage;

export async function getServerSideProps() {
  const feeds = await fetchFeed();

  return {
    props: {
      feed: feeds.data,
    },
  };
}

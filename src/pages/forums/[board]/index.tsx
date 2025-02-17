import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { PageMetadata } from "@/components/PageMetadata";
import { BASE_URL } from "@/shared/constants";
import { FeedList } from "@/components/Feed";
import { fetchFeed, getFeedDetail } from "@/helpers/apis/feedApi";
import { useInfiniteQuery } from "react-query";
import { EStatus } from "@/shared/types";
import { useState } from "react";
import {
  CrownIcon,
  FlowerIcon,
  ShootingStarIcon,
  SunIcon,
} from "@/components/Icons/headerIcons";

const KnowledgePage: NextPage = () => {
  const router = useRouter();
  const [isFetchError, setIsFetchError] = useState(false);

  const { data, isFetching, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
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
      }
    );

  const Title = () => {
    switch (router.query?.board) {
      case "knowledge":
        return (
          <h1 className="flex items-center gap-1 text-2xl font-black">
            <SunIcon width={32} height={32} className="" />
            知識・科普
          </h1>
        );
      case "learning":
        return (
          <h1 className="flex items-center gap-1 text-2xl font-black">
            <FlowerIcon width={32} height={32} className="" />
            語言學習
          </h1>
        );
      case "funny":
        return (
          <h1 className="flex items-center gap-1 text-2xl font-black">
            <CrownIcon width={32} height={32} className="" />
            休閒娛樂
          </h1>
        );
      case "life":
        return (
          <h1 className="flex items-center gap-1 text-2xl font-black">
            <ShootingStarIcon width={32} height={32} className="" />
            生活・日常
          </h1>
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <PageMetadata
        title={"嗄歐麥麥"}
        description={""}
        ogImage={""}
        ogType="article"
        ogUrl={`${BASE_URL}${router.asPath}`}
      />
      <div className="flex items-center gap-2 border-b border-dashed border-gray-900 py-4">
        <Title />
      </div>
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

export default KnowledgePage;

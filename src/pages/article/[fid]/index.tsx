import { useEffect, useState } from "react";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { Role_MM, Role_RO } from "@/components/Icons/character";
import { renderToStaticMarkup } from "react-dom/server";
import { getAllFeedIds, getFeedDetail } from "@/helpers/apis/feedApi";
import dayjs from "dayjs";
import { FeedDetail } from "@/shared/types/Feed";
import { ImageWithFallback } from "@/components/Common";
import styles from "@/styles/feedDetail.module.scss";

interface Props {
  feedDetail: FeedDetail;
}

const ArticlePage: NextPage<Props> = (props) => {
  const { feedDetail } = props;

  console.log(feedDetail);

  const svg_ro = renderToStaticMarkup(
    <span style={{ display: "inline-flex", verticalAlign: "middle" }}>
      <Role_RO width={25} height={25} className="" />：
    </span>
  );

  const svg_mm = renderToStaticMarkup(
    <span style={{ display: "inline-flex", verticalAlign: "middle" }}>
      <Role_MM width={25} height={25} className="" />：
    </span>
  );

  let replaced = feedDetail.content.replace(/A:/g, svg_mm);
  replaced = replaced.replace(/B:/g, svg_ro);

  return (
    <div
      className={`${styles.feedDetail} w-full flex flex-col bg-white rounded px-20 py-8`}
    >
      <div className="flex flex-col justify-start gap-2 border-b border-dashed border-gray-900 pb-5">
        <h1 className="text-3xl font-black text-gray-900">
          {feedDetail.title}
        </h1>
        <div className="w-full py-1">
          {feedDetail.tags.map((tag, index) => (
            <span key={index} className="detail-tag">
              {`#${tag}`}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 my-5">
        <div className="shrink-0 border border-gray-400 rounded-full p-1 bg-white">
          <Role_MM width={40} height={40} className="" />
        </div>
        <span className="flex flex-col">
          <p className="text-lg font-black">{feedDetail.author}</p>
          <p className="text-xs text-gray-500">
            {dayjs(feedDetail.createAt * 1000).format("YYYY/MM/DD HH:MM")}
          </p>
        </span>
      </div>
      <div className="w-full aspect-[2560/1536]">
        <ImageWithFallback
          src={`/assets/image/article/cover_${feedDetail.fid}.png`}
          alt="article_cover"
          width={2560}
          height={1536}
          className="w-full h-full"
          isBlur={true}
          fallbackSrc="/assets/image/common/slider_img_nophoto.jpg"
          priority={false}
          loading="lazy"
        />
      </div>
      <div className="article" dangerouslySetInnerHTML={{ __html: replaced }} />
    </div>
  );
};

export default ArticlePage;

export const getStaticProps: GetStaticProps | any = async ({
  params,
}: GetStaticPropsContext) => {
  const { fid } = params!;
  if (!fid || isNaN(Number(fid))) {
    return { notFound: true };
  }
  const feedDetail = await getFeedDetail(fid as string);
  return {
    props: {
      feedDetail: feedDetail.data,
    },
    revalidate: 60,
  };
};

export const getStaticPaths = async () => {
  const feeds = await getAllFeedIds();

  if (feeds.status !== "success") {
    return { paths: [], fallback: "blocking" };
  }

  const paths = feeds.data.map((fid: string) => ({
    params: { fid },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

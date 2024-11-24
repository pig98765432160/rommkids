import { useEffect, useState } from "react";
import Image from "next/image";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { Role_MM, Role_RO } from "@/components/Icons/character";
import { renderToStaticMarkup } from "react-dom/server";
import { getFeedDetail } from "@/helpers/apis/feedApi";
import { handleErrorResponse } from "@/lib/utils";
import dayjs from "dayjs";
import { Divider } from "@mui/material";
import { FeedDetail } from "@/shared/types/Feed";
import { ErrorCover } from "@/components/Common";

interface Props {
  feedDetail: FeedDetail;
}

const ArticlePage: NextPage<Props> = (props) => {
  const { feedDetail } = props;
  const [article, setArticle] = useState("");
  const [author, setAuthor] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    const svg_ro = renderToStaticMarkup(
      <span style={{ display: "inline-flex" }}>
        <Role_RO width={25} height={25} className="" />：
      </span>
    );

    const svg_mm = renderToStaticMarkup(
      <span style={{ display: "inline-flex" }}>
        <Role_MM width={25} height={25} className="" />：
      </span>
    );

    let replaced = feedDetail.content.replace(/A:/g, svg_mm);
    replaced = replaced.replace(/B:/g, svg_ro);

    setArticle(replaced);
    setAuthor(feedDetail.author);
    setCreatedAt(dayjs(feedDetail.dateline * 1000).format("YYYY/MM/DD HH:MM"));
  }, [feedDetail]);

  return (
    <>
      <div className="w-full h-auto">
        <ErrorCover
          src={feedDetail.cover}
          alt="article_cover"
          width={2560}
          height={1536}
          className="rounded-t"
          errorImg="/assets/image/common/slider_img_nophoto.jpg"
        />
      </div>
      <div className="p-5">
        <h2 className="text-3xl font-black text-brown mb-5">
          {feedDetail.title}
        </h2>
        <div className="flex items-center gap-2">
          <div className="border border-gray-400 rounded-full p-1">
            <Role_MM width={40} height={40} className="" />
          </div>
          <span className="flex flex-col">
            <p className="text-lg font-black">{author}</p>
            <p className="text-xs text-gray-500">{createdAt}</p>
          </span>
        </div>
        <Divider
          sx={{
            width: "100%",
            marginY: 2,
          }}
        />
        <div
          className="article"
          dangerouslySetInnerHTML={{ __html: article }}
        />
      </div>
    </>
  );
};

export default ArticlePage;

export const getServerSideProps: GetServerSideProps | any = async ({
  query,
  req,
  res,
}: GetServerSidePropsContext) => {
  const fid = query.fid as string;
  if (!fid || isNaN(Number(fid))) {
    res.statusCode = 404;
    return handleErrorResponse(404);
  }

  const feedDetail = await getFeedDetail(+fid);

  return {
    props: {
      feedDetail: feedDetail.data,
    },
  };
};

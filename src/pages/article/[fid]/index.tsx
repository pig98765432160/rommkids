import { useEffect, useState } from "react";
import Image from "next/image";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { Role_MM, Role_RO } from "@/components/Icons/character";
import { renderToStaticMarkup } from "react-dom/server";
import { getFeedDetail } from "@/helpers/apis/feedApi";
import { handleErrorResponse } from "@/lib/utils";

interface Props {
  feedDetail: any;
}

const ArticlePage: NextPage<Props> = (props) => {
  const { feedDetail } = props;
  const [article, setArticle] = useState(feedDetail.content);

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

    let replaced = article.replace(/A:/g, svg_mm);
    replaced = replaced.replace(/B:/g, svg_ro);

    setArticle(replaced);
  }, [feedDetail]);

  return (
    <>
      <div className="w-full h-auto">
        <Image
          loader={({ src }: any) => src}
          src={feedDetail.cover}
          alt="article_cover"
          width={2560}
          height={1536}
          blurDataURL="/assets/image/common/logo.png"
          priority
          unoptimized
        />
      </div>
      <div className="p-5">
        <h2 className="text-3xl font-black text-brown mb-5">
          討論話題：{feedDetail.title}
        </h2>
        <div dangerouslySetInnerHTML={{ __html: article }} />
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

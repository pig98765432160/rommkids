import { useEffect, useState } from "react";
import article01 from "../../../../public/documemt/article1.json";
import Image from "next/image";
import { NextPage } from "next";
import { Role_MM, Role_RO } from "@/components/Icons/character";
import { renderToStaticMarkup } from "react-dom/server";

const ArticlePage: NextPage = () => {
  const [article, setArticle] = useState(article01.content);

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
  }, []);

  return (
    <>
      <div className="w-full h-auto">
        <Image
          loader={({ src }: any) => src}
          src="/assets/image/article/cover_1.png"
          alt="article_cover"
          width={2560}
          height={1536}
          blurDataURL="/assets/image/common/logo.png"
          priority
        />
      </div>
      <div className="p-5">
        <h2 className="text-3xl font-black text-brown mb-5">
          討論話題：{article01.title}
        </h2>
        <div dangerouslySetInnerHTML={{ __html: article }} />
      </div>
    </>
  );
};

export default ArticlePage;

import { NextPage } from "next";
import { useRouter } from "next/router";
import { PageMetadata } from "@/components/PageMetadata";
import { BASE_URL } from "@/shared/constants";
import { ImageWithFallback } from "@/components/Common";

const mastersData = [
  {
    id: 1,
    nickName: "RO",
    name: "嗄歐",
    gender: "男",
    starSigns: "金牛座",
    zodiac: "狗",
    hate: "蔥",
  },
  {
    id: 2,
    nickName: "MM",
    name: "麥麥",
    gender: "女",
    starSigns: "金牛座",
    zodiac: "豬",
    hate: "菇",
  },
];

const cuteBlueLine = "bg-cute-blue";
const defaultLine = "w-full text-center text-lg font-black text-gray-900";

const AboutPage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <PageMetadata
        title={"人物介紹 - 嗄歐麥麥"}
        description={""}
        ogImage={""}
        ogType="article"
        ogUrl={`${BASE_URL}${router.asPath}`}
      />
      <div className="w-full max-w-[800px] mx-auto flex flex-col items-center justify-center my-40">
        <div className="w-full flex items-center">
          <div className="w-2/4 aspect-square flex items-center justify-center bg-[url(/assets/image/about/border.png)]">
            <ImageWithFallback
              src="/assets/image/about/RO.png"
              alt="嗄歐"
              width={500}
              height={602}
              className="w-[300px] h-auto"
              isBlur={true}
              fallbackSrc="/assets/image/common/slider_img_nophoto.jpg"
              priority={true}
            />
          </div>
          <div className="w-2/4 aspect-square flex items-center justify-center bg-[url(/assets/image/about/border.png)]">
            <ImageWithFallback
              src="/assets/image/about/MM.png"
              alt="麥麥"
              width={500}
              height={602}
              className="w-[300px] h-auto"
              isBlur={true}
              fallbackSrc="/assets/image/common/slider_img_nophoto.jpg"
              priority={true}
            />
          </div>
        </div>
        <div className="relative w-full flex items-center justify-center">
          <div className="w-full flex flex-col items-center">
            <h2 className={`${defaultLine} ${cuteBlueLine}`}>
              {mastersData[0].name}
            </h2>
            <p className={defaultLine}>{mastersData[0].gender}</p>
            <p className={`${defaultLine} ${cuteBlueLine}`}>
              {mastersData[0].starSigns}
            </p>
            <p className={defaultLine}>{mastersData[0].zodiac}</p>
            <p className={`${defaultLine} ${cuteBlueLine}`}>
              {mastersData[0].hate}
            </p>
          </div>

          <div className="absolute top-0 w-full flex flex-col items-center text-center text-lg font-black text-gray-900">
            <p className="w-full">名字</p>
            <p className="w-full">性別</p>
            <p className="w-full">星座</p>
            <p className="w-full">生肖</p>
            <p className="w-full">討厭</p>
          </div>

          <div className="w-full flex flex-col items-center">
            <h2 className={`${defaultLine} ${cuteBlueLine}`}>
              {mastersData[1].name}
            </h2>
            <p className={defaultLine}>{mastersData[1].gender}</p>
            <p className={`${defaultLine} ${cuteBlueLine}`}>
              {mastersData[1].starSigns}
            </p>
            <p className={defaultLine}>{mastersData[1].zodiac}</p>
            <p className={`${defaultLine} ${cuteBlueLine}`}>
              {mastersData[1].hate}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;

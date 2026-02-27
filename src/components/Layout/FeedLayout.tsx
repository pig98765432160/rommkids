import { FC, ReactNode, useMemo } from "react";
import Link from "next/link";
import { ImageWithFallback, YoutubeEmbed } from "@/components/Common";
import { fetchCharacter } from "@/helpers/apis/animeCharactersApi";
import { useQuery } from "react-query";
import { EStatus } from "@/shared/types";
import { errorAlert } from "@/helpers/baseAxios";
import CakeIcon from "@mui/icons-material/Cake";
import { CircularProgress } from "@mui/material";
import styles from "@/styles/homepage.module.scss";
import { useRouter } from "next/router";

interface Props {
  children: ReactNode;
}

export const forumsCats = [
  {
    id: 1,
    board: "knowledge",
    name: "知識・科普",
  },
  {
    id: 2,
    board: "learn",
    name: "語言學習",
  },
  {
    id: 3,
    board: "funny",
    name: "休閒娛樂",
  },
  {
    id: 4,
    board: "life",
    name: "生活・日常",
  },
];

const FeedLayout: FC<Props> = (props) => {
  const { children } = props;
  const router = useRouter();
  const today = useMemo(() => new Date(), []);

  const newTime = useMemo(() => {
    const month = today.getMonth() + 1;
    const day = today.getDate();

    return `${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
  }, [today]);

  const { data: characterData, status: characterStatus } = useQuery(
    ["character", newTime],
    async () => {
      const res = await fetchCharacter({ birthday: newTime });
      if (res.status === EStatus.SUCCESS) {
        return res.data;
      } else {
        errorAlert(res.data);
        throw res.data;
      }
    },
    {
      keepPreviousData: true,
      retry: false,
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24,
    }
  );

  // const Title = () => {
  //   switch (router.query?.board) {
  //     case "knowledge":
  //       return (
  //         <h1 className="flex items-center gap-1 text-2xl font-black">
  //           <SunIcon width={32} height={32} className="" />
  //           知識・科普
  //         </h1>
  //       );
  //     case "learning":
  //       return (
  //         <h1 className="flex items-center gap-1 text-2xl font-black">
  //           <FlowerIcon width={32} height={32} className="" />
  //           語言學習
  //         </h1>
  //       );
  //     case "funny":
  //       return (
  //         <h1 className="flex items-center gap-1 text-2xl font-black">
  //           <CrownIcon width={32} height={32} className="" />
  //           休閒娛樂
  //         </h1>
  //       );
  //     case "life":
  //       return (
  //         <h1 className="flex items-center gap-1 text-2xl font-black">
  //           <ShootingStarIcon width={32} height={32} className="" />
  //           生活・日常
  //         </h1>
  //       );
  //     default:
  //       return <></>;
  //   }
  // };

  return (
    <main
      className={`${styles.homepage} w-[1280px] grid grid-cols-[auto_300px] gap-8 mx-auto pt-[--header-height] mt-12 mb-40`}
    >
      {/* <div className="flex items-center gap-2 border-b border-dashed border-gray-900 py-4">
        <Title />
      </div> */}
      {children}
      <div className="shrink-0 w-[300px] flex flex-col items-center gap-3">
        <section className="w-full home-section">
          <div className="flex items-center justify-between gap-4 border-b border-brown pb-3">
            <div className="flex items-center gap-2">
              <CakeIcon className="text-pink-500" />
              <h3 className="text-xl font-black text-brown">今日壽星</h3>
            </div>
          </div>
          {characterStatus === EStatus.LOADING ? (
            <div className="w-full flex items-center justify-center py-4">
              <CircularProgress />
            </div>
          ) : (
            <ul className="flex flex-col gap-2 my-4 text-brown">
              {characterData?.map(
                (
                  item: { id: number; name: string; series: string },
                  index: number
                ) => (
                  <li key={item.id} className="flex justify-between">
                    <span className="font-bold">
                      {index + 1}. {item.name}
                    </span>
                    <span className="text-xs text-gray-700">{item.series}</span>
                  </li>
                )
              )}
            </ul>
          )}
        </section>

        <section className="w-full home-section">
          <Link
            aria-label="ROMM嗄歐麥麥遊戲頻道"
            target="_blank"
            href="https://www.youtube.com/channel/UCecPCPSb854wmZwFYoS8ieg"
            className="text-brown font-bold text-sm text-right mt-5"
          >
            <h2 className="home-title">嗄歐麥麥遊戲直播</h2>
          </Link>
          <div className="flex flex-col gap-2">
            <div className="w-full flex flex-col items-center border-2 border-cute-beige">
              <YoutubeEmbed videoId="PQcFsyexL2c" />
              <p className="text-sm text-center text-brown font-black py-1">
                魔物獵人 荒野 part.4
              </p>
            </div>
            <div className="w-full flex flex-col items-center border-2 border-cute-beige">
              <YoutubeEmbed videoId="QYaBEboXSEc" />
              <p className="text-sm text-center text-brown font-black py-1">
                魔物獵人 荒野 part.3
              </p>
            </div>
            <div className="w-full flex flex-col items-center border-2 border-cute-beige">
              <YoutubeEmbed videoId="lQ6uJoHGs7k" />
              <p className="text-sm text-center text-brown font-black py-1">
                魔物獵人 荒野 part.2
              </p>
            </div>
          </div>
        </section>

        <section className="w-full relative home-section pt-10 pb-0">
          <div className="flex flex-col items-center justify-center gap-2 bg-white pb-10">
            <div className="w-[200px] h-auto aspect-[358/245]">
              <ImageWithFallback
                src="/assets/image/common/intro.png"
                alt="intro_img"
                width={358}
                height={245}
                className="w-full h-full"
                isBlur={true}
                fallbackSrc="/assets/image/common/slider_img_nophoto.jpg"
                priority={false}
                loading="lazy"
              />
            </div>
            {/* <p className="font-bold text-cute-dark-brown mt-3">
              歡迎來到嗄歐麥麥！
              <br />
              一個為喜愛動漫與遊戲的你打造的匿名分享空間
              <br />
              在這裡，你可以抒發心情、留下足跡、提問或閒聊
              <br />
              不用擔心身分曝光，讓真實的想法自由流動～
              <br />
              放下壓力
              <br />
              來說說最近你心裡的事吧——
            </p> */}
          </div>
          <div className="absolute bottom-1 right-0">
            <Link
              href="/about"
              className="bg-cute-beige text-gray-500 text-sm font-bold rounded-tl-full rounded-b pr-4 pl-5 py-2"
            >{`更了解我們 >`}</Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default FeedLayout;

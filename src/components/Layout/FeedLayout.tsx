import { FC, ReactNode, useMemo } from "react";
import Link from "next/link";
import { ImageWithFallback } from "@/components/Common";
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

  const todayYearMonth = useMemo(() => {
    const year = today.getFullYear();
    const monthArr = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    return `${year}.${monthArr[today.getMonth()]}`;
  }, [today]);

  const todayDay = useMemo(() => {
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const weekArr = ["日", "一", "二", "三", "四", "五", "六"];
    const newWeek = weekArr[today.getDay()];
    return `${month}/${day} (${newWeek})`;
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
        <div className="bg-cute-beige p-6 rounded-lg shadow-sm flex flex-col items-center w-full text-dark-brown">
          <p className="text-xs font-semibold opacity-80">TODAY</p>
          <p className="text-xs font-medium">{todayYearMonth}</p>
          <p className="text-4xl font-extrabold">{todayDay}</p>
        </div>
        <div className="w-full p-1 border border-gray-300 bg-cute-beige rounded-lg shadow-sm">
          <div className="relative bg-white p-4 rounded-md">
            <div className="flex items-center justify-between gap-4 border-b-2 border-brown pb-3">
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
                      <span className="text-xs text-gray-700">
                        {item.series}
                      </span>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        </div>
        <div className="w-full p-1 border border-gray-300 bg-cute-beige rounded-lg shadow-sm">
          <div className="relative bg-white p-4 rounded-md pb-10">
            <div className="w-full aspect-[358/245]">
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
            <p className="text-center font-bold text-gray-800 mt-3">
              歡迎來到嗄歐麥麥！
              <br />
              分享動漫、遊戲相關內容，
              <br />
              彙集了很多有趣好玩又新奇的話題，待你來探索！
            </p>
            <div className="absolute bottom-1 right-0">
              <Link
                href="/about"
                className="bg-cute-beige text-gray-500 text-sm font-bold rounded-tl-full rounded-b pr-4 pl-5 py-2"
              >{`更了解我們 >`}</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FeedLayout;

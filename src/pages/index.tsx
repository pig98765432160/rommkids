import { ImageWithFallback, SwiperBanner } from "@/components/Common";
import { fetchCharacter } from "@/helpers/apis/animeCharactersApi";
import { axiosPost, errorAlert } from "@/helpers/baseAxios";
import { EStatus } from "@/shared/types";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import styles from "@/styles/homepage.module.scss";
import CakeIcon from "@mui/icons-material/Cake";
import { CircularProgress } from "@mui/material";
import { fetchFeed } from "@/helpers/apis/feedApi";
import { FeedItem } from "@/components/Feed";
import { EnvelopeIcon, FBIcon, IGIcon, YTIcon } from "@/components/Icons/icons";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

const hotAnime = [
  {
    id: 1,
    name: "BanG Dream！",
    imageUrl: "https://img.league-funny.com/imgur/174141911199_n.jpg",
  },
  {
    id: 2,
    name: "Re:從零開始的異世界生活",
    imageUrl: "https://img.league-funny.com/imgur/174141911482_n.jpg",
  },
  {
    id: 3,
    name: "膽大黨",
    imageUrl: "https://img.league-funny.com/imgur/174141911728_n.jpg",
  },
];

const hotGame = [
  {
    id: 1,
    type: "PC",
    name: "Monster Hunter 魔物獵人",
    imageUrl: "https://img.league-funny.com/imgur/174141912015_n.jpg",
  },
  {
    id: 2,
    type: "Mobile",
    name: "Pokemon 寶可夢",
    imageUrl: "https://img.league-funny.com/imgur/17414190991_n.jpg",
  },
  {
    id: 3,
    type: "Switch",
    name: "Zelda 薩爾達傳說",
    imageUrl: "https://img.league-funny.com/imgur/174141910316_n.jpg",
  },
];

const Home = () => {
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

  const { data: feedData, status: feedStatus } = useQuery(
    ["feed"],
    () =>
      fetchFeed({ board: "knowledge" }).then((res) => {
        if (res.status === EStatus.SUCCESS) {
          return res.data;
        } else {
          throw new Error(res.data);
        }
      }),
    {
      keepPreviousData: true,
      retry: false,
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24,
    }
  );

  return (
    <main
      className={`${styles.homepage} w-[1280px] h-screen grid grid-cols-[auto_300px] gap-8 mx-auto pt-[--header-height] mt-12 mb-40`}
    >
      <div className="w-full flex flex-col gap-5">
        <div className="w-auto flex flex-col">
          <div className="relative w-full max-w-[946px]">
            <SwiperBanner data={hotAnime} />
          </div>
        </div>
        <div className="flex flex-col items-center gap-8 my-12">
          <h3 className="text-center text-3xl font-black text-primary">
            最新文章
          </h3>
          {feedData && feedData.length > 0 ? (
            feedData.map((item: any, index: number) => (
              <ol key={index} className="grid grid-cols-3 gap-x-12 gap-y-12.5">
                <FeedItem feed={item} />
              </ol>
            ))
          ) : feedStatus === EStatus.ERROR ? (
            <p className="text-sm text-hot">請重新整理</p>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="shrink-0 w-[300px] flex flex-col items-center gap-5">
        <div className="w-full flex flex-col gap-7 border-2 border-dashed border-brown px-5 pt-5 pb-10">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-start calendar-font font-semibold">
              <p className="text-xs">TODAY</p>
              <p className="text-xs">{todayYearMonth}</p>
              <p className="text-3xl">{todayDay}</p>
            </div>
          </div>
          <hr className="w-full border border-dashed border-brown" />
          <div className="w-full">
            <div className="flex items-center justify-between gap-4 border-b border-gray-300 py-2">
              <div className="w-full flex items-center gap-2">
                <CakeIcon sx={{ color: "#FF4081" }} />
                <h3 className="text-2xl font-black">今日壽星</h3>
              </div>
              {/* <button>
                <p className="text-xs text-gray-600">查看更多</p>
              </button> */}
            </div>
            {characterStatus === EStatus.LOADING ? (
              <div className="w-full h-full flex items-center justify-center">
                <CircularProgress />
              </div>
            ) : (
              <ul>
                {characterData?.map((item: any) => (
                  <li
                    key={item.id}
                    className="w-full flex items-end justify-between border-b border-gray-300 py-2"
                  >
                    <h3 className="text-2xl font-bold">{item.name}</h3>
                    <p className="text-sm text-gray-700">{item.series}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 border-2 border-dashed border-brown p-5">
          <ImageWithFallback
            src="/assets/image/common/intro.png"
            alt="intro_img"
            width={358}
            height={245}
            className="w-full h-[172px]"
            isBlur={true}
            fallbackSrc="/assets/image/common/slider_img_nophoto.jpg"
            priority={false}
            loading="lazy"
          />
          <div className="w-full flex items-center gap-2">
            <AssignmentIndIcon sx={{ color: "#FF4081" }} />
            <h3 className="text-2xl font-black">關於我們</h3>
          </div>
          <p>
            歡迎來到嗄歐麥麥！
            <br />
            分享動漫、遊戲相關內容，
            <br />
            彙集了很多有趣好玩又新奇的話題，待你來探索！
          </p>
        </div>
        <div className="w-full flex flex-col gap-4 border-2 border-dashed border-brown p-5">
          <div className="w-full flex items-center gap-2">
            <InsertEmoticonIcon sx={{ color: "#FF4081" }} />
            <h3 className="text-2xl font-black">FOLLOW US</h3>
          </div>
          <div className="w-full flex gap-4">
            <button className="hover:icon-primary">
              <FBIcon width={30} height={30} className="" />
            </button>
            <button className="hover:icon-hot">
              <IGIcon width={30} height={30} className="" />
            </button>
            <button className="hover:icon-hot">
              <YTIcon width={30} height={30} className="" />
            </button>
            <button className="hover:icon-primary">
              <EnvelopeIcon width={30} height={30} className="" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;

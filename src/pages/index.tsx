import {
  ImageWithFallback,
  SwiperBanner,
  YoutubeEmbed,
} from "@/components/Common";
import { EStatus } from "@/shared/types";
import { useQuery } from "react-query";
import styles from "@/styles/homepage.module.scss";
import { fetchFeed } from "@/helpers/apis/feedApi";
import { FeedItem } from "@/components/Feed";
import Daily from "../../public/assets/doc/daily.json";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Avatar, Skeleton } from "@mui/material";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { DropDownIcon, HeartIcon } from "@/components/Icons/icons";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { BorderColor } from "@mui/icons-material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import TypeStyleBlock from "@/components/Template/TypeStyleBlock";
require("dayjs/locale/zh-tw");
dayjs.extend(relativeTime);

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

const headlines = [
  {
    id: 1,
    title: "【科學探討】雷電能源利用的可能性與技術挑戰",
    cover: "/assets/image/article/cover_1.png",
    type: "other",
    tags: ["科學", "能源", "冷知識"],
  },
  {
    id: 2,
    title: "【遊戲評測】薩爾達傳說：王國之淚 - 創造系統深度解析",
    cover: "/assets/image/article/cover_2.png",
    type: "game",
    tags: ["遊戲評測", "薩爾達傳說", "Nintendo Switch"],
  },
  {
    id: 3,
    title: "【動漫推薦】2025年冬季新番必看清單與觀看指南",
    cover: "/assets/image/article/cover_3.png",
    type: "acg",
    tags: ["動漫推薦", "新番", "2025冬季"],
  },
  {
    id: 4,
    title: "【手遊攻略】原神4.4版本新角色培養優先度分析",
    cover: "/assets/image/article/cover_1.png",
    type: "game",
    tags: ["原神", "手遊攻略", "角色培養"],
  },
  {
    id: 5,
    title: "【技術分享】AI繪圖工具在動漫創作中的應用與倫理思考",
    cover: "/assets/image/article/cover_2.png",
    type: "other",
    tags: ["AI", "繪圖", "創作技術"],
  },
  {
    id: 6,
    title: "【深度解析】鬼滅之刃劇場版：無限城篇製作幕後揭秘",
    cover: "/assets/image/article/cover_3.png",
    type: "acg",
    tags: ["鬼滅之刃", "劇場版", "動畫製作"],
  },
  {
    id: 7,
    title: "【電競賽事】2025年春季職業聯賽戰隊實力分析",
    cover: "/assets/image/article/cover_1.png",
    type: "game",
    tags: ["電競", "職業聯賽", "戰隊分析"],
  },
  {
    id: 8,
    title: "【文化探討】日本動漫產業的數位轉型與未來趨勢",
    cover: "/assets/image/article/cover_2.png",
    type: "acg",
    tags: ["動漫產業", "數位轉型", "趨勢分析"],
  },
];

const feedData = [
  {
    id: 1,
    title: "【心得】6位未來新角唯一的男人——仇遠的人氣到底有多高？",
    content:
      "【仇遠官圖鎮樓】 浪跡不定的孤劍 就在漂泊者抽完6+1布蘭特，在愁新的男共鳴者的時候， 前瞻直播結尾放出了6張新角立繪，其中的仇",
    type: "game",
    author: "匿名",
    private: true,
    dateline: 1748670483,
    likedCount: 3,
  },
  {
    id: 2,
    title:
      "【心得】淺談本期限定機體補給池 -  鋼彈試作2號機&夏亞專用薩克Ⅱ，無課究竟要不要抽？",
    content:
      "瑪秋鎮樓 淺談本期限定機體補給池 - 鋼彈試作2號機&夏亞專用薩克Ⅱ，無課究竟要不要抽？ 鑑於上一篇的評價文迴響不錯，所以繼續做",
    type: "other",
    author: "歐麥麥",
    private: false,
    dateline: 1748670483,
    likedCount: 13,
  },
  {
    id: 3,
    title: "【閒聊】女神對新手異常不友好 和各種奇怪現象",
    content:
      "有聽聞女神的人特別兇所以51等候都打野圖一直沒去打女神 但想說至少解掉日記頁和打BOSS的任務 66等才硬著頭皮去打第一場 昨天找了個",
    type: "mood",
    author: "匿名",
    private: true,
    dateline: 1748670483,
    likedCount: 23,
  },
  {
    id: 4,
    title: "【閒聊】永推志喜屋",
    content:
      "看到這篇有感而發 老實說我覺得溫水對八奈見的態度一直都是有點小厭煩，一直都是八奈見單方",
    type: "acg",
    author: "匿名",
    private: true,
    dateline: 1748670483,
    likedCount: 221,
  },
  {
    id: 5,
    title: "【閒聊】永推志喜屋",
    content:
      "看到這篇有感而發 老實說我覺得溫水對八奈見的態度一直都是有點小厭煩，一直都是八奈見單方",
    type: "question",
    author: "匿名",
    private: true,
    dateline: 1748670483,
    likedCount: 221,
  },
];

const homelist = [
  {
    id: 1,
    label: "全部",
  },
  {
    id: 2,
    label: "動漫角落",
  },
  {
    id: 3,
    label: "遊戲角落",
  },
  {
    id: 4,
    label: "偷偷說",
  },
  {
    id: 5,
    label: "其他",
  },
  {
    id: 6,
    label: "我想問問",
  },
];

const Home = () => {
  const [selectedPollOption, setSelectedPollOption] = useState<any>(null);
  const handlePollSubmit = () => alert(`你選擇了: ${selectedPollOption}`);
  const today = useMemo(() => new Date(), []);
  const [isMounted, setIsMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);
  const [chooseCatId, setChooseCatId] = useState(1);

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

  // const { data: feedData, status: feedStatus } = useQuery(
  //   ["feed"],
  //   () =>
  //     fetchFeed({}).then((res) => {
  //       if (res.status === EStatus.SUCCESS) {
  //         return res.data;
  //       } else {
  //         throw new Error(res.data);
  //       }
  //     }),
  //   {
  //     keepPreviousData: true,
  //     retry: false,
  //     staleTime: 1000 * 60 * 60 * 24,
  //     cacheTime: 1000 * 60 * 60 * 24,
  //   }
  // );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="w-full flex flex-col gap-12">
      <main className="w-full flex flex-col items-center gap-3 pb-10 px-4">
        <div className="relative w-full">
          <Image
            src="/assets/image/common/home_banner.jpg"
            alt="首頁橫幅"
            width={916}
            height={325}
            className="w-full h-[325px] object-cover rounded-lg"
            priority={true}
          />
          <div className="absolute right-5 top-5 flex flex-col items-end text-[#341A0D]">
            <p className="text-sm font-semibold">TODAY</p>
            <p className="text-sm font-medium">{todayYearMonth}</p>
            <p className="text-4xl font-extrabold">{todayDay}</p>
          </div>
        </div>

        <section className="w-full max-w-[916px] select-none my-8">
          <h2 className="home-title">精選推薦</h2>
          {isMounted ? (
            <div className="relative top-swiper">
              <Swiper
                modules={[Navigation]}
                slidesPerView={3}
                spaceBetween={20}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex + 1)}
                loop={true}
                className="mySwiper"
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
              >
                {headlines.length > 0 && headlines ? (
                  headlines.map((item: any, index: number) => (
                    <SwiperSlide
                      key={index}
                      style={{
                        borderWidth: "2px",
                        borderColor: "#efdfd0",
                        borderRadius: "0.75rem",
                      }}
                    >
                      <div className="w-full h-full aspect-[416/200] image-box overflow-hidden">
                        <ImageWithFallback
                          src={item.cover}
                          alt={item.title}
                          width={1024}
                          height={1024}
                          className="bg-black w-full h-full object-cover hoverimg rounded-t-xl"
                          fallbackSrc="/feed/slider_img_nophoto.jpg"
                          priority={true}
                          isBlur={false}
                          loading="eager"
                        />
                      </div>
                      <div className="w-full h-24 flex flex-col justify-between bg-white rounded-b-xl px-4 py-2">
                        <p className="text-dark-brown font-black line-clamp-2 break-all">
                          {item.title}
                        </p>
                        <div className="flex items-center gap-2">
                          {item.tags.length > 0 &&
                            item.tags.map((item: string, index: number) => (
                              <div
                                key={index}
                                className="w-fit bg-cute-beige text-xs text-gray-600 font-bold rounded px-2 py-0.5"
                              >
                                #{item}
                              </div>
                            ))}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))
                ) : (
                  <></>
                )}
              </Swiper>
              <div className="after:content-['prev'] swiper-button-prev"></div>
              <div className="after:content-['next'] swiper-button-next"></div>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Skeleton
                variant="rectangular"
                width="100%"
                height="300px"
                sx={{ bgcolor: "grey.600" }}
              />
              <Skeleton
                variant="rectangular"
                width="100%"
                height="300px"
                sx={{ bgcolor: "grey.600" }}
              />
              <Skeleton
                variant="rectangular"
                width="100%"
                height="300px"
                sx={{ bgcolor: "grey.600" }}
              />
              <Skeleton
                variant="rectangular"
                width="100%"
                height="300px"
                sx={{ bgcolor: "grey.600" }}
              />
              <Skeleton
                variant="rectangular"
                width="80%"
                height="300px"
                sx={{ bgcolor: "grey.600" }}
              />
            </div>
          )}
        </section>

        {/* <section className="">
          <h2 className="home-title">精選動漫 / 遊戲</h2>
          <div className="flex gap-4 bg-white">
            <div className="w-full overflow-hidden aspect-[280/150]">
              <ImageWithFallback
                width={1623}
                height={913}
                src="/assets/image/recommend/recommend_01.jpg"
                alt="魔物獵人 荒野"
                className="w-full h-full object-cover"
                priority={true}
                fallbackSrc={"/feed/slider_img_nophoto.jpg"}
              />
            </div>
            <div className="flex flex-col gap-2 p-4">
              <h3 className="text-dark-brown text-xl font-bold">
                🔥《魔物獵人 荒野》
              </h3>
              <p className="text-brown text-sm">
                本週特別推薦給大家的遊戲是《魔物獵人
                荒野》，這款作品延續了系列一貫的狩獵動作體驗，並加入了更加廣闊的開放世界元素，讓玩家能夠自由探索未知的荒野，追蹤強大的魔物。無論是喜愛挑戰的老獵人，還是剛踏入狩獵世界的新手，都能在這片未知的大地上享受刺激的冒險與合作狩獵的樂趣！
              </p>
            </div>
          </div>
        </section> */}

        <section className="">
          <h2 className="home-title">熱門討論</h2>
          <ul className="flex items-center gap-2 my-5">
            {homelist.map((item) => (
              <li
                key={item.id}
                id={item.id.toString()}
                className={`${
                  item.id === chooseCatId
                    ? " bg-cute-dark-brown text-white"
                    : " bg-cute-beige text-gray-600"
                } homelist-cat`}
              >
                <button onClick={(e) => setChooseCatId(item.id)}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2">
            {feedData.map((item) => (
              <div key={item.id} className="flex flex-col gap-2 bg-white p-4">
                <div className="flex items-center gap-2">
                  <Avatar
                    sx={{
                      width: 20,
                      height: 20,
                    }}
                  />
                  <p className="text-sm text-gray-600">{item.author}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <TypeStyleBlock type={item.type} />
                    <h3 className="text-dark-brown font-bold text-lg">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-cute-dark-brown">{item.content}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <HeartIcon width={16} height={16} className="" />
                    <p>{item.likedCount}</p>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {dayjs.unix(item.dateline).locale("zh-tw").fromNow()}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* <ul className="grid grid-cols-3 gap-x-12 gap-y-12.5">
            {feedData && feedData.length > 0 ? (
              feedData.map((item: any, index: number) => (
                <FeedItem key={index} feed={item} />
              ))
            ) : feedStatus === EStatus.ERROR ? (
              <p className="text-sm text-hot">請重新整理</p>
            ) : (
              <></>
            )}
          </ul> */}
        </section>

        {/* 嗄歐麥麥遊戲直播區塊 */}
        <section className="w-full max-w-[916px] my-8">
          <YoutubeEmbed 
            showLatestVideos={true}
            maxResults={6}
            showChannelHeader={true}
          />
        </section>

        {/* <section className="home-section">
          {feedData && (
            <section>
              <h2 className="home-title">編輯精選</h2>
              <div className="grid grid-cols-2 gap-7">
                <Link
                  href={`/article/${feedData[1].fid}`}
                  className="flex gap-4 group"
                >
                  <div className="relative w-72 aspect-[640/360]">
                    <ImageWithFallback
                      src={feedData[1].cover}
                      alt={feedData[1].title}
                      width={640}
                      height={360}
                      className="w-full h-full object-cover rounded-md"
                      priority={true}
                      fallbackSrc={"/feed/slider_img_nophoto.jpg"}
                    />
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-brown">
                    {feedData[1].title}
                  </h3>
                </Link>
                <Link
                  href={`/article/${feedData[0].fid}`}
                  className="flex gap-4 group"
                >
                  <div className="relative w-72 aspect-[640/360]">
                    <ImageWithFallback
                      src={feedData[0].cover}
                      alt={feedData[0].title}
                      width={640}
                      height={360}
                      className="w-full h-full object-cover rounded-md"
                      priority={true}
                      fallbackSrc={"/feed/slider_img_nophoto.jpg"}
                    />
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-brown">
                    {feedData[0].title}
                  </h3>
                </Link>
              </div>
            </section>
          )}
        </section>

        <section className="home-section">
          <h2 className="home-title">每週話題投票</h2>
          <form className="bg-gray-100 p-4 rounded-md shadow-md">
            <p className="mb-2">這週你最期待的動漫是哪一部？</p>
            <label className="block">
              <input
                type="radio"
                name="poll"
                value="動畫A"
                onChange={(e) => setSelectedPollOption(e.target.value)}
              />
              Re：從零開始的異世界生活 第三季
            </label>
            <label className="block">
              <input
                type="radio"
                name="poll"
                value="動畫B"
                onChange={(e) => setSelectedPollOption(e.target.value)}
              />
              Dr.STONE 新石紀 第四季
            </label>
            <label className="block">
              <input
                type="radio"
                name="poll"
                value="動畫B"
                onChange={(e) => setSelectedPollOption(e.target.value)}
              />
              我獨自升級 第二季 －起於闇影－
            </label>
            <label className="block">
              <input
                type="radio"
                name="poll"
                value="動畫B"
                onChange={(e) => setSelectedPollOption(e.target.value)}
              />
              青之驅魔師 終夜篇
            </label>
            <label className="block">
              <input
                type="radio"
                name="poll"
                value="動畫B"
                onChange={(e) => setSelectedPollOption(e.target.value)}
              />
              魔法使的約定
            </label>
            <button
              type="button"
              className="mt-3 px-4 py-2 bg-dark-brown text-white rounded-md"
              onClick={handlePollSubmit}
            >
              送出投票
            </button>
          </form>
        </section> */}
      </main>
      {/* <div className="w-full flex items-center justify-center">
        <div className="relative w-[600px] aspect-[1073/576]">
          <Image
            src="/assets/image/common/daily_bg.png"
            alt="daily_bg"
            width={1073}
            height={576}
            className="w-full h-full"
          />
          <div className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center gap-5 px-28 py-4 pb-8">
            <p className={`${styles.dailyFont} text-2xl`}>
              {Daily["Daily"][0].desc}
            </p>
            <p className={`${styles.dailySeriesFont}`}>
              ---- {Daily["Daily"][0].series} ----
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Home;

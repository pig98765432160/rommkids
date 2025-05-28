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
import { useMemo, useState } from "react";

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
  const [selectedPollOption, setSelectedPollOption] = useState<any>(null);
  const handlePollSubmit = () => alert(`你選擇了: ${selectedPollOption}`);
  const today = useMemo(() => new Date(), []);

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

  const { data: feedData, status: feedStatus } = useQuery(
    ["feed"],
    () =>
      fetchFeed({}).then((res) => {
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
    <div className="w-full flex flex-col gap-12">
      <main className="w-full flex flex-col items-center gap-3 pb-10 px-4">
        <div className="relative w-full">
          <ImageWithFallback
            src="/assets/image/common/home_banner.jpg"
            alt="首頁橫幅"
            width={916}
            height={325}
            className="w-full h-[325px] object-cover rounded-lg"
            priority={true}
            fallbackSrc="/feed/slider_img_nophoto.jpg"
          />
          <div className="absolute right-5 top-5 flex flex-col items-end text-[#341A0D]">
            <p className="text-sm font-semibold">TODAY</p>
            <p className="text-sm font-medium">{todayYearMonth}</p>
            <p className="text-4xl font-extrabold">{todayDay}</p>
          </div>
        </div>
        {/* <section className="home-section">
          <h2 className="home-title">最新公告</h2>
          <ul className="text-brown text-sm space-y-3">
            <li>🔹 2025/03/11 - 新增了首頁排版與推薦內容！</li>
            <li>🔹 2025/03/11 - 我們的網站即將推出留言功能！</li>
            <li>
              🔹 2025/03/11 -{" "}
              <span className="text-hot">新主題投票開放中！</span>
              快來參加！
            </li>
          </ul>
        </section> */}

        <section className="home-section">
          <h2 className="home-title">最新文章</h2>
          <ul className="grid grid-cols-3 gap-x-12 gap-y-12.5">
            {feedData && feedData.length > 0 ? (
              feedData.map((item: any, index: number) => (
                <FeedItem key={index} feed={item} />
              ))
            ) : feedStatus === EStatus.ERROR ? (
              <p className="text-sm text-hot">請重新整理</p>
            ) : (
              <></>
            )}
          </ul>
        </section>

        <section className="home-section">
          <span className="flex items-center justify-between mb-4">
            <h2 className="home-title">最新影片</h2>
            <Link
              aria-label="ROMM嗄歐麥麥遊戲頻道"
              target="_blank"
              href="https://www.youtube.com/channel/UCecPCPSb854wmZwFYoS8ieg"
              className="text-brown font-bold text-sm"
            >
              {`看更多 >>`}
            </Link>
          </span>
          <div className="grid grid-cols-3 gap-4 justify-items-center">
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

        <section className="lg:col-span-2 home-section">
          <h2 className="home-title">精選動漫 / 遊戲</h2>
          <div className="w-full overflow-hidden aspect-[1623/913]">
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
          <h3 className="text-dark-brown text-xl font-bold my-3">
            🔥站長推薦：《魔物獵人 荒野》
          </h3>
          <p className="text-brown text-sm">
            本週特別推薦給大家的遊戲是《魔物獵人
            荒野》，這款作品延續了系列一貫的狩獵動作體驗，並加入了更加廣闊的開放世界元素，讓玩家能夠自由探索未知的荒野，追蹤強大的魔物。無論是喜愛挑戰的老獵人，還是剛踏入狩獵世界的新手，都能在這片未知的大地上享受刺激的冒險與合作狩獵的樂趣！
          </p>
        </section>

        <section className="home-section">
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
        </section>
      </main>
      <div className="w-full flex items-center justify-center">
        <div className="relative w-[600px] aspect-[1073/576]">
          <ImageWithFallback
            src="/assets/image/common/daily_bg.png"
            alt="daily_bg"
            width={1073}
            height={576}
            className="w-full h-full"
            fallbackSrc="/assets/image/common/slider_img_nophoto.jpg"
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
      </div>
    </div>
  );
};

export default Home;

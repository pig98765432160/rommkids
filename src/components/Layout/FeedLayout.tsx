import { FC, ReactNode, useMemo } from "react";
import Link from "next/link";
import { ImageWithFallback, YoutubeEmbed } from "@/components/Common";
import { fetchCharacter } from "@/helpers/apis/animeCharactersApi";
import { useQuery } from "react-query";
import { EStatus } from "@/shared/types";
import { errorAlert } from "@/helpers/baseAxios";
import {
  Cake as CakeIcon,
  TrendingUp as TrendingUpIcon,
  VideogameAsset as VideogameAssetIcon,
  Movie as MovieIcon,
  Favorite as FavoriteIcon,
  Star as StarIcon,
  Whatshot as FireIcon,
  Book as BookIcon,
  CalendarToday as CalendarTodayIcon,
  Group as GroupIcon,
} from "@mui/icons-material";
import { CircularProgress, Divider, Chip, Avatar, Box } from "@mui/material";
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

      {/* 側邊欄 */}
      <div className="shrink-0 w-[300px] flex flex-col items-center gap-4">
        {/* 今日壽星區塊 */}
        <section className="w-full home-section bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl shadow-md">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-pink-500 rounded-full">
                <CakeIcon className="text-white text-lg" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  今日生日快樂！
                </h3>
                <p className="text-xs text-gray-500">
                  與你分享生日的二次元夥伴
                </p>
              </div>
            </div>
            <Divider className="my-2" />
            {characterStatus === EStatus.LOADING ? (
              <div className="w-full flex items-center justify-center py-4">
                <CircularProgress size={24} />
              </div>
            ) : (
              <div className="space-y-2">
                {characterData
                  ?.slice(0, 3)
                  .map(
                    (
                      item: { id: number; name: string; series: string },
                      index: number
                    ) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 p-2 bg-white/60 rounded-lg hover:bg-white/80 transition-colors"
                      >
                        <Chip
                          label={index + 1}
                          size="small"
                          className="bg-pink-400 text-white font-bold min-w-6 h-6"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-800 truncate">
                            {item.name}
                          </div>
                          <div className="text-xs text-gray-600 truncate">
                            {item.series}
                          </div>
                        </div>
                        <CakeIcon className="text-pink-400 text-sm" />
                      </div>
                    )
                  )}
                {characterData && characterData.length > 3 && (
                  <div className="text-center pt-2">
                    <span className="text-xs text-gray-500">
                      還有 {characterData.length - 3} 位角色同樣生日快樂！
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* 熱門話題區塊 */}
        <section className="w-full home-section bg-gradient-to-br from-orange-50 to-red-50 rounded-xl shadow-md">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-orange-500 rounded-full">
                <TrendingUpIcon className="text-white text-lg" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">熱門話題</h3>
                <p className="text-xs text-gray-500">大家都在討論什麼？</p>
              </div>
            </div>
            <Divider className="my-2" />
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 bg-white/60 rounded-lg hover:bg-white/80 transition-colors cursor-pointer">
                <FireIcon className="text-red-500 text-sm" />
                <span className="text-sm font-medium text-gray-800">
                  #今日新番推薦
                </span>
                <Chip
                  label="熱"
                  size="small"
                  className="bg-red-100 text-red-600 ml-auto"
                />
              </div>
              <div className="flex items-center gap-2 p-2 bg-white/60 rounded-lg hover:bg-white/80 transition-colors cursor-pointer">
                <VideogameAssetIcon className="text-blue-500 text-sm" />
                <span className="text-sm font-medium text-gray-800">
                  #手遊攻略分享
                </span>
                <Chip
                  label="123"
                  size="small"
                  className="bg-blue-100 text-blue-600 ml-auto"
                />
              </div>
              <div className="flex items-center gap-2 p-2 bg-white/60 rounded-lg hover:bg-white/80 transition-colors cursor-pointer">
                <MovieIcon className="text-purple-500 text-sm" />
                <span className="text-sm font-medium text-gray-800">
                  #動畫心得討論
                </span>
                <Chip
                  label="89"
                  size="small"
                  className="bg-purple-100 text-purple-600 ml-auto"
                />
              </div>
              <div className="flex items-center gap-2 p-2 bg-white/60 rounded-lg hover:bg-white/80 transition-colors cursor-pointer">
                <FavoriteIcon className="text-pink-500 text-sm" />
                <span className="text-sm font-medium text-gray-800">
                  #推薦好作品
                </span>
                <Chip
                  label="67"
                  size="small"
                  className="bg-pink-100 text-pink-600 ml-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 社群統計區塊 */}
        <section className="w-full home-section bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-md">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-green-500 rounded-full">
                <GroupIcon className="text-white text-lg" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800">社群動態</h3>
                <p className="text-xs text-gray-500">一起打造溫暖的社群</p>
              </div>
            </div>
            <Divider className="my-2" />
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/60 rounded-lg p-3 text-center hover:bg-white/80 transition-colors">
                <div className="text-lg font-bold text-blue-600">1,247</div>
                <div className="text-xs text-gray-600">活躍玩家</div>
              </div>
              <div className="bg-white/60 rounded-lg p-3 text-center hover:bg-white/80 transition-colors">
                <div className="text-lg font-bold text-green-600">3,892</div>
                <div className="text-xs text-gray-600">今日貼文</div>
              </div>
              <div className="bg-white/60 rounded-lg p-3 text-center hover:bg-white/80 transition-colors">
                <div className="text-lg font-bold text-purple-600">156</div>
                <div className="text-xs text-gray-600">新加入</div>
              </div>
              <div className="bg-white/60 rounded-lg p-3 text-center hover:bg-white/80 transition-colors">
                <div className="text-lg font-bold text-orange-600">42</div>
                <div className="text-xs text-gray-600">線上中</div>
              </div>
            </div>
          </div>
        </section>

        {/* 社群介紹區塊 */}
        <section className="w-full relative home-section bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-md overflow-hidden">
          <div className="relative pt-6 pb-7">
            <div className="absolute top-3 right-3">
              <div className="flex gap-1">
                <StarIcon className="text-yellow-400 text-sm" />
                <StarIcon className="text-yellow-400 text-sm" />
                <StarIcon className="text-yellow-400 text-sm" />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-[150px] h-auto aspect-[358/245] relative">
                <ImageWithFallback
                  src="/assets/image/common/intro.png"
                  alt="intro_img"
                  width={358}
                  height={245}
                  className="w-full h-full rounded-lg shadow-sm"
                  isBlur={true}
                  fallbackSrc="/assets/image/common/slider_img_nophoto.jpg"
                  priority={false}
                  loading="lazy"
                />
                <div className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full p-1">
                  <FavoriteIcon className="text-sm" />
                </div>
              </div>

              <div className="text-center space-y-3">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-1 justify-center">
                  <span className="text-2xl">🎮</span>
                  歡迎來到嗄歐麥麥
                  <span className="text-2xl">✨</span>
                </h2>

                <div className="bg-white/80 rounded-lg px-2 py-5 text-sm text-gray-700 leading-relaxed">
                  <p className="font-medium text-orange-600 mb-2">
                    🌟專為ACG愛好者打造的溫馨小站
                  </p>
                  <span className="text-left">
                    <p className="ml-3">
                      在這個匿名的二次元世界裡
                      <br />
                      你可以：
                    </p>
                  </span>
                  <div className="mt-2 ml-3 space-y-1 text-xs">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                      <span>分享你的遊戲心得與動漫感想</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <span>尋找志同道合的二次元夥伴</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span>放下面具，暢所欲言真實想法</span>
                    </div>
                  </div>
                  <p className="mt-3 text-center font-medium text-gray-600">
                    💭 今天想聊什麼有趣的話題呢？
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 -right-1">
              <Link
                href="/about"
                className="bg-orange-400 hover:bg-orange-500 text-white text-xs font-bold rounded-full px-4 py-2 shadow-md transition-colors duration-200 flex items-center gap-1"
              >
                <BookIcon className="text-sm" />
                了解更多
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default FeedLayout;

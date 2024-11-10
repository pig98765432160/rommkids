import { FC, ReactNode } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { EnvelopeIcon, FBIcon, IGIcon, YTIcon } from "../Icons/icons";

interface Props {
  children: ReactNode;
}

const FeedLayout: FC<Props> = (props) => {
  const { children } = props;
  const router = useRouter();
  const { pathname } = useRouter();

  return (
    <div className="w-full relative flex justify-center py-[100px] bg-cute-beige">
      <div className="w-full lg:max-w-[960px] flex flex-col gap-5 mt-5">
        <ul className="w-full h-[50px] flex items-center gap-8 bg-brown text-white text-lg font-black px-8">
          <li>全部</li>
          <li>生活</li>
          <li>閒聊</li>
          <li>親子</li>
          <li>遊戲</li>
        </ul>
        <div className="flex justify-between">
          <article className="w-full lg:w-[630px] bg-white">{children}</article>
          <div className="w-[300px] flex flex-col gap-5">
            <div className="w-full flex flex-col gap-4 bg-white rounded px-6 pt-12 pb-8">
              <Image
                src="/assets/image/common/intro.png"
                alt="intro_img"
                width={358}
                height={245}
                className="w-full h-[172px]"
              />
              <span className="w-full text-center">
                <h3 className="text-3xl text-brown font-black">關於我們</h3>
              </span>
              <p>
                大家好！歡迎來到嗄歐麥麥！我們的創意分享小天地
                <br />
                創作 X 電玩 X 動漫 X 烹飪 X 科技
                <br />
                彙集有趣好玩又新奇的內容，待你來探索！
              </p>
            </div>
            <div className="w-full flex flex-col bg-white rounded">
              <div className="w-full text-center py-4 bg-brown rounded-t px-8">
                <h3 className="text-xl text-white font-black">FOLLOW US</h3>
              </div>
              <div className="w-full flex justify-center gap-4 py-5 px-8">
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
        </div>
      </div>
    </div>
  );
};

export default FeedLayout;

import React, { FC } from "react";
import Image from "next/image";

const MainBanner: FC = () => {
  return (
    <div className="relative max-w-[1200px] mx-auto h-[500px] rounded-3xl overflow-hidden mt-5">
    <Image
      src={"/assets/image/homepage/title_top.png"}
      alt={""}
      className="w-full h-full bg-cute-light-yellow object-contain object-center"
      width={1920}
      height={1080}
    />

    {/* <div className="absolute left-20 bottom-20 flex flex-col gap-1">
      <h3 className="w-fit bg-section-color text-2xl font-black text-brown border-2 border-brown rounded-2xl px-5 py-2">
        嗨！歡迎來到嗄歐麥麥～
      </h3>
      <h5 className="w-fit bg-section-color text-2xl font-black text-brown border-2 border-brown rounded-2xl px-5 py-2">
        在這裡我們會分享生活的大小事 ٩(｡・ω・｡)و
      </h5>
      <h5 className="w-fit bg-section-color text-2xl font-black text-brown border-2 border-brown rounded-2xl px-5 py-2">
        跟著我們一起來探索吧！
      </h5>
    </div> */}
    <div className="absolute bottom-5 right-5">
      <Image
        src={"/assets/image/homepage/main-01.png"}
        alt={""}
        className="w-[300px] h-[188px]"
        width={815}
        height={511}
      />
    </div>
  </div>
  );
};

export default MainBanner;

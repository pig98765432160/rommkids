import { YoutubeEmbed } from "@/components/Common";
import { MenuItemBg } from "@/components/Icons/menuItemIcon";
import { axiosPost } from "@/helpers/baseAxios";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isError, setIsError] = useState(false);
  return (
    <main className="w-full mx-auto pt-[--header-height]">
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
      <article className="max-w-[1200px] mx-auto flex flex-col gap-7 py-12 text-center">
        <h2 className="text-3xl font-black text-brown text-center">
          ROMM DAILY
        </h2>

        <div className="home-yt grid grid-cols-3 gap-5 justify-items-center">
          <div className="w-full flex flex-col items-center border border-brown rounded-3xl">
            <YoutubeEmbed videoId="C9vvN2zo-MY" />
            <hr className="w-full border-b-2 border-brown" />
            <p className="text-center text-brown font-black py-5">
              日本VLOG 2024 大阪自由行ep.1
            </p>
          </div>
          <div className="w-full flex flex-col items-center border border-brown rounded-3xl">
            <YoutubeEmbed videoId="-Pg9U8YjRFY" />
            <hr className="w-full border-b-2 border-brown" />
            <p className="text-center text-brown font-black py-5">
              日本VLOG 2024 大阪自由行ep.2
            </p>
          </div>
          <div className="w-full flex flex-col items-center border border-brown rounded-3xl">
            <YoutubeEmbed videoId="97cfOQs7zhw" />
            <hr className="w-full border-b-2 border-brown" />
            <p className="text-center text-brown font-black py-5">
              台南VLOG 2024浪人祭
            </p>
          </div>
        </div>
        <div className="w-full flex items-center justify-center mt-5">
          <button className="bg-brown text-white hover:bg-dark-brown font-black rounded px-12 py-2">
            點我看更多
          </button>
        </div>
      </article>

      {/* <section className="w-full bg-cute-light-yellow py-40">
        <div className="px-28">
          <div className="relative w-full h-[550px] bg-white rounded-3xl mx-auto">
            <div className="absolute w-full max-w-[1500px] -top-40 flex items-center justify-between p-12">
              <div className="text-area">
                <p>123123123</p>
              </div>
              <div className="w-[600px] h-[600px] border-white border-[12px] rounded-3xl overflow-hidden">
                <Image
                  loader={({ src }) => src}
                  src={"/assets/image/test.jpg"}
                  alt="boardImage"
                  className="w-full h-full object-cover object-center"
                  width={1920}
                  height={1080}
                  priority={true}
                  placeholder="blur"
                  blurDataURL="/user/member_header_bg.gif"
                  onError={() => setIsError(true)}
                  unoptimized={true}
                />
              </div>
            </div>
          </div>
        </div>
        <Image
          loader={({ src }) => src}
          src={"/assets/image/common/about_box01_wave.png"}
          alt="about-wave"
          className="w-full h-auto absolute bottom-0"
          width={2948}
          height={120}
          unoptimized={false}
        />
      </section> */}
    </main>
  );
}

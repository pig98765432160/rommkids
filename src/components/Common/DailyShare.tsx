import React, { FC } from "react";
import { YoutubeEmbed } from "@/components/Common";

const DailyShare: FC = () => {
  return (
    <article className="max-w-[1200px] mx-auto flex flex-col gap-7 py-12 text-center">
      <h2 className="text-3xl font-black text-brown text-center">ROMM DAILY</h2>

      <div className="home-yt grid grid-cols-3 gap-5 justify-items-center">
        <YoutubeEmbed showLatestVideos={true} />
        <div className="w-full flex flex-col items-center border border-brown rounded-3xl">
          {/* <hr className="w-full border-b-2 border-brown" />
        <p className="text-center text-brown font-black py-5">
          日本VLOG 2024 大阪自由行ep.1
        </p> */}
        </div>
        {/* <div className="w-full flex flex-col items-center border border-brown rounded-3xl">
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
      </div> */}
      </div>
      <div className="w-full flex items-center justify-center mt-5">
        <button className="bg-brown text-white hover:bg-dark-brown font-black rounded px-12 py-2">
          點我看更多
        </button>
      </div>
    </article>
  );
};

export default DailyShare;

import { useRouter } from "next/router";
import Image from "next/image";
import { FC, useContext, useEffect, useState } from "react";
import {
  IconButton,
  Menu,
  Avatar,
  Divider,
  Skeleton,
  Backdrop,
  Tooltip,
} from "@mui/material";
import Link from "next/link";

const Header = () => {
  const router = useRouter();
  return (
    <header>
      <div className="relative w-full md:w-[1000px] h-[513px] mx-auto mt-3">
        <Image
          src={"/SVG/TOP_bb.svg"}
          alt="boardImage"
          width={1439}
          height={739}
          className="w-full"
        />
        <h1 className="absolute top-20 left-24">
          <Image
            src={"/ROMM/05.png"}
            alt={"logo"}
            width={440}
            height={176}
            className="w-[220px]"
          />
        </h1>
        <div className="absolute top-20 right-20 flex items-center gap-3">
          {/* <Image
            src={"/SVG/TOP_search.svg"}
            alt={"fb"}
            width={280}
            height={86}
            className="w-[280px] h-[86px]"
          /> */}
          <Link
            target="_blank"
            rel="stylesheet"
            href="https://www.facebook.com/profile.php?id=100063976814943"
            className="hover:icon-hover"
          >
            <Image
              src={"/SVG/TOP_fb.svg"}
              alt={"fb"}
              width={100}
              height={93}
              className="w-[60px]"
            />
          </Link>

          <Link
            target="_blank"
            rel="stylesheet"
            href="https://www.instagram.com/romm1201/"
          >
            <Image
              src={"/SVG/TOP_ig.svg"}
              alt={"ig"}
              width={100}
              height={93}
              className="w-[60px]"
            />
          </Link>
          <Link
            target="_blank"
            rel="stylesheet"
            href="https://www.youtube.com/@romm501/streams"
          >
            <Image
              src={"/SVG/TOP_yt.svg"}
              alt={"yt"}
              width={100}
              height={93}
              className="w-[60px]"
            />
          </Link>
        </div>
        <div className="w-full absolute top-44 flex items-center justify-center gap-8">
          <Image
            src="/ROMM/10.png"
            width={436}
            height={364}
            className="w-[250px]"
            alt="嗄歐"
          />
          <Image
            src="/ROMM/11.png"
            width={436}
            height={364}
            className="w-[250px]"
            alt="麥麥"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

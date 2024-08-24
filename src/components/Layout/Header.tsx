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
import { MenuItemBg } from "../Icons/menuItemIcon";

const Header: FC = () => {
  const router = useRouter();

  return (
    <header className="head absolute top-0 left-0 w-full h-[130px] flex justify-between z-50 bg-white">
      <h1 className="absolute top-0 left-0 w-60 z-10">
        <Link href="/" className="w-60">
          <Image
            src="/assets/image/common/logo.png"
            alt="Romm 嗄歐麥麥"
            width={500}
            height={355}
            className="rounded-br-3xl"
          />
        </Link>
      </h1>
      <div className="relative w-full flex items-center justify-center gap-28 mx-auto">
        <Link href="/forums" className="relative text-brown font-black">
          <p className="relative z-10">論壇 FORUMS</p>
          <MenuItemBg
            width={160}
            height={40}
            className="absolute -top-2 -left-4 icon-cute-yellow"
          />
        </Link>
        <Link
          href="/lifestyle"
          className="relative menu02 text-brown font-black"
        >
          <p className="relative z-10">日誌 LIFESTYLE</p>
          <MenuItemBg
            width={160}
            height={40}
            className="absolute -top-2 -left-4 icon-cute-blue"
          />
        </Link>
        <Link
          href="/creative"
          className="relative menu03 text-brown font-black"
        >
          <p className="relative z-10">發想 CREATIVE</p>
          <MenuItemBg
            width={160}
            height={40}
            className="absolute -top-2 -left-4 icon-cute-green"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;

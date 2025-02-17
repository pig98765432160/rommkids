import Image from "next/image";
import { FC } from "react";
import Link from "next/link";
import {
  CrownIcon,
  FlowerIcon,
  FootPrintIcon,
  ShootingStarIcon,
  SunIcon,
} from "@/components/Icons/headerIcons";

const SiteMenu: FC = () => {
  return (
    <ul className="w-full flex items-center justify-around overflow-auto text-sm px-48">
      <li className="relative w-full text-center text-brown font-black">
        <Link
          href="/forums/knowledge"
          className="flex flex-col items-center justify-center gap-1 group"
        >
          <SunIcon width={32} height={32} className="group-hover:rotate-12" />
          <p>知識・科普</p>
        </Link>
        <span className="absolute right-0 top-2/4 -translate-y-2/4 w-px h-[44%] bg-border"></span>
      </li>
      <li className="relative w-full text-center text-brown font-black">
        <Link
          href="/forums/learning"
          className="flex flex-col items-center justify-center gap-1 group"
        >
          <FlowerIcon
            width={32}
            height={32}
            className="group-hover:rotate-12"
          />
          <p className="relative z-10">語言學習</p>
        </Link>
        <span className="absolute right-0 top-2/4 -translate-y-2/4 w-px h-[44%] bg-border"></span>
      </li>
      <li className="relative w-full text-center text-brown font-black">
        <Link
          href="/forums/funny"
          className="flex flex-col items-center justify-center gap-1 group"
        >
          <CrownIcon width={32} height={32} className="group-hover:rotate-12" />
          <p className="relative z-10">休閒娛樂</p>
        </Link>
        <span className="absolute right-0 top-2/4 -translate-y-2/4 w-px h-[44%] bg-border"></span>
      </li>
      <li className="relative w-full text-center text-brown font-black">
        <Link
          href="/forums/life"
          className="flex flex-col items-center justify-center gap-1 group"
        >
          <ShootingStarIcon
            width={32}
            height={32}
            className="group-hover:rotate-12"
          />
          <p className="relative z-10">生活・日常</p>
        </Link>
        <span className="absolute right-0 top-2/4 -translate-y-2/4 w-px h-[44%] bg-border"></span>
      </li>
      <li className="relative w-full text-center text-brown font-black">
        <Link
          href="/about"
          className="flex flex-col items-center justify-center gap-1 group"
        >
          <FootPrintIcon
            width={32}
            height={32}
            className="group-hover:rotate-12"
          />
          <p className="relative z-10">關於我們</p>
        </Link>
      </li>
    </ul>
  );
};

export default SiteMenu;

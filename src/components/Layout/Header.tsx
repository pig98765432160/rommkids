import Image from "next/image";
import { FC } from "react";
import Link from "next/link";
import styles from "@/styles/head.module.scss";
import SiteMenu from "./SiteMenu";
import { EnvelopeIcon, FBIcon, IGIcon, YTIcon } from "../Icons/icons";

const Header: FC = () => {
  return (
    <header className={styles.head}>
      <div className={styles.headerContainer}>
        <Link href="/">
          <div className="relative w-[calc(163/390*100vw)] lg:w-[160px] aspect-[512/98]">
            <Image
              src="/assets/image/common/logo_2.png"
              alt="Romm 嗄歐麥麥"
              width={512}
              height={98}
              className="w-full h-full"
              priority={true}
            />
          </div>
        </Link>

        <SiteMenu />

        <div className="w-[250px] flex items-end justify-center">
          {/* <Link href="/login" className="text-brown font-black">
            <p>登入</p>
          </Link> */}
        </div>
        <div className="absolute top-0 right-0 flex gap-5 mt-2">
          <button className="icon-header-icon hover:icon-primary">
            <FBIcon width={20} height={20} className="" />
          </button>
          <button className="icon-header-icon hover:icon-hot">
            <IGIcon width={20} height={20} className="" />
          </button>
          <button className="icon-header-icon hover:icon-hot">
            <YTIcon width={20} height={20} className="" />
          </button>
          <button className="icon-header-icon hover:icon-primary">
            <EnvelopeIcon width={20} height={20} className="" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

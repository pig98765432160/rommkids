import Image from "next/image";
import { FC } from "react";
import Link from "next/link";
import styles from "@/styles/head.module.scss";
import SiteMenu from "./SiteMenu";

const Header: FC = () => {
  return (
    <header className={styles.head}>
      <Link href="/" className="w-auto">
        <Image
          src="/assets/image/common/logo.png"
          alt="Romm 嗄歐麥麥"
          width={2272}
          height={563}
          className="w-[calc(163/390*100vw)] lg:w-[250px] h-auto"
        />
      </Link>

      <SiteMenu />

      <div className="w-[250px] flex items-center justify-center">
        <Link href="/login" className="text-brown font-black">
          <p>登入</p>
        </Link>
      </div>
    </header>
  );
};

export default Header;

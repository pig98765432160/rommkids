import Link from "next/link";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import { FBIcon, YTIcon } from "../Icons/icons";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white py-8">
      <div className="py-5 w-full lg:max-w-[1048px] mx-auto flex justify-between mb-8 gap-2">
        <div className="flex flex-col items-center">
          <Image
            src="/assets/image/common/logo.png"
            alt="Romm 嗄歐麥麥"
            width={500}
            height={355}
            className="w-[250px] "
            priority
          />
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <p className=" text-gray-500 mb-2">關於</p>
          <Link href="/about" className="hover:text-primary">
            關於我們
          </Link>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-500 mb-2">訂閱我們</p>
          <div className="flex gap-4">
            <Link
              aria-label="facebook 粉絲團"
              target="_blank"
              href="https://www.facebook.com/GameSmash"
              className="hover:icon-primary"
            >
              <FBIcon width={48} height={48} className="" />
            </Link>
            <Link
              aria-label="youtube 影音頻道"
              target="_blank"
              href="https://www.youtube.com/channel/UCd4vjuRpRn8Ibd3OcPZHsuw"
              className="hover:icon-hot"
            >
              <YTIcon width={48} height={48} className="" />
            </Link>
          </div>
        </div>
      </div>
      <Divider />
      <p className="text-center text-sm text-gray-400 mt-3">2024 © romm.com</p>
    </footer>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Divider, Tooltip } from "@mui/material";
import { useState } from "react";
import { FBIcon, YTIcon } from "../Icons/icons";

export default function Footer() {
  const [hoverYT, setHoverYT] = useState(false);

  return (
    <>
      <footer>
        <div className="md:pt-2 relative w-full border-t bg-white">
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
                <Tooltip title="嗄歐麥麥 facebook 粉絲團" arrow placement="top">
                  <Link
                    aria-label="facebook 粉絲團"
                    target="_blank"
                    href="https://www.facebook.com/GameSmash"
                    className="group"
                  >
                    <FBIcon
                      width={48}
                      height={48}
                      className="group-hover:icon-primary"
                    />
                  </Link>
                </Tooltip>
                <Tooltip title="嗄歐麥麥 youtube 頻道" arrow placement="top">
                  <Link
                    aria-label="youtube 影音頻道"
                    target="_blank"
                    href="https://www.youtube.com/channel/UCd4vjuRpRn8Ibd3OcPZHsuw"
                    onMouseEnter={() => setHoverYT(true)}
                    onMouseLeave={() => setHoverYT(false)}
                  >
                    <YTIcon
                      width={48}
                      height={48}
                      className=""
                      hoverColor={hoverYT ? "#FF0000" : "#A0A0A0"}
                    />
                  </Link>
                </Tooltip>
              </div>
            </div>
          </div>
          <Divider />
          <div className="mx-auto w-full lg:max-w-[1048px] mt-8 pb-10">
            <p className="text-sm text-gray-400">2024 © romm.com</p>
          </div>
        </div>
      </footer>
    </>
  );
}

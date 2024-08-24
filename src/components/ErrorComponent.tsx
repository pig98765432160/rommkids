import { Skeleton } from "@mui/material";
import { FC, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
interface ErrorComponentProps {
  code: any;
  important?: boolean;
}

const ErrorComponent: FC<ErrorComponentProps> = (props) => {
  const { code } = props;
  if (code === 401) {
    return (
      <div className="w-full block-primary flex flex-col gap-3 px-5 pt-5 pb-3">
        <Skeleton variant="text" width="50%" />
        <Skeleton variant="rounded" width="100%" height="40px" />
        <Skeleton variant="text" width="100%" />
        <div className="w-full flex items-center mt-3">
          <Skeleton
            variant="circular"
            width={50}
            height={50}
            sx={{ marginRight: 2 }}
          />

          <div className="flex justify-between lg:justify-start lg:flex-col flex-1">
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="30%" />
          </div>
        </div>
        <Skeleton
          variant="rounded"
          width="100%"
          height="300px"
          sx={{ marginTop: 2 }}
        />
        <div className="w-full flex flex-col items-center gap-3 text-center my-4">
          <Skeleton variant="rounded" width="60%" height="30px" />
          <Skeleton variant="rounded" width="90%" height="40px" />
        </div>
      </div>
    );
  } else if (code === 404) {
    return (
      <div className="block-primary flex flex-col pt-12 pb-24 lg:py-8 items-center h-full">
        <Image
          className="w-[200px] h-[200px] md:w-[220px] md:h-[220px]"
          src="/feed/comment/noComment_Do_img.gif"
          alt="快點留言的阿豆"
          width={220}
          height={220}
        />
        <p className="text-gray-900 font-semibold text-xl md:text-2xl mb-10 text-center">
          NotFound!!! <br className="md:hidden" />
          找不到網頁RRRRRRRR!!!
        </p>
        <Link href="/">
          <button className="px-12 py-2 md:text-lg bg-primary text-white rounded-lg">
            返回首頁
          </button>
        </Link>
      </div>
    );
  } else if (code === 500) {
    return (
      <div className="block-primary flex flex-col pt-12 pb-24 lg:py-8 items-center h-full">
        <Image
          className="w-[200px] h-[200px] md:w-[220px] md:h-[220px]"
          src="/feed/comment/noComment_Do_img.gif"
          alt="快點留言的阿豆"
          width={220}
          height={220}
        />
        <p className="text-gray-900 font-semibold text-xl md:text-2xl mb-10 text-center">
          Ooooops!!! <br className="md:hidden" />
          請稍後再試
        </p>
        <Link href="/">
          <button className="px-12 py-2 md:text-lg bg-primary text-white rounded-lg">
            返回首頁
          </button>
        </Link>
      </div>
    );
  } else {
    return null;
  }
};

export default ErrorComponent;

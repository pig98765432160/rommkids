import { Skeleton } from "@mui/material";
import React, { FC } from "react";

const FeedItemLoading: FC = () => {
  return (
    <div className="w-full lg:w-[728px] flex flex-col gap-2 px-4 py-4 mb-1 lg:mb-3 rounded bg-white">
      <div className="hidden lg:flex items-center ">
        <Skeleton variant="circular" width={30} height={30} />
        <Skeleton variant="text" width="50%" sx={{ marginLeft: "8px" }} />
      </div>
      <div className="flex lg:hidden items-center ">
        <Skeleton variant="circular" width={20} height={20} />
        <Skeleton variant="text" width="50%" sx={{ marginLeft: "6px" }} />
      </div>
      <div className="flex items-start justify-between">
        <div className="flex flex-col w-full">
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </div>
      </div>
      <Skeleton variant="text" width="40%" />
    </div>
  );
};

export default FeedItemLoading;

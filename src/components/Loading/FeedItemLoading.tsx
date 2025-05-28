import { Skeleton } from "@mui/material";
import React, { FC } from "react";

const FeedItemLoading: FC = () => {
  return (
    <li className="w-[262px] flex flex-col gap-3">
      <Skeleton variant="rectangular" width="262px" height="262px" />
      <div className="flex flex-col gap-1">
        <Skeleton variant="rectangular" width="40%" height="16px" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
      </div>

      <div className="w-full py-1 border-y border-dashed border-gray-500">
        <Skeleton variant="text" width="100%" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="30%" />
      </div>
    </li>
  );
};

export default FeedItemLoading;

import { Skeleton } from "@mui/material";
import React, { FC } from "react";

const FeedItemLoading: FC = () => {
  return (
    <div className="w-full flex items-center gap-4 p-4 image-box border-b border-gray-300">
      <Skeleton variant="rectangular" width="300px" height="180px" />
      <div className="flex-1 flex flex-col gap-3">
        <Skeleton variant="rectangular" width="100%" height="64px" />
        <Skeleton variant="rectangular" width="100%" height="40px" />
        <Skeleton variant="rectangular" width="40%" height="16px" />
      </div>
    </div>
  );
};

export default FeedItemLoading;

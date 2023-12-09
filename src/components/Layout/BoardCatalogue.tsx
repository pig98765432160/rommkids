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

const BoardCatalogue = () => {
  const router = useRouter();
  return (
    <>
      <div className="grid grid-cols-5 gap-8 mt-10 px-20">
        <button className="board-catalogue">FUN玩</button>
        <button className="board-catalogue">學習天地</button>
        <button className="board-catalogue">Q & A</button>
        <button className="board-catalogue">聽書</button>
        <button className="board-catalogue">關於我們</button>
      </div>
    </>
  );
};

export default BoardCatalogue;

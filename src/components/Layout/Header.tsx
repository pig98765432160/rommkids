import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";
import {
  IconButton,
  Menu,
  Avatar,
  Divider,
  Skeleton,
  Backdrop,
} from "@mui/material";

const Header = () => {
  const router = useRouter();
  return (
    <header>
      <h1 id="logo">嗄歐麥麥</h1>
    </header>
  );
};

export default Header;

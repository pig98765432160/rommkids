import Link from "next/link";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import { FBIcon, YTIcon } from "../Icons/icons";

export default function Footer() {
  return (
    <footer className="w-full flex items-center justify-center gap-8 bg-[#333333] py-8">
      <ul className="flex items-center justify-center gap-5 text-white font-black">
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
          <Link href="/privacy">Privacy</Link>
        </li>
      </ul>
      <p className="text-center text-sm text-white">© romm.com</p>
    </footer>
  );
}

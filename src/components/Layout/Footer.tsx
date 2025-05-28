import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full bg-white pt-8 pb-5">
      <div className="w-[1280px] flex items-center justify-between gap-5 mx-auto">
        <div className="relative w-[calc(163/390*100vw)] lg:w-[250px] aspect-[2272/563]">
          <Image
            src="/assets/image/common/logo.png"
            alt="Romm 嗄歐麥麥"
            width={2272}
            height={563}
            className="w-full h-full"
            priority={true}
          />
        </div>
        <ul className="flex items-center justify-center gap-12 font-black">
          <li>
            <Link href="/about">關於我們</Link>
          </li>
          <li>
            <Link href="/contact">聯絡我們</Link>
          </li>
          <li>
            <Link href="/privacy">隱私權</Link>
          </li>
        </ul>
      </div>
      <p className="text-center text-sm">© romm.com</p>
    </footer>
  );
}

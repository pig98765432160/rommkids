import { FC } from "react";
import Link from "next/link";
import {
  AboutIcon,
  AnimeIcon,
  FunnyIcon,
  GameIcon,
  HeaderInfoIcon,
  LifeIcon,
} from "@/components/Icons/headerIcons";
import { EBoardType, EBoardTypeLabel } from "@/shared/types/Board";

const SiteMenu: FC = () => {
  const getIcon = (type: EBoardType) => {
    switch (type) {
      case EBoardType.KNOWLEDGE:
        return (
          <HeaderInfoIcon
            width={24}
            height={24}
            className="group-hover:rotate-12"
          />
        );
      case EBoardType.FUNNY:
        return (
          <FunnyIcon width={24} height={24} className="group-hover:rotate-12" />
        );
      case EBoardType.LIFE:
        return (
          <LifeIcon width={24} height={24} className="group-hover:rotate-12" />
        );
      case EBoardType.GAME:
        return (
          <GameIcon width={24} height={24} className="group-hover:rotate-12" />
        );

      case EBoardType.ANIME:
        return (
          <AnimeIcon width={24} height={24} className="group-hover:rotate-12" />
        );
      case EBoardType.ABOUT:
        return (
          <AboutIcon width={24} height={24} className="group-hover:rotate-12" />
        );
      default:
        return null;
    }
  };

  const type = Object.entries(EBoardTypeLabel).map(([key, value], index) => ({
    id: index + 1,
    label: value,
    type: key as EBoardType,
  }));

  return (
    <ul className="w-full h-full flex items-center justify-around overflow-auto text-sm px-20">
      {type.map((item, index) => (
        <li key={index} className="relative w-full border-r border-gray-400">
          <Link
            href={
              item.type === EBoardType.ABOUT
                ? item.type
                : `/forums/${item.type}`
            }
            className="flex items-center justify-center gap-1 group"
          >
            {getIcon(item.type)}
            <p className="relative z-10 text-dark-brown font-semibold">
              {item.label}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SiteMenu;

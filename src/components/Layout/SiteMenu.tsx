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
    <nav className="hidden md:flex">
      <ul className="flex items-center justify-center gap-6 text-sm">
        {type.map((item, index) => (
          <li key={index} className="relative">
            <Link
              href={
                item.type === EBoardType.ABOUT
                  ? item.type
                  : `/forums/${item.type}`
              }
              className="flex items-center justify-center gap-2 group px-3 py-2 rounded-lg hover:bg-white/30 transition-all duration-200"
            >
              <div className="transform group-hover:scale-110 transition-transform duration-200">
                {getIcon(item.type)}
              </div>
              <span className="text-dark-brown font-medium group-hover:text-dark-brown/80 transition-colors">
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SiteMenu;

import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";

interface Props {
  children: ReactNode;
}

const FeedLayout: FC<Props> = (props) => {
  const { children } = props;
  const router = useRouter();
  const { pathname } = useRouter();

  return (
    <div className="w-full relative flex justify-center py-[130px] bg-cute-beige">
      <div className="w-full lg:max-w-[960px] flex flex-col">
        <div className="w-full h-[50px] bg-cute-green my-5"></div>
        <div className="flex justify-between">
          <article className="w-full lg:w-[630px] bg-white">{children}</article>
          <div className="w-[300px] flex flex-col gap-4">
            <div className="w-full h-[500px] bg-cute-light-yellow"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedLayout;

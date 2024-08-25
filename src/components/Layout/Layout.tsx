import { FC, useMemo, createContext, useRef, useContext } from "react";
import { useRouter } from "next/router";
import { FeedLayout, Footer, Header } from "@/components/Layout";
import BoardCatalogue from "./BoardCatalogue";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { pathname } = useRouter();
  const rootPath = useMemo(() => pathname.split("/")[1], [pathname]);

  const getLayout = () => {
    switch (rootPath) {
      case "login":
        return <>{children}</>;
      case "404":
        return <>{children}</>;
      case "500":
        return <>{children}</>;
      case "forums":
      case "article":
        return (
          <>
            <Header />

            <FeedLayout>{children}</FeedLayout>
            <Footer />
          </>
        );
      default:
        return (
          <>
            <Header />
            {children}
            <Footer />
          </>
        );
    }
  };

  return getLayout();
};

export default Layout;

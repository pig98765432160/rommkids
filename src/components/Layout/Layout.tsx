import { FC, useMemo, createContext, useRef, useContext } from "react";
import { useRouter } from "next/router";
import BoardCatalogue from "./BoardCatalogue";
import dynamic from "next/dynamic";

const FeedLayout = dynamic(() => import("@/components/Layout/FeedLayout"));
const Header = dynamic(() => import("@/components/Layout/Header"));
const SiteMenu = dynamic(() => import("@/components/Layout/SiteMenu"));
const Footer = dynamic(() => import("@/components/Layout/Footer"));

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { pathname } = useRouter();
  const rootPath = useMemo(() => pathname.split("/")[1], [pathname]);

  const getLayout = () => {
    switch (rootPath) {
      case "login":
      case "404":
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
          <div className="data-content">
            <Header />
            {children}
            <Footer />
          </div>
        );
    }
  };

  return getLayout();
};

export default Layout;

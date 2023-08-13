import { FC, useMemo, createContext, useRef, useContext } from "react";
import { useRouter } from "next/router";
import { Header } from "@/components/Layout";

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
        return <>{children}</>;
      default:
        return (
          <>
            <Header />
            {children}
          </>
        );
    }
  };

  return getLayout();
};

export default Layout;

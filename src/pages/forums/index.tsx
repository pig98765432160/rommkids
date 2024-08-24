import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Script from "next/script";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Link from "next/link";
import { PageMetadata } from "@/components/PageMetadata";
import { BASE_URL } from "@/shared/constants";
import ErrorComponent from "@/components/ErrorComponent";
import { EStatus } from "@/shared/types/Status";

interface FeedProps {
  isError: boolean;
  errorCode: number;
}

const ForumsPage: NextPage<FeedProps> = (props) => {
  const { isError, errorCode } = props;
  const router = useRouter();
  const [login, setLogin] = useState(false);

  return (
    <>
      <PageMetadata
        title={"嗄歐麥麥"}
        description={""}
        ogImage={""}
        ogType="article"
        ogUrl={`${BASE_URL}${router.asPath}`}
      />
      {isError ? <ErrorComponent code={errorCode} /> : <></>}
    </>
  );
};

export default ForumsPage;

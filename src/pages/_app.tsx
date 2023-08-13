import Head from "next/head";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Layout>
        <Head>
          <title>嗄歐麥麥</title>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1.0,shrink-to-fit=no"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

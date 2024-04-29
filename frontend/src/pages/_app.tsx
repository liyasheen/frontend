import type { AppProps } from "next/app";
import { Providers } from "../../providers";
import { HomepageLayout } from "../../components/layout";
import "./../../index.css";

export default function App({ Component, pageProps }: AppProps) {
  console.log(JSON.stringify(pageProps));
  return (
    <Providers>
      <HomepageLayout>
        <Component {...pageProps} />
      </HomepageLayout>
    </Providers>
  );
}

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { Rubik } from "next/font/google";
import Layout from "@/components/layout";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  weight: ["300", "400", "500", "700", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${rubik.variable} font-sans`}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
          {/* 可以尝试把player放在这里，不rerender */}
          {/* nav看一下next文档里的https://nextjs.org/docs/basic-features/layouts */}
        </Layout>
      </Provider>
    </main >
  );
}

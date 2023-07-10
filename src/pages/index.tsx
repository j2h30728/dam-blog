import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[담의 블로그 만들기]</p>
        <p>과연 완성할 수 있을지!</p>
      </section>
    </Layout>
  );
}

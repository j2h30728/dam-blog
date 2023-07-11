import Head from "next/head";

import Layout, { siteTitle } from "../components/layout";
import { PostData, getSortedPostsData } from "../lib/posts";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Date from "@/components/date";
import Categories from "@/components/categories";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
export default function Home({ allPostsData }: { allPostsData: PostData[] }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.headingLg}>Dam의 블로그</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(
            ({ slug, date, title, description, categories }) => (
              <li className={utilStyles.listItem} key={slug}>
                <Link href={`/posts/${slug}`}>{title}</Link>
                <br />
                <Categories categories={categories} />
                <small className={utilStyles.lightText}>
                  <p>{description}</p>
                  <Date dateString={date} />
                </small>
              </li>
            )
          )}
        </ul>
      </section>
    </Layout>
  );
}

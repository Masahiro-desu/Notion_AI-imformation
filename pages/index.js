import Head from "next/head";
import Link from "next/link";
import Image from 'next/image'
import { getDatabase } from "../lib/notion";
import { Text } from "./[id].js";
import styles from "./index.module.css";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Notion Next.js blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <header className={styles.header}>
            <div className={styles.logos}>
              <Image src="/logo.png" alt="Logo" width={800} height={550} />
            </div>
            <h1>日々の学びまとめ</h1>
            <p>
              見に来ていただきありがとうございます🔥<br />
              どの記事も30秒で読めます。<br />
              自分が確実にブックマークしたいサイトを目指しますので、ぜひご覧ください。<br />
            </p>
        </header>
        <h2 className={styles.heading}>All Posts</h2>
        <ol className={styles.posts}>
          {posts.map((post) => {
            const date = new Date(post.last_edited_time).toLocaleString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            );
            return (
              <li key={post.id} className={styles.post}>
                <h3 className={styles.postTitle}>
                  <Link href={`/${post.id}`}>
                    <Text text={post.properties.Name.title} />
                  </Link>
                </h3>

                <p className={styles.postDescription}>{date}</p>
                <Link href={`/${post.id}`}>
                  Read post →
                </Link>
              </li>
            );
          })}
        </ol>
      </main>
    </div>
  );
}

//ISRを追加
export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);
  return {
    props: {
      posts: database,
    },
    revalidate:1,
  };
};
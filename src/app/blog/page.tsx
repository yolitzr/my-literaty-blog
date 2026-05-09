import Link from "next/link";
import type { Metadata } from "next";
import { getPostsForBlog } from "@/lib/strapi";
import PostsGrid from "@/components/blog/PostsGrid";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Blog | Yolit's Bookish",
  description: "Conversaciones, reflexiones y descubrimientos literarios.",
};

export default async function BlogPage() {
  let posts = [];

  try {
    const res = await getPostsForBlog(1, 100);
    posts = res.data;
  } catch {
    // Strapi offline
  }

  const categories = [
    ...new Set(
      posts.flatMap((p) => p.categories?.map((c) => c.name) ?? [])
    ),
  ].sort();

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <div className="container">
          <Link href="/">Inicio</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span>Blog</span>
        </div>
      </nav>

      {/* Header + Grid */}
      <div className="container" style={{ paddingTop: "var(--spacing-xl)", paddingBottom: "var(--spacing-xl)" }}>
        <div className={styles.archiveHeader}>
          <h1 className={styles.archiveTitle}>Blog</h1>
          <p className={styles.archiveDescription}>
            Conversaciones, reflexiones y descubrimientos literarios
          </p>
        </div>

        <PostsGrid posts={posts} categories={categories} />
      </div>
    </div>
  );
}

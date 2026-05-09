import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { FaCalendarAlt, FaClock, FaFolder, FaBookOpen, FaFolder as FaFolderIcon } from "react-icons/fa";
import { getPostDetail, getRelatedBlogPosts, getPrevPost, getNextPost, getCategories } from "@/lib/strapi";
import BlocksRenderer from "@/components/ui/BlocksRenderer";
import ReviewShareButtons from "@/components/book-review/ReviewShareButtons";
import SidebarNewsletter from "@/components/book-review/SidebarNewsletter";
import type { BlockNode, TextNode, BlocksContent } from "@/types/strapi";
import styles from "./page.module.css";

const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";

function imgUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
}

function countWords(blocks: BlocksContent | null): number {
  let w = 0;
  for (const block of blocks ?? []) {
    for (const child of (block.children as Array<BlockNode | TextNode>) ?? []) {
      if ((child as TextNode).type === "text") {
        w += ((child as TextNode).text ?? "").trim().split(/\s+/).filter(Boolean).length;
      }
    }
  }
  return w;
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await getPostDetail(slug);
    const post = res.data[0];
    if (!post) return {};
    return { title: `${post.title} | Blog | Yolit's Bookish` };
  } catch { return {}; }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [postRes, relatedRes, prevRes, nextRes, categoriesRes] = await Promise.allSettled([
    getPostDetail(slug),
    getRelatedBlogPosts(slug, 4),
    (async () => { /* will fill after getting post */ })(),
    (async () => { /* will fill after getting post */ })(),
    getCategories(),
  ]);

  const post = postRes.status === "fulfilled" ? postRes.value.data[0] : null;
  if (!post) notFound();

  const related = relatedRes.status === "fulfilled" ? relatedRes.value.data : [];
  const categories = categoriesRes.status === "fulfilled" ? categoriesRes.value.data : [];

  // Fetch prev/next now that we have the post's createdAt
  const [prevRes2, nextRes2] = await Promise.allSettled([
    getPrevPost(post.createdAt),
    getNextPost(post.createdAt),
  ]);

  const prevPost = prevRes2.status === "fulfilled" ? prevRes2.value.data[0] : null;
  const nextPost = nextRes2.status === "fulfilled" ? nextRes2.value.data[0] : null;

  const coverUrl = imgUrl(post.cover?.formats?.large?.url ?? post.cover?.url);
  const readingTime = Math.max(1, Math.ceil(countWords(post.content) / 200));

  const contentBlocks = post.content ?? [];
  const hasIntro = contentBlocks[0]?.type === "paragraph";
  const introParagraph = hasIntro ? contentBlocks.slice(0, 1) : [];
  const bodyBlocks = hasIntro ? contentBlocks.slice(1) : contentBlocks;

  // Count posts per category
  const totalPosts = categories.length; // proxy stat

  return (
    <>
      <nav className={styles.breadcrumb}>
        <div className="container">
          <Link href="/">Inicio</Link>
          <span className={styles.sep}>/</span>
          <Link href="/blog">Blog</Link>
          {post.categories?.[0] && (
            <>
              <span className={styles.sep}>/</span>
              <span>{post.categories[0].name}</span>
            </>
          )}
          <span className={styles.sep}>/</span>
          <span>{post.title}</span>
        </div>
      </nav>

      <div className={styles.container}>

        {/* ── Main ── */}
        <main className={styles.main}>
          {coverUrl && (
            <div className={styles.coverWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={coverUrl} alt={post.title} className={styles.coverImage} />
            </div>
          )}

          <header className={styles.postHeader}>
            <h1 className={styles.postTitle}>{post.title}</h1>
            <div className={styles.postMeta}>
              <div className={styles.metaItem}>
                <FaCalendarAlt />
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <div className={styles.metaItem}>
                <FaClock />
                <span>{readingTime} min de lectura</span>
              </div>
              {post.categories && post.categories.length > 0 && (
                <div className={styles.metaItem}>
                  <FaFolder />
                  <span>
                    {post.categories.map((c, i) => (
                      <span key={c.id}>
                        {i > 0 && ", "}
                        <Link href={`/blog?categoria=${c.slug}`}>{c.name}</Link>
                      </span>
                    ))}
                  </span>
                </div>
              )}
            </div>
          </header>

          <article>
            {hasIntro && (
              <div className={styles.postIntro}>
                <BlocksRenderer content={introParagraph} />
              </div>
            )}
            <div className={styles.postBody}>
              <BlocksRenderer content={bodyBlocks} />
            </div>
          </article>

          {/* Tags (categories as pills) */}
          {post.categories && post.categories.length > 0 && (
            <div className={styles.tagsSection}>
              <p className={styles.tagsTitle}>Categorías</p>
              <div className={styles.tagsContainer}>
                {post.categories.map((c) => (
                  <Link key={c.id} href={`/blog?categoria=${c.slug}`} className={styles.tag}>
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Share */}
          <div className={styles.shareSection}>
            <span className={styles.shareLabel}>¿Te gustó esta entrada? ¡Compártela!</span>
            <ReviewShareButtons title={post.title} />
          </div>

          {/* Post navigation */}
          {(prevPost || nextPost) && (
            <div className={styles.postNav}>
              <div className={styles.navLinks}>
                {prevPost ? (
                  <div className={styles.navPrev}>
                    <span className={styles.navLabel}>← Publicación anterior</span>
                    <Link href={`/blog/${prevPost.slug}`} className={styles.navTitle}>
                      {prevPost.title}
                    </Link>
                  </div>
                ) : <div />}
                {nextPost ? (
                  <div className={styles.navNext}>
                    <span className={styles.navLabel}>Publicación siguiente →</span>
                    <Link href={`/blog/${nextPost.slug}`} className={styles.navTitle}>
                      {nextPost.title}
                    </Link>
                  </div>
                ) : <div />}
              </div>
            </div>
          )}
        </main>

        {/* ── Sidebar ── */}
        <aside className={styles.sidebar}>

          {/* Author widget */}
          <div className={styles.authorWidget}>
            <div className={styles.authorHeader}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80"
                alt="Yolit Carolina"
                className={styles.authorAvatar}
              />
              <div>
                <h4 className={styles.authorName}>Yolit Carolina</h4>
                <p className={styles.authorRole}>Lectora compulsiva &amp; Book Blogger</p>
              </div>
            </div>
            <div className={styles.authorStats}>
              <div className={styles.authorStat}>
                <span className={styles.authorStatNumber}>{totalPosts || "∞"}</span>
                <span className={styles.authorStatLabel}>Categorías</span>
              </div>
              <div className={styles.authorStat}>
                <span className={styles.authorStatNumber}>♥</span>
                <span className={styles.authorStatLabel}>Libros</span>
              </div>
            </div>
            <Link href="/about-me" className={styles.authorLink}>
              Ver más sobre mí →
            </Link>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div className={styles.related}>
              <h4 className={styles.relatedTitle}>
                <FaBookOpen />
                Entradas recomendadas
              </h4>
              <ul className={styles.relatedList}>
                {related.map((r) => {
                  const thumb = imgUrl(r.cover?.formats?.thumbnail?.url ?? r.cover?.url);
                  return (
                    <li key={r.id} className={styles.relatedItem}>
                      <Link href={`/blog/${r.slug}`}>
                        {thumb ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={thumb} alt={r.title} className={styles.relatedThumb} />
                        ) : (
                          <div className={styles.relatedThumbPlaceholder}>📝</div>
                        )}
                        <div className={styles.relatedInfo}>
                          <h5>{r.title}</h5>
                          <time>{formatDate(r.createdAt)}</time>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Newsletter */}
          <SidebarNewsletter />

          {/* Categories */}
          {categories.length > 0 && (
            <div className={styles.categories}>
              <h4 className={styles.categoriesTitle}>
                <FaFolderIcon />
                Categorías
              </h4>
              <ul className={styles.categoriesList}>
                {categories.map((cat) => (
                  <li key={cat.id} className={styles.categoryItem}>
                    <Link href={`/blog?categoria=${cat.slug}`}>
                      <div className={styles.categoryIcon}><FaFolderIcon /></div>
                      <div>
                        <div className={styles.categoryName}>{cat.name}</div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}

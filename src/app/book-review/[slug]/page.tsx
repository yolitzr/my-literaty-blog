import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { FaCalendarAlt, FaClock, FaTags, FaBookOpen } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { getReviewDetail, getRelatedReviews } from "@/lib/strapi";
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
  return new Date(d).toLocaleDateString("es-ES", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function formatYear(d: string | null) {
  return d ? new Date(d).getFullYear().toString() : null;
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

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className={styles.ratingStars}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? undefined : styles.ratingEmpty}>★</span>
      ))}
    </div>
  );
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await getReviewDetail(slug);
    const review = res.data[0];
    if (!review) return {};
    return {
      title: `${review.title} | Reseñas | Yolit's Bookish`,
      description: `Reseña de "${review.book?.title ?? review.title}"`,
    };
  } catch {
    return {};
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ReviewDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [reviewRes, relatedRes] = await Promise.allSettled([
    getReviewDetail(slug),
    getRelatedReviews(slug, 3),
  ]);

  const review = reviewRes.status === "fulfilled" ? reviewRes.value.data[0] : null;
  if (!review) notFound();

  const related = relatedRes.status === "fulfilled" ? relatedRes.value.data : [];
  const book = review.book;
  const coverUrl = imgUrl(book?.image?.formats?.large?.url ?? book?.image?.url);
  const rating = review.rating ?? 0;
  const readingTime = Math.max(1, Math.ceil(countWords(review.content) / 200));

  const genres = book?.genres ?? [];
  const categories = book?.categories ?? [];
  const allTags = [
    ...genres.map((g) => g.title),
    ...categories.map((c) => c.name),
  ];
  const publisherName =
    typeof book?.publisher === "object" && book?.publisher !== null
      ? (book.publisher as { name?: string }).name
      : null;

  const contentBlocks = review.content ?? [];
  const hasIntro = contentBlocks[0]?.type === "paragraph";
  const introParagraph = hasIntro ? contentBlocks.slice(0, 1) : [];
  const bodyBlocks = hasIntro ? contentBlocks.slice(1) : contentBlocks;

  return (
    <>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <div className="container">
          <Link href="/">Inicio</Link>
          <span className={styles.sep}>/</span>
          <Link href="/book-review">Reseñas</Link>
          <span className={styles.sep}>/</span>
          <span>{review.title}</span>
        </div>
      </nav>

      <div className={styles.reviewContainer}>

        {/* ── Main column ────────────────────────────────────────────── */}
        <main className={styles.mainContent}>
          <header className={styles.reviewHeader}>
            <h1 className={styles.reviewTitle}>{review.title}</h1>
            <div className={styles.reviewMeta}>
              <div className={styles.reviewMetaItem}>
                <FaCalendarAlt />
                <span>{formatDate(review.createdAt)}</span>
              </div>
              <div className={styles.reviewMetaItem}>
                <FaClock />
                <span>{readingTime} min de lectura</span>
              </div>
              {allTags.length > 0 && (
                <div className={styles.reviewMetaItem}>
                  <FaTags />
                  <span>{allTags.join(", ")}</span>
                </div>
              )}
            </div>
          </header>

          <article>
            {hasIntro && (
              <div className={styles.reviewIntro}>
                <BlocksRenderer content={introParagraph} />
              </div>
            )}
            <div className={styles.reviewBody}>
              <BlocksRenderer content={bodyBlocks} />
            </div>
          </article>

          {/* Author box */}
          <div className={styles.authorBox}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=160&q=80"
              alt="Yolit Carolina"
              className={styles.authorAvatar}
            />
            <div className={styles.authorInfo}>
              <h4>Escrito por Yolit Carolina</h4>
              <p>
                Lectora compulsiva, blogger y reseñadora apasionada. Compartiendo
                mis descubrimientos literarios en español e inglés.
              </p>
            </div>
          </div>

          {/* Share */}
          <div className={styles.shareSection}>
            <span className={styles.shareLabel}>¿Te gustó esta reseña? ¡Compártela!</span>
            <ReviewShareButtons title={review.title} />
          </div>
        </main>

        {/* ── Sidebar ────────────────────────────────────────────────── */}
        <aside className={styles.sidebarWrapper}>

          {/* Book card */}
          <div className={styles.bookCard}>
            <div className={styles.coverWrapper}>
              {coverUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={coverUrl} alt={book?.title ?? review.title} className={styles.cover} />
              ) : (
                <div className={styles.coverPlaceholder}>📚</div>
              )}
            </div>

            {rating > 0 && (
              <div className={styles.ratingBlock}>
                <span className={styles.ratingLabel}>Mi Valoración:</span>
                <RatingStars rating={rating} />
              </div>
            )}

            {book?.synopsis && book.synopsis.length > 0 && (
              <div className={styles.synopsis}>
                <h3 className={styles.synopsisTitle}>
                  <FaHeart />
                  Sinopsis
                </h3>
                <BlocksRenderer content={book.synopsis} className={styles.synopsisText} />
              </div>
            )}

            <div className={styles.detailsCard}>
              <h4 className={styles.detailsTitle}>
                <FaHeart />
                Detalles del libro
              </h4>
              <div>
                {book?.author?.full_name && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Autor/a:</span>
                    <span className={styles.detailValue}>{book.author.full_name}</span>
                  </div>
                )}
                {publisherName && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Editorial:</span>
                    <span className={styles.detailValue}>{publisherName}</span>
                  </div>
                )}
                {book?.isbn && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>ISBN:</span>
                    <span className={styles.detailValue}>{book.isbn}</span>
                  </div>
                )}
                {book?.pages && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Páginas:</span>
                    <span className={styles.detailValue}>{book.pages}</span>
                  </div>
                )}
                {book?.serie && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Serie:</span>
                    <span className={styles.detailValue}>{book.serie}</span>
                  </div>
                )}
                {genres.length > 0 && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Género:</span>
                    <span className={styles.detailValue}>{genres.map((g) => g.title).join(", ")}</span>
                  </div>
                )}
                {book?.publication_date && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Publicación:</span>
                    <span className={styles.detailValue}>{formatYear(book.publication_date)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Related reviews */}
          {related.length > 0 && (
            <div className={styles.recommended}>
              <h4 className={styles.recommendedTitle}>
                <FaBookOpen />
                Reseñas recomendadas
              </h4>
              <ul className={styles.recommendedList}>
                {related.map((r) => {
                  const thumb = imgUrl(
                    r.book?.image?.formats?.thumbnail?.url ?? r.book?.image?.url
                  );
                  return (
                    <li key={r.id} className={styles.recommendedItem}>
                      <Link href={`/book-review/${r.slug}`}>
                        {thumb ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={thumb} alt={r.book?.title ?? r.title} className={styles.recommendedThumb} />
                        ) : (
                          <div className={styles.recommendedThumbPlaceholder}>📚</div>
                        )}
                        <div className={styles.recommendedInfo}>
                          <h5>{r.book?.title ?? r.title}</h5>
                          <time>{formatDate(r.createdAt)}</time>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <SidebarNewsletter />
        </aside>
      </div>
    </>
  );
}

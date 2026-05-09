import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { FaBookOpen, FaCalendarAlt } from "react-icons/fa";
import { FaAmazon } from "react-icons/fa6";
import { FaGoodreadsG } from "react-icons/fa";
import { getBookBySlug } from "@/lib/strapi";
import BlocksRenderer from "@/components/ui/BlocksRenderer";
import StarRating from "@/components/ui/StarRating";
import ShareButtons from "@/components/book/ShareButtons";
import styles from "./page.module.css";

const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";

function getCoverUrl(url: string | undefined | null): string | null {
  if (!url) return null;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatYear(dateStr: string | null) {
  if (!dateStr) return null;
  return new Date(dateStr).getFullYear().toString();
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await getBookBySlug(slug);
    const book = res.data[0];
    if (!book) return {};
    return {
      title: `${book.title} | Yolit's Bookish`,
      description: `Información y reseña de "${book.title}"`,
    };
  } catch {
    return {};
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let book;
  try {
    const res = await getBookBySlug(slug);
    book = res.data[0];
  } catch {
    notFound();
  }

  if (!book) notFound();

  const coverUrl = getCoverUrl(
    book.image?.formats?.large?.url ?? book.image?.url
  );
  const rating = book.review?.rating ?? 0;
  const reviewSlug = book.review?.slug;
  const authorName = book.author?.full_name;
  const publisherName =
    typeof book.publisher === "object" && book.publisher !== null
      ? (book.publisher as { name?: string }).name
      : null;
  const categories = book.categories ?? [];
  const genres = book.genres ?? [];
  const allTags = [
    ...genres.map((g) => ({ id: `g-${g.id}`, label: g.title, slug: g.slug })),
    ...categories.map((c) => ({ id: `c-${c.id}`, label: c.name, slug: c.slug })),
  ];

  return (
    <>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <div className="container">
          <Link href="/">Inicio</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <Link href="/tbr">TBR</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span>{book.title}</span>
        </div>
      </nav>

      <div className={styles.bookCardContainer}>
        <div className={styles.bookCard}>

          {/* Header */}
          <div className={styles.bookCardHeader}>
            <h1 className={styles.bookTitle}>{book.title}</h1>
            {authorName && (
              <p className={styles.bookAuthor}>{authorName}</p>
            )}
          </div>

          {/* Body: 2 columns */}
          <div className={styles.bookCardContent}>

            {/* Left — cover + rating + buttons */}
            <div className={styles.coverSection}>
              <div className={styles.coverWrapper}>
                {coverUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={coverUrl}
                    alt={book.title}
                    className={styles.coverImage}
                  />
                ) : (
                  <div className={styles.coverPlaceholder}>📚</div>
                )}
              </div>

              {rating > 0 && (
                <div className={styles.ratingBlock}>
                  <StarRating rating={rating} />
                  <div className={styles.ratingText}>
                    <strong>{rating.toFixed(1)}</strong>
                    <span>/ 5</span>
                  </div>
                </div>
              )}

              <div className={styles.actionButtons}>
                {reviewSlug && (
                  <Link
                    href={`/book-review/${reviewSlug}`}
                    className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}
                  >
                    <FaBookOpen />
                    Leer reseña completa
                  </Link>
                )}
                {book.amazon_link && (
                  <a
                    href={book.amazon_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.actionBtn} ${styles.actionBtnSecondary}`}
                  >
                    <FaAmazon />
                    Comprar en Amazon
                  </a>
                )}
                {book.goodreads_link && (
                  <a
                    href={book.goodreads_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.actionBtn} ${styles.actionBtnSecondary}`}
                  >
                    <FaGoodreadsG />
                    Ver en Goodreads
                  </a>
                )}
              </div>
            </div>

            {/* Right — synopsis + details + tags */}
            <div className={styles.infoSection}>

              {book.synopsis && book.synopsis.length > 0 && (
                <div className={styles.synopsisBlock}>
                  <h3 className={styles.sectionTitle}>
                    <FaBookOpen className={styles.sectionTitleIcon} />
                    Sinopsis
                  </h3>
                  <BlocksRenderer
                    content={book.synopsis}
                    className={styles.synopsisText}
                  />
                </div>
              )}

              <div className={styles.detailsBlock}>
                <div className={styles.detailsGrid}>
                  {authorName && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Autor/a</span>
                      <span className={styles.detailValue}>{authorName}</span>
                    </div>
                  )}
                  {book.original_title && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Título original</span>
                      <span className={styles.detailValue}>{book.original_title}</span>
                    </div>
                  )}
                  {book.serie && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Serie</span>
                      <span className={styles.detailValue}>{book.serie}</span>
                    </div>
                  )}
                  {genres.length > 0 && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Género</span>
                      <span className={styles.detailValue}>
                        {genres.map((g) => g.title).join(", ")}
                      </span>
                    </div>
                  )}
                  {book.pages && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Páginas</span>
                      <span className={styles.detailValue}>{book.pages}</span>
                    </div>
                  )}
                  {publisherName && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Editorial</span>
                      <span className={styles.detailValue}>{publisherName}</span>
                    </div>
                  )}
                  {book.publication_date && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Publicación</span>
                      <span className={styles.detailValue}>
                        {formatYear(book.publication_date)}
                      </span>
                    </div>
                  )}
                  {book.isbn && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>ISBN</span>
                      <span className={styles.detailValue}>{book.isbn}</span>
                    </div>
                  )}
                </div>
              </div>

              {allTags.length > 0 && (
                <div className={styles.tagsBlock}>
                  <h3 className={styles.sectionTitle}>Géneros y categorías</h3>
                  <div className={styles.tagsContainer}>
                    {allTags.map((tag) => (
                      <span key={tag.id} className={styles.tag}>
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className={styles.bookCardFooter}>
            <div className={styles.footerMeta}>
              <div className={styles.footerMetaItem}>
                <FaCalendarAlt />
                <span>Añadido el {formatDate(book.createdAt)}</span>
              </div>
            </div>
            <ShareButtons title={book.title} />
          </div>
        </div>

        {/* Review content (if book has a linked review with content) */}
        {book.review && (
          <div className={styles.reviewContent}>
            <div className={styles.reviewIntro}>
              Esta entrada tiene una reseña completa. ¿Quieres leerla?{" "}
              <Link href={`/book-review/${reviewSlug}`}>Ir a la reseña →</Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

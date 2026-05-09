import Link from "next/link";
import type { Metadata } from "next";
import { FaBook, FaGlobe, FaStar, FaArrowRight } from "react-icons/fa";
import { getAuthorsWithBooks } from "@/lib/strapi";
import type { Author, Book, BlockNode, TextNode } from "@/types/strapi";
import styles from "./page.module.css";

const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";

export const metadata: Metadata = {
  title: "Autores | Yolit's Bookish",
  description: "Los autores que han marcado mi vida lectora.",
};

function imgUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

function bioExcerpt(content: Author["content"]): string {
  for (const block of content ?? []) {
    for (const child of (block.children as Array<BlockNode | TextNode>) ?? []) {
      if ((child as TextNode).type === "text" && (child as TextNode).text?.trim()) {
        const t = (child as TextNode).text!.trim();
        return t.length > 200 ? `${t.slice(0, 200)}…` : t;
      }
    }
  }
  return "";
}

function getBookYear(book: Book): string | null {
  return book.publication_date
    ? new Date(book.publication_date).getFullYear().toString()
    : null;
}

function calcStats(books: Book[]) {
  const withReviews = books.filter((b) => b.review);
  const avgRating =
    withReviews.length > 0
      ? (
          withReviews.reduce((s, b) => s + (b.review?.rating ?? 0), 0) /
          withReviews.length
        ).toFixed(1)
      : null;
  return {
    total: books.length,
    reviews: withReviews.length,
    avgRating,
  };
}

function getGenres(books: Book[]): string[] {
  return [
    ...new Set(books.flatMap((b) => b.genres?.map((g) => g.title) ?? [])),
  ].slice(0, 4);
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <span className={styles.bookRatingSmall}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i} style={{ color: i < rating ? "var(--color-gold-400)" : "#e0e0e0" }} />
      ))}
      <span className={styles.ratingValue}>({rating.toFixed(1)})</span>
    </span>
  );
}

function AuthorCard({ author }: { author: Author }) {
  const books = author.books ?? [];
  const photoUrl = imgUrl(author.image?.formats?.medium?.url ?? author.image?.url);
  const bio = bioExcerpt(author.content);
  const genres = getGenres(books);
  const stats = calcStats(books);
  const topBooks = books.slice(0, 3);

  return (
    <div className={styles.authorCard}>
      {/* Header */}
      <div className={styles.authorHeader}>
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photoUrl} alt={author.full_name} className={styles.authorPhoto} />
        ) : (
          <div className={styles.authorPhotoPlaceholder}>✍️</div>
        )}
        <h3 className={styles.authorName}>{author.full_name}</h3>
        {author.website && (
          <a
            href={author.website}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.authorWebsite}
          >
            <FaGlobe /> Sitio web
          </a>
        )}
      </div>

      {/* Body */}
      <div className={styles.authorBody}>
        {bio && <p className={styles.authorBio}>{bio}</p>}

        {genres.length > 0 && (
          <div className={styles.genreTags}>
            {genres.map((g) => (
              <span key={g} className={styles.genreTag}>{g}</span>
            ))}
          </div>
        )}

        <div className={styles.authorStats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{stats.total}</span>
            <span className={styles.statLabel}>Libros</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{stats.avgRating ?? "—"}</span>
            <span className={styles.statLabel}>Rating avg</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{stats.reviews}</span>
            <span className={styles.statLabel}>Reseñas</span>
          </div>
        </div>

        {topBooks.length > 0 && (
          <div className={styles.booksSection}>
            <h4 className={styles.booksSectionTitle}>
              <FaBook /> Obras destacadas
            </h4>
            <div className={styles.booksList}>
              {topBooks.map((book) => {
                const coverUrl = imgUrl(
                  book.image?.formats?.thumbnail?.url ?? book.image?.url
                );
                const hasReview = Boolean(book.review);
                const href = hasReview
                  ? `/book-review/${book.review!.slug}`
                  : `/book/${book.slug}`;
                const year = getBookYear(book);

                return (
                  <Link key={book.id} href={href} className={styles.bookItem}>
                    {coverUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={coverUrl} alt={book.title} className={styles.bookCoverSmall} />
                    ) : (
                      <div className={styles.bookCoverPlaceholder}>📚</div>
                    )}
                    <div className={styles.bookInfoSmall}>
                      <div className={styles.bookTitleSmall}>{book.title}</div>
                      <div className={styles.bookMetaSmall}>
                        {(year || book.pages) && (
                          <span>
                            {[year, book.pages ? `${book.pages} págs` : null]
                              .filter(Boolean)
                              .join(" · ")}
                          </span>
                        )}
                        {hasReview && book.review!.rating > 0 && (
                          <RatingStars rating={book.review!.rating} />
                        )}
                        <span
                          className={`${styles.bookBadge} ${!hasReview ? styles.bookBadgeTBR : ""}`}
                        >
                          {hasReview ? "Reseñado" : "Por leer"}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <Link href={`/author/${author.slug}`} className={styles.viewAllLink}>
              Ver perfil completo <FaArrowRight />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default async function AuthorsPage() {
  let authors: Author[] = [];

  try {
    const res = await getAuthorsWithBooks();
    authors = res.data;
  } catch {
    // Strapi offline
  }

  const featured = authors.find((a) => a.is_featured);
  const featuredPhotoUrl = featured
    ? imgUrl(featured.image?.formats?.medium?.url ?? featured.image?.url)
    : null;
  const featuredBio = featured ? bioExcerpt(featured.content) : "";

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <div className="container">
          <Link href="/">Inicio</Link>
          <span className={styles.sep}>/</span>
          <span>Autores</span>
        </div>
      </nav>

      <div className="container">
        {/* Intro */}
        <div className={styles.intro}>
          <h1>📚 Mis Autores Favoritos</h1>
          <p>
            Una selección de los escritores que han marcado mi vida lectora. Aquí
            encontrarás una ficha de cada uno, sus obras más destacadas y mis
            reseñas personales.
          </p>
        </div>

        {/* Authors grid */}
        {authors.length === 0 ? (
          <div className={styles.empty}>
            <p>No hay autores disponibles aún.</p>
          </div>
        ) : (
          <div className={styles.authorsGrid}>
            {authors.map((author) => (
              <AuthorCard key={author.id} author={author} />
            ))}
          </div>
        )}

        {/* Featured author */}
        {featured && (
          <div className={styles.featuredSection}>
            <h2 className={styles.featuredTitle}>📖 Autor/a Destacado/a</h2>
            <div className={styles.featuredContent}>
              {featuredPhotoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featuredPhotoUrl}
                  alt={featured.full_name}
                  className={styles.featuredPhoto}
                />
              ) : (
                <div className={styles.featuredPhotoPlaceholder}>✍️</div>
              )}
              <div className={styles.featuredInfo}>
                <h3>{featured.full_name}</h3>
                {featuredBio && <p>{featuredBio}</p>}
                {featuredBio && (
                  <div className={styles.featuredQuote}>{featuredBio}</div>
                )}
                <Link href={`/author/${featured.slug}`} className={styles.featuredLink}>
                  Ver perfil completo <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

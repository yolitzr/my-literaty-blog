"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  FaSearch, FaStar, FaStarHalfAlt, FaRegStar, FaCalendarAlt, FaBookOpen,
} from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import type { Book } from "@/types/strapi";
import styles from "@/components/book-review/ReviewsGrid.module.css";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
const PAGE_SIZE = 12;

function getCoverUrl(book: Book): string | null {
  const url = book.image?.formats?.medium?.url ?? book.image?.url;
  if (!url) return null;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

function formatYear(d: string | null) {
  return d ? new Date(d).getFullYear().toString() : null;
}

function RatingStars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className={styles.stars}>
      {Array.from({ length: full }).map((_, i) => <FaStar key={`f${i}`} />)}
      {half && <FaStarHalfAlt key="h" />}
      {Array.from({ length: empty }).map((_, i) => <FaRegStar key={`e${i}`} />)}
    </span>
  );
}

interface Props {
  books: Book[];
  genres: string[];
}

export default function BooksGrid({ books, genres }: Props) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = books;

    if (activeFilter !== "all") {
      result = result.filter((b) =>
        b.genres?.some((g) => g.title === activeFilter)
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author?.full_name?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [books, activeFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function handleFilter(genre: string) {
    setActiveFilter(genre);
    setPage(1);
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setPage(1);
  }

  return (
    <>
      {/* Filters */}
      <div className={styles.filtersSection}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Buscar por título o autor..."
            value={search}
            onChange={handleSearch}
            className={styles.searchInput}
          />
          <FaSearch className={styles.searchIcon} />
        </div>

        <div className={styles.filterButtons}>
          <button
            className={`${styles.filterBtn} ${activeFilter === "all" ? styles.filterBtnActive : ""}`}
            onClick={() => handleFilter("all")}
          >
            Todos
          </button>
          {genres.map((genre) => (
            <button
              key={genre}
              className={`${styles.filterBtn} ${activeFilter === genre ? styles.filterBtnActive : ""}`}
              onClick={() => handleFilter(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {paginated.length === 0 ? (
          <div className={styles.empty}>
            <FaBookOpen className={styles.emptyIcon} />
            <h3>No se encontraron libros</h3>
            <p>Intenta con otro filtro o término de búsqueda.</p>
          </div>
        ) : (
          paginated.map((book) => {
            const coverUrl = getCoverUrl(book);
            const rating = book.review?.rating ?? 0;
            const reviewSlug = book.review?.slug;
            const bookGenres = book.genres ?? [];

            return (
              <article key={book.id} className={styles.card}>
                <Link href={`/book/${book.slug}`} className={styles.coverLink}>
                  {coverUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={coverUrl} alt={book.title} className={styles.cover} />
                  ) : (
                    <div className={styles.coverPlaceholder}>📚</div>
                  )}
                  {rating > 0 && (
                    <div className={styles.ratingBadge}>
                      <RatingStars rating={rating} />
                    </div>
                  )}
                </Link>

                <div className={styles.cardInfo}>
                  <h3 className={styles.cardTitle}>{book.title}</h3>
                  {book.author?.full_name && (
                    <p className={styles.cardAuthor}>{book.author.full_name}</p>
                  )}
                  {bookGenres.length > 0 && (
                    <div className={styles.cardGenres}>
                      {bookGenres.slice(0, 2).map((g) => (
                        <span key={g.id} className={styles.genrePill}>{g.title}</span>
                      ))}
                    </div>
                  )}
                  {book.publication_date && (
                    <div className={styles.cardDate}>
                      <FaCalendarAlt />
                      <span>{formatYear(book.publication_date)}</span>
                    </div>
                  )}
                </div>

                <Link
                  href={reviewSlug ? `/book-review/${reviewSlug}` : `/book/${book.slug}`}
                  className={styles.reviewLink}
                >
                  {reviewSlug ? "Leer reseña" : "Ver detalles"}
                </Link>
              </article>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            aria-label="Página anterior"
          >
            <FaChevronLeft />
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`${styles.pageBtn} ${safePage === i + 1 ? styles.pageBtnActive : ""}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className={styles.pageBtn}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            aria-label="Página siguiente"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </>
  );
}

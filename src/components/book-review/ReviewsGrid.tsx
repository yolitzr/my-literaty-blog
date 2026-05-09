"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FaSearch, FaStar, FaStarHalfAlt, FaRegStar, FaCalendarAlt, FaBookOpen } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import type { Review } from "@/types/strapi";
import styles from "./ReviewsGrid.module.css";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
const PAGE_SIZE = 12;

function getCoverUrl(review: Review): string | null {
  const url =
    review.book?.image?.formats?.medium?.url ??
    review.book?.image?.url;
  if (!url) return null;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric",
  });
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
  reviews: Review[];
  genres: string[];
}

export default function ReviewsGrid({ reviews, genres }: Props) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = reviews;

    if (activeFilter !== "all") {
      result = result.filter((r) =>
        r.book?.genres?.some((g) => g.title === activeFilter)
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.book?.title?.toLowerCase().includes(q) ||
          r.book?.author?.full_name?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [reviews, activeFilter, search]);

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
            <h3>No se encontraron reseñas</h3>
            <p>Intenta con otro filtro o término de búsqueda.</p>
          </div>
        ) : (
          paginated.map((review) => {
            const coverUrl = getCoverUrl(review);
            const bookTitle = review.book?.title ?? review.title;
            const authorName = review.book?.author?.full_name;
            const bookGenres = review.book?.genres ?? [];

            return (
              <article key={review.id} className={styles.card}>
                <Link href={`/book-review/${review.slug}`} className={styles.coverLink}>
                  {coverUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={coverUrl} alt={bookTitle} className={styles.cover} />
                  ) : (
                    <div className={styles.coverPlaceholder}>📚</div>
                  )}
                  {review.rating > 0 && (
                    <div className={styles.ratingBadge}>
                      <RatingStars rating={review.rating} />
                    </div>
                  )}
                </Link>

                <div className={styles.cardInfo}>
                  <h3 className={styles.cardTitle}>{bookTitle}</h3>
                  {authorName && (
                    <p className={styles.cardAuthor}>{authorName}</p>
                  )}
                  {bookGenres.length > 0 && (
                    <div className={styles.cardGenres}>
                      {bookGenres.slice(0, 2).map((g) => (
                        <span key={g.id} className={styles.genrePill}>{g.title}</span>
                      ))}
                    </div>
                  )}
                  <div className={styles.cardDate}>
                    <FaCalendarAlt />
                    <span>{formatDate(review.createdAt)}</span>
                  </div>
                </div>

                <Link href={`/book-review/${review.slug}`} className={styles.reviewLink}>
                  Leer reseña completa
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

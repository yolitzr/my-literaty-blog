import Link from "next/link";
import Card from "@/components/ui/Card";
import type { Review } from "@/types/strapi";

const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function blockToExcerpt(blocks: Review["content"], max = 160): string {
  for (const block of blocks ?? []) {
    for (const child of (block.children as Array<{ type: string; text?: string }>) ?? []) {
      if (child.type === "text" && child.text?.trim()) {
        const text = child.text.trim();
        return text.length > max ? `${text.slice(0, max)}…` : text;
      }
    }
  }
  return "";
}

function getImageUrl(review: Review): string | null {
  const url = review.book?.image?.formats?.medium?.url ?? review.book?.image?.url;
  if (!url) return null;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

interface Props {
  reviews: Review[];
}

export default function ReviewsSection({ reviews }: Props) {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>Reseñas Recientes</h2>
          <Link href="/book-review" className="btn btn-secondary">
            Ver Todas las Reseñas
          </Link>
        </div>

        {reviews.length === 0 ? (
          <p style={{ color: "var(--color-gray)" }}>
            Próximamente las primeras reseñas...
          </p>
        ) : (
          <div className="cards-container">
            {reviews.map((review) => (
              <Card
                key={review.id}
                image={getImageUrl(review)}
                imageAlt={review.book?.title ?? review.title}
                date={formatDate(review.createdAt)}
                tag={review.book?.categories?.[0]?.name}
                title={review.title}
                excerpt={blockToExcerpt(review.content)}
                href={`/book-review/${review.slug}`}
                linkText="Leer reseña completa"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

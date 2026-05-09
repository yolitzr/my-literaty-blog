import Link from "next/link";
import Card from "@/components/ui/Card";
import type { Book } from "@/types/strapi";

const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";

function blockToExcerpt(blocks: Book["synopsis"], max = 160): string {
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

function getCoverUrl(book: Book): string | null {
  const url = book.image?.formats?.medium?.url ?? book.image?.url;
  if (!url) return null;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

interface Props {
  books: Book[];
}

export default function TBRSection({ books }: Props) {
  return (
    <section className="section" style={{ backgroundColor: "white" }}>
      <div className="container">
        <div className="section-header">
          <h2>TBR</h2>
          <Link href="/tbr" className="btn btn-secondary">
            Ver Lista Completa
          </Link>
        </div>

        {books.length === 0 ? (
          <p style={{ color: "var(--color-gray)" }}>
            Próximamente los primeros libros del TBR...
          </p>
        ) : (
          <div className="cards-container">
            {books.map((book) => (
              <Card
                key={book.id}
                image={getCoverUrl(book)}
                imageAlt={book.title}
                tag={book.author?.full_name ?? book.genres?.[0]?.title}
                title={book.title}
                excerpt={blockToExcerpt(book.synopsis)}
                href={`/book/${book.slug}`}
                linkText="Ver detalles"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

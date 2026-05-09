import Link from "next/link";
import Card from "@/components/ui/Card";
import type { Post } from "@/types/strapi";

const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function blockToExcerpt(blocks: Post["content"], max = 160): string {
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

function getCoverUrl(post: Post): string | null {
  const url = post.cover?.formats?.medium?.url ?? post.cover?.url;
  if (!url) return null;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

interface Props {
  posts: Post[];
}

export default function Top10Section({ posts }: Props) {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>Top 10 Tuesday</h2>
          <Link href="/blog?categoria=top-10-tuesday" className="btn btn-secondary">
            Ver Todos los Top 10
          </Link>
        </div>

        {posts.length === 0 ? (
          <p style={{ color: "var(--color-gray)" }}>
            Próximamente las primeras listas Top 10...
          </p>
        ) : (
          <div className="cards-container">
            {posts.map((post) => (
              <Card
                key={post.id}
                image={getCoverUrl(post)}
                imageAlt={post.title}
                date={formatDate(post.createdAt)}
                tag="Top 10 Tuesday"
                title={post.title}
                excerpt={blockToExcerpt(post.content)}
                href={`/blog/${post.slug}`}
                linkText="Ver la lista completa"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

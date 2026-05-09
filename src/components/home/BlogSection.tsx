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

export default function BlogSection({ posts }: Props) {
  return (
    <section className="section" style={{ backgroundColor: "white" }}>
      <div className="container">
        <div className="section-header">
          <h2>Del Blog</h2>
          <Link href="/blog" className="btn btn-secondary">
            Ver Todo el Blog
          </Link>
        </div>

        {posts.length === 0 ? (
          <p style={{ color: "var(--color-gray)" }}>
            Próximamente las primeras entradas del blog...
          </p>
        ) : (
          <div className="cards-container">
            {posts.map((post) => (
              <Card
                key={post.id}
                image={getCoverUrl(post)}
                imageAlt={post.title}
                date={formatDate(post.createdAt)}
                tag={post.categories?.[0]?.name}
                title={post.title}
                excerpt={blockToExcerpt(post.content)}
                href={`/blog/${post.slug}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

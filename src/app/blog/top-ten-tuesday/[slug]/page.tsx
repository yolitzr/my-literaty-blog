import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { FaExternalLinkAlt, FaBook } from 'react-icons/fa';
import { getTopTenTuesdayBySlug, getRecentTopTenTuesdays } from '@/lib/strapi';
import BlocksRenderer from '@/components/ui/BlocksRenderer';
import SidebarNewsletter from '@/components/book-review/SidebarNewsletter';
import type { TopTenItem, TopTenTuesdayEntry } from '@/types/strapi';
import styles from './page.module.css';

const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337';
const TTT_BLOG_URL = 'https://thatartsyreadergirl.com/top-ten-tuesday/';
const MEME_INTRO =
	'Top Ten Tuesday es una iniciativa semanal sobre libros que nació en The Broke and the Bookish y ahora continúa en el blog de Jana, That Artsy Reader Girl.';

function imgUrl(url: string | null | undefined): string | null {
	if (!url) return null;
	return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}

function formatDate(d: string) {
	return new Date(d).toLocaleDateString('es-ES', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
}

// ─── Book card ────────────────────────────────────────────────────────────────

function BookCard({ item, index }: { item: TopTenItem; index: number }) {
	const position = item.position ?? index + 1;

	const coverSrc = item.book?.image
		? imgUrl(
				item.book.image.formats?.medium?.url ??
					item.book.image.formats?.small?.url ??
					item.book.image.url,
			)
		: item.manual_cover
			? imgUrl(
					item.manual_cover.formats?.medium?.url ??
						item.manual_cover.formats?.small?.url ??
						item.manual_cover.url,
				)
			: null;

	const title = item.book?.title ?? item.manual_title ?? 'Sin título';
	const author = item.book?.author?.full_name ?? item.manual_author ?? null;
	const bookSlug = item.book?.slug ?? null;

	return (
		<div className={styles.bookCard}>
			<div className={styles.coverOuter}>
				<span className={styles.positionBadge}>{position}</span>
				<div className={styles.coverWrapper}>
					{coverSrc ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img src={coverSrc} alt={title} className={styles.cover} />
					) : (
						<div className={styles.coverPlaceholder}>📚</div>
					)}
				</div>
			</div>

			<div className={styles.bookInfo}>
				{bookSlug ? (
					<Link href={`/book/${bookSlug}`} className={styles.bookTitle}>
						{title}
					</Link>
				) : (
					<span className={styles.bookTitle}>{title}</span>
				)}

				{author && <p className={styles.bookAuthor}>{author}</p>}

				{(item.categories ?? []).length > 0 && (
					<div className={styles.itemCategories}>
						{item.categories!.map((cat) => (
							<span key={cat.id} className={styles.itemCategoryTag}>
								{cat.name}
							</span>
						))}
					</div>
				)}

				{item.reason && (
					<div className={styles.bookReason}>
						<span className={styles.reasonLabel}>Comentario</span>
						<p>{item.reason}</p>
					</div>
				)}
			</div>
		</div>
	);
}

// ─── Sidebar widget wrapper ───────────────────────────────────────────────────

function SidebarWidget({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className={styles.widget}>
			<div className={styles.widgetHeader}>
				<span>{title}</span>
			</div>
			<div className={styles.widgetBody}>{children}</div>
		</div>
	);
}

// ─── Recent entry item ────────────────────────────────────────────────────────

function RecentEntryItem({ entry }: { entry: TopTenTuesdayEntry }) {
	const thumbSrc = entry.cover
		? imgUrl(
				entry.cover.formats?.thumbnail?.url ??
					entry.cover.formats?.small?.url ??
					entry.cover.url,
			)
		: null;

	return (
		<li>
			<Link
				href={`/blog/top-ten-tuesday/${entry.slug}`}
				className={styles.recentLink}
			>
				<div className={styles.recentThumb}>
					{thumbSrc ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={thumbSrc}
							alt={entry.topic}
							className={styles.recentThumbImg}
						/>
					) : (
						<div className={styles.recentThumbPlaceholder}>📚</div>
					)}
				</div>
				<div className={styles.recentInfo}>
					<time className={styles.recentDate}>{formatDate(entry.date)}</time>
					<span className={styles.recentTopic}>{entry.topic}</span>
				</div>
			</Link>
		</li>
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
		const res = await getTopTenTuesdayBySlug(slug);
		const entry = res.data[0];
		if (!entry) return {};
		return {
			title: `Top Ten Tuesday: ${entry.topic} | Yolit's Bookish`,
			description: `Mi lista de 10 libros sobre: ${entry.topic}`,
		};
	} catch {
		return {};
	}
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function TopTenTuesdayDetailPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const [entryRes, recentRes] = await Promise.allSettled([
		getTopTenTuesdayBySlug(slug),
		getRecentTopTenTuesdays(slug, 5),
	]);

	const entry = entryRes.status === 'fulfilled' ? entryRes.value.data[0] : null;
	if (!entry) notFound();

	const recentEntries =
		recentRes.status === 'fulfilled' ? recentRes.value.data : [];

	const items = [...(entry.items ?? [])].sort(
		(a, b) => (a.position ?? 99) - (b.position ?? 99),
	);

	return (
		<>
			{/* Breadcrumb */}
			<nav className={styles.breadcrumb}>
				<div className="container">
					<Link href="/">Inicio</Link>
					<span className={styles.sep}>/</span>
					<Link href="/blog">Blog</Link>
					<span className={styles.sep}>/</span>
					<span>Top Ten Tuesday</span>
				</div>
			</nav>

			{/* ── Two-column body ─────────────────────────────────────────────────── */}
			<div className={styles.pageWrapper}>
				{/* ── Main column ─────────────────────────────────────────────────── */}

				<main className={styles.mainContent}>
					{/* Header Section column left */}

					<div className={styles.hero}>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src="/adorno.png"
							alt=""
							className={styles.heroAdorno}
							aria-hidden
						/>
						<div className={styles.heroText}>
							{/* <p className={styles.heroEyebrow}>—Top Ten Tuesday 🌿 —</p> */}
							<h1 className={styles.heroTitle}>
								<Link href="/blog/top-ten-tuesday">Top Ten Tuesday</Link>
							</h1>
							<time className={styles.heroDate}>{formatDate(entry.date)}</time>
							<p className={styles.heroIntro}>
								{MEME_INTRO}{' '}
								<a
									href={TTT_BLOG_URL}
									target="_blank"
									rel="noopener noreferrer"
									className={styles.heroIntroLink}
								>
									Visitar blog <FaExternalLinkAlt />
								</a>
							</p>
						</div>
					</div>
					{/* Topic */}
					<div className={styles.topicSection}>
						<span className={styles.topicBadge}>Tema de la semana:</span>
						<h2 className={styles.topicTitle}>
							<FaBook className={styles.topicIcon} /> {entry.topic}
						</h2>
					</div>

					{/* Opinion / body content */}
					{entry.content && entry.content.length > 0 && (
						<div className={styles.contentBody}>
							<BlocksRenderer content={entry.content} />
						</div>
					)}

					{/* Books grid */}
					{items.length > 0 && (
						<section className={styles.booksSection}>
							<div className={styles.booksGrid}>
								{items.map((item, i) => (
									<BookCard key={item.id} item={item} index={i} />
								))}
							</div>
						</section>
					)}

					{/* FAQ */}
					<div className={styles.faqSection}>
						<h3 className={styles.faqTitle}>¿Qué es el Top Ten Tuesday?</h3>
						<p className={styles.faqText}>
							Cada martes participo en el meme literario{' '}
							<em>Top Ten Tuesday</em>, eligiendo diez libros según el tema de
							la semana propuesto por Jana de <em>That Artsy Reader Girl</em>.
							Es una forma divertida de descubrir nuevas lecturas, recordar
							favoritos y conectar con la comunidad bookish.
						</p>
						{/* <a
							href={TTT_BLOG_URL}
							target="_blank"
							rel="noopener noreferrer"
							className={styles.faqBtn}
						>
							Ver más en el blog de Jana
						</a> */}
					</div>
				</main>

				{/* ── Sidebar ─────────────────────────────────────────────────────── */}
				<aside className={styles.sidebar}>
					<SidebarWidget title="Sobre el Top Ten Tuesday">
						<p className={styles.widgetText}>{MEME_INTRO}</p>
						<a
							href={TTT_BLOG_URL}
							target="_blank"
							rel="noopener noreferrer"
							className={styles.widgetLink}
						>
							Visitar blog →
						</a>
					</SidebarWidget>

					{recentEntries.length > 0 && (
						<SidebarWidget title="Entradas de Top Ten Tuesday">
							<ul className={styles.recentList}>
								{recentEntries.map((e) => (
									<RecentEntryItem key={e.id} entry={e} />
								))}
							</ul>
						</SidebarWidget>
					)}

					{(entry.categories ?? []).length > 0 && (
						<SidebarWidget title="Categorías">
							<div className={styles.categoryTags}>
								{entry.categories!.map((cat) => (
									<Link
										key={cat.id}
										href="/categories"
										className={styles.categoryTag}
									>
										{cat.name}
									</Link>
								))}
							</div>
						</SidebarWidget>
					)}

					<SidebarNewsletter />
				</aside>
			</div>
		</>
	);
}

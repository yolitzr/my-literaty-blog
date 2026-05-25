import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
	FaList,
	FaTag,
	FaBuilding,
	FaCalendarAlt,
	FaFileAlt,
	FaBookmark,
	FaGlobe,
	FaHeart,
	FaExternalLinkAlt,
	FaBook,
} from 'react-icons/fa';
import { getWwwWednesdayBySlug, getRecentWwwWednesdays } from '@/lib/strapi';
import BlocksRenderer from '@/components/ui/BlocksRenderer';
import SidebarNewsletter from '@/components/book-review/SidebarNewsletter';
import type { WwwWednesdayEntry } from '@/types/strapi';
import styles from './page.module.css';

const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337';

const WWW_ABOUT =
	'Cada miércoles comparto el libro que más ganas tengo de leer próximamente — ese que ya tengo en mente y que no puedo esperar para empezar.';

const FORMAT_LABELS: Record<string, string> = {
	fisico: 'Físico',
	ebook: 'eBook',
	audiolibro: 'Audiolibro',
};

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

// ─── Info row ─────────────────────────────────────────────────────────────────

function InfoRow({
	icon,
	label,
	value,
}: {
	icon: React.ReactNode;
	label: string;
	value: string;
}) {
	return (
		<div className={styles.infoRow}>
			<span className={styles.infoIcon}>{icon}</span>
			<span className={styles.infoLabel}>{label}</span>
			<span className={styles.infoValue}>{value}</span>
		</div>
	);
}

// ─── Recent entry item (sidebar) ──────────────────────────────────────────────

function RecentEntryItem({ entry }: { entry: WwwWednesdayEntry }) {
	const coverSrc = entry.cover_image
		? imgUrl(
				entry.cover_image.formats?.small?.url ??
					entry.cover_image.formats?.medium?.url ??
					entry.cover_image.url,
			)
		: null;

	return (
		<li className={styles.recentItem}>
			<Link
				href={`/blog/www-wednesday/${entry.slug}`}
				className={styles.recentLink}
			>
				<div className={styles.recentCover}>
					{coverSrc ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={coverSrc}
							alt={entry.title}
							className={styles.recentCoverImg}
						/>
					) : (
						<div className={styles.recentCoverPlaceholder}>📖</div>
					)}
				</div>
				<div className={styles.recentInfo}>
					<span className={styles.recentTitle}>{entry.title}</span>
					<time className={styles.recentDate}>{formatDate(entry.date)}</time>
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
		const res = await getWwwWednesdayBySlug(slug);
		const entry = res.data[0];
		if (!entry) return {};
		return {
			title: `${entry.title} | WWW Wednesday | Yolit's Bookish`,
			description: entry.intro ?? WWW_ABOUT,
		};
	} catch {
		return {};
	}
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function WwwWednesdayDetailPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const [entryRes, recentRes] = await Promise.allSettled([
		getWwwWednesdayBySlug(slug),
		getRecentWwwWednesdays(slug, 4),
	]);

	const entry = entryRes.status === 'fulfilled' ? entryRes.value.data[0] : null;
	if (!entry) notFound();

	const recentEntries =
		recentRes.status === 'fulfilled' ? recentRes.value.data : [];

	const heroImgSrc = entry.cover_image
		? imgUrl(
				entry.cover_image.formats?.large?.url ??
					entry.cover_image.formats?.medium?.url ??
					entry.cover_image.url,
			)
		: null;

	const book = entry.reading_next ?? null;

	const bookCoverSrc = book?.image
		? imgUrl(
				book.image.formats?.medium?.url ??
					book.image.formats?.small?.url ??
					book.image.url,
			)
		: null;

	const isArc = book?.reading_status === 'arc';
	const isEnIngles = book?.reading_status === 'en_ingles';

	return (
		<>
			{/* Breadcrumb */}
			<nav className={styles.breadcrumb}>
				<div className="container">
					<Link href="/">Inicio</Link>
					<span className={styles.sep}>/</span>
					<Link href="/blog">Blog</Link>
					<span className={styles.sep}>/</span>
					<span>WWW Wednesday</span>
				</div>
			</nav>

			{/* Two-column body */}
			<div className={styles.pageWrapper}>
				<main className={styles.mainContent}>
					{/* Hero */}
					<div className={styles.hero}>
						<div className={styles.heroImageWrap}>
							{heroImgSrc ? (
								// eslint-disable-next-line @next/next/no-img-element
								<img
									src="/adorno.png"
									alt=""
									className={styles.heroImg}
									aria-hidden
								/>
							) : (
								// eslint-disable-next-line @next/next/no-img-element
								<img
									src="/adorno.png"
									alt=""
									className={styles.heroAdorno}
									aria-hidden
								/>
							)}
						</div>
						<div className={styles.heroText}>
							<h1 className={styles.heroTitle}>WWW Wednesday</h1>
							<time className={styles.heroDate}>{formatDate(entry.date)}</time>
							<p className={styles.heroIntro}>{WWW_ABOUT}</p>
						</div>
					</div>
					{/* Entry title band */}
					<div className={styles.entryBand}>
						<p className={styles.entryEyebrow}>What will I read next?</p>
						<h2 className={styles.entryTitle}>{entry.title}</h2>
					</div>

					{/* Extra content blocks */}
					{entry.content && entry.content.length > 0 && (
						<div className={styles.contentBody}>
							<BlocksRenderer content={entry.content} />
						</div>
					)}

					{/* Book spotlight */}
					{book ? (
						<div className={styles.spotlight}>
							{/* Row: cover + info */}
							<div className={styles.spotlightRow}>
								<div className={styles.spotlightCoverWrap}>
									{bookCoverSrc ? (
										// eslint-disable-next-line @next/next/no-img-element
										<img
											src={bookCoverSrc}
											alt={book.title}
											className={styles.spotlightCover}
										/>
									) : (
										<div className={styles.spotlightCoverPlaceholder}>📚</div>
									)}
								</div>

								<div className={styles.spotlightInfo}>
									<Link
										href={`/book/${book.slug}`}
										className={styles.spotlightTitle}
									>
										{book.title}
									</Link>

									{book.author?.full_name && (
										<p className={styles.spotlightAuthor}>
											{book.author.full_name}
										</p>
									)}

									{/* Metadata rows */}
									<div className={styles.infoCard}>
										{book.serie && (
											<InfoRow
												icon={<FaList />}
												label="Serie"
												value={book.serie}
											/>
										)}
										{(book.genres?.length ?? 0) > 0 && (
											<InfoRow
												icon={<FaTag />}
												label="Género"
												value={book.genres!.map((g) => g.title).join(', ')}
											/>
										)}
										{isEnIngles && (
											<InfoRow
												icon={<FaGlobe />}
												label="Idioma"
												value="Inglés"
											/>
										)}
										{book.publisher?.name && (
											<InfoRow
												icon={<FaBuilding />}
												label="Editorial"
												value={book.publisher.name}
											/>
										)}
										{book.publication_date && (
											<InfoRow
												icon={<FaCalendarAlt />}
												label="Publicación"
												value={formatDate(book.publication_date)}
											/>
										)}
										{book.pages && (
											<InfoRow
												icon={<FaFileAlt />}
												label="Páginas"
												value={String(book.pages)}
											/>
										)}
										{isArc && (
											<InfoRow
												icon={<FaBookmark />}
												label="Tipo"
												value="ARC (Advanced Reader Copy)"
											/>
										)}
										{book.owned_format && (
											<InfoRow
												icon={<FaBook />}
												label="Formato"
												value={
													FORMAT_LABELS[book.owned_format] ?? book.owned_format
												}
											/>
										)}
									</div>

									{/* External links */}
									{(book.goodreads_link || book.amazon_link) && (
										<div className={styles.bookLinks}>
											{book.goodreads_link && (
												<a
													href={book.goodreads_link}
													target="_blank"
													rel="noopener noreferrer"
													className={styles.externalBtn}
												>
													Goodreads <FaExternalLinkAlt />
												</a>
											)}
											{book.amazon_link && (
												<a
													href={book.amazon_link}
													target="_blank"
													rel="noopener noreferrer"
													className={styles.externalBtn}
												>
													Amazon <FaExternalLinkAlt />
												</a>
											)}
										</div>
									)}

									{/* ARC thank-you */}
									{isArc && (
										<div className={styles.arcThanks}>
											<FaHeart className={styles.arcHeart} />
											Gracias a la editorial por enviarme este ARC
										</div>
									)}
								</div>
							</div>

							{/* Synopsis — ancho completo debajo de la portada */}
							{book.synopsis && book.synopsis.length > 0 && (
								<div className={styles.synopsis}>
									<span className={styles.synopsisLabel}>Sinopsis</span>
									<BlocksRenderer content={book.synopsis} />
								</div>
							)}
						</div>
					) : (
						<div className={styles.emptySpotlight}>
							<p>Pronto compartiré mi próxima lectura.</p>
						</div>
					)}
				</main>

				{/* Sidebar */}
				<aside className={styles.sidebar}>
					<div className={styles.recentWidget}>
						<div className={styles.recentWidgetHeader}>
							Entradas de WWW Wednesday
						</div>
						<div className={styles.recentWidgetBody}>
							{recentEntries.length > 0 ? (
								<ul className={styles.recentList}>
									{recentEntries.map((e) => (
										<RecentEntryItem key={e.id} entry={e} />
									))}
								</ul>
							) : (
								<p className={styles.widgetText}>Próximamente más entradas.</p>
							)}
						</div>
					</div>

					{(entry.categories ?? []).length > 0 && (
						<div className={styles.widget}>
							<div className={styles.widgetHeader}>
								<span>Categorías</span>
							</div>
							<div className={styles.widgetBody}>
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
							</div>
						</div>
					)}

					<SidebarNewsletter />
				</aside>
			</div>
		</>
	);
}

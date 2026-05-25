import Link from 'next/link';
import styles from './WeeklyPostsSection.module.css';
import type {
	BookishNewsEntry,
	WwwWednesdayEntry,
	Review,
	TopTenTuesdayEntry,
	MonthlyWrapUpEntry,
} from '@/types/strapi';

const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337';

function imgUrl(
	img: { url: string; formats?: { medium?: { url: string } } | null } | null,
): string | null {
	if (!img) return null;
	const url = img.formats?.medium?.url ?? img.url;
	return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}

interface WeeklyCard {
	day: string;
	typeLabel: string;
	typeBgColor: string;
	typeTextColor: string;
	title: string;
	description: string;
	href: string;
	imageUrl: string | null;
	isEmpty: boolean;
}

interface Props {
	bookishNews: BookishNewsEntry | null;
	wwwWednesday: WwwWednesdayEntry | null;
	featuredReview: Review | null;
	topTen: TopTenTuesdayEntry | null;
	monthlyWrapUp: MonthlyWrapUpEntry | null;
}

export default function WeeklyPostsSection({
	bookishNews,
	wwwWednesday,
	featuredReview,
	topTen,
	monthlyWrapUp,
}: Props) {
	const cards: WeeklyCard[] = [
		{
			day: 'Lunes',
			typeLabel:
				bookishNews?.type === 'arc_alert' ? 'ARC Alert' : 'Bookish News',
			typeBgColor: 'var(--color-sage)',
			typeTextColor: 'white',
			title: bookishNews?.title ?? 'Próximamente...',
			description: bookishNews
				? 'Novedades del mundo literario y ARCs que llegaron a mis manos.'
				: 'Aún no hay publicaciones aquí.',
			href: bookishNews ? `/bookish-news/${bookishNews.slug}` : '/bookish-news',
			imageUrl: bookishNews?.image ? imgUrl(bookishNews.image) : null,
			isEmpty: !bookishNews,
		},
		{
			day: 'Martes',
			typeLabel: 'Top 10',
			typeBgColor: 'var(--color-blush)',
			typeTextColor: 'var(--color-brown)',
			title: topTen?.topic ?? 'Próximamente...',
			description:
				topTen?.intro?.slice(0, 100) ??
				'Listas, recomendaciones y contenido extra para los amantes de los libros.',
			href: topTen
				? `/blog/top-ten-tuesday/${topTen.slug}`
				: '/blog/top-ten-tuesday',
			imageUrl: topTen?.cover ? imgUrl(topTen.cover) : null,
			isEmpty: !topTen,
		},
		{
			day: 'Miércoles',
			typeLabel: 'WWW Wednesday',
			typeBgColor: 'var(--color-brown-soft)',
			typeTextColor: 'white',
			title: wwwWednesday?.title ?? 'Próximamente...',
			description: 'Próximas lecturas que muero por leer.',
			href: wwwWednesday
				? `/blog/www-wednesday/${wwwWednesday.slug}`
				: '/blog/www-wednesday',
			imageUrl: wwwWednesday?.reading_next?.image
				? imgUrl(wwwWednesday.reading_next.image)
				: wwwWednesday?.cover_image
					? imgUrl(wwwWednesday.cover_image)
					: null,
			isEmpty: !wwwWednesday,
		},

		{
			day: 'Viernes',
			typeLabel: 'Reseña',
			typeBgColor: 'var(--color-rose)',
			typeTextColor: 'var(--color-brown)',
			title: featuredReview?.title ?? 'Próximamente...',
			description: featuredReview
				? `Reseña de ${featuredReview.book?.title ?? 'un libro'}`
				: 'Cada viernes, una nueva reseña honesta.',
			href: featuredReview
				? `/book-review/${featuredReview.slug}`
				: '/book-review',
			imageUrl: featuredReview?.book?.image
				? imgUrl(featuredReview.book.image)
				: null,
			isEmpty: !featuredReview,
		},
		{
			day: 'Último post',
			typeLabel: 'Monthly Wrap-Up',
			typeBgColor: 'var(--color-taupe)',
			typeTextColor: 'var(--color-brown)',
			title: monthlyWrapUp?.title ?? 'Próximamente...',
			description: monthlyWrapUp
				? `Leí ${monthlyWrapUp.books_read_count ?? 'varios'} libros este mes. Estadísticas y opiniones.`
				: 'Resumen mensual con estadísticas y rankings.',
			href: monthlyWrapUp
				? `/blog/monthly-wrap-up/${monthlyWrapUp.slug}`
				: '/blog/monthly-wrap-up',
			imageUrl: monthlyWrapUp?.cover_image
				? imgUrl(monthlyWrapUp.cover_image)
				: null,
			isEmpty: !monthlyWrapUp,
		},
	];

	return (
		<section className={styles.section}>
			<div className="container">
				<h2 className={styles.sectionTitle}>Esta semana en el blog</h2>
				<div className={styles.grid}>
					{cards.map((card) => (
						<article
							key={card.day}
							className={`${styles.card} ${card.isEmpty ? styles.cardEmpty : ''}`}
						>
							<div className={styles.imageWrap}>
								{card.imageUrl ? (
									// eslint-disable-next-line @next/next/no-img-element
									<img
										src={card.imageUrl}
										alt={card.title}
										className={styles.image}
									/>
								) : (
									<div className={styles.imagePlaceholder} />
								)}
							</div>
							<span className={styles.dayBadge}>{card.day}</span>
							<div className={styles.content}>
								<span
									className={styles.typeBadge}
									style={{
										backgroundColor: card.typeBgColor,
										color: card.typeTextColor,
									}}
								>
									{card.typeLabel}
								</span>
								<h3 className={styles.title}>{card.title}</h3>
								<p className={styles.desc}>{card.description}</p>
								<Link href={card.href} className={styles.link}>
									Leer más →
								</Link>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}

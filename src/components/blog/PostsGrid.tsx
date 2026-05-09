'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { FaSearch, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import type { Post, BlockNode, TextNode } from '@/types/strapi';
import styles from '@/app/blog/page.module.css';

const STRAPI_URL =
	process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';
const PAGE_SIZE = 10;

function getCoverUrl(post: Post): string | null {
	const url = post.image?.formats?.medium?.url ?? post.image?.url;
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

function blockToExcerpt(blocks: Post['content'], max = 180): string {
	for (const block of blocks ?? []) {
		for (const child of (block.children as Array<BlockNode | TextNode>) ?? []) {
			if (
				(child as TextNode).type === 'text' &&
				(child as TextNode).text?.trim()
			) {
				const text = (child as TextNode).text!.trim();
				return text.length > max ? `${text.slice(0, max)}…` : text;
			}
		}
	}
	return '';
}

interface Props {
	posts: Post[];
	categories: string[];
}

export default function PostsGrid({ posts, categories }: Props) {
	const [search, setSearch] = useState('');
	const [activeFilter, setActiveFilter] = useState('all');
	const [page, setPage] = useState(1);

	const filtered = useMemo(() => {
		let result = posts;
		if (activeFilter !== 'all') {
			result = result.filter((p) =>
				p.categories?.some((c) => c.name === activeFilter),
			);
		}
		if (search.trim()) {
			const q = search.toLowerCase();
			result = result.filter((p) => p.title.toLowerCase().includes(q));
		}
		return result;
	}, [posts, activeFilter, search]);

	const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
	const safePage = Math.min(page, totalPages);
	const paginated = filtered.slice(
		(safePage - 1) * PAGE_SIZE,
		safePage * PAGE_SIZE,
	);

	function handleFilter(cat: string) {
		setActiveFilter(cat);
		setPage(1);
	}
	function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
		setSearch(e.target.value);
		setPage(1);
	}

	return (
		<>
			<div className={styles.filtersSection}>
				<div className={styles.searchBox}>
					<input
						type="text"
						placeholder="Buscar por título..."
						value={search}
						onChange={handleSearch}
						className={styles.searchInput}
					/>
					<FaSearch className={styles.searchIcon} />
				</div>

				<div className={styles.filterButtons}>
					<button
						className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.filterBtnActive : ''}`}
						onClick={() => handleFilter('all')}
					>
						Todas
					</button>
					{categories.map((cat) => (
						<button
							key={cat}
							className={`${styles.filterBtn} ${activeFilter === cat ? styles.filterBtnActive : ''}`}
							onClick={() => handleFilter(cat)}
						>
							{cat}
						</button>
					))}
				</div>
			</div>

			<div className={styles.grid}>
				{paginated.length === 0 ? (
					<div className={styles.empty}>
						<p>No se encontraron entradas con ese criterio.</p>
					</div>
				) : (
					paginated.map((post) => {
						const coverUrl = getCoverUrl(post);
						const category = post.categories?.[0]?.name;
						const excerpt = blockToExcerpt(post.content);

						return (
							<article key={post.id} className={styles.card}>
								<Link href={`/blog/${post.slug}`} className={styles.cardLink}>
									<div className={styles.cardInner}>
										<div className={styles.imageWrapper}>
											{coverUrl ? (
												// eslint-disable-next-line @next/next/no-img-element
												<img
													src={coverUrl}
													alt={post.title}
													className={styles.cardImage}
												/>
											) : (
												<div className={styles.imagePlaceholder}>📝</div>
											)}
											<div className={styles.overlay} />
										</div>

										<div className={styles.cardContent}>
											{category && (
												<span className={styles.categoryBadge}>{category}</span>
											)}
											<h2 className={styles.cardTitle}>{post.title}</h2>
											{excerpt && (
												<p className={styles.cardExcerpt}>{excerpt}</p>
											)}
											<div className={styles.cardMeta}>
												<span className={styles.metaItem}>
													<FaCalendarAlt />
													{formatDate(post.createdAt)}
												</span>
											</div>
											<span className={styles.readMore}>
												Leer más <FaArrowRight />
											</span>
										</div>
									</div>
								</Link>
							</article>
						);
					})
				)}
			</div>

			{totalPages > 1 && (
				<div className={styles.pagination}>
					<button
						className={styles.pageBtn}
						onClick={() => setPage((p) => Math.max(1, p - 1))}
						disabled={safePage === 1}
					>
						<FaChevronLeft />
					</button>
					{Array.from({ length: totalPages }).map((_, i) => (
						<button
							key={i}
							className={`${styles.pageBtn} ${safePage === i + 1 ? styles.pageBtnActive : ''}`}
							onClick={() => setPage(i + 1)}
						>
							{i + 1}
						</button>
					))}
					<button
						className={styles.pageBtn}
						onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
						disabled={safePage === totalPages}
					>
						<FaChevronRight />
					</button>
				</div>
			)}
		</>
	);
}

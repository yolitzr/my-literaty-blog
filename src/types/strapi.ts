// ─── Strapi v5 primitives ─────────────────────────────────────────────────────

export interface StrapiPagination {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}

export interface StrapiListResponse<T> {
	data: T[];
	meta: { pagination: StrapiPagination };
}

export interface StrapiSingleResponse<T> {
	data: T;
	meta: Record<string, unknown>;
}

// ─── Media ────────────────────────────────────────────────────────────────────

export interface StrapiImageFormat {
	url: string;
	width: number;
	height: number;
	size: number;
}

export interface StrapiImage {
	id: number;
	documentId: string;
	url: string;
	alternativeText: string | null;
	width: number | null;
	height: number | null;
	formats: {
		thumbnail?: StrapiImageFormat;
		small?: StrapiImageFormat;
		medium?: StrapiImageFormat;
		large?: StrapiImageFormat;
	} | null;
}

// ─── Blocks (Slate.js format used by Strapi rich text) ────────────────────────

export type TextNode = {
	type: 'text';
	text: string;
	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
	strikethrough?: boolean;
	code?: boolean;
};

export type BlockNode = {
	type: string;
	children?: Array<BlockNode | TextNode>;
	level?: number;
	format?: 'ordered' | 'unordered';
	url?: string;
	image?: {
		url: string;
		alternativeText: string | null;
		width: number;
		height: number;
	};
};

export type BlocksContent = BlockNode[];

// ─── Content types ────────────────────────────────────────────────────────────

export interface Publisher {
	id: number;
	documentId: string;
	name: string;
	slug?: string;
}

export interface Genre {
	id: number;
	documentId: string;
	title: string;
	slug: string;
}

export interface Category {
	id: number;
	documentId: string;
	name: string;
	slug: string;
	books?: Book[];
	posts?: Post[];
}

export interface Author {
	id: number;
	documentId: string;
	full_name: string;
	content: BlocksContent | null;
	website: string | null;
	slug: string;
	image: StrapiImage | null;
	is_featured: boolean | null;
	books?: Book[];
}

export interface Review {
	id: number;
	documentId: string;
	title: string;
	content: BlocksContent;
	rating: number;
	slug: string;
	book?: Book;
	createdAt: string;
	publishedAt: string | null;
}

export interface Book {
	id: number;
	documentId: string;
	title: string;
	original_title: string | null;
	serie: string | null;
	publisher?: Publisher | null;
	isbn: string | null;
	pages: number | null;
	publication_date: string | null;
	synopsis: BlocksContent | null;
	slug: string;
	image: StrapiImage | null;
	categories?: Category[];
	genres?: Genre[];
	author?: Author | null;
	review?: Review | null;
	amazon_link?: string | null;
	goodreads_link?: string | null;
	locale?: string;
	localizations?: Book[];
	createdAt: string;
	publishedAt: string | null;
	reading_status?: 'leido' | 'leyendo' | 'quiero_leer' | 'arc' | 'en_ingles' | null;
	my_rating?: number | null;
	date_started?: string | null;
	date_finished?: string | null;
	is_favorite?: boolean | null;
	owned_format?: 'fisico' | 'ebook' | 'audiolibro' | null;
}

export interface Post {
	id: number;
	documentId: string;
	title: string;
	content: BlocksContent;
	slug: string;
	image: StrapiImage | null;
	categories?: Category[];
	createdAt: string;
	publishedAt: string | null;
}

export interface SobreMi {
	id: number;
	documentId: string;
	title: string;
	bio: BlocksContent | null;
	photo: StrapiImage | null;
	publishedAt: string | null;
}

export interface PoliticaDeResenas {
	id: number;
	documentId: string;
	title: string;
	content: BlocksContent | null;
	publishedAt: string | null;
}

export interface BookishNewsEntry {
	id: number;
	documentId: string;
	title: string;
	slug: string;
	date: string;
	type: 'arc_alert' | 'bookish_news';
	first_impressions: BlocksContent | null;
	image: StrapiImage | null;
	book?: Book | null;
	createdAt: string;
}

export interface WwwWednesdayEntry {
	id: number;
	documentId: string;
	date: string;
	slug: string;
	intro: string | null;
	currently_reading?: Book | null;
	currently_progress: number | null;
	currently_thoughts: string | null;
	recently_finished?: Book | null;
	recently_rating: number | null;
	reading_next?: Book | null;
	createdAt: string;
}

export interface TopTenTuesdayEntry {
	id: number;
	documentId: string;
	topic: string;
	slug: string;
	date: string;
	intro: string | null;
	createdAt: string;
}

export interface MonthlyWrapUpEntry {
	id: number;
	documentId: string;
	title: string;
	slug: string;
	month: number;
	year: number;
	cover_image: StrapiImage | null;
	books_read_count: number | null;
	average_rating: number | null;
	createdAt: string;
}

export interface HomeData {
	id: number;
	documentId: string;
	hero_title: string;
	hero_subtitle: string;
	hero_cta_text: string;
	hero_background: StrapiImage | null;
	featured_review?: Review | null;
	about_snippet: string | null;
	about_photo: StrapiImage | null;
	newsletter_title: string | null;
	newsletter_subtitle: string | null;
	footer_quote: string | null;
	footer_quote_author: string | null;
}

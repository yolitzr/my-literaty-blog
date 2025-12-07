// composables/useBooks.ts
import { useStrapi } from './useStrapi';

export const useBooks = () => {
	const { fetchFromStrapi } = useStrapi();

	type Book = {
		id: number;
		title: string;
		slug: string;
	};

	const getBooks = async (params: any = {}) => {
		return await fetchFromStrapi('/books', { params });
	};

	// Get book by slug
	const getBookBySlug = async (slug: string) => {
		const response = await fetchFromStrapi('/books', {
			params: {
				filters: { slug: { $eq: slug } },
			},
		});
		return response as { data: Book[] } | null;
	};

	// Get books by genre
	const getBooksByGenre = async (genreSlug: string) => {
		return await fetchFromStrapi('/books', {
			params: {
				filters: {
					genres: { slug: { $eq: genreSlug } },
				},
			},
		});
	};

	return {
		getBooks,
		getBookBySlug,
		getBooksByGenre,
	};
};

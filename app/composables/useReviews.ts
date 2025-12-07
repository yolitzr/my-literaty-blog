// composables/useReviews.ts
import { useStrapi } from './useStrapi';

export const useReviews = () => {
	const { fetchFromStrapi } = useStrapi();

	type Review = {
		id: number;
		title: string;
		slug: string;
		book: {
			id: number;
			title: string;
		};
	};

	// Get all reviews
	const getReviews = async (params: any = {}) => {
		return await fetchFromStrapi('/reviews', { params });
	};

	// Get review by slug
	const getReviewBySlug = async (slug: string) => {
		const response = await fetchFromStrapi('/reviews', {
			params: {
				filters: { slug: { $eq: slug } },
				populate: {
					book: {
						populate: ['cover_image', 'author', 'publisher', 'genres'],
					},
				},
			},
		});
		return response as { data: Review[] } | null;
	};

	// Get recent reviews
	const getRecentReviews = async (limit: number = 6) => {
		return await getReviews({
			sort: ['publish_date:desc'],
			pagination: { limit },
		});
	};

	return {
		getReviews,
		getReviewBySlug,
		getRecentReviews,
	};
};

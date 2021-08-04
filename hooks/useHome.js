import { useState, useEffect } from "react";
//API
import API from '../config/api.js'

// const initialState = {
// 	results: [],
// 	// page: 1,
// 	// pages_totals: 0,
// 	// results_totals: 0,
// };

export function useHome() {
    const [featuredData, setFeaturedData] = useState([]);
	const [reviewsData, setReviewsData] = useState([]);
	const [releasesData, setReleasesData] = useState([]);

     const featuredBooks = async () => {
		try {
			const featured = await API.fetchBooks({
				order: {
					field: 'book.id',
					dir: 'desc',
				},
				search: [
					{
						field: ['book.is_featured'],
						operator: '=',
						value: true,
					},
				],
			});

			setFeaturedData(featured.results);

		} catch (error) {
			console.log(error);
		}
	};

	const bookReviews = async () => {
		try {
			const reviews = await API.fetchBooks({
				order: {
					field: 'book.id',
					dir: 'desc',
				},
				search: [
					{
						field: ['review.id'],
						operator: 'isNotNull',
						value: 'null',
					},
				],
			});

			setReviewsData(reviews.results);

		} catch (error) {
			console.log(error);
		}
	}

    useEffect(() => {
        featuredBooks();
		bookReviews();
    }, [])

    return { featuredData, reviewsData }
}
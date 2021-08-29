import { useState, useEffect } from 'react';
//API
import API from '../config/api.js';

// const initialState = {
// 	results: [],
// 	// page: 1,
// 	// pages_totals: 0,
// 	// results_totals: 0,
// };

export function useBooks() {
	const [bookData, setBookData] = useState([]);
	const [featuredData, setFeaturedData] = useState([]);
	const [reviewsData, setReviewsData] = useState([]);
	const [releasesData, setReleasesData] = useState([]);
	const [search, setSearch] = useState('');

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

	const bookReviews = async (search) => {
		try {
			let searchParams = [
				{
					field: ['review.id'],
					operator: 'isNotNull',
					value: null,
				},
			];

			if (search != '') {
				searchParams.push({
					field: ['book.title'],
					operator: '=',
					value: search,
				});
			}

			const reviews = await API.fetchBooks({
				order: {
					field: 'book.id',
					dir: 'desc',
				},
				search: searchParams,
			});

			setReviewsData(reviews.results);
		} catch (error) {
			console.log(error);
		}
	};

	const realeseBooks = async () => {
		try {
			const releases = await API.fetchBooks({
				order: {
					field: 'book.id',
					dir: 'desc',
				},
				search: [
					{
						field: ['book.published'],
						operator: '>=',
						value: '2021-01-01',
					},
				],
			});

			setReleasesData(releases.results);
		} catch (error) {
			console.log(error);
		}
	};

	// const searchBooks = async (search) => {
	// 	try {
	// 		const searchs = await API.fetchBooks({
	// 			order: {
	// 				field: 'book.id',
	// 				dir: 'desc',
	// 			},
	// 			search: [
	// 				{
	// 					field: ['book.title'],
	// 					operator: '=',
	// 					value: search,
	// 				},
	// 			],
	// 		});

	// 		setSearch(searchs.results);
	// 		console.log(searchs.results);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	useEffect(() => {
		bookReviews(search);
		featuredBooks();
		realeseBooks();
		// searchBooks(search);
	}, [search]);

	return { featuredData, reviewsData, releasesData, search, setSearch };
}

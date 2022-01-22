import { useState, useEffect } from 'react'
//API
import { apiSettings } from '../config/api.js'

const initialState = {
	results: [],
	page: 1,
	pages_totals: 0,
	results_totals: 0,
}

export function useBooks() {
	const [bookData, setBookData] = useState(initialState)
	const [featuredData, setFeaturedData] = useState([])
	const [reviewsData, setReviewsData] = useState(initialState)
	const [releasesData, setReleasesData] = useState([])
	const [search, setSearch] = useState('')

	const featuredBooks = async () => {
		try {
			const featured = await apiSettings.fetchBooks({
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
			})

			setFeaturedData(featured.results)
		} catch (error) {
			console.log(error)
		}
	}

	const bookReviews = async (search) => {
		try {
			let searchParams = [
				{
					field: ['review.id'],
					operator: 'isNotNull',
					value: null,
				},
			]

			if (search != '') {
				searchParams.push({
					field: ['book.title'],
					operator: '=',
					value: search,
				})
			}

			const reviews = await apiSettings.fetchBooks({
				order: {
					field: 'book.id',
					dir: 'desc',
				},
				search: searchParams,
			})

			setReviewsData((prevState) => ({
				...reviews,
				results: reviews.page > 1 ? [...prevState.results, ...reviews.results.results] : [...reviews.results] 
			}))
			console.log(reviews)
		} catch (error) {
			console.log(error)
		}
	}

	const realeseBooks = async () => {
		try {
			const releases = await apiSettings.fetchBooks({
				order: {
					field: 'book.id',
					dir: 'desc',
				},
				search: [
					{
						field: ['book.published'],
						operator: '>=',
						value: '2022-01-01',
					},
				],
			})

			setReleasesData(releases.results)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		bookReviews(search)
		featuredBooks()
		realeseBooks()
	}, [search])

	return { featuredData, reviewsData, releasesData, search, setSearch }
}

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
	const [bookData, setBookData] = useState([])
	const [reviewsData, setReviewsData] = useState(initialState)
	const [search, setSearch] = useState('')

	const allBooks = async () => {
		try {
			const books = await apiSettings.fetchBooks({
				order: {
					field: 'book.id',
					dir: 'asc',
				}
			})

			setBookData(books.results)			
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

		} catch (error) {
			console.log(error)
		}
	}
	
	useEffect(() => {
		bookReviews(search, reviewsData.page + 1)
		allBooks()
	}, [search, reviewsData.page])

	return { bookData,reviewsData, search, setSearch }
}

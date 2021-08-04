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
    const [booksData, setBooksData] = useState([]);

     const featuredBooks = async () => {
		try {
			const books = await API.fetchBooks({
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

			setBooksData(books.results);
		} catch (error) {
			console.log(error);
		}
	};

    useEffect(() => {
        featuredBooks()
    }, [])

    return { booksData }
}
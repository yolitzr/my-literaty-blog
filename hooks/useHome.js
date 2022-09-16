import { getBooks } from '../config/api';

// Featured Books
export const getFeaturedBooks = async () => {
	const featured = await getBooks({
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

	return featured;
};

// Anticipated Books
export const getAnticipatedBooks = async () => {
	const anticipated = await getBooks({
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
	});

	return anticipated;
};

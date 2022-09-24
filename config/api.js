import axios from 'axios';
// Config
import {
	BASE_URL,
	API_URL,
	API_URL_DETAILS,
	API_GENDERS,
	API_GENDERS_DETAILS,
} from '../config/config.js';

const getBooks = async (body) => {
	const defaultConfig = {
		method: 'POST',
		headers: {
			'X-AUTH-TOKEN': process.env.NEXT_PUBLIC_API_KEY,
			'Content-Type': 'application/json',
		},
	};
	const { data } = await axios(`${API_URL}`, {
		...defaultConfig,
		data: body,
	});

	return data;
};

const getGenders = async (body) => {
	const defaultConfig = {
		method: 'GET',
		headers: {
			'X-AUTH-TOKEN': process.env.NEXT_PUBLIC_API_KEY,
			'Content-Type': 'application/json',
		},
	};
	const { data } = await axios(`${API_GENDERS}`, {
		...defaultConfig,
		data: body,
	});

	return data['hydra:member'];
};

const getBookGenreID = (genre) =>
	Promise.all(
		genre.books.map(async (genre) => {
			const res = await axios(`${BASE_URL}${genre}`, {
				method: 'GET',
				headers: {
					'X-AUTH-TOKEN': process.env.NEXT_PUBLIC_API_KEY,
					'Content-Type': 'application/json',
				},
			});

			return res.data;
		})
	);

const getImage = (book) =>
	Promise.all(
		book.map(async (image) => {
			const res = await axios(`${BASE_URL}${image.image_main}`, {
				method: 'GET',
				headers: {
					'X-AUTH-TOKEN': process.env.NEXT_PUBLIC_API_KEY,
					'Content-Type': 'application/json',
				},
			});

			return res.data;
		})
	);
const getGenresDetails = async (id) => {
	const configId = {
		method: 'GET',
		headers: {
			'X-AUTH-TOKEN': process.env.NEXT_PUBLIC_API_KEY,
			'Content-Type': 'application/json',
		},
	};

	const { data } = await axios(`${API_GENDERS_DETAILS}` + id, {
		...configId,
	});

	return data;
};

const apiSlug = {
	fetchDetail: async (slug) => {
		const configSlug = {
			method: 'GET',
			url: API_URL_DETAILS + slug,
			headers: {
				'X-AUTH-TOKEN': process.env.NEXT_PUBLIC_API_KEY,
				'Content-Type': 'application/json',
			},
		};
		return await axios(`${API_URL_DETAILS}`, {
			...configSlug,
		}).then(function (res) {
			return res.data;
		});
	},
};

const apiSettings = {
	fetchBooks: async (body) => {
		return await axios(`${API_URL}`, {
			...defaultConfig,
			data: body,
		}).then(function (res) {
			return res.data;
		});
	},
};

export {
	apiSlug,
	getBooks,
	apiSettings,
	getGenders,
	getGenresDetails,
	getBookGenreID,
	getImage,
};

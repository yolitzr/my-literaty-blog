import axios from 'axios';
// Config
import { API_URL, API_URL_DETAILS, API_GENDERS } from '../config/config.js';

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

export { apiSlug, getBooks, apiSettings, getGenders };

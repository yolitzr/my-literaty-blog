import axios from 'axios'
// Config
import { API_URL, API_URL_DETAILS } from '../config/config.js'

const apiSettings = {
	fetchBooks: async (body) => {
		const defaultConfig = {
			method: 'POST',
			headers: {
				'X-AUTH-TOKEN': process.env.NEXT_PUBLIC_API_KEY,
				'Content-Type': 'application/json',
			},
		}
		return await axios(`${API_URL}`, {
			...defaultConfig,
			data: body,
		}).then(function (res) {
			return res.data
		})
	},
}

const apiSlug = {
	fetchDetail: async (slug) => {
		const configSlug = {
			method: 'GET',
			url: API_URL_DETAILS + slug,
			headers: {
				'X-AUTH-TOKEN': process.env.NEXT_PUBLIC_API_KEY,
				'Content-Type': 'application/json',
			},
		}
		return await axios(`${API_URL_DETAILS}`, {
			...configSlug,
		}).then(function (res) {
			return res.data
		})
	},
}

export {apiSettings , apiSlug}



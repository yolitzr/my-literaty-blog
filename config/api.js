import axios from 'axios';
// Config
import { API_URL } from '../config/config.js'

const urlGeneral = 'http://admin.carosbookish.com/api/v1/book/list';

const defaultConfig = {
	method: 'POST',
	headers: {
		'X-AUTH-TOKEN': process.env.NEXT_PUBLIC_API_KEY,
		'Content-Type': 'application/json',
	},
};

const apiSettings = {
	fetchBooks : async (body) => {
		return await axios(`${API_URL}`, {
			...defaultConfig,
			data: body,
		}).then(function (res) {
			return res.data
		})
	}
}

export default apiSettings;
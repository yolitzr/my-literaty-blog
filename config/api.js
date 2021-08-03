import axios from 'axios';

const urlGeneral = 'http://admin.carosbookish.com/api/v1/book/list';
// const urlDetails = `http://admin.carosbookish.com/api/v1/book/`;

const defaultConfig = {
	method: 'POST',
	headers: {
		'X-AUTH-TOKEN': 'r0bUsSF2H9LiL1aYoHw',
		'Content-Type': 'application/json',
	},
};

const apiSettings = {
	fetchBooks : async (body) => {
		return await axios(urlGeneral, {
			...defaultConfig,
			data: body,
		}).then(function (res) {
			return res.data
		})
	}
}

export default apiSettings;
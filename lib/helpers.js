export const getDate = (date) =>
	new Date(date).toLocaleDateString('en-EN', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

const path = require('path')

module.exports = {
	reactStrictMode: true,
	images: {
		domains: ['yolitsbooks.com'],
		deviceSizes: [320, 425, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
	},
	sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  }
}
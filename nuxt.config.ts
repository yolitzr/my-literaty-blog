// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	css: ['./app/assets/css/main.css'],
	vite: {
		plugins: [tailwindcss()],
	},

	app: {
		head: {
			title: "Yolit's Bookish",
			htmlAttrs: {
				lang: 'es',
			},
			meta: [
				{
					name: 'description',
					content:
						"Yolit's Bookish - Compulsive Reader, Book Blogger and Reviewer",
				},
			],
		},
	},

	modules: [
		'@nuxt/image',
		'@nuxtjs/i18n',
		'@nuxt/icon',
		'@vueuse/nuxt',
		'@nuxtjs/apollo',
		'@nuxt/fonts',
	],

	// Runtime Config
	runtimeConfig: {
		public: {
			wordpressUrl:
				import.meta.env.NUXT_PUBLIC_WORDPRESS_URL || 'http://localhost:8080',
			graphqlEndpoint:
				import.meta.env.NUXT_PUBLIC_GRAPHQL_ENDPOINT || '/graphql',
			apiBase: import.meta.env.NUXT_PUBLIC_API_BASE || '/wp-json/wp/v2',
		},
	},

	// Apollo Configuration
	apollo: {
		clients: {
			default: {
				httpEndpoint: import.meta.env.NUXT_PUBLIC_GRAPHQL_ENDPOINT,
			},
		},
	},

	image: {
		domains: [
			import.meta.env.NUXT_PUBLIC_WORDPRESS_URL.replace(/https?:\/\//, ''),
		],
	},

	// Configuración de i18n
	i18n: {
		locales: [
			{ code: 'es', name: 'Español', flag: '🇪🇸', iso: 'es-ES' },
			{ code: 'en', name: 'English', flag: '🇺🇸', iso: 'en-US' },
		],
		defaultLocale: 'es',
		detectBrowserLanguage: {
			useCookie: true,
			cookieKey: 'i18n_redirected',
			redirectOn: 'root',
			alwaysRedirect: true,
		},
		strategy: 'prefix_except_default',
		vueI18n: './i18n.config.ts',
	},

	fonts: {
		families: [
			// Configuración óptima para tus fuentes
			{
				name: 'Oswald',
				provider: 'google',
				weights: [400, 500, 600, 700],
				subsets: ['latin'],
				display: 'swap', // ← Crucial para evitar FOIT
			},
			{
				name: 'Nunito',
				provider: 'google',
				weights: [300, 400, 600, 700],
				subsets: ['latin'],
				display: 'swap',
			},
			{
				name: 'Playfair Display',
				provider: 'google',
				weights: [400, 600],
				subsets: ['latin'],
				display: 'swap',
			},
			{
				name: 'Poppins',
				provider: 'google',
				weights: [400, 500, 600, 700],
				subsets: ['latin'],
				display: 'swap',
			},
		],
	},
});

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
			title: "Yolit's Bookshelf",
			htmlAttrs: {
				lang: 'es',
			},
			meta: [
				{
					name: 'description',
					content:
						"Yolit's Bookshelf - Compulsive Reader, Book Blogger and Reviewer",
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
});

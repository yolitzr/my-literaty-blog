export const useStrapi = () => {
	const config = useRuntimeConfig();
	const strapiUrl = config.public.NUXT_PUBLIC_STRAPI_URL;

	const fetchFromStrapi = async <T>(
		endpoint: string,
		options: any = {}
	): Promise<T> => {
		const url = `${strapiUrl}/api${endpoint}`;

		const response = await $fetch(url, {
			...options,
			params: {
				populate: '*',
				...options.params,
			},
		});

		return response as T;
	};

	return {
		fetchFromStrapi,
	};
};

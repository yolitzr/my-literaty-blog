export default async function usePosts(limit = 3) {
	const query = gql`
		query {
			posts(first: ${limit}, where: { categoryName: "blog" }) {
				edges {
					node {
						id
						title
						slug
						featuredImage {
							node {
								sourceUrl
							}
						}
					}
				}
			}
		}
	`;

	const { data } = await useAsyncQuery(query);

	return {
		data,
	};
}

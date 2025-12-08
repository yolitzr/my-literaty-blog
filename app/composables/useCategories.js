export default async function useCategories(slug) {
	const query = gql`
		query {
			categories(where: { slug: "${slug}" }) {
				edges {
					node {
						id
						name
						slug
						posts(first: 3) {
							nodes {
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
			}
		}
	`;

	const { data } = await useAsyncQuery(query, { slug });

	return {
		data,
	};
}

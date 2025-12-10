export default async function useCategories(slug, limit = 3) {
	const query = gql`
		query {
			categories(where: { slug: "${slug}" }) {
				edges {
					node {
						id
						name
						slug
						posts(first: ${limit}) {
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

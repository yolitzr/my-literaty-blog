export default async function useCategories(slug, limit = 3) {
	const query = gql`
		query {
			categories(where: { slug: "${slug}" }) {
				edges {
				node {
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
							book {
								myRating
								isFeatured
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

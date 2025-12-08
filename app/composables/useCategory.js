export default async function useCategory(id) {
	console.log('id', id);
	const query = gql`
		query {
			category(slug: "${id}") {
				id
				slug
				name
				posts {
					nodes {
						id
						slug
						title
					}
				}
			}
		}
	`;

	const { data } = await useAsyncQuery(query, { id });

	return {
		data,
	};
}

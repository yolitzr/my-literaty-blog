export default async function usePosts() {
	const query = gql`
		query {
			posts(first: 10) {
				nodes {
					id
				}
			}
		}
	`;

	const { data } = await useAsyncQuery(query);

	return {
		data,
	};
}

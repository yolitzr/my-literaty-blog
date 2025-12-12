export default async function useReview(slug) {
	// Asegurarse de que slug sea un string
	const slugString = Array.isArray(slug) ? slug[0] : slug;

	if (!slugString) {
		throw new Error('Slug no proporcionado');
	}

	const query = gql`
		query {
			postBy(slug: "${slugString}") {
				id
				title
				slug
				content
				date
				categories {
					nodes {
						name
					}
				}
				featuredImage {
					node {
						sourceUrl
						altText
					}
				}
				book {
      amazonLink
      author
      fieldGroupName
      genre
      goodreadsLink
      isFeatured
      isbn
      language
      myRating
      nroSerie
      pages
      publicationYear
      publisher
      series
      synopsis
      title
      statusBook
      statusReading
      formato
    }

				author {
      node {
        avatar {
          height
          url
          width
        }
        firstName
        lastName
        name
				description

      }
    }
			}
		}
	`;

	const { data, error } = await useAsyncQuery(query, { slug: slugString });

	return {
		data,
		error,
	};
}

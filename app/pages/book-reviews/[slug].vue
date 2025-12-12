<script setup>
import useReview from '~/composables/useReview';

const route = useRoute();
const slug = Array.isArray(route.params.slug)
	? route.params.slug[0]
	: route.params.slug;

if (!slug) {
	throw createError({
		statusCode: 400,
		statusMessage: 'Slug no proporcionado',
	});
}

const { data: reviewData, error } = await useReview(slug);

const review = computed(() => {
	if (!reviewData.value) return null;
	return reviewData.value.postBy || null;
});

// Verificar si hay error en el query
if (error.value) {
	console.error('Error al cargar reseña:', error.value);
	throw createError({
		statusCode: 404,
		statusMessage: 'Error al cargar la reseña',
	});
}

// Verificar si no se encontró la reseña
if (!review.value) {
	console.warn('Reseña no encontrada para slug:', slug);
	console.warn('Datos recibidos:', reviewData.value);
	throw createError({
		statusCode: 404,
		statusMessage: 'Reseña no encontrada',
	});
}

// SEO
useHead({
	title: review.value?.title || 'Reseña',
	meta: [
		{
			name: 'description',
			content: review.value?.book?.synopsis || review.value?.title,
		},
	],
});
</script>

<template>
	<div class="container mx-auto p-6 lg:py-10 lg:px-14">
		<h1
			class="text-xl lg:text-5xl font-bold mb-4 text-purple-800 tracking-tight"
		>
			{{ review?.title }}
		</h1>

		<!-- Post Meta data -->
		<div class="flex flex-wrap items-center gap-2 mb-4">
			<span
				class="text-sm text-gray-500 flex items-center gap-2 font-nunito whitespace-nowrap"
			>
				<Icon name="mdi:calendar" class="w-4 h-4 text-purple-800" />
				{{ 'Publicado el ' }}
				{{
					new Date(review?.date).toLocaleDateString('es-ES', {
						day: '2-digit',
						month: 'long',
						year: 'numeric',
					})
				}}
			</span>
			<span
				class="text-sm text-gray-500 items-center gap-2 font-nunito whitespace-nowrap"
			>
				<Icon name="mdi:tags" class="w-4 h-4 text-purple-800" />

				{{
					review.categories.nodes.map((category) => category.name).join(', ')
				}}
			</span>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
			<!-- Columna principal: ocupa 2/3 en desktop -->
			<div class="md:col-span-2 w-full">
				<div
					class="prose max-w-none text-gray-700 text-justify"
					v-html="review.content"
				/>
				<AuthorPost :author="review.author.node" />
				<Comments :comments="review.comments" />
			</div>
			<!-- Sidebar: ocupa 1/3 en desktop -->
			<div class="md:col-span-1 w-full">
				<div
					class="bg-linear-to-tr from-purple-100 via-purple-50 to-purple-100 rounded-xl p-2 flex flex-col items-center mb-8"
					style="border: 1px solid #ede9fe"
				>
					<div
						class="relative w-full flex justify-center items-center"
						style="min-height: 280px"
					>
						<NuxtImg
							:src="
								review.book?.coverUrl || review.featuredImage?.node?.sourceUrl
							"
							:alt="review.book?.title || review.title"
							class="rounded-lg shadow-xl object-cover w-full border-4 border-crimson-400"
							style="
								background: linear-gradient(135deg, #f3e8ff 40%, #f9fafb 100%);
							"
							v-if="
								review.book?.coverUrl || review.featuredImage?.node?.sourceUrl
							"
						/>
						<div
							v-else
							class="w-full max-w-[220px] aspect-[3/4] rounded-lg flex items-center justify-center text-gray-300 bg-gradient-to-tr from-purple-200 to-yellow-100 font-bold text-3xl"
						>
							No hay portada
						</div>
						<!-- Opcional: Reseña destacada -->
						<div
							v-if="review.book?.isFeatured"
							class="absolute top-3 right-3 bg-yellow-400 text-white rounded-full px-3 py-1 font-semibold text-xs shadow-md"
						>
							Destacado
						</div>
					</div>
					<p
						class="mt-4 text-base text-gray-600 text-center font-medium"
						v-if="review.book?.title"
					>
						<strong>{{ review.book.title }}</strong>
						<span v-if="review.book.author"> de {{ review.book.author }}</span>
					</p>

					<div
						v-if="review.book?.myRating"
						class="flex flex-col items-center justify-center my-4 text-purple-800"
					>
						<span class="mr-2 font-semibold">Mi Valoración:</span>
						<div class="flex items-center">
							<span
								v-for="star in 5"
								:key="star"
								class="text-2xl text-yellow-400"
							>
								{{ star <= review.book.myRating ? '★' : '☆' }}
							</span>
						</div>
					</div>

					<div v-if="review.book?.synopsis" class="highlight-box mb-2 mt-4">
						<h3
							class="text-2xl font-extrabold text-purple-900 mb-0 flex items-center gap-2 font-playfair-display italic"
						>
							<Icon name="mdi:book-heart" class="w-5 h-5 text-crimson-400" />
							Sinopsis
						</h3>
						<p
							class="text-gray-800 p-4 text-[14px] text-justify"
							v-html="review?.book?.synopsis"
						/>
					</div>

					<div class="w-full bg-white rounded-md shadow p-4 mb-4">
						<h4 class="text-lg font-bold mb-3 flex items-center gap-2">
							<Icon name="mdi:book-heart" class="w-5 h-5 text-crimson-400" />
							Detalles del libro
						</h4>
						<div class="space-y-2">
							<div
								v-if="review.book?.publisher"
								class="flex justify-between text-sm"
							>
								<span class="font-semibold">Editorial:</span>
								<span>{{ review.book.publisher }}</span>
							</div>
							<div
								v-if="review.book?.isbn"
								class="flex justify-between text-sm"
							>
								<span class="font-semibold">ISBN:</span>
								<span>{{ review.book.isbn }}</span>
							</div>
							<div
								v-if="review.book?.pages"
								class="flex justify-between text-sm"
							>
								<span class="font-semibold">Páginas:</span>
								<span>{{ review.book.pages }}</span>
							</div>
							<div
								v-if="review.book?.language"
								class="flex justify-between text-sm"
							>
								<span class="font-semibold">Idioma:</span>
								<span>{{ review.book.language }}</span>
							</div>
							<div
								v-if="review.book?.series"
								class="flex justify-between text-sm"
							>
								<span class="font-semibold">Serie:</span>
								<span>
									{{ review.book.series }}
									<span v-if="review.book.nroSerie">
										({{ review.book.nroSerie }})</span
									>
								</span>
							</div>
							<div
								v-if="review.book?.genre"
								class="flex justify-between text-sm"
							>
								<span class="font-semibold">Género:</span>
								<span>{{ review.book.genre }}</span>
							</div>
							<div
								v-if="review.book?.formato"
								class="flex justify-between text-sm"
							>
								<span class="font-semibold">Formato:</span>
								<span>{{ review.book.formato }}</span>
							</div>
							<!-- <div class="flex justify-between text-sm">
								<span class="font-semibold">Status:</span>
								<span>
									<span
										v-for="(status, idx) in Array.isArray(
											review.book.statusBook
										)
											? review.book.statusBook
											: [review.book.statusBook]"
										:key="idx"
										class="px-2 py-0.5 rounded-full font-semibold mr-2 capitalize"
										:class="{
											'bg-purple-100 text-purple-700':
												status?.toLowerCase() === 'published',
											'bg-rose-100 text-rose-500':
												status?.toLowerCase() === 'upcoming',
											'bg-gray-100 text-gray-700':
												status?.toLowerCase() !== 'published' &&
												status?.toLowerCase() !== 'upcoming',
										}"
									>
										{{ status }}
									</span>
								</span>
							</div> -->
							<div
								v-if="review.book?.publicationYear"
								class="flex justify-between text-sm"
							>
								<span class="font-semibold">Publicación:</span>
								<span>{{ review.book.publicationYear }}</span>
							</div>
						</div>
						<!-- <div class="flex justify-center gap-3 mt-4">
							<a
								v-if="review.book?.amazonUrl"
								:href="review.book.amazonUrl"
								target="_blank"
								rel="noopener"
								class="inline-flex items-center px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-white font-bold shadow transition-colors"
							>
								<Icon name="mdi:amazon" class="w-5 h-5 mr-2" />
								Comprar en Amazon
							</a>
							<a
								v-if="review.book?.goodreadsUrl"
								:href="review.book.goodreadsUrl"
								target="_blank"
								rel="noopener"
								class="inline-flex items-center px-4 py-2 rounded bg-green-700 hover:bg-green-800 text-white font-bold shadow transition-colors"
							>
								<Icon name="mdi:goodreads" class="w-5 h-5 mr-2" />
								Ver en Goodreads
							</a>
						</div> -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.review-content {
	font-size: 1.1rem;
	line-height: 1.8;
}
</style>

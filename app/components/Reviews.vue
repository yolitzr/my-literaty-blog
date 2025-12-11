<script setup>
const props = defineProps({
	reviews: {
		type: Object,
		required: true,
	},
});

const reviews = computed(() => {
	return props.reviews.categories.edges.map((edge) => edge.node.posts.nodes);
});
</script>

<template>
	<div
		class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12"
	>
		<div
			v-for="review in reviews[0]"
			:key="review.id"
			class="md:col-span-2 lg:col-span-1 group cursor-pointer"
		>
			<div
				class="bg-white rounded-2xl shadow-card border border-stone-200 overflow-hidden hover:shadow-book transition-all duration-300 h-full"
			>
				<div class="relative h-64 md:h-72 overflow-hidden blur-featured">
					<!-- <div class="absolute top-4 left-4 z-20" v-if="review.book.isFeatured">
						<span
							class="absolute top-4 left-4 z-30 px-3 py-1 bg-gradient-to-r from-crimson-600 to-crimson-700 text-white text-xs font-bold rounded-full shadow-lg"
							style="pointer-events: none"
						>
							⭐ Destacada
						</span>
					</div> -->
					<NuxtImg
						:src="review?.featuredImage?.node?.sourceUrl"
						:alt="review?.title"
						class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
						sizes="sm:100vw md:50vw lg:400px"
						loading="eager"
					/>

					<div class="absolute bottom-0 ml-6 mb-5 z-10">
						<nuxt-link
							:to="/book/ + review.slug"
							class="inline-block text-xs md:text-sm uppercase tracking-wider text-white hover:text-crimson-200 font-bold"
						>
							Leer reseña completa
						</nuxt-link>
					</div>

					<div
						class="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg z-20"
					>
						<div class="flex items-center gap-1">
							<span class="text-gold-600 font-bold">{{
								review.book.myRating
							}}</span>
							<div class="flex text-gold-600">
								<span v-for="star in 5" :key="star" class="text-sm">
									{{ star <= review.book.myRating ? '★' : '☆' }}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.blur-featured::after {
	content: '';
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	background-image: linear-gradient(
		360deg,
		#86425f 0%,
		#352f4496 45%,
		transparent 100%
	);
}
</style>

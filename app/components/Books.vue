<script setup>
const props = defineProps({
	books: {
		type: Object,
		required: true,
	},
});

const books = computed(() => {
	return props.books.categories.edges.map((edge) => edge.node.posts.nodes);
});
</script>

<template>
	<div
		class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12"
	>
		<div
			v-for="book in books[0]"
			:key="book.id"
			class="md:col-span-2 lg:col-span-1 group cursor-pointer"
		>
			<div
				class="bg-white rounded-2xl shadow-card border border-stone-200 overflow-hidden hover:shadow-book transition-all duration-300 h-full"
			>
				<div class="relative h-64 md:h-72 overflow-hidden blur-featured">
					<NuxtImg
						:src="book?.featuredImage?.node?.sourceUrl"
						:alt="book?.title"
						class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
						sizes="sm:100vw md:50vw lg:400px"
						loading="eager"
					/>
					<div class="absolute bottom-0 ml-6 mb-6 z-10">
						<nuxt-link
							to="#"
							class="inline-block text-xs md:text-sm uppercase tracking-wider text-white hover:text-crimson-200 font-bold"
						>
							Ver libro
						</nuxt-link>
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
		#352f4496 20%,
		transparent 100%
	);
}
</style>

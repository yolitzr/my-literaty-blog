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
	<section
		class="relative py-16 md:py-10 bg-linear-to-b from-white via-stone-50 to-white"
	>
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<div
				class="absolute top-0 left-0 w-64 h-64 bg-crimson-50 rounded-full blur-3xl opacity-30 transform -translate-x-1/2 -translate-y-1/2"
			></div>
			<div
				class="absolute bottom-0 right-0 w-96 h-96 bg-custom-50 rounded-full blur-3xl opacity-30 transform translate-x-1/3 translate-y-1/3"
			></div>

			<div
				class="absolute top-1/4 left-1/4 w-px h-64 bg-linear-to-b from-transparent via-crimson-200/20 to-transparent"
			></div>
			<div
				class="absolute bottom-1/4 right-1/4 w-px h-64 bg-linear-to-t from-transparent via-custom-200/20 to-transparent"
			></div>
		</div>

		<div class="relative container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12 md:mb-16">
				<div class="inline-flex items-center gap-3 mb-4">
					<div class="w-2 h-8 bg-crimson-600 rounded-full"></div>
					<span
						class="text-crimson-600 font-semibold tracking-widest text-sm uppercase"
					>
						Libros por Leer
					</span>
					<div class="w-2 h-8 bg-custom-600 rounded-full"></div>
				</div>

				<!-- <h2
            class="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-stone-900 mb-4"
          >
            Descubre las
            <span class="relative inline-block">
              <span class="text-crimson-600"> últimas lecturas </span>
              <span
                class="absolute -bottom-2 left-0 right-0 h-1 bg-crimson-400 rounded-full"
              ></span>
            </span>
          </h2> -->

				<p class="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
					Cada libro en mi TBR es una puerta entreabierta a infinitas aventuras,
					sueños y emociones por descubrir. ¿Cuál será el próximo universo al
					que viajaremos juntos?
				</p>
			</div>
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
								<!-- <nuxt-link
        :to="/book/ + book.slug"
        class="inline-block mt-2 md:mt-4 py-2 px-3 text-xs md:text-sm uppercase tracking-wider text-book-white bg-book-second hover:bg-book-neutral hover:text-book-light"
      >
        {{ textButton }}
      </nuxt-link> -->
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
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

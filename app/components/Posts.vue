<script setup>
const props = defineProps({
	posts: {
		type: Object,
		required: true,
	},
});

const posts = computed(() => {
	return props.posts.posts.edges.map((edge) => edge.node);
});
</script>

<template>
	<div
		class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 mb-12"
	>
		<div
			v-for="post in posts"
			:key="post.id"
			class="md:col-span-2 lg:col-span-1 group cursor-pointer"
		>
			<div
				class="bg-white rounded-2xl shadow-card border border-stone-200 overflow-hidden hover:shadow-book transition-all duration-300 h-full"
			>
				<div
					class="relative h-64 md:h-72 overflow-hidden blur-featured"
					style="height: 375px"
				>
					<!-- <div class="absolute top-4 left-4 z-20" v-if="review.is_featured">
          <span
            class="absolute top-4 left-4 z-30 px-3 py-1 bg-gradient-to-r from-crimson-600 to-crimson-700 text-white text-xs font-bold rounded-full shadow-lg"
            style="pointer-events: none;"
          >
            ⭐ Destacada
          </span>
        </div> -->
					<NuxtImg
						:src="post?.featuredImage?.node?.sourceUrl"
						:alt="post?.title"
						:width="830"
						:height="450"
						class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
						sizes="830px"
						loading="eager"
					/>
					<div class="absolute bottom-0 ml-6 mb-6 z-10">
						<!-- <h2
                    class="text-md lg:text-md font-bold leading-6 tracking-wider text-white"
                  >
                    {{ review?.title }}
                  </h2> -->

						<!-- <h3
            class="text-lg lg:text-2xl font-bold leading-6 tracking-wider text-book-white mt-1"
          >
            {{ review?.book?.author?.name }}
            {{ review?.book?.author?.surname }}
          </h3> -->
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

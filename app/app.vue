<script setup>
import { useBooks } from './composables/useBooks';
import { useReviews } from './composables/useReviews';
import bgHero from '~/assets/images/hero.jpg';

const { getBooks } = useBooks();
const { getReviews } = useReviews();

const loading = ref(true);

const { data: books } = await useAsyncData('books', () => getBooks());
const { data: reviews } = await useAsyncData('reviews', () => getReviews());

const heroBgImage = computed(() => {
	return bgHero;
});

console.log('reviews', reviews.value);
</script>

<template>
	<!-- <UiNavBar /> -->
	<UiHero
		:bgImage="heroBgImage"
		title="Yolit's  Bookshelf"
		subtitle="Compulsive Reader, Book Blogger and Reviewer"
	/>

	<!-- <main class="container mx-auto p-6 lg:py-10 lg:px-14">
		<SectionReviews :reviews="reviews" />
	</main> -->
</template>

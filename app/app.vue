<script setup>
import bgHero from '~/assets/images/hero.jpg';

import useCategories from '~/composables/useCategories';

const heroBgImage = computed(() => {
	return bgHero;
});

const { data: reviews } = await useCategories('book-reviews');
const { data: books } = await useCategories('book');
const { data: weeklyBooks } = await useCategories('weekly-books');
</script>

<template>
	<UiHero
		:bgImage="heroBgImage"
		title="Yolit's  Bookshelf"
		subtitle="Compulsive Reader, Book Blogger and Reviewer"
	/>

	<main class="container mx-auto p-6 lg:py-10 lg:px-14">
		<Weekly :weekly="weeklyBooks" />
		<Reviews :reviews="reviews" />
		<Books :books="books" />
	</main>
	<UiFooter />
</template>

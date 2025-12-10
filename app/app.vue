<script setup>
import bgHero from '~/assets/images/hero.jpg';

import useCategories from '~/composables/useCategories';
import usePosts from '~/composables/usePosts';

const heroBgImage = computed(() => {
	return bgHero;
});

const { data: reviews } = await useCategories('book-reviews', 3);
const { data: books } = await useCategories('book', 3);
const { data: weeklyBooks } = await useCategories('weekly-books', 3);
const { data: posts } = await usePosts(2);
</script>

<template>
	<UIHeader />
	<UIHero
		:bgImage="heroBgImage"
		title="Yolit's Bookish"
		subtitle="Compulsive Reader, Book Blogger and Reviewer"
	/>

	<main class="container mx-auto p-6 lg:py-10 lg:px-14">
		<Weekly :weekly="weeklyBooks" />
		<Reviews :reviews="reviews" />
		<Books :books="books" />
		<Posts :posts="posts" />
	</main>
	<UiFooter />
</template>

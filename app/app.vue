<script setup>
import bgHero from '~/assets/images/hero.jpg';

import useCategories from '~/composables/useCategories';
import usePosts from '~/composables/usePosts';

const heroBgImage = computed(() => {
	return bgHero;
});

const { data: bookReviews } = await useCategories('book-reviews', 3);
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
		<!-- <Weekly :weekly="weeklyBooks" /> -->
		<UIWrapperSections
			title="Últimas Reseñas"
			subtitle="Cada reseña es una nueva aventura literaria."
			bgColor="bg-white"
		>
			<Reviews :reviews="bookReviews" />
		</UIWrapperSections>

		<UIWrapperSections
			title="Libros por Leer"
			subtitle="Descubre los libros que me han llamado la atención."
			bgColor="bg-white"
		>
			<Books :books="books" />
		</UIWrapperSections>

		<UIWrapperSections
			title="Entradas Recientes"
			subtitle="Descubre las últimas entradas del blog."
			bgColor="bg-white"
		>
			<Posts :posts="posts" />
		</UIWrapperSections>
	</main>
	<UIFooter />
</template>

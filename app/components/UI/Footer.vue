<script setup>
const titleFooter = "Yolit's Bookish";
const subTitleFooter = 'Compulsive Reader, Book Blogger and Reviewer';
</script>
<template>
	<footer class="w-full py-10 px-4 bg-purple-600">
		<div class="mt-2">
			<p class="text-sm text-center uppercase tracking-wider text-white">
				{{ titleFooter }}
			</p>
			<span class="block mt-1 text-sm text-center uppercase text-white">
				{{ subTitleFooter }} <i class="fas fa-heart"></i>
			</span>
		</div>
	</footer>
</template>

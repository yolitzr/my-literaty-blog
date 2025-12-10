<script setup>
import Logo from '~/assets/images/logo.vue';
</script>

<template>
	<header class="bg-white shadow-md sticky top-0 z-10 py-3">
		<div class="container flex justify-between items-center">
			<div class="flex items-center gap-4">
				<!-- <div class="logo-image">
					<nuxt-link to="/" class="focus:outline-none">
						<Logo class="w-10 focus:outline-none" />
					</nuxt-link>
				</div> -->

				<div class="flex flex-col">
					<h1
						class="text-4xl font-bold tracking-tight font-playfair-display italic"
					>
						<span class="text-purple-600">Yolit's Bookish</span>
					</h1>
					<p class="text-gray-500 text-sm mt-1 mb-0">
						Compulsive Reader, Book Blogger & Reviewer
					</p>
				</div>
			</div>

			<button class="mobile-menu-btn" id="mobileMenuBtn">
				<i class="fas fa-bars"></i>
			</button>

			<UINavBar />
		</div>
	</header>
</template>

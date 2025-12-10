<script setup>
import Logo from '~/assets/images/logo.vue';
</script>

<template>
	<header class="shadow-md">
		<div class="container header-container">
			<div class="flex items-center gap-4">
				<!-- <div class="logo-image">
					<nuxt-link to="/" class="focus:outline-none">
						<Logo class="w-10 focus:outline-none" />
					</nuxt-link>
				</div> -->

				<div class="logo">
					<h1><span class="text-purple-600">Yolit's Bookish</span></h1>
					<p class="text-gray-500">
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

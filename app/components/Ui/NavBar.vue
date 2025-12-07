<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import Logo from '~/assets/images/logo.vue';
import { NAV_LINKS } from '~/assets/js/navLinks';

const props = defineProps({
	headerHeight: {
		type: String,
		required: true,
	},
});

const HEADER_HEIGHT = props.headerHeight;

const showMenu = ref(false);

const links = computed(() => {
	return NAV_LINKS;
});

const toggleNavbar = () => {
	showMenu.value = !showMenu.value;
};

const hideItems = () => {
	showMenu.value = false;
};

const scrollFunction = () => {
	const navbar = document.getElementById('navbar');
	const handleScroll = () => {
		const scrollTop =
			window.scrollY ||
			document.documentElement.scrollTop ||
			document.body.scrollTop;
		if (scrollTop > 35) {
			if (navbar) {
				navbar.style.background = '#86425f';
				navbar.style.transition = 'all 0.5s';
			}
		} else {
			if (navbar) {
				navbar.style.background = 'none';
			}
		}
	};
	window.addEventListener('scroll', handleScroll);
	handleScroll();
};

onMounted(() => {
	scrollFunction();
});

// Para soporte de cierre al hacer click fuera
const sidebarRef = ref(null);
const handleClickOutside = (event) => {
	if (
		showMenu.value &&
		sidebarRef.value &&
		!sidebarRef.value.contains(event.target)
	) {
		showMenu.value = false;
	}
};

onMounted(() => {
	document.addEventListener('click', handleClickOutside);
});
onBeforeUnmount(() => {
	document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
	<div
		id="navbar"
		class="fixed mt-0 w-full z-20"
		:style="{ height: HEADER_HEIGHT, minHeight: HEADER_HEIGHT }"
	>
		<nav
			id="navbar-ul"
			class="flex items-center justify-between flex-wrap mx-auto py-4 px-10 lg:px-32"
			:style="{ height: HEADER_HEIGHT, minHeight: HEADER_HEIGHT }"
		>
			<div
				class="flex items-center flex-no-shrink text-white"
				:style="{ height: HEADER_HEIGHT, minHeight: HEADER_HEIGHT }"
			>
				<nuxt-link to="/" class="focus:outline-none">
					<Logo class="w-10 focus:outline-none" />
				</nuxt-link>
			</div>
			<!-- Botón hamburguesa sólo en mobile -->
			<div class="block lg:hidden">
				<button
					@click.stop="toggleNavbar"
					class="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white focus:outline-none"
				>
					<i class="fas fa-bars fa-lg"></i>
				</button>
			</div>
			<!-- Menú lateral para mobile -->
			<transition name="slide">
				<div
					v-if="showMenu"
					ref="sidebarRef"
					:style="{
						height: HEADER_HEIGHT,
						minHeight: HEADER_HEIGHT,
						maxHeight: HEADER_HEIGHT,
					}"
					class="fixed top-0 right-0 w-64 z-40 bg-gradient-to-b from-purple-800 to-purple-600 shadow-xl flex flex-col pt-8 px-6 transition-transform duration-300 lg:hidden"
				>
					<!-- Botón de cierre -->
					<button
						@click.stop="hideItems"
						class="absolute top-4 right-4 text-white hover:text-purple-300 text-2xl"
						aria-label="Cerrar menú"
					>
						<i class="fas fa-times"></i>
					</button>
					<ul class="flex flex-col mt-12 space-y-2" @click="hideItems">
						<li
							v-for="(link, index) in links"
							:key="link.name"
							class="flex justify-start items-center"
						>
							<nuxt-link
								:to="link.url"
								class="w-full flex px-3 py-2 my-1 rounded-full text-white tracking-wide hover:bg-white hover:text-purple-700 text-lg transition"
							>
								{{ link.name }}
							</nuxt-link>
						</li>
					</ul>
					<!-- Red social icons -->
					<div class="flex justify-start items-center space-x-2 mt-12 px-2">
						<a
							href="#"
							class="block py-2 px-3 rounded-full transition-all duration-200 text-sm text-white hover:bg-white hover:text-purple-700"
						>
							<i class="fab fa-goodreads-g"></i>
						</a>
						<a
							href="#"
							class="block py-2 px-3 rounded-full text-sm text-white hover:bg-white hover:text-purple-700"
						>
							<i class="fab fa-twitter"></i>
						</a>
						<a
							href="#"
							class="block py-2 px-3 rounded-full text-sm text-white hover:bg-white hover:text-purple-700"
						>
							<i class="fab fa-instagram"></i>
						</a>
						<a
							href="#"
							class="block py-2 px-3 rounded-full text-sm text-white hover:bg-white hover:text-purple-700"
						>
							<i class="fab fa-pinterest-p"></i>
						</a>
					</div>
				</div>
			</transition>
			<!-- Menú superior en desktop -->
			<ul
				v-if="!showMenu"
				class="hidden lg:flex lg:items-center lg:w-auto"
				:style="{ height: HEADER_HEIGHT, minHeight: HEADER_HEIGHT }"
			>
				<li
					v-for="(link, index) in links"
					:key="link.name"
					class="flex justify-center items-center"
				>
					<nuxt-link
						:to="link.url"
						class="flex px-3 py-1 my-2 md:my-0 rounded-full sm:px-3 sm:py-2 sm:inline-block sm:mt-0 text-white tracking-wide hover:bg-white hover:text-purple-600"
					>
						{{ link.name }}
					</nuxt-link>
				</li>
				<div class="flex justify-center items-center py-6 px-4 sm:py-2 sm:px-1">
					<div class="mx-1">
						<a
							href="#"
							class="block py-2 px-3 rounded-full transition-all duration-200 transform text-sm text-white hover:bg-white hover:text-purple-600"
						>
							<i class="fab fa-goodreads-g"></i>
						</a>
					</div>
					<div class="mx-1">
						<a
							href="#"
							class="block py-2 px-3 rounded-full text-sm text-white hover:bg-white hover:text-purple-600"
						>
							<i class="fab fa-twitter"></i>
						</a>
					</div>
					<div class="mx-1">
						<a
							href="#"
							class="block py-2 px-3 rounded-full text-sm text-white hover:bg-white hover:text-purple-600"
						>
							<i class="fab fa-instagram"></i>
						</a>
					</div>
					<div class="mx-1">
						<a
							href="#"
							class="block py-2 px-3 rounded-full text-sm text-white hover:bg-white hover:text-purple-600"
						>
							<i class="fab fa-pinterest-p"></i>
						</a>
					</div>
				</div>
			</ul>
		</nav>
	</div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
	transition: transform 0.3s;
}
.slide-enter-from,
.slide-leave-to {
	transform: translateX(100%);
}
.slide-enter-to,
.slide-leave-from {
	transform: translateX(0%);
}
</style>

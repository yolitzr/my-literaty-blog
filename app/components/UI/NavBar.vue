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

const showMenu = ref(false);
const navRef = ref(null);
const menuBtnRef = ref(null);

const links = computed(() => NAV_LINKS);

const toggleNavbar = () => {
	showMenu.value = !showMenu.value;
};

const hideMenu = () => {
	showMenu.value = false;
};

// Manejar click fuera para cerrar menú móvil
const handleClickOutside = (event) => {
	if (
		showMenu.value &&
		navRef.value &&
		!navRef.value.contains(event.target) &&
		menuBtnRef.value &&
		!menuBtnRef.value.contains(event.target)
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

// Manejar estado activo del menú al navegar
const handleNavLinkClick = () => {
	if (window.innerWidth <= 768) {
		hideMenu();
	}
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
</script>

<template>
	<nav id="mainNav" class="flex items-center gap-4 font-oswald font-medium">
		<template
			v-for="link in links"
			:key="link.url"
			class="flex items-center gap-4"
		>
			<NuxtLink
				:to="link.url"
				class="font-medium text-gray-700 hover:text-purple-600 hover:border-b-2 hover:border-purple-600"
				>{{ link.name }}</NuxtLink
			>
		</template>
	</nav>
</template>

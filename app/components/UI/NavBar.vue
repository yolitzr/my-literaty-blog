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
	<nav id="mainNav">
		<ul>
			<li><a href="#home">Inicio</a></li>
			<li><a href="#reseñas">Reseñas</a></li>
			<li><a href="#blog">Blog</a></li>
			<li><a href="#top10">Top 10</a></li>
			<li><a href="#about">Sobre mí</a></li>
			<li><a href="#contact">Contacto</a></li>
		</ul>
	</nav>
</template>

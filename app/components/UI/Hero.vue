<script setup>
const props = defineProps({
	bgImage: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	subtitle: {
		type: String,
		required: true,
	},
	authorFullName: {
		type: String,
		required: false,
	},
	editorial: {
		type: String,
		required: false,
	},
});

const config = useRuntimeConfig();

const url = computed(() => {
	return `${config.public.NUXT_PUBLIC_STRAPI_URL}`;
});
</script>

<template>
	<section
		class="hero relative bg-cover bg-center bg-no-repeat"
		id="home"
		:style="{ backgroundImage: `url(${bgImage})` }"
	>
		<!-- Blur overlay -->
		<div
			class="absolute inset-0 w-full h-full"
			style="
				backdrop-filter: blur(8px);
				background: linear-gradient(
					to bottom right,
					rgba(106, 17, 203, 0.45),
					rgba(242, 113, 33, 0.25)
				);
			"
		></div>
		<div class="container relative z-10">
			<h2>Donde las páginas cobran vida y las historias encuentran su voz</h2>
			<p>
				Explora reseñas honestas, descubrimientos literarios y conversaciones
				apasionadas sobre libros en español e inglés. Bienvenido a mi rincón
				bookish.
			</p>

			<div
				class="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-8 md:mb-12 w-full px-2"
			>
				<button class="btn">📚 Explorar Reseñas</button>
				<button class="btn-secondary">✨ Ver Novedades</button>
			</div>
		</div>
	</section>
</template>

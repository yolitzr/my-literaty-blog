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
		class="min-h-[calc(50vh-100px)] relative bg-cover bg-center bg-no-repeat py-20"
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
					rgba(106, 17, 203, 0.75),
					rgba(242, 113, 33, 0.45)
				);
			"
		></div>
		<div class="container relative z-10">
			<div class="max-w-2xl mx-auto text-center hero-after-title">
				<h2 class="mb-8 tracking-wide text-purple-900">
					Donde las páginas cobran vida y las historias encuentran su voz
				</h2>
				<p class="text-white/80 max-w-2xl mx-auto text-center">
					Explora reseñas honestas, descubrimientos literarios y conversaciones
					apasionadas sobre libros en español e inglés. Bienvenido a mi rincón
					bookish.
				</p>
			</div>

			<div
				class="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-8 mt-8 w-full px-2"
			>
				<button class="btn">📚 Explorar Reseñas</button>
				<button class="btn-secondary">✨ Ver Novedades</button>
			</div>
		</div>
	</section>
</template>

<style scoped>
.hero-after-title h2:after {
	left: 50%;
	transform: translateX(-50%);
}

h2:after {
	content: '';
	position: absolute;
	bottom: -10px;
	left: 0;
	width: 60px;
	height: 3px;
	background-color: var(--color-purple-600);
}
</style>

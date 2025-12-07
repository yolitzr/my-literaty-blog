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
	<header>
		<UiNavBar headerHeight="min-h-[50vh]" />

		<div
			class="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
			:style="{ backgroundImage: `url(${bgImage})` }"
		>
			<div
				class="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-500 to-crimson-600/60 opacity-75"
			></div>
			<div
				class="relative z-10 w-full flex flex-col justify-center items-center px-4 py-16 md:py-24"
			>
				<div
					class="flex flex-col justify-center items-center w-full h-auto py-4 px-4 sm:px-8 lg:px-40 mt-10 md:mt-16"
				>
					<h2
						class="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 text-white text-center break-words"
					>
						{{ title }}
					</h2>
					<h5
						class="text-lg xs:text-xl sm:text-2xl md:text-3xl text-white/90 mb-6 text-center italic font-light leading-relaxed max-w-2xl"
					>
						{{ subtitle }}
					</h5>
				</div>
				<div
					class="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-8 md:mb-12 w-full px-2"
				>
					<button
						class="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-white text-purple-600 hover:bg-purple-50 font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-2xl text-base md:text-lg"
					>
						📚 Explorar Reseñas
					</button>
					<button
						class="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-transparent border-2 border-white/50 text-white hover:bg-white/10 font-bold rounded-xl transition-all duration-300 backdrop-blur-sm text-base md:text-lg"
					>
						✨ Ver Novedades
					</button>
				</div>
			</div>
		</div>
	</header>
</template>

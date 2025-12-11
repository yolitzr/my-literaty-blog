<script setup>
const props = defineProps({
	bgColor: {
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
});
</script>

<template>
	<section
		class="relative pt-16 bg-linear-to-b from-white via-stone-50 to-white"
	>
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<div
				class="absolute top-0 left-0 w-64 h-64 bg-crimson-50 rounded-full blur-3xl opacity-30 transform -translate-x-1/2 -translate-y-1/2"
			></div>
			<div
				class="absolute bottom-0 right-0 w-96 h-96 bg-custom-50 rounded-full blur-3xl opacity-30 transform translate-x-1/3 translate-y-1/3"
			></div>

			<div
				class="absolute top-1/4 left-1/4 w-px h-64 bg-linear-to-b from-transparent via-crimson-200/20 to-transparent"
			></div>
			<div
				class="absolute bottom-1/4 right-1/4 w-px h-64 bg-linear-to-t from-transparent via-custom-200/20 to-transparent"
			></div>
		</div>
		<div class="relative container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12 md:mb-16">
				<div class="inline-flex items-center gap-3 mb-4">
					<div class="w-2 h-12 bg-crimson-600 rounded-full"></div>
					<h2
						class="text-crimson-600 font-semibold tracking-widest text-2xl uppercase"
					>
						{{ title }}
					</h2>
					<div class="w-2 h-8 bg-custom-600 rounded-full"></div>
				</div>

				<p class="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
					{{ subtitle }}
				</p>
			</div>
			<slot />
		</div>
	</section>
</template>

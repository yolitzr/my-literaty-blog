<script setup>
const props = defineProps({
	comments: {
		type: Object,
		required: true,
	},
});

const comments = computed(() => {
	return props.comments.comments.nodes;
});
</script>

<template>
	<div class="mt-16 border-t border-gray-200 pt-8">
		<!-- <div class="mb-8">
			<h3 class="text-lg font-bold mb-2">Compartir reseña</h3>
			<div class="flex items-center gap-2">
				<div
					class="cursor-pointer bg-purple-400 rounded-full p-2 shadow-lg flex items-center justify-center w-10 h-10 hover:bg-crimson-600 transition-all duration-300"
				>
					<Icon name="mdi:facebook" class="w-6 h-6 text-white" />
				</div>
				<div
					class="cursor-pointer bg-purple-400 rounded-full p-2 shadow-lg flex items-center justify-center w-10 h-10 hover:bg-crimson-600 transition-all duration-300"
				>
					<Icon name="mdi:facebook" class="w-6 h-6 text-white" />
				</div>
				<div
					class="cursor-pointer bg-purple-400 rounded-full p-2 shadow-lg flex items-center justify-center w-10 h-10 hover:bg-crimson-600 transition-all duration-300"
				>
					<Icon name="mdi:facebook" class="w-6 h-6 text-white" />
				</div>
				<div
					class="cursor-pointer bg-purple-400 rounded-full p-2 shadow-lg flex items-center justify-center w-10 h-10 hover:bg-crimson-600 transition-all duration-300"
				>
					<Icon name="mdi:facebook" class="w-6 h-6 text-white" />
				</div>
			</div>
		</div> -->
		<h2 class="text-4xl font-bold">Comentarios</h2>
		<p class="mt-4">
			¡Cuéntame tu opinión! Me encanta conversar con otros lectores.
		</p>
		<div class="mt-8">
			<div class="flex flex-col gap-2 bg-purple-100 py-16 px-8 rounded-lg">
				<h3 class="font-bold mb-8">Deja tu comentario</h3>
				<input
					type="text"
					placeholder="Tu nombre"
					class="w-full p-2 border border-gray-200 rounded-md bg-white"
				/>
				<input
					type="email"
					placeholder="Tu correo electrónico"
					class="w-full p-2 border border-gray-200 rounded-md bg-white"
				/>
				<textarea
					rows="5"
					placeholder="Tu comentario... ¿Coincidimos en la opinión? ¿Tienes recomendaciones similares?"
					class="p-2 border border-gray-200 rounded-md bg-white"
					style="
						width: 100%;
						min-width: 100%;
						max-width: 100%;
						height: 140px;
						min-height: 140px;
						max-height: 140px;
						resize: none;
					"
				></textarea>
				<button
					type="submit"
					class="w-full p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-all duration-300 cursor-pointer"
				>
					Publicar comentario
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	author: {
		type: Object,
		required: true,
	},
});
</script>
<template>
	<div class="flex items-center gap-4 bg-purple-100 p-4 rounded-lg mt-16">
		<NuxtImg
			:src="author.avatar.url"
			:alt="author.name"
			:width="100"
			:height="100"
			class="w-[100px] h-[100px] rounded-full object-cover border-2 border-crimson-800 shadow-lg"
		/>
		<div class="flex flex-col gap-2">
			<h4 class="text-lg font-bold">Escrito por {{ author?.name }}</h4>
			<p class="text-sm text-gray-500 font-nunito px-2">
				{{ author?.description }}
			</p>
		</div>
	</div>
</template>

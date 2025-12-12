<template>
	<div
		v-if="review.author && review.author.node"
		class="mt-8 mx-auto bg-gradient-to-tr from-purple-50 to-white rounded-xl shadow-lg p-6 flex flex-col items-center gap-6 max-w-xl"
	>
		<!-- Imagen del autor/a, ahora sobre la descripción -->
		<div class="relative">
			<div
				class="w-24 h-24 rounded-full border-4 border-purple-200 shadow-inner overflow-hidden flex items-center justify-center bg-white"
			>
				<img
					v-if="review.author.node.avatar?.url"
					:src="review.author.node.avatar.url"
					:alt="review.author.node.name"
					class="object-cover w-full h-full"
				/>
				<div
					v-else
					class="flex items-center justify-center w-full h-full text-4xl text-purple-300 bg-purple-50"
				>
					<i class="fas fa-user"></i>
				</div>
			</div>
		</div>
		<div class="flex-1 w-full text-center">
			<h5
				class="font-extrabold text-lg text-purple-800 mb-1 flex items-center justify-center gap-2"
			>
				<i class="fas fa-feather-alt text-purple-400"></i>
				{{ review.author.node.name }}
			</h5>
			<p
				v-if="review.author.node.description"
				class="text-gray-700 text-base mb-3"
			>
				{{ review.author.node.description }}
			</p>
			<div
				v-if="review.book?.author"
				class="text-xs text-purple-600 bg-purple-100 rounded px-2 py-1 inline-block"
			>
				<span class="font-semibold">Autor/a del libro:</span>
				<span>{{ review.book.author }}</span>
			</div>
		</div>
	</div>
</template>

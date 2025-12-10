<script setup>
const props = defineProps({
	weekly: {
		type: Object,
		required: true,
	},
});

const books_weekly = computed(() => {
	return props.weekly.categories.edges.map((edge) => edge.node.posts.nodes);
});
</script>

<template>
	<section
		class="relative py-16 md:py-10 bg-linear-to-b from-white via-stone-50 to-white"
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
					<div class="w-2 h-8 bg-crimson-600 rounded-full"></div>
					<span
						class="text-crimson-600 font-semibold tracking-widest text-sm uppercase"
					>
						Mi Selección Semanal
					</span>
					<div class="w-2 h-8 bg-custom-600 rounded-full"></div>
				</div>

				<p
					class="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed text-center"
				>
					Un vistazo de lo que estaré disfrutando en los próximos siete días.
					Las portadas de lo que está ocupando mis ojos, mis oídos y lo que
					viene en camino.
				</p>
			</div>

			<div
				class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 py-2"
			>
				<template v-for="(book, idx) in books_weekly[0]" :key="book.id">
					<div
						:class="[
							'group flex flex-col items-center rounded-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-200 p-0 cursor-pointer overflow-hidden',
							'ring-2',
							idx === 0
								? 'ring-[#dc2626]/70'
								: idx === 1
								? 'ring-[#b14a74]/70'
								: 'ring-[#86425f]/80',
						]"
						:style="{
							height: '420px',
							background:
								idx === 0
									? 'linear-gradient(135deg,#dc2626 0%,#b14a74 100%)'
									: idx === 1
									? 'linear-gradient(135deg,#b14a74 0%,#86425f 100%)'
									: 'linear-gradient(135deg,#86425f 0%,#dc2626 100%)',
							border: '2px solid rgba(220,38,38,0.10)', // borde dc2626 sutil
							boxShadow:
								idx === 0
									? '0 4px 24px 0 rgba(220,38,38,0.11)'
									: idx === 1
									? '0 4px 24px 0 rgba(137,74,117,0.12)'
									: '0 4px 24px 0 rgba(134,66,95,0.15)',
							transition: 'box-shadow 0.25s, background 0.3s',
						}"
					>
						<!-- Portada minimalista -->
						<div
							class="relative w-full flex-1 flex items-center justify-center overflow-hidden backdrop-blur-[2px]"
						>
							<NuxtImg
								:src="book?.featuredImage?.node?.sourceUrl"
								:alt="book?.title"
								class="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105 drop-shadow-2xl"
								style="max-height: 340px; aspect-ratio: 2/3"
								sizes="sm:100vw md:50vw lg:320px"
								loading="lazy"
							/>
							<!-- Badge limitado a la paleta -->
							<span
								class="absolute top-3 left-3 rounded-full text-[11px] font-bold tracking-widest px-4 py-1 shadow shadow-stone-200/60 backdrop-blur-sm"
								:style="{
									background:
										idx === 0
											? 'linear-gradient(90deg,#dc2626cc,#b14a74cc)'
											: idx === 1
											? 'linear-gradient(90deg,#b14a74cc,#86425fcc)'
											: 'linear-gradient(90deg,#86425fcc,#dc2626cc)',
									color: '#fff',
									border:
										idx === 2
											? '1.5px solid #dc262649'
											: '1.5px solid #86425f49',
								}"
							>
								{{
									idx === 0 ? 'Leyendo' : idx === 1 ? 'Escuchando' : 'Por leer'
								}}
							</span>
						</div>
						<!-- Info básica cálida y ordenada -->
						<div
							class="w-full text-center py-3 px-1 flex flex-col items-center gap-0.5 text-white"
						>
							<span
								class="font-serif text-base font-semibold truncate w-full drop-shadow-sm"
								>{{ book.title }}</span
							>
							<span class="text-xs mt-1 truncate w-full opacity-80">
								{{ book?.book?.author?.name }} {{ book?.book?.author?.surname }}
							</span>
						</div>
					</div>
				</template>
			</div>
		</div>
	</section>
</template>

<script setup>
const titleFooter = "Yolit's Bookish";
const subTitleFooter = 'Compulsive Reader, Book Blogger and Reviewer';
</script>
<template>
	<footer id="footer" class="bg-purple-800 mb-0 py-10">
		<div class="container">
			<div
				class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
			>
				<div class="col-span-1">
					<h2
						class="text-3xl font-bold tracking-tight font-playfair-display italic"
					>
						<span class="text-white">Yolit's Bookish</span>
					</h2>
					<p class="text-white/80 text-sm mt-1 mb-0">
						Compulsive Reader, Book Blogger & Reviewer. Tu guía literaria
						bilingüe.
					</p>
					<!-- <div class="social-links">
						<a href="#" aria-label="Instagram"
							><i class="fab fa-instagram"></i
						></a>
						<a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
						<a href="#" aria-label="Goodreads"
							><i class="fab fa-goodreads"></i
						></a>
						<a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
						<a href="#" aria-label="NetGalley"
							><i class="fas fa-book-open"></i
						></a>
					</div> -->
				</div>

				<div class="col-span-1">
					<h4 class="text-white text-lg font-bold mb-4">Secciones</h4>
					<ul class="list-none text-white/80 text-md font-nunito">
						<li class="hover:text-crimson-900 transition-all duration-300">
							<a href="#home">Inicio</a>
						</li>
						<li><a href="#reseñas">Reseñas</a></li>
						<li class="hover:text-crimson-900 transition-all duration-300">
							<a href="#blog">Blog</a>
						</li>
						<li class="hover:text-crimson-900 transition-all duration-300">
							<a href="#top10">Top 10 Tuesday</a>
						</li>
						<li class="hover:text-crimson-900 transition-all duration-300">
							<a href="#about">Sobre mí</a>
						</li>
					</ul>
				</div>

				<div class="col-span-1">
					<h4 class="text-white text-lg font-bold mb-4 font-oswald">
						Categorías
					</h4>
					<ul class="list-none text-white/80 text-sm font-nunito">
						<li class="hover:text-crimson-900 transition-all duration-300">
							<a href="#">Reseñas en Español</a>
						</li>
						<li class="hover:text-crimson-900 transition-all duration-300">
							<a href="#">Lecturas en Inglés</a>
						</li>
						<li class="hover:text-crimson-900 transition-all duration-300">
							<a href="#">ARC Reviews</a>
						</li>
						<li class="hover:text-crimson-900 transition-all duration-300">
							<a href="#">Monthly Wrap-Up</a>
						</li>
						<li class="hover:text-crimson-900 transition-all duration-300">
							<a href="#">WWW Wednesday</a>
						</li>
					</ul>
				</div>

				<!-- <div class="d-flex flex-col gap-2">
					<h4 class="text-white text-lg font-bold mb-4">Contacto</h4>
					<ul class="list-none text-white/80 text-md">
						<li>
							<a href="mailto:hola@yolitsbookish.com">hola@yolitsbookish.com</a>
						</li>
						<li><a href="#">Colaboraciones</a></li>
						<li><a href="#">Política de Privacidad</a></li>
					</ul>
				</div> -->
			</div>

			<div class="text-center text-white/80 mt-4 border-t border-white/10 pt-4">
				<p class="mb-0 text-white">
					&copy; {{ new Date().getFullYear() }} Yolit's Bookish. Todos los
					derechos reservados. | Diseñado con
					<i class="fas fa-heart" style="color: #e74c3c"></i> y muchas páginas
					leídas.
				</p>
			</div>
		</div>
	</footer>
</template>

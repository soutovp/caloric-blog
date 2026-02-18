// src/pages/Home/index.js
import { createPostCard } from '../../components/PostCard'; // Importação ES6
import { updateSEO } from '../../utils/seo';
import { HeroSection } from '../../components/HeroSection';
import styles from './home.module.scss';

export async function HomePage() {
	try {
		const response = await fetch('http://127.0.0.1:3001/api/home');
		if (response.ok) {
			const container = document.createElement('div');
			container.className = styles.homeGrid; // Bom para estilizar depois

			const data = await response.json();
			if (data.seo) updateSEO(data.seo);
			if (data.HeroSection) {
				container.appendChild(await HeroSection(data.HeroSection));
			}
			const ferramentasContainer = document.createElement('div');
			ferramentasContainer.className = styles.ferramentasContainer;
			ferramentasContainer.innerHTML = `
				<h3>Ferramentas</h3>
				<div>
					<div>
						<a href="/calculadoras/imc">
							<img href="#" alt="Calc. IMC">
							<span>Calc. IMC</span>
						</a>
					</div>
					<div>
						<a href="/calculadoras/gasto-calorico">
							<img href="#" alt="Gasto Calórico">
							<span>Gasto Calórico</span>
						</a>
					</div>
				</div>
			`;
			container.appendChild(ferramentasContainer);
			if (data.general_posts) {
				const section = document.createElement('section');
				section.className = styles.articleSection;
				data.general_posts.forEach((post) => {
					// Verifica se createPostCard é uma função antes de chamar (segurança)
					if (typeof createPostCard === 'function') {
						const cardComponent = createPostCard(post);
						section.appendChild(cardComponent);
					} else {
						console.error('Erro: createPostCard não foi importado corretamente.');
					}
				});
				container.appendChild(section);
			}
			return container;
		}
	} catch (error) {
		console.error(error);
	}
	// updateSEO({
	// 	title: 'Início',
	// 	description: 'Bem-vindo ao blog sobre o mundo da saúde física!',
	// });
	// 1. Criar o container da página (não usamos o #app diretamente aqui)

	// const sectionHero = document.createElement('div');
	// sectionHero.className = styles.heroSection + ' hero';
	// sectionHero.innerHTML = `
	// 	<div class="hero-container">
	// 		<h2 class="${styles.title}">Teste</h2>
	// 		<p></p>
	// 		<a href=""></a>
	// 	</div>
	// `;

	// container.appendChild(sectionHero);

	// 2. Dados (pode vir de API futuramente)
	// try {
	// 	const response = await fetch('http://127.0.0.1:3001/api/posts');
	// 	const data = await response.json();
	// 	container.appendChild(sectionHero);
	// 	data.forEach((post) => {
	// 		// Verifica se createPostCard é uma função antes de chamar (segurança)
	// 		if (typeof createPostCard === 'function') {
	// 			const cardComponent = createPostCard(post);
	// 			container.appendChild(cardComponent);
	// 		} else {
	// 			console.error('Erro: createPostCard não foi importado corretamente.');
	// 		}
	// 	});
	// 	return container;
	// } catch (error) {
	// 	console.error(error);
	// }

	// 3. Gerar os cards e colocar no container

	// 4. O MAIS IMPORTANTE: Retornar o elemento DOM para o Router usar
}

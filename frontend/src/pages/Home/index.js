// src/pages/Home/index.js
import { createPostCard } from '../../components/PostCard'; // Importação ES6
import { updateSEO } from '../../utils/seo';
import styles from './home.module.scss';

export async function HomePage() {
	updateSEO({
		title: 'Início',
		description: 'Bem-vindo ao blog sobre o mundo da saúde física!',
	});
	// 1. Criar o container da página (não usamos o #app diretamente aqui)
	const container = document.createElement('div');
	container.className = 'home-page'; // Bom para estilizar depois

	const sectionHero = document.createElement('div');
	sectionHero.className = styles.heroSection;
	sectionHero.innerHTML = `
		<div>
			<img href="#" />
			<h2 class="${styles.title}">Teste</h2>
		</div>
	`;

	const title = document.createElement('h1');
	title.innerText = 'Últimas do Blog';
	container.appendChild(title);

	// 2. Dados (pode vir de API futuramente)
	try {
		const response = await fetch('http://127.0.0.1:3001/api/posts');
		const data = await response.json();
		container.appendChild(sectionHero);
		data.forEach((post) => {
			// Verifica se createPostCard é uma função antes de chamar (segurança)
			if (typeof createPostCard === 'function') {
				const cardComponent = createPostCard(post);
				container.appendChild(cardComponent);
			} else {
				console.error('Erro: createPostCard não foi importado corretamente.');
			}
		});
		return container;
	} catch (error) {
		console.error(error);
	}

	// 3. Gerar os cards e colocar no container

	// 4. O MAIS IMPORTANTE: Retornar o elemento DOM para o Router usar
}

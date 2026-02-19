import { marked } from 'marked'; //Conversor que roda no browser
import { updateSEO } from '../../utils/seo';
import styles from './style.module.scss';

export async function PostPage(slug) {
	const container = document.createElement('div');
	container.className = styles.blogPostLoading;
	container.innerHTML = '<p>Carregando conteúdo...</p>';

	try {
		//1. Buscar dados na SUA API
		const response = await fetch(`http://localhost:3001/api/posts/${slug}`);

		if (!response.ok) throw new Error('Post não encontrado');

		const postData = await response.json();

		updateSEO(postData.meta);

		//2. Converter Markdown para HTML no cliente
		const htmlContent = marked.parse(postData.content);

		//3. Atualizar o DOM
		container.className = styles.blogPostContainer;
		container.innerHTML = `
            <h1>${postData.title}</h1>
            <div class="meta">Por ${postData.author} em ${postData.date}</div>
            <div class="content">${htmlContent}</div>
            <a href="/">Voltar</a>
        `;

		//Atualizar título da página ( SEO Client-side )
		document.title = `${postData.title} | Caloric`;

		console.log('🚀 Aplicação iniciada com sucesso!');
		const links = container.querySelectorAll('a');
		console.log(links);
		links.forEach((link) => {
			link.addEventListener('click', (e) => {
				e.preventDefault();

				window.history.pushState({}, '', link.getAttribute('href'));
				const navEvent = new PopStateEvent('popstate');
				window.dispatchEvent(navEvent);
			});
		});
	} catch (error) {
		container.innerHTML = `<h2>Erro: ${error.message}</h2><a href="/">Voltar</a>`;
		updateSEO({ title: 'Error - Post não encontrado', description: '' });
	}

	return container;
}

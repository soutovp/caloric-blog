import { marked } from 'marked'; //Conversor que roda no browser
import { updateSEO } from '../../utils/seo';
import './style.css';

export async function PostPage(slug) {
	const container = document.createElement('div');
	container.className = 'blog-post-loading';
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
		container.className = 'blog-post';
		container.innerHTML = `
            <h1>${postData.title}</h1>
            <div class="meta">Por ${postData.author} em ${postData.date}</div>
            <div class="content">${htmlContent}</div>
            <a href="/">Voltar</a>
        `;

		//Atualizar título da página ( SEO Client-side )
		document.title = `${postData.title} | Caloric`;
	} catch (error) {
		container.innerHTML = `<h2>Erro: ${error.message}</h2><a href="/">Voltar</a>`;
		updateSEO({ title: 'Error - Post não encontrado', description: '' });
	}

	return container;
}

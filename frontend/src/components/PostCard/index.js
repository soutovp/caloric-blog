import styles from './style.module.scss';

/**
 * Cria um componente de cartão de postagem.
 * @param {Object} post - Dados do post { title, summary, link }
 * @returns {HTMLElement} - O elemento DOM do cartão
 */
export function createPostCard(post) {
	const article = document.createElement('article');
	article.className = styles.card;

	const postUrl = `/post/${post.slug}`;

	article.innerHTML = `
    <h2 class="${styles.title}">
        <a href="${postUrl}" class="post-link">${post.title}</a>
    </h2>
    <p class="${styles.content}">
		${post.content ? post.content.substring(0, 100) + '...' : ''}
	</p>
    <a href="${postUrl}" aria-label="Ler mais sobre ${post.title}" class="read-more post-link">Ler artigo completo &rarr;</a>
    `;

	const links = article.querySelectorAll('.post-link');
	links.forEach((link) => {
		link.addEventListener('click', (e) => {
			e.preventDefault();

			window.history.pushState({}, '', link.getAttribute('href'));
			const navEvent = new PopStateEvent('popstate');
			window.dispatchEvent(navEvent);
		});
	});

	return article;
}

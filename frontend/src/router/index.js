import { HomePage } from '../pages/Home';
import { PostPage } from '../pages/Post';

const ConstructionPage = () => {
	const div = document.createElement('div');
	div.innerHTML = `<h1>🚧 Página em Construção</h1><a href="/">Voltar para Home</a>`;

	const links = div.querySelectorAll('a');
	links.forEach((link) => {
		link.addEventListener('click', (e) => {
			e.preventDefault();

			window.history.pushState({}, '', link.getAttribute('href'));
			const navEvent = new PopStateEvent('popstate');
			window.dispatchEvent(navEvent);
		});
	});

	return div;
};

const NotFoundPage = () => {
	const div = document.createElement('div');
	div.innerHTML = `<h1>404 - Página não encontrada</h1><a href="/">Voltar</a>`;

	const links = div.querySelectorAll('a');
	links.forEach((link) => {
		link.addEventListener('click', (e) => {
			e.preventDefault();

			window.history.pushState({}, '', link.getAttribute('href'));
			const navEvent = new PopStateEvent('popstate');
			window.dispatchEvent(navEvent);
		});
	});

	return div;
};

const routes = [
	{ path: '/', component: HomePage },
	{ path: '/post/:slug', component: PostPage },
	{ path: '/nutricao', component: ConstructionPage },
	{ path: '/treinos', component: ConstructionPage },
	{ path: '/saude', component: ConstructionPage },
	{ path: '/receitas', component: ConstructionPage },
];

/**
 * Transforma uma string de rota (ex: /post/:id) em Regex
 * @param {string} path
 * @returns {RegExp}
 */
function pathToRegex(path) {
	// Substitui :algo por um grupo de captura regex ([^/]+)
	// Escapa as barras para não quebrar o regex
	return new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');
}

/**
 * Extrai os parâmetros da URL
 * Ex: rota "/post/:slug" e URL "/post/webpack" -> retorna { slug: "webpack" }
 */
function getParams(match) {
	const values = match.result.slice(1); // Pega os grupos capturados
	const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((result) => result[1]);

	return Object.fromEntries(
		keys.map((key, i) => {
			return [key, values[i]];
		})
	);
}

export default async function router() {
	const currentPath = window.location.pathname;
	const app = document.getElementById('app');

	// 3. Encontrar a rota correspondente
	// Percorremos o array 'routes' testando o Regex contra a URL atual
	const potentialMatches = routes.map((route) => {
		return {
			route: route,
			result: currentPath.match(pathToRegex(route.path)),
		};
	});

	let match = potentialMatches.find((potentialMatch) => potentialMatch.result !== null);

	// 4. Se não achou nada, define como 404
	if (!match) {
		match = {
			route: { component: NotFoundPage },
			result: [currentPath],
		};
	}

	// 5. Limpa a tela antes de renderizar (UX)
	app.innerHTML = '';

	// 6. Executa o componente
	// Se a rota tiver parâmetros (ex: :slug), extraímos e passamos para a função
	const params = match.route.path && match.route.path.includes(':') ? getParams(match) : {};

	// Suporte para componentes síncronos E assíncronos
	// Se a URL for /post/webpack, params será { slug: 'webpack' }
	// Chamamos: PostPage('webpack') (ou objeto params, dependendo de como preferir)

	// OBS: Como sua PostPage espera (slug), passamos o valor direto se houver apenas 1 param
	// Se quiser passar o objeto inteiro, mude para: component(params)
	const arg = Object.values(params)[0];

	const view = await match.route.component(arg);

	app.appendChild(view);
}

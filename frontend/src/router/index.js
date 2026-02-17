import { HomePage } from '../pages/Home';
import { PostPage } from '../pages/Post';

const routes = {
	'/': HomePage,
	'/post/:id': PostPage,
};

export default async function router() {
	const path = window.location.pathname;
	const app = document.getElementById('app');
	app.innerHTML = ''; // Limpa a tela

	//Lógica simples para encontrar a rota ( pode ser melhorada com Regex )
	if (path === '/') {
		app.appendChild(await HomePage());
	} else if (path.startsWith('/post/')) {
		//Extrair ID e chamar a página do post
		const slug = path.split('/')[2];

		PostPage(slug).then((element) => {
			app.innerHTML = ''; // Limpa só quando o conteúdo chegar ( ou use um loading antes );
			app.appendChild(element);
		});
	} else {
		app.innerHTML = '<h1>404 - Página não encontrada</h1>';
	}
}

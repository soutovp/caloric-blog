const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const postsDB = [
	{
		slug: 'meu-primeiro-post',
		title: 'Node.js como CMS',
		content: '# Olá Mundo!\nEste conteúdo veio do **Banco de Dados** via API.',
		author: 'Fernando',
		date: '2026-02-16',
		summary: 'summary',
		link: '/blog/meu-primeiro-post',
		meta: {
			title: 'Node.js como CMS',
			description: 'Conteúdo sobre banco de dados via API',
			keywords: 'Noda.js, node, js, cms, nodejs como cms',
		},
	},
	{
		slug: 'webpack-config',
		title: 'Configurando Webpack',
		content: 'Tutorial de como configurar o **Webpack** do zero.',
		author: 'Fernando',
		date: '2026-02-15',
		summary: 'summary',
		link: '/blog/webpack-config',
		meta: {
			title: 'Configurando Webpack',
			description: 'Tutorial de como configurar o webpack do zero!',
		},
	},
];

const home = {
	HeroSection: [
		{
			title: 'Como melhorar performance',
			summary: 'Aprenda a importancia de prestar atenção nestas dicas para melhorar o desempenho de sua performance.',
			href: '#',
			imageUrl: 'https://www.lucianapepino.com.br/_next/image/?url=https%3A%2F%2Fadmin.lucianapepino.com.br%2Fwp-content%2Fuploads%2FiStock-1360395151.jpg&w=3840&q=75',
			category: {
				slug: 'training',
				name: 'Treino',
			},
		},
	],
	seo: {
		title: 'Início',
		description: 'Bem-vindo ao blog sobre o mundo da saúde física!',
	},
	general_posts: postsDB,
};

//Rota 1: Listar todos os posts ( para a Home )
app.get('/api/posts', (req, res) => {
	//Aqui entraria: SELECT slug, title, summary FROM posts
	const summaries = postsDB.map(({ slug, title, summary, link }) => ({ slug, title, summary, link }));
	res.json(summaries);
});

//Rota 2: Pegar um post específico ( para a página do Post )
app.get('/api/posts/:slug', (req, res) => {
	const { slug } = req.params;
	//Aqui entraria: SELECT * FROM posts WHERE slug = ?
	const post = postsDB.find((p) => p.slug === slug);

	if (post) {
		res.json(post);
	} else {
		res.status(404).json({ error: 'Post não encontrado' });
	}
});
app.get('/api/home', (req, res) => {
	if (home) {
		res.json(home);
	} else {
		res.status(404).json({ error: 'Site está em Manutenção.' });
	}
});

app.listen(3001, () => {
	console.log('API rodando em http://localhost:3001');
});

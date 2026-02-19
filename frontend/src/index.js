import './styles/reset.css';
import './styles/global.css';

import router from './router';

document.addEventListener('DOMContentLoaded', () => {
	console.log('🚀 Aplicação iniciada com sucesso!');
	const links = document.querySelectorAll('a');
	links.forEach((link) => {
		link.addEventListener('click', (e) => {
			e.preventDefault();

			window.history.pushState({}, '', link.getAttribute('href'));
			const navEvent = new PopStateEvent('popstate');
			window.dispatchEvent(navEvent);
		});
	});

	router();
});

window.addEventListener('popstate', router);

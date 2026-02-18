import './styles/reset.css';
import './styles/global.css';

import router from './router';

document.addEventListener('DOMContentLoaded', () => {
	console.log('🚀 Aplicação iniciada com sucesso!');

	router();
});

window.addEventListener('popstate', router);

//Função auxiliar para criar ou atualizar tags <meta>
function setMetaTag(attrName, attrValue, content) {
	if (!content) return;

	let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);

	if (!element) {
		element = document.createElement('meta');
		element.setAttribute(attrName, attrValue);
		document.head.appendChild(element);
	}
	element.setAttribute('content', content);
}

/**
 *  Atualiza o título e as meta tags da página dinamicamente.
 *  @param {Object} data - { title, description, image }
 */
export function updateSEO({ title, description, keywords, image }) {
	//1. Atualiza o título da Aba
	document.title = `${title} | Caloric`;

	//2. Atualiza a Meta Description ( para o Google )
	setMetaTag('name', 'description', description);
	if (keywords) setMetaTag('name', 'keywords', keywords);

	//3. Atualiza Open Graph ( para preview no WhatsApp/Facebook/LinkedIn)
	setMetaTag('property', 'og:title', title);
	setMetaTag('property', 'og:description', description);
	if (image) setMetaTag('property', 'og:image', image);
}

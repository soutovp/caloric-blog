import styles from './home.module.scss';
export async function HeroSection(list) {
	const heroSection = document.createElement('section');
	heroSection.className = 'hero ' + styles.heroSection;

	list.forEach((item) => {
		const div = document.createElement('div');
		div.className = styles.heroItem;
		const descriptionContainer = document.createElement('div');
		div.appendChild(descriptionContainer);
		div.style.backgroundImage = `url("${item.imageUrl}")`;
		const title = document.createElement('h2');
		title.innerText = item.title;
		const summary = document.createElement('p');
		summary.innerText = item.summary;
		const button = document.createElement('a');
		button.href = item.href;
		button.className = styles[item.category.slug];
		button.innerText = item.category.name;
		descriptionContainer.appendChild(title);
		descriptionContainer.appendChild(summary);
		descriptionContainer.appendChild(button);
		heroSection.appendChild(div);
	});

	return heroSection;
}
//Example
// hero_items = [
// 	{
// 		title: 'Como melhorar performance',
// 		summary: 'Aprenda a importancia de prestar atenção nestas dicas para melhorar o desempenho de sua performance.',
// 		href: '#',
// 		imageUrl: '#',
// 		category: {
// 			slug: 'training',
// 			name: 'Treino',
// 		},
// 	},
// ];

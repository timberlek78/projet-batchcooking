import Test_BD from '../pages/Test_BD';

const TITLE = {
	Home: 'Accueil',
	Test_BD: 'Tester connexion',
	Recipe: 'Voir toutes les recettes',
	Week : 'Générer une semaine',
	Users: 'Se connecter',
};

export const DROPDOWN_ITEMS = [
	{
		id: 'disconnect',
		text: 'Se déconnecter',
		route: '/disconnect',
		icon: null, // optionnel, pour plus tard
	},

];
export default TITLE;

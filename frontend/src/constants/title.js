import Test_BD from '../pages/Test_BD';
import { disconnect } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';

const TITLE = {
	Home: 'Accueil',
	Test_BD: 'Tester connexion',
	Recipe: 'Voir toutes les recettes',
	Week : 'Générer une semaine',
	Users: 'Se connecter',
};

export const DROPDOWN_ITEMS = [
	{
		id: 'recipe',
		text: 'Mes recettes',
		path: '/profil/recipes',
		icon: null, // optionnel, pour plus tard
	},
	{
		id: 'disconnect',
		text: 'Se déconnecter',
		action: disconnect,
		icon: null, // optionnel, pour plus tard
	}
];
export default TITLE;

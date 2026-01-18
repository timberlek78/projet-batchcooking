/* ======================
 * Librairies
 * ====================== */
import { useEffect, useState } from 'react';

/* ======================
 * Utils
 * ====================== */
import { getImageBlob } from '../../utils/imageStore.js';

/* ======================
 * Components (génériques)
 * ====================== */
import TextFieldPrincipal from '../../components/TextField/Principale/TextFieldPrincipal.jsx';
import TextFieldSecondaire from '../../components/TextField/Secondaire/TextFieldSecondaire.jsx';
import ImageField from '../../components/ImageField/ImageField.jsx';
import AddButton from '../../components/Button/AddButton/AddButton.jsx';
import AddIngredientBulle from '../../components/Ingredient/IngredientBulle/AddIngredientBulle.jsx';

/* ======================
 * Features
 * ====================== */
import IngredientBulle from '../../features/ingredient/components/IngredientBulle/IngredientBulle.jsx';
import Stepes from '../../features/recipes/Stepes/Stepes.jsx';

/* ======================
 * Popups
 * ====================== */
import IngredientPopUp from '../../components/Ingredient/IngredientPopUp/Select/IngredientPopUp.jsx';
import IngredientCreatePopUp from '../../components/Ingredient/IngredientPopUp/Create/IngredientCreatePopUp.jsx';

/* ======================
 * Assets (icons)
 * ====================== */
import AddIcon from '../../assets/icons/components/add.svg?react';
import CookTimeIcon from '../../assets/icons/recipes/add/cook-time.svg?react';
import CookingTimeIcon from '../../assets/icons/recipes/add/baker.svg?react';
import DifficultIcon from '../../assets/icons/recipes/add/dumbbell.svg?react';
import PeopleIcon from '../../assets/icons/recipes/add/people.svg?react';
import TrashIcon from '../../assets/icons/recipes/add/trash.svg?react';
import PublishIcon from '../../assets/icons/recipes/add/publish.svg?react';
import SaveIcon from '../../assets/icons/recipes/add/save.svg?react';

/* ======================
 * Constants
 * ====================== */
import Recipe from '../../constants/pages/recipes/AddRecipe.js';

/* ======================
 * Styles
 * ====================== */
import style from './style/add.module.css';


const STORAGE_KEY = 'miaminou_add_recipe_draft';

function AddRecipePage() {

	// Charge le brouillon de recette depuis le localStorage (si présent)
	const [imagePreviewUrl, setImagePreviewUrl] = useState("");

	const [newRecipe, setRecipe] = useState(() => {
	const saved = localStorage.getItem(STORAGE_KEY);

		return saved
			? JSON.parse(saved)
			: {
				ingredients: [],
				recipe_name: "",
				recipe_preparation_time: "",
				recipe_cooking_time: "",
				recipe_difficult: "",
				recipe_nbPersonne: "",
			};
	});


	// Charge la liste des étapes depuis le localStorage (si présent)
	const [stepes, setStepes] = useState(() => {
		const saved = localStorage.getItem(STORAGE_KEY);

		if (!saved) return [];

		const parsed = JSON.parse(saved);
		return parsed.stepes ?? [];
	});

	// Popups
	const [show, setShow] = useState(false);
	const [createShow, setCreateShow] = useState(false);

	//sauvegarde automatique
	useEffect(() => {
		const draft = {
			...newRecipe,
			stepes,
		};

		localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
	}, [newRecipe, stepes]);

	/**
	 * (Optionnel) Debug : affiche la recette complète à chaque changement
	 */
	useEffect(() => {
		console.log({ ...newRecipe, stepes });
	}, [newRecipe, stepes]);

	useEffect(() => {
		let urlToRevoke = "";

		const load = async () => {
			// nettoyage preview si pas d'image
			if (!newRecipe.imageId) {
				setImagePreviewUrl("");
				return;
			}

			const blob = await getImageBlob(newRecipe.imageId);

			if (!blob) {
				// imageId existe mais blob introuvable => on nettoie
				setImagePreviewUrl("");
				return;
			}

			const url = URL.createObjectURL(blob);
			urlToRevoke = url;
			setImagePreviewUrl(url);
		};

		load();

		return () => {
			if (urlToRevoke) URL.revokeObjectURL(urlToRevoke);
		};
	}, [newRecipe.imageId]);
	/**
	 * =========================
	 * INGREDIENTS
	 * =========================
	 */

	// Ajoute / retire un ingrédient en fonction de la checkbox
	const addIngredient = (ingredient, checked) => {
		setRecipe((prev) => {
			let nextIngredients;

			if (checked) {
				// Si déjà présent, on ne l’ajoute pas deux fois
				if (prev.ingredients.some((i) => i.ingredient_id === ingredient.ingredient_id)) {
					nextIngredients = prev.ingredients;
				} else {
					nextIngredients = [...prev.ingredients, ingredient];
				}
			} else {
				// Si décoché, on retire l’ingrédient
				nextIngredients = prev.ingredients.filter(
					(i) => i.ingredient_id !== ingredient.ingredient_id
				);
			}

			return {
				...prev,
				ingredients: nextIngredients,
			};
		});
	};

	// Supprime un ingrédient par son id
	const removeIngredient = (id) => {
		setRecipe((prev) => {
			const newIngredients = prev.ingredients.filter(
				(ing) => ing.ingredient_id !== id
			);

			return {
				...prev,
				ingredients: newIngredients,
			};
		});
	};

	// Sauvegarde un attribut simple de la recette (nom, temps, difficulté, ...)
	const saveRecipe = (attribut, valeur) => {
		setRecipe((prev) => ({
			...prev,
			[attribut]: valeur,
		}));
	};


	// Ajoute une étape vide (avec un id unique => indispensable pour update/suppression)
	const addStepes = () => {
		setStepes((prev) => [
			...prev,
			{
				id: crypto.randomUUID(),
				name: '',
				content: '',
			},
		]);
	};

	// Met à jour une étape (par id) sur un attribut donné ("name" / "content")
	const updateStepes = (id, attribut, valeur) => {
		setStepes((prev) =>
			prev.map((step) =>
				step.id === id
					? { ...step, [attribut]: valeur }
					: step
			)
		);
	};

	// Supprime une étape par id
	const removeStepes = (id) => {
		setStepes((prev) => prev.filter((step) => step.id !== id));
	};

	/**
	 * =========================
	 * (Optionnel) Reset brouillon
	 * =========================
	 * Décommente si tu veux un bouton "vider"
	 */
	// const clearDraft = () => {
	// 	localStorage.removeItem(STORAGE_KEY);
	// 	setRecipe({ ingredients: [] });
	// 	setStepes([]);
	// };

	return (
		<div className={style.page}>
			{/* POPUP SELECTION INGREDIENTS */}
			<IngredientPopUp
				show={show}
				onClose={() => setShow(false)}
				addIng={addIngredient}
				selectedIngredients={newRecipe.ingredients}
			/>

			{/* POPUP CREATION INGREDIENT */}
			<IngredientCreatePopUp
				show={createShow}
				onClose={() => setCreateShow(false)}
			/>

			{/* =========================
				HAUT DE PAGE : PHOTO + INFOS
			   ========================= */}
			<div className={style.haut}>
				<div className={style.photo}>
					<ImageField 
						imageUrl={imagePreviewUrl}
						imageId={newRecipe.imageId ?? ""}
						onChangedImageId={(id) => saveRecipe("imageId",id)}
					 />
				</div>

				<div className={style.recipe}>
					{/* NOM DE LA RECETTE */}
					<div>
						<TextFieldPrincipal
							placeholder={Recipe.placeholder.name}
							value={newRecipe.recipe_name ?? ""}
							onChange={(value) => saveRecipe('recipe_name', value)}
						/>
					</div>

					<div className={style.row}>
						{/* LISTE INGREDIENTS */}
						<div className={style.ingredient}>
							<div className={style.IngredientRow}>
								<div className={style.title}>Liste Ingredient</div>
								<div
									className={style.addBtn}
									onClick={() => setCreateShow(true)}
								>
									<AddIcon />
								</div>
							</div>

							<div id="listIng" className={style.listIng}>
								{newRecipe.ingredients?.map((ing) => (
									<IngredientBulle
										key={ing.ingredient_id}
										id={ing.ingredient_id}
										ingredientName={ing.ingredient_name}
										onClick={removeIngredient}
									/>
								))}

								<AddIngredientBulle onClick={() => setShow(true)} />
							</div>
						</div>

						{/* INFORMATIONS GENERALES */}
						<div className={style.infoGene}>
							<TextFieldSecondaire
								placeholder={Recipe.placeholder.tmpPrep}
								value={newRecipe.recipe_preparation_time ?? ""}
								icon={<CookTimeIcon />}
								onChange={(value) => saveRecipe('recipe_preparation_time', value)}
							/>

							<TextFieldSecondaire
								placeholder={Recipe.placeholder.tmpCooking}
								value={newRecipe.recipe_cooking_time ?? ""}
								icon={<CookingTimeIcon />}
								onChange={(value) => saveRecipe('recipe_cooking_time', value)}
							/>

							<div className={style.row}>
								<TextFieldSecondaire
									placeholder={Recipe.placeholder.difficult}
									value={newRecipe.recipe_difficult ?? ""}
									icon={<DifficultIcon />}
									onChange={(value) => saveRecipe('recipe_difficult', value)}
								/>

								<TextFieldSecondaire
									placeholder={Recipe.placeholder.nbPersonne}
									value={newRecipe.recipe_nbPersonne ?? ""}
									icon={<PeopleIcon />}
									onChange={(value) => saveRecipe('recipe_nbPersonne', value)}
								/>
							</div>
							<div className={style.btnBarre}>
								<button className={style.btn}><TrashIcon /></button>
								<button className={style.btn}><SaveIcon /></button>
								<button className={style.btn}><PublishIcon /></button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* =========================
				ETAPES DE LA RECETTE
			   ========================= */}
			<div className={style.stape}>
				{stepes.map((stepe, idx) => (
					<Stepes
						key={stepe.id}
						id={stepe.id}
						name={stepe.name ?? ""}
						content={stepe.content ?? ""}
						numero={idx + 1}
						placeholder={`Étape ${idx + 1}`}
						onRemove={removeStepes}
						onChange={(attribut, valeur) => updateStepes(stepe.id, attribut, valeur)}
					/>
				))}

				<AddButton onClick={addStepes} />
			</div>

			{/* (Optionnel) Bouton reset brouillon */}
			{/* <button type="button" onClick={clearDraft}>
				Vider le brouillon
			</button> */}
		</div>
	);
}

export default AddRecipePage;
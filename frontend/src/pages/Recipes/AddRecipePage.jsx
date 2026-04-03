/* ======================
 * Librairies
 * ====================== */
import { useEffect, useState } from 'react';
import { useNavigate,useParams } from "react-router-dom";


/* ======================
 * Utils
 * ====================== */
import { getImageBlob,deleteImageBlob } from '../../utils/imageStore.js';
import {useUniformBulleWidth} from '../../utils/useUniformBulleWidth.jsx'

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
import WaitingPopUp from '../../components/WaitingPopUp/WaitingPopUp.jsx'; 

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
import PersonneIcon from '../../assets/icons/recipes/add/people.svg?react';

/* ======================
 * Constants
 * ====================== */
import Recipe from '../../constants/pages/recipes/AddRecipe.js';
import RecipeService from '../../services/recipe.service.js';

/* ======================
 * Styles
 * ====================== */
import style from './style/add.module.css';
import SelectDifficult from '../../features/recipes/RecipeView/bulles/SelectDifficult.jsx';


const STORAGE_KEY = 'miaminou_add_recipe_draft';

const DEFAULT_RECIPE = {
		ingredients: [],
		recipe_name: "",
		recipe_preparation_time: 0,
		recipe_cooking_time: 0,
		recipe_difficult: 0,
		recipe_nb_personne: 0,
		recipe_like_number : 0
};

const NUMBER_FIELDS = [
	"recipe_nb_personne",
	"recipe_like_number",
	"recipe_preparation_time",
	"recipe_cooking_time",
	"recipe_difficult"
];

function AddRecipePage() {
	const { recipeId } = useParams();

	// Charge le brouillon de recette depuis le localStorage (si présent)
	const [imagePreviewUrl, setImagePreviewUrl] = useState("");
	const [imageFile, setImageFile] = useState(null);
	const [imageId, setImageId] = useState(null);


	const [newRecipe, setRecipe] = useState(() => {
	const saved = localStorage.getItem(STORAGE_KEY);

		return saved ? {...DEFAULT_RECIPE,...JSON.parse(saved)} : DEFAULT_RECIPE;
	});

	const user_id = localStorage.getItem("user_id");

	// Charge la liste des étapes depuis le localStorage (si présent)
	const [stepes, setStepes] = useState(() => {
		const saved = localStorage.getItem(STORAGE_KEY);

		if (!saved) return [];

		const parsed = JSON.parse(saved);
		return parsed.stepes ?? [];
	});

	// Popups
	const [show, setShow] = useState(false);
	const [waitShow, setWaitShow] = useState(false);
	const [createShow, setCreateShow] = useState(false);
	const [waitStatus, setWaitStatus] = useState("loading");
	const [waitMessage, setWaitMessage] = useState("Une erreur est survenu");

	const navigate = useNavigate();

	//sauvegarde automatique
	useEffect(() => {
		const draft = {
			...newRecipe,
			stepes : stepes ?? [],
		};

		localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
	}, [newRecipe, stepes]);

	
	useEffect(() => {
		 ({ ...newRecipe, stepes });
	}, [newRecipe, stepes]);

	
	/**
	 * =========================
	 * IMAGES
	 * =========================
	 */

	const handleImageChange = ({ imageId, file }) => {
		setImageId(imageId);
		setImageFile(file);

		localStorage.setItem('recipeImageId', imageId);

		const url = URL.createObjectURL(file);
		setImagePreviewUrl(url);
	};


	useEffect(() => {
		const storedId = localStorage.getItem('recipeImageId');
		if (!storedId) return;

		setImageId(storedId);

		const loadImage = async () => {
			const blob = await getImageBlob(storedId);
			if (!blob) return;

			const url = URL.createObjectURL(blob);
			setImagePreviewUrl(url);
			setImageFile(blob);
		};

		loadImage();
	}, []);

	useEffect(() => {
		if (!recipeId){
			console.log("MODE CREATION", recipeId)
			return; 
		}
		
		console.log("UPDATE");
		const load = async () => {
			const res = await RecipeService.getRecipeId(recipeId);
			if (res) {
				setRecipe({ ...DEFAULT_RECIPE, ...res.data });

				// Image
				if (res.data.recipe_image) {
					const imageUrl = RecipeService.getImage(res.data.recipe_image);
					setImagePreviewUrl(imageUrl);

					// Convertir l'URL en File pour pouvoir la renvoyer au backend
					const response = await fetch(imageUrl);
					const blob = await response.blob();
					const file = new File([blob], res.data.recipe_image, { type: blob.type });
					setImageFile(file);
				}
			}

			const ings = await RecipeService.getIngredients(recipeId);
			if (ings) setRecipe(prev => ({ ...prev, ingredients: ings.data }));
			
			const stps = await RecipeService.getStepe(recipeId);
			if (stps) setStepes(stps.data);
		};
		load();
	}, [recipeId]);

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

	const qteChange = (id, quantity) => {
		setRecipe(prev => ({
			...prev,
			ingredients: prev.ingredients.map(ing =>
				ing.ingredient_id === id
					? { ...ing, quantity }
					: ing
			)
		}));
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
			[attribut]: NUMBER_FIELDS.includes(attribut)
				? valeur === "" ? "" : Number(valeur)
				: valeur,
		}));
	};

	//Enregistrement dans la base de données
	const createRecipe = async () => {
		const formData = new FormData();

		const { recipe_id, ...recipeData } = newRecipe;

		const payload = {
			...recipeData,
			stepes: stepes ?? [],
		};

		Object.entries(payload).forEach(([key, value]) => {
			if (value !== null && value !== undefined) {
				if (typeof value === "object") {
					formData.append(key, JSON.stringify(value));
				} else {
					formData.append(key, value);
				}
			}
		});

		formData.append("recipe_image", imageFile ?? "");
		formData.append("user_id", user_id);

		if (recipeId) {
			await RecipeService.update(recipeId, formData);
		} else {
			await RecipeService.createWithImage(formData);
		}
	};

	
	const handleCreateRecipe = async () => {
		setWaitShow(true);
		setWaitStatus("loading");

		if (!newRecipe.recipe_name) {
			setWaitMessage(Recipe.error.RecipeNameMissing);
			return;
		}

		// if (newRecipe.recipe_difficult !== 0 &&(newRecipe.recipe_difficult < 1 || newRecipe.recipe_difficult > 5)) {
		// 	setWaitMessage(Recipe.error.difficultInvalid);
		// 	return;
		// }

		try {
			await createRecipe();
			setWaitStatus("success");
			setWaitMessage(Recipe.message.succes);

		} catch (e) {
			 (e);
			setWaitStatus("error");
			setWaitMessage("Une erreur est survenue");
		}
	};

	const onWaitClose = () => {
		// 🔹 Redirection uniquement si succès
		if (waitStatus === "success") {
			clearDraft();  
			navigate("/recipes");
		}
		setWaitShow(false); // ferme la pop-up
	};

	

	// Ajoute une étape vide (avec un id unique => indispensable pour update/suppression)
	const addStepes = () => {
		setStepes((prev) => [
			...prev,
			{
				stepes_id: crypto.randomUUID(),
				stepes_number : stepes.length + 1,
				stepes_name: '',
				stepes_desc: '',
			},
		]);
	};

	// Met à jour une étape (par id) sur un attribut donné ("name" / "content")
	const updateStepes = (id, attribut, valeur) => {
		setStepes((prev) =>
			prev.map((step) =>
				step.stepes_id === id
					? { ...step, [attribut]: valeur }
					: step
			)
		);
	};

	// Supprime une étape par id
	const removeStepes = (id) => {
		setStepes((prev) => prev.filter((step) => step.stepes_id !== id));
	};


	/**
	 * =========================
	 *  Reset brouillon
	 * =========================
	 * Décommente si tu veux un bouton "vider"
	 */
	const clearDraft = async () => {
		localStorage.removeItem(STORAGE_KEY);
		localStorage.removeItem("recipeImageId");

		if (imageId) {
			await deleteImageBlob(imageId); // <- supprime l'image de IndexedDB
		}

		setRecipe(DEFAULT_RECIPE);
		setStepes([]);
		setImageFile(null);
		setImagePreviewUrl("");
		setImageId(null);
	};

	const containerRef = useUniformBulleWidth([newRecipe.ingredients]);

	console.log(newRecipe);
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

			{/* Pop Up d'attente */}
			<WaitingPopUp
				show={waitShow}
				status={waitStatus}
				message={waitMessage}
				onClose={onWaitClose}
			/>
			{/* =========================
				HAUT DE PAGE : PHOTO + INFOS
			   ========================= */}
			<div className={style.haut}>
				<div className={style.photo}>
					<ImageField
							imageUrl={imagePreviewUrl}
							onChange={handleImageChange}
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
									className={`${style.btn} ${style.addBtn}`}
									onClick={() => setCreateShow(true)}
								>
									<AddIcon />
								</div>
							</div>

							<div id="listIng" ref ={containerRef} className={style.listIng}>
								{newRecipe.ingredients?.map((ing) => (
									<IngredientBulle
										key={ing.ingredient_id}
										ingredient={ing}
										onClick={removeIngredient}
										onChange={qteChange}
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
								onChange={(value) => {saveRecipe('recipe_cooking_time', value); console.log(value)}}
							/>

							<div className={style.row}>
								<SelectDifficult difficult = {newRecipe.recipe_difficult} onDifficultChange={(value) => saveRecipe('recipe_difficult',value)} />

								<div className={style.personne} >
									<PersonneIcon />
									<button className={style.btn} onClick={() => saveRecipe('recipe_nb_personne', newRecipe.recipe_nb_personne - 1)}> - </button>
										<div className={style.nbPersonne}>{newRecipe.recipe_nb_personne}</div>
									<button className={style.btn} onClick={() => saveRecipe('recipe_nb_personne', newRecipe.recipe_nb_personne + 1)}> + </button>
								</div>
							</div>
							<div className={style.btnBarre}>
								<button className={style.btn} onClick={clearDraft}><TrashIcon /></button>
								{/* <button className={style.btn}><SaveIcon /></button> */}
								<button className={style.btn} onClick={handleCreateRecipe}><PublishIcon /></button>
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
						key={stepe.stepes_id}
						id={stepe.stepes_id}
						name={stepe.stepes_name ?? ""}
						content={stepe.stepes_desc ?? ""}
						numero={idx + 1}
						placeholder={`Étape ${idx + 1}`}
						onRemove={removeStepes}
						onChange={(attribut, valeur) => updateStepes(stepe.stepes_id, attribut, valeur)}
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
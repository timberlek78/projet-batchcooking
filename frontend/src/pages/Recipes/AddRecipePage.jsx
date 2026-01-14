import style from './style/add.module.css'

function AddRecipePage()
{
	return(
		<div className={style.page}>
			<div  className={style.haut}>
				<div id="photo" className={style.photo}> {/**Conteneur photo */}
					<input type="image" />
				</div>
				<div className={style.recipe}>
					<div>
						<input type="text" placeholder="Entrez le nom de la recette"></input>
					</div>
					<div className={style.row}>
						<div className={style.ingredient}>
							<p>Liste Ingredient</p>
							<ul>
								<li>ahahaha</li>
								<li>ahahaha</li>
								<li>ahahaha</li>
								<li>ahahaha</li>
								<li>ahahaha</li>
							</ul>
						</div>
						<div className={style.infoGene}>
							<input type="text" placeholder="Entrez le temps de preparation estimé"></input>
							<input type="text" placeholder="Entrez le temps de cuisson"></input>
							<input type="number" placeholder="Difficulté de la recette"></input>
							<input type="number" name="nbPersonne" id= "" />
						</div>	
					</div>
				</div>
	
			</div>

			<div className={style.stape}>
				<ul>
					<li>aaaa</li>
					<li>aaaa</li>
					<li>aaaa</li>
					<li>aaaa</li>
					<li>aaaa</li>
				</ul>
			</div>

		</div>
	)
}
export default AddRecipePage
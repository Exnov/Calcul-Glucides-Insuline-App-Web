

class Notes extends React.Component{


	render(){

		return(
			<div id="notes">
				<h4 style={{textDecoration:'underline'}}>Notes :</h4>
				<br/>
				<ul>
					<li>La calculatrice du site est destinée aux diabétiques de type 1.</li>
					<li>Le calcul de la rapide se base ici sur l'insulinothérapie fonctionnelle, qui suppose pour le diabétique de connaître ses besoins en rapide pour 10 g. de glucides (les ratios), qui sont variables d'un repas à l'autre.</li>
					<li>Les données des aliments utilisées par le site proviennent de la base de données <a href="https://fr.openfoodfacts.org/" target="_blank">Open Food Facts</a>.</li>
					<li>Le site produit des informations pour aider l'utilisateur diabétique, mais ne se substitue en aucun cas à lui, ou à des professionnels de santé. Le développeur du site se dégage de toutes responsabilités quant à la décision finale du diabétique dans la dose de rapide qu'il s'injectera.</li>
				</ul>
				<br/>
				<p><strong>Bon courage <i className="bi bi-emoji-smile"></i></strong></p>
			</div>
		)
	}
}
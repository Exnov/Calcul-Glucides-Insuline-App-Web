

class Searcher extends React.Component{

	constructor(props){
		super(props)
		this.state={
			useralt:"",
		}
		this.handleChange=this.handleChange.bind(this)
		this.handleSubmit=this.handleSubmit.bind(this)
	}

	handleChange(event){
		var value=event.target.value;
		this.setState({useralt:value});
	}

	handleSubmit(event,getDataFromForm){
		event.preventDefault();

		var alts=[];

		//soumission uniquement si produit pas vide
		if(this.state.useralt.length>0){

			//Provider
			getDataFromForm("Recherche en cours...");
			
			//api requête : 
			var contexte=this;
			var request="https://fr.openfoodfacts.org/categorie/"+this.state.useralt+".json";

			fetch(request)
				.then(response => response.json())
				.then(data => (data.products.map(function(produit){

					var alt={
						id:"",
						nom:"",
						glucides:"",
						url:"",
						imgUlr:"",
						imgNutriUrl:""
					}
					//--
					if(produit.lang==="fr" && produit.product_name && produit.nutriments.carbohydrates_100g){
						contexte.setState({message:""});
						alt.id=produit.id;
						alt.nom=produit.product_name;
						alt.glucides=produit.nutriments.carbohydrates_100g;

						if(produit.url){ 
							alt.url=produit.url;
						}							
						if(produit.image_url){
							alt.imgUrl=produit.image_url;
						}
						if(produit.image_nutrition_url){
							alt.imgNutriUrl=produit.image_nutrition_url;
						}

						alts.push({
							id:alt.id,
							nom:alt.nom, 
							glucides:alt.glucides, 
							url:alt.url,
							imgUrl:alt.imgUrl,
							imgNutriUrl:alt.imgNutriUrl,
						});	

						getDataFromForm(alts);
					}

				})))
				.then(properties => {
					if(properties.length===0){
						getDataFromForm("Aliment non trouvé dans BDD");
					}
				})
				.catch(error => getDataFromForm("Aliment non trouvé dans BDD")); 
				//gestion erreur : cf https://www.pierre-giraud.com/javascript-apprendre-coder-cours/api-fetch/		
		}
		else{//message à afficher
			getDataFromForm("Entrez une valeur");
		}	
	}

	render(){

		return(
			//---------------------------
		    <BasketContext.Consumer>
		    	{({getDataFromForm, board}) => ( 
				//-----------------------				
				<form onSubmit={event => this.handleSubmit(event,getDataFromForm)}>   
					<label>
						<i className="bi bi-search"></i> (indiquez votre aliment au pluriel) :&nbsp;
						<input type="text" placeholder="ex: pommes de terre..." value={this.state.useralt} onChange={this.handleChange}/>
					</label>
					<input type="submit" value="Rechercher"/> <span> {board.length>0 ? " Aliments trouvés : " + board.length : null }</span>
				</form>
				//-----------------------
		      	)}
		    </BasketContext.Consumer>	
		    //---------------------------		
		)


	}

}


class Header extends React.Component{


	constructor(props){
		super(props)
		this.state={
			displayBasket:false,
		}
		this.seeDialog=this.seeDialog.bind(this)
	}

	seeDialog(boolean){  //appelee dans cpts Basket et MyHeader
		this.setState({displayBasket:boolean});
	}

	render(){	

		return(			
				<header>
					<div id="topHeader">
						<div id="box-logo">
							<img src="img/logo.png" alt="no-logo"/>
						</div>
						<h4>Calculatrice à insuline rapide pour diabétiques de type 1</h4>
						<h5>Remplissez votre assiette virtuelle et calculez rapidement votre rapide</h5>
					</div>
					<div id="infos" className="row">
						 <Info 
						 	title="Trouvez vos aliments dans une BDD"
						 	img="img/01_loupe.png"
						 	desc="Utilisez la barre de recherche pour trouver dans une base de données (BDD) les aliments de votre repas."
						 />
						 <Info 
						 	title="Ajoutez les aliments de la BDD"
						 	img="img/02_plate.png"
						 	desc="Choisissez dans les aliments trouvés ceux à ajouter à votre assiette virtuelle."
						 />
						 <Info 
						 	title="Renseignez vos infos"
						 	img="img/03_form.png"
						 	desc="Depuis le bouton vert à droite de la barre de recherche, accédez à votre assiette virtuelle et renseignez votre ratio, le poids de vos aliments. Ajoutez aussi les aliments de votre repas non trouvés dans la BDD."
						 />
						 <Info 
						 	title="Calculez votre rapide"
						 	img="img/04_calc.png"
						 	desc="Puis appuyez sur le bouton de calcul pour connaître votre dose de rapide."
						 />
					</div>
					<MyHeader
						seeDialog={this.seeDialog}
					/>
					<Basket 
						display={this.state.displayBasket}  //envoie de valeur de display pour affichage générée par le button du dessus avec sa fn
						seeDialog={this.seeDialog} //fn pour recuperer valeur display pour disparition
					/>
				</header>				
		)

	}
}
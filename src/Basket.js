

class Basket extends React.Component{

	//cf https://www.w3schools.com/howto/howto_css_modals.asp 
	constructor(props){
		super(props)
		this.state={
			ratio:"", //pour la soumission du form
			rapide:"", 
			dataCalcul:[], //pour afficher les donnees prises en compte dans le calcul 
			totalGlucides:"", //pour afficher la totalite des glucides calcules dans l'assiette 
			altsFmUser:[], //pour les Alts inscrits par l'user dans Basket
			keyAltFmUser:0, //pour les Alts inscrits par l'user dans Basket
		}
		this.rmDialog=this.rmDialog.bind(this)
		this.updateRapide=this.updateRapide.bind(this)
		this.updateAltsUser=this.updateAltsUser.bind(this) //pour les Alts inscrits par l'user dans Basket
	}

	updateRapide(){
		 this.setState({rapide:""});
		 this.setState({dataCalcul:[]});
		 this.setState({totalGlucides:""});
		 this.setState({ratio:""});
	}

	rmDialog(){
		//retour pour Header
		this.props.seeDialog(false);
		//------------------
		this.updateRapide();
	}

	handleRatio(event,setRatio){ //event,fn
		//auto-correction de la virgule en point
		var ratio=event.target.value;
		ratio=ratio.replaceAll(',', '.');
		//Provider :
		setRatio(ratio);	
	}


	getGlucides(alts,data){ //appelée dans calculRapide ==> pour alts de Api et alts de user:

		var qttGlucides=0;
		alts.map(function(alt){

			var altRecup={ //pour le state dataCalcul qui contient les references du calcul affichees lors de la soumission du form
				nom:"",
				glucidesAssiette:"",
			};
			altRecup.nom=alt.nom;
			altRecup.glucidesAssiette=alt.glucidesAssiette;
			data.push(altRecup);

			if(alt.glucidesAssiette.length>0){
				var glucidesAssiette=parseFloat(alt.glucidesAssiette);
				qttGlucides+=glucidesAssiette;
			}
		});
		return ({
			qttGlucides:qttGlucides,
			data:data
		});
	}

	calculRapide(alts,ratio){

		ratio=parseFloat(ratio);
		var rapide="";
		var data=[];

		if(Number.isFinite(ratio)){ //si oui, calcul !
			var qttGlucides=0;

			//--alts de Api et alts de user:
			var tab=this.getGlucides(alts,data);
			var qttGlucidesApi=tab.qttGlucides;
			data=tab.data;

			tab=this.getGlucides(this.state.altsFmUser,data);
			var qttGlucidesUser=tab.qttGlucides;
			data=tab.data;

			qttGlucides=qttGlucidesApi+qttGlucidesUser;		
			//--

			if(qttGlucides>0){ //calcul possible
				rapide=(ratio*qttGlucides/10).toFixed(2).toString()+" u.";
				this.setState({dataCalcul:data});
				this.setState({totalGlucides:qttGlucides.toFixed(2)});
				this.setState({ratio:ratio});
			}
			else{ //sinon pas de calcul
				alert("Rien à calculer");
			}
		}
		else{ //sinon pas de calcul
			alert("Le ratio doit être une valeur numérique");
		}

		this.setState({rapide:rapide});
	}

	renderAlts(alts){ //Avec AltsProvider : array
		//pour la maj du ratio à l'ouverture de la modale (si ajout/suppression d'Alts dans le state board de App):
		var contexte=this;
		if(alts.length>0){ 
			var altsInBasket=alts.map(function(alt){ 
				return (
					<AltInBasket
						alt={alt}
						clef={alt.keyAlt}
						updateRapide={contexte.updateRapide}					
					/>
				)
			});
			return(
				<div>
					{altsInBasket}
				</div>
			)
		}
		return null
	}

	handleSubmit(event,alts,ratio){
		event.preventDefault();
		this.calculRapide(alts,ratio);
	}	

	renderResultats(formatNumber){

		var alts=this.state.dataCalcul;
		var elts=[];
		elts=alts.map(function(alt){
			return(
				<li><em>{alt.nom}</em> : {formatNumber(alt.glucidesAssiette)} g. de glucides</li>
			)
		});

		return(
			<div id="results-calcul">
			    <h4><span>Calcul de la rapide </span>:  <strong>{this.state.rapide}</strong></h4>			
				<h5> Références du calcul : </h5>
				<ul>
					<li>Ratio : <b>{this.state.ratio} u.</b> pour 10 g. de glucides</li>
					<li>Glucides dans l'assiette : <b>{this.state.totalGlucides} g.</b></li>
					<li>Aliments :</li>
					<ul>
						{elts}
					</ul>
				</ul>
			</div>
		)
	}

	addAltUser(setCompteur){ //pour les Alts inscrits par l'user dans Basket, et fn du provider en parametre

		var keyAltFmUser=this.state.keyAltFmUser;
		keyAltFmUser+=1;

		var altsFmUser=this.state.altsFmUser;
		var alt={
			keyAltFmUser:keyAltFmUser,
			nom:"",
			glucides:"",		
			poids:"",
			glucidesAssiette:"",			
		}
		altsFmUser.push(alt);

		this.setState({
			keyAltFmUser:keyAltFmUser,
			altsFmUser:altsFmUser
		});

		setCompteur(1);
	}

	renderAltsUser(){ //pour les Alts inscrits par l'user dans Basket

		var alts=this.state.altsFmUser;
		var contexte=this;

		if(alts.length>0){
			var altsFmUser=alts.map(function(alt){
				return (
					<AltFmUser
						alt={alt}
						clef={alt.keyAltFmUser}
						alts={alts}
						updateRapide={contexte.updateRapide}
						updateAltsUser={contexte.updateAltsUser}		
					/>
				)
			});

			return(
				<div>
					{altsFmUser}
				</div>
			)
		}
		return null;
	}

	updateAltsUser(alts){ 
		this.setState({altsFmUser:alts});	
	}

	emptyPlate(empty){ //parametres pour alts api ==> cf Provider : fn
		//alts de l'user
		this.setState({altsFmUser:[]});
		//alts de l'api, et maj du compteur du panier
		empty();
		//resultats de la rapide disparaissent :
		this.updateRapide();
	}

	render(){

		if(this.props.display){
			return(
				//---------------------------
			    <BasketContext.Consumer>
			    	{({alts,setRatio,ratio,setCompteur,empty,formatNumber}) => ( 
				//---------------------------
					<div id="myModal" className="modal">

					  <div className="modal-content">
					  	<div>
					  		<span id="close" onClick={this.rmDialog}>&times;</span>
					  	</div>
					    <h2 id="basket-title">Aperçu de votre assiette</h2>
					    <form onSubmit={event => this.handleSubmit(event,alts,ratio)}>
							<label id="label-ratio">
								Votre ratio : <input type="text" placeholder="0.5" value={ratio} size="1" style={{marginBottom:"15px"}} onChange={event => this.handleRatio(event,setRatio)} required/>
							</label>
							<div id="empt-add-alt-user">
								<button type="button" id="empt-alt-user" onClick={() => this.emptyPlate(empty)}>Vider l'assiette</button>				   
								<button type="button" id="add-alt-user" onClick={() => this.addAltUser(setCompteur)}>Ajouter un aliment</button>
						    </div>
						    {this.renderAlts(alts)}
						    {this.renderAltsUser()}
						    
						    <input type="submit" value="Calculer rapide"/>
					    </form>
					    {this.state.rapide.length>0 ? this.renderResultats(formatNumber) : null}
					  </div>

					</div> 
				//---------------------------
		      	)}
		    	</BasketContext.Consumer>	
		    	//---------------------------
			)
		}
		return null			
	}

}
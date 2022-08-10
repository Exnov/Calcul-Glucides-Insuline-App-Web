

class AltInBasket extends React.Component{


	rmAlt(alts, add, rm){ 
		//Provider : recherche de l'index pour suppression de Alts :
		var index=null;
		var contexte=this;
		var key=this.props.clef;
		alts.map(function(alt){
			if(alt.keyAlt===key){ 
				index=alts.indexOf(alt);
			}
		});	
		rm(index);
		//--
		this.props.updateRapide();
	}

	handleChange(event,update){ //event,fn
		var poids=event.target.value;
		var qttGlucides=this.calculGlucides(poids);
		//Provider update :
		var key=this.props.clef;
		update(key,poids,qttGlucides); 
	}

	calculGlucides(poids){
		if(poids.length>0){

			poids=parseFloat(poids); 
			if(Number.isFinite(poids)){ 
				var glucides=parseFloat(this.props.alt.glucides) * (poids/100); 
				if(!Number.isFinite(glucides)){ //pas plus de 2 chiffres après la virgule 
					glucides = glucides.toFixed(2);
				}
				return (glucides.toString());
			}
		}
		return ""
	}

	render(){

		return(
			//---------------------------
		    <BasketContext.Consumer>
		    	{({alts, add, rm, update,formatNumber}) => ( 
			//---------------------------			
			<div className="alt-in-basket">
				<div className="basket-container-img">
					<a href={this.props.alt.url} target="_blank"><img src={this.props.alt.imgUrl} alt="Aliment sans image"/></a>
				</div>
				<div className="basket-container-input">
					<label> Poids de <em>{this.props.alt.nom}</em> en g. :&nbsp;
						<input type="number" placeholder="25..." value={this.props.alt.poids} size="3" onChange={event => this.handleChange(event,update)} required/>
					</label>
					<p>Valeur glucidique : <strong>{formatNumber(this.props.alt.glucides)}%</strong></p>
					<p>Quantité de glucides dans l'assiette : {this.props.alt.glucidesAssiette.length>0 ? formatNumber(this.props.alt.glucidesAssiette) : null} {this.props.alt.glucidesAssiette.length>0 ? " g." : null}</p>
				</div>
				<button type="button" className="btn basket-rm-alt" onClick={() => this.rmAlt(alts, add, rm)}><i className="bi bi-trash"></i></button> 
			</div>
			//---------------------------
		      	)}
		    </BasketContext.Consumer>	
		    //---------------------------			
		)
	}
} 
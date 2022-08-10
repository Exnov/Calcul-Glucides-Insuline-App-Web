

class Alt extends React.Component{


	addOrRmvAlt(alts,add,rm){ //Avec AltsProvider :  array, fn, fn

		//ajout si Alt pas déjà dans array alts ==> check par son id
		var check=false;
		var index=null;
		var id=this.props.id; //sert a distinguer les alts de l'api sur le board
		alts.map(function(alt){
			if(alt.id===id){ 
				check=true;
				index=alts.indexOf(alt);
			}
		});
		//si true, on supprime
		if(check){ 
			rm(index);
		}
		else{
			var alt={
				// isInBasket ==> NON, parce que dans App check de ce state pour les aliments du panier, si nom de l'Alt dans le panier (cf isInBasket={panierAltsId.includes(alt.nom)} )
				id:this.props.id, //sert a distinguer les alts de l'api sur le board
				nom:this.props.nom,
				glucides:this.props.glucides,
				url:this.props.url,
				imgUrl:this.props.imgUrl,
				poids:"",
				glucidesAssiette:"",	
				keyAlt:"", //genere dans Provider, et sert de key (id) pour distinguer les alts de l'api dans le panier	
			};
			add(alt);			
		}
	}

	render(){
		
		var color=this.props.isInBasket ? "orange" : "#14e04d";
		var styleButton={
			backgroundColor:color,
		}	

		return(
			//---------------------------
		    <BasketContext.Consumer>
		    	{({alts, add, rm, formatNumber}) => ( 
				//---------------------------
	          	<div className="card card-alt col-lg-3 col-md-4">
	             	<div className="frame-img">
	              		<a href={this.props.imgUrl} target="_blank"> 
	                		<img className="card-img-top" src={this.props.imgUrl} alt="Aliment sans image"/>
	              		</a>
	            	</div>
	            	<div className="card-body alt-body">
	              		<h5 className="card-title">{this.props.nom}</h5>
	              		<p className="card-text"><i className="bi bi-bookmark-check-fill"></i> Glucides pour 100g : <strong>{formatNumber(this.props.glucides)}g</strong></p>
	              		<div>
	              			<a href={this.props.url} className="btn btn-primary" target="_blank"><i className="bi bi-plus-circle"></i> d'infos</a>
	              			<button type="button" className="btn add_alt" style={styleButton} onClick={() => this.addOrRmvAlt(alts, add, rm)}><i className="bi bi-basket3"></i></button>       
	            		</div>
	            	</div>
	          	</div>			
				//--------------------------
		      	)}
		    </BasketContext.Consumer>	
		    //---------------------------
		)
	}
}




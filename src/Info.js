
//pour le header ==> pour les 4 cadres d'infos qui renseignent sur l'utilisation du site :

class Info extends React.Component{


	render(){

		return(
			 <div className="col-lg-3 info-using">
			 	<div className="info-box">
				 	<div className="info-title"><b>{this.props.title}</b></div>
				 	<div><img src={this.props.img} alt="no-img"/></div>
				 	<div className="info-desc">{this.props.desc}</div>
				 </div>
			 </div>
		)
	}
}
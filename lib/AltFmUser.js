class AltFmUser extends React.Component {
  //les aliments generes par l'user dans le panier ==> pour completer si envie, ceux de l'api
  //cf AltInBasket avec Provider
  rmAlt(setCompteur) {
    //fn du provider
    //Provider : recherche de l'index pour suppression de Alts :
    var index = null;
    var alts = this.props.alts;
    var key = this.props.clef;
    alts.map(function (alt) {
      if (alt.keyAltFmUser === key) {
        index = alts.indexOf(alt);
      }
    });
    alts.splice(index, 1); //retourne à Basket les aliments maj dans son array (avec la suppression ici de l'AltFmUser)

    this.props.updateAltsUser(alts); //comme pour AltInBasket ==> pour faire disparaitre et maj la partie resultat calcul a la suppression d'un alt (ici AltFmUser)

    this.props.updateRapide(); //pour le compteur du bouton Panier

    setCompteur(-1);
  }

  handleChange(event) {
    var {
      name,
      value
    } = event.target;
    var glucidesAssiette = this.calculGlucides(name, value);
    var key = this.props.clef; //maj par rapport à keyAltFmUser

    var alts = this.props.alts;
    alts.map(function (alt) {
      if (alt.keyAltFmUser === key) {
        alt[name] = value;
        alt.glucidesAssiette = glucidesAssiette;
      }
    }); //retourne à Basket les aliments maj dans son array (avec la suppression ici de l'AltFmUser)

    this.props.updateAltsUser(alts);
  }

  calculGlucides(name, value) {
    //name,value ==> poids ou glucides name,value
    var poids = this.props.alt.poids;
    var glucides = this.props.alt.glucides;

    switch (name) {
      case "poids":
        poids = value;
        break;

      case "glucides":
        glucides = value;
        break;
    }

    if (poids.length > 0 && glucides.length > 0) {
      poids = parseFloat(poids);

      if (Number.isFinite(poids)) {
        var glucidesPart = parseFloat(glucides) * (poids / 100);

        if (!Number.isFinite(glucides)) {
          //pas plus de 2 chiffres après la virgule
          glucidesPart = glucidesPart.toFixed(2);
        }

        return glucidesPart.toString();
      }
    }

    return "";
  }

  render() {
    return (
      /*#__PURE__*/
      //---------------------------
      React.createElement(BasketContext.Consumer, null, ({
        setCompteur
      }) =>
      /*#__PURE__*/
      //---------------------------		
      React.createElement("div", {
        className: "alt-in-basket alt-user"
      }, /*#__PURE__*/React.createElement("div", {
        className: "basket-container-input-user"
      }, /*#__PURE__*/React.createElement("label", null, " Nom de l'aliment :\xA0", /*#__PURE__*/React.createElement("input", {
        type: "texte",
        placeholder: "pain...",
        value: this.props.alt.nom,
        name: "nom",
        size: "12",
        onChange: event => this.handleChange(event)
      })), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", null, " Poids en g. :\xA0", /*#__PURE__*/React.createElement("input", {
        type: "number",
        placeholder: "25...",
        value: this.props.alt.poids,
        name: "poids",
        size: "3",
        onChange: event => this.handleChange(event),
        required: true
      })), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", null, " Valeur glucidique en % :\xA0", /*#__PURE__*/React.createElement("input", {
        type: "number",
        placeholder: "25...",
        value: this.props.alt.glucides,
        name: "glucides",
        size: "3",
        onChange: event => this.handleChange(event),
        required: true
      })), /*#__PURE__*/React.createElement("p", null, "Quantit\xE9 de glucides dans l'assiette : ", this.props.alt.glucidesAssiette, " ", this.props.alt.glucidesAssiette.length > 0 ? " g." : null)), /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: "btn basket-rm-alt",
        onClick: () => this.rmAlt(setCompteur)
      }, /*#__PURE__*/React.createElement("i", {
        className: "bi bi-trash"
      }))) //---------------------------
      ) //---------------------------					

    );
  }

}
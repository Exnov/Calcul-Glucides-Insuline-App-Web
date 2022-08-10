class AltInBasket extends React.Component {
  rmAlt(alts, add, rm) {
    //Provider : recherche de l'index pour suppression de Alts :
    var index = null;
    var contexte = this;
    var key = this.props.clef;
    alts.map(function (alt) {
      if (alt.keyAlt === key) {
        index = alts.indexOf(alt);
      }
    });
    rm(index); //--

    this.props.updateRapide();
  }

  handleChange(event, update) {
    //event,fn
    var poids = event.target.value;
    var qttGlucides = this.calculGlucides(poids); //Provider update :

    var key = this.props.clef;
    update(key, poids, qttGlucides);
  }

  calculGlucides(poids) {
    if (poids.length > 0) {
      poids = parseFloat(poids);

      if (Number.isFinite(poids)) {
        var glucides = parseFloat(this.props.alt.glucides) * (poids / 100);

        if (!Number.isFinite(glucides)) {
          //pas plus de 2 chiffres après la virgule 
          glucides = glucides.toFixed(2);
        }

        return glucides.toString();
      }
    }

    return "";
  }

  render() {
    return (
      /*#__PURE__*/
      //---------------------------
      React.createElement(BasketContext.Consumer, null, ({
        alts,
        add,
        rm,
        update,
        formatNumber
      }) =>
      /*#__PURE__*/
      //---------------------------			
      React.createElement("div", {
        className: "alt-in-basket"
      }, /*#__PURE__*/React.createElement("div", {
        className: "basket-container-img"
      }, /*#__PURE__*/React.createElement("a", {
        href: this.props.alt.url,
        target: "_blank"
      }, /*#__PURE__*/React.createElement("img", {
        src: this.props.alt.imgUrl,
        alt: "Aliment sans image"
      }))), /*#__PURE__*/React.createElement("div", {
        className: "basket-container-input"
      }, /*#__PURE__*/React.createElement("label", null, " Poids de ", /*#__PURE__*/React.createElement("em", null, this.props.alt.nom), " en g. :\xA0", /*#__PURE__*/React.createElement("input", {
        type: "number",
        placeholder: "25...",
        value: this.props.alt.poids,
        size: "3",
        onChange: event => this.handleChange(event, update),
        required: true
      })), /*#__PURE__*/React.createElement("p", null, "Valeur glucidique : ", /*#__PURE__*/React.createElement("strong", null, formatNumber(this.props.alt.glucides), "%")), /*#__PURE__*/React.createElement("p", null, "Quantit\xE9 de glucides dans l'assiette : ", this.props.alt.glucidesAssiette.length > 0 ? formatNumber(this.props.alt.glucidesAssiette) : null, " ", this.props.alt.glucidesAssiette.length > 0 ? " g." : null)), /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: "btn basket-rm-alt",
        onClick: () => this.rmAlt(alts, add, rm)
      }, /*#__PURE__*/React.createElement("i", {
        className: "bi bi-trash"
      }))) //---------------------------
      ) //---------------------------			

    );
  }

}
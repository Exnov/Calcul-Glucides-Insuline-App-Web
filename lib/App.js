class App extends React.Component {
  checkAlts(panier, altsFound) {
    if (typeof altsFound === "object") {
      var board = altsFound; //comparer la liste du board et la liste du panier pour mettre à jour le bouton add/rm de l'alt dans board
      //si alt.id dans panier props isInBasket vaut true sinon false

      var panierAltsId = [];

      if (panier.length > 0) {
        panier.map(function (alt) {
          panierAltsId.push(alt.id);
        });
        board.map(function (data) {
          if (panierAltsId.includes(data.id)) {
            panier.map(function (n) {
              if (n.id === data.id) {
                data["poids"] = n.poids;
                data["glucidesAssiette"] = n.glucidesAssiette;
              }
            });
          } else {
            data["poids"] = "";
            data["glucidesAssiette"] = "";
          }
        });
      } //si panierAltsId.includes(alt.nom) ==> recup alt.isInBasket (renvoie true ou false)


      var alts = board.map(function (alt) {
        //construction des Alt à partir des données de l'API recuperees dans board, et mis à jour à chaque render()
        return /*#__PURE__*/React.createElement(Alt, {
          id: alt.id,
          nom: alt.nom,
          glucides: alt.glucides,
          url: alt.url,
          imgUrl: alt.imgUrl,
          imgNutriUrl: alt.imgNutriUrl,
          isInBasket: panierAltsId.includes(alt.id),
          poids: alt.poids == undefined ? "" : alt.poids //si dans panier valeur de panier, sinon ""
          ,
          glucidesAssiette: alt.glucidesAssiette == undefined ? "" : alt.glucidesAssiette //si dans panier valeur de panier, sinon ""								

        });
      });
      return /*#__PURE__*/React.createElement("div", {
        className: "row row-alts mb-5"
      }, alts);
    } else {
      return /*#__PURE__*/React.createElement("p", null, altsFound);
    }
  }

  render() {
    return (
      /*#__PURE__*/
      //---------------------------
      React.createElement(BasketContext.Consumer, null, ({
        alts,
        board
      }) =>
      /*#__PURE__*/
      //---------------------------			
      React.createElement("div", null, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement("div", null, this.checkAlts(alts, board)), /*#__PURE__*/React.createElement(Notes, null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Footer, null)) //------------------------------
      ) //---------------------------				

    );
  }

}
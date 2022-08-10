class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayBasket: false
    };
    this.seeDialog = this.seeDialog.bind(this);
  }

  seeDialog(boolean) {
    //appelee dans cpts Basket et MyHeader
    this.setState({
      displayBasket: boolean
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("div", {
      id: "topHeader"
    }, /*#__PURE__*/React.createElement("div", {
      id: "box-logo"
    }, /*#__PURE__*/React.createElement("img", {
      src: "img/logo.png",
      alt: "no-logo"
    })), /*#__PURE__*/React.createElement("h4", null, "Calculatrice \xE0 insuline rapide pour diab\xE9tiques de type 1"), /*#__PURE__*/React.createElement("h5", null, "Remplissez votre assiette virtuelle et calculez rapidement votre rapide")), /*#__PURE__*/React.createElement("div", {
      id: "infos",
      className: "row"
    }, /*#__PURE__*/React.createElement(Info, {
      title: "Trouvez vos aliments dans une BDD",
      img: "img/01_loupe.png",
      desc: "Utilisez la barre de recherche pour trouver dans une base de donn\xE9es (BDD) les aliments de votre repas."
    }), /*#__PURE__*/React.createElement(Info, {
      title: "Ajoutez les aliments de la BDD",
      img: "img/02_plate.png",
      desc: "Choisissez dans les aliments trouv\xE9s ceux \xE0 ajouter \xE0 votre assiette virtuelle."
    }), /*#__PURE__*/React.createElement(Info, {
      title: "Renseignez vos infos",
      img: "img/03_form.png",
      desc: "Depuis le bouton vert \xE0 droite de la barre de recherche, acc\xE9dez \xE0 votre assiette virtuelle et renseignez votre ratio, le poids de vos aliments. Ajoutez aussi les aliments de votre repas non trouv\xE9s dans la BDD."
    }), /*#__PURE__*/React.createElement(Info, {
      title: "Calculez votre rapide",
      img: "img/04_calc.png",
      desc: "Puis appuyez sur le bouton de calcul pour conna\xEEtre votre dose de rapide."
    })), /*#__PURE__*/React.createElement(MyHeader, {
      seeDialog: this.seeDialog
    }), /*#__PURE__*/React.createElement(Basket, {
      display: this.state.displayBasket //envoie de valeur de display pour affichage générée par le button du dessus avec sa fn
      ,
      seeDialog: this.seeDialog //fn pour recuperer valeur display pour disparition

    }));
  }

}
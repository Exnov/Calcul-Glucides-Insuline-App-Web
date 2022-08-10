// le provider AltsProvider aide à maj et distribuer les donnees des aliments de l'api à travers les differents composants.
//-----------------
const BasketContext = React.createContext({
  alts: [],
  //alts=[] ==> alts du panier
  add: () => {},
  // fn d'ajout d'un alt
  rm: () => {},
  //fn de retrait d'un alt
  update: () => {},
  //fn de mise à jour des donnees glucidiques de l'alt
  empty: () => {},
  //fn qui vide l'array alts, et met le compteur du panier à 0 ==> appelee dans Basket ==> fn emptyPlate(), du btn "Vider l'assiette"
  keyAlt: 0,
  //--
  ratio: "",
  //fn qui contient le ratio de l'user
  setRatio: () => {},
  //fn de maj et de recuperation du ratio de l'user
  //--
  stickyHeader: () => {},
  //fn qui gere le stick du menu dans le Header ==> pour MyHeader
  //--
  resizeHeader: () => {},
  //fn qui gere le resize du menu dans le Header (cf MyHeader), quand l'user resize la page
  //--
  board: "",
  //recupere la liste des alts trouves par Searcher, ou un string qui dit qu'on n'a pas trouve d'alts
  getDataFromForm: () => {},
  //fn qui recupere les alts trouves par Searcher 
  //--compteur d'alts : ici alts api et alts user confondus
  compteur: 0,
  //contient la valeur affichée dans le bouton Panier
  setCompteur: () => {},
  formatNumber: () => {}
});
/**
 * la classe AltsProvider fera office de... Provider (!)
 * en englobant son enfant direct
 * dans le composant éponyme. De cette façon, ses values
 * seront accessibles de manière globale via le `Consumer`
 */

class AltsProvider extends React.Component {
  constructor() {
    super();
    this.add = this.add.bind(this);
    this.rm = this.rm.bind(this);
    this.update = this.update.bind(this);
    this.empty = this.empty.bind(this);
    this.setRatio = this.setRatio.bind(this);
    this.stickyHeader = this.stickyHeader.bind(this);
    this.resizeHeader = this.resizeHeader.bind(this);
    this.getDataFromForm = this.getDataFromForm.bind(this);
    this.setCompteur = this.setCompteur.bind(this);
    this.formatNumber = this.formatNumber.bind(this);
    this.state = {
      alts: [],
      //setName: name => this.setState({ name: name }) //autre syntaxe ref.
      add: this.add,
      rm: this.rm,
      update: this.update,
      empty: this.empty,
      keyAlt: 0,
      ratio: "",
      setRatio: this.setRatio,
      stickyHeader: this.stickyHeader,
      resizeHeader: this.resizeHeader,
      board: "",
      getDataFromForm: this.getDataFromForm,
      compteur: 0,
      setCompteur: this.setCompteur,
      formatNumber: this.formatNumber
    };
  }

  add(alt) {
    var key = this.state.keyAlt;
    key += 1;
    alt.keyAlt = key;
    this.setState({
      keyAlt: key
    });
    this.setState(function (statenow) {
      var tab = statenow.alts;
      tab.push(alt);
      return {
        alts: tab
      };
    });
    this.setCompteur(1);
  }

  rm(index) {
    this.setState(function (statenow) {
      var tab = statenow.alts;
      tab.splice(index, 1);
      return {
        alts: tab
      };
    });
    this.setCompteur(-1);
  }

  update(key, poids, glucides) {
    var alts = this.state.alts;
    alts.map(function (aliment) {
      if (aliment.keyAlt === key) {
        aliment.poids = poids;
        aliment.glucidesAssiette = glucides;
        return aliment;
      }
    });
    this.setState({
      alts: alts
    });
  }

  empty() {
    this.setState({
      alts: []
    });
    this.setState({
      compteur: 0
    });
  }

  setRatio(ratio) {
    this.setState({
      ratio: ratio
    });
  } //-- adaptation maison de https://www.w3schools.com/howto/howto_js_sticky_header.asp


  stickyHeader(fn) {
    //envoyer stickyHeader() en props à Header pour lui renvoyer une fn en parametre qui lie le header au scroll du windows, et provoque le sticky du header (MyHeader dans Header)
    window.onscroll = () => {
      fn();
    };
  }

  resizeHeader(fn) {
    //maj de myHeader quand resize par le user, de la fenêtre
    window.onresize = () => {
      fn();
    };
  }

  getDataFromForm(searcherData) {
    this.setState({
      board: searcherData
    });
  } //alts api et alts user confondus ici ==> pour afficher, compter le nombre d'alts confondus dans le bouton Panier
  //fn appelée dans les fn des composants où on ajoute et retire un aliment :
  //pour les alts api : add et rm geres ici dans le provider
  //pour les alts user : add gere dans Basket (addAltUser), et rm dans AltFmUser (rmAlt)


  setCompteur(n) {
    //gere les soustractions et additions ==> prend 1 ou -1
    this.setState({
      compteur: this.state.compteur += n
    });
  }

  formatNumber(string) {
    //pour s'assurer que les chiffres des glucides n'aient pas plus de 2 chiffres après la virgule ==> dans Alt, AltInBasket et Basket
    var n = Number(string);

    if (!Number.isInteger(n)) {
      n = n.toFixed(2);
    }

    return n;
  }

  render() {
    return (
      /*#__PURE__*/

      /**
       * la propriété value est très importante ici, elle rend
       * le contenu du state disponible aux `Consumers` de l'application
       */
      React.createElement(BasketContext.Provider, {
        value: this.state
      }, this.props.children)
    );
  }

}
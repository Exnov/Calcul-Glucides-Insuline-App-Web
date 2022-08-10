class MyHeader extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.seeDialog = this.seeDialog.bind(this);
  }

  seeDialog() {
    this.props.seeDialog(true);
  }

  sticker(fn) {
    //gere le stick du menu du Header avec la fn du Provider stickyHeader()
    function stick() {
      // Get the header
      var header = document.getElementById("myHeader"); // Get the offset position of the navbar

      var sticky = header.offsetTop;

      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }

    fn(stick);
  }

  resize(fn) {
    //gere le resize provoque par l'user ==> utile quand sticky
    function doResize() {
      var box = document.getElementById('root');
      var style = getComputedStyle(box);
      var marginRight = parseInt(style.marginRight);
      var header = document.getElementById("myHeader");
      header.style.right = marginRight + "px";
      header.style.left = marginRight + "px";
    }

    fn(doResize);
  }

  render() {
    //pour adapter la largeur du sticky au div de id root :
    //ne prend pas en compte le resize de la page ==> si resize par l'user de la fenêtre cf fn resize()
    //se met à jour quand le render est sollicite ==> quand clique sur le bouton panier par exemple
    var box = document.getElementById('root');
    var style = getComputedStyle(box);
    var marginRight = parseInt(style.marginRight);
    var styleHeader = {
      right: marginRight + "px",
      left: marginRight + "px"
    };
    return (
      /*#__PURE__*/
      //---------------------------
      React.createElement(BasketContext.Consumer, null, ({
        stickyHeader,
        resizeHeader,
        compteur
      }) => {
        this.sticker(stickyHeader); //Provider

        this.resize(resizeHeader); //Provider

        return (
          /*#__PURE__*/
          //---------------------------			
          React.createElement("div", {
            id: "myHeader",
            style: styleHeader
          }, /*#__PURE__*/React.createElement("ul", {
            className: "menuHeader"
          }, /*#__PURE__*/React.createElement("li", {
            id: "search-alt"
          }, /*#__PURE__*/React.createElement(Searcher, null)), /*#__PURE__*/React.createElement("li", {
            id: "totheright"
          }, /*#__PURE__*/React.createElement("a", {
            onClick: this.seeDialog,
            role: "button"
          }, /*#__PURE__*/React.createElement("i", {
            className: "bi bi-basket3"
          }, " ", /*#__PURE__*/React.createElement("span", {
            id: "n-alts-basket"
          }, compteur > 0 ? compteur : null)))))) //---------------------------

        );
      }) //---------------------------			

    );
  }

}
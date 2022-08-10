//pour le header ==> pour les 4 cadres d'infos qui renseignent sur l'utilisation du site :
class Info extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "col-lg-3 info-using"
    }, /*#__PURE__*/React.createElement("div", {
      className: "info-box"
    }, /*#__PURE__*/React.createElement("div", {
      className: "info-title"
    }, /*#__PURE__*/React.createElement("b", null, this.props.title)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
      src: this.props.img,
      alt: "no-img"
    })), /*#__PURE__*/React.createElement("div", {
      className: "info-desc"
    }, this.props.desc)));
  }

}
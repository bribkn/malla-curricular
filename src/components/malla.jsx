import React, { Component } from "react";
import Ramo from "./ramo";
import MallaData from "../data/mallaData";

class Malla extends Component {
  constructor(props) {
    super(props);
    this.state = { MallaData: MallaData };
    this.renderRamo = this.renderRamo.bind(this);
    this.renderSemestre = this.renderSemestre.bind(this);
    this.renderMalla = this.renderMalla.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
    this.handlePrereq = this.handlePrereq.bind(this);
  }

  handlePrereq(ramoId, semestreId, selected) {
    // console.log(ramoId, semestreId, selected);
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState["MallaData"].ramos[ramoId - 1].selected = selected;
      return newState;
    });
  }

  handleSelected(ramoId, semestreId, selected, prereq) {
    // console.log(ramoId, semestreId, selected, prereq);

    for (let i = 0; i < prereq.length; i++) {
      this.handlePrereq(prereq[i], semestreId, selected);
    }
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState["MallaData"].ramos[ramoId - 1].selected = selected;
      return newState;
    });
  }

  renderRamo(ramo) {
    return (
      <Ramo
        onSelected={this.handleSelected}
        key={ramo.id}
        ramo={ramo}
        semestre={ramo.semestre}
        prereq={ramo.prereq}
      ></Ramo>
    );
  }

  renderSemestre(idSemestre) {
    const ramos = [];
    for (var i = 0; i < MallaData.ramos.length; i++) {
      if (MallaData.ramos[i].semestre === idSemestre)
        ramos.push(this.renderRamo(MallaData.ramos[i]));
    }
    return ramos;
  }

  renderMalla() {
    const ramos = [];
    for (var i = 0; i < 4; i++) {
      ramos.push(<div className="row">{this.renderSemestre(i + 1)}</div>);
    }
    return ramos;
  }

  render() {
    return <div className="container">{this.renderMalla()}</div>;
  }
}

export default Malla;

import React, { Component } from "react";
import Ramo from "./ramo";
import MallaData from "../data/mallaData";

class Malla extends Component {
  constructor(props) {
    super(props);
    this.state = { MallaData: MallaData, alertPrereq: false };
    this.renderRamo = this.renderRamo.bind(this);
    this.renderSemestre = this.renderSemestre.bind(this);
    this.renderMalla = this.renderMalla.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
    this.handlePrereq = this.handlePrereq.bind(this);
    this.handlePassed = this.handlePassed.bind(this);
  }

  handlePrereq(ramoId, selected) {
    if (selected === "selected") {
      this.setState((prevState) => {
        let newState = { ...prevState };
        newState["MallaData"].ramos[ramoId - 1].selected = "prereq";
        return newState;
      });
    } else {
      this.setState((prevState) => {
        let newState = { ...prevState };
        newState["MallaData"].ramos[ramoId - 1].selected = "unselected";
        return newState;
      });
    }
  }

  handleSelected(ramoId, semestreId, selected, prereq) {
    for (let i = 0; i < prereq.length; i++) {
      this.handlePrereq(prereq[i], selected);
    }
    this.setState((prevState) => {
      let newState = { ...prevState };
      newState["MallaData"].ramos[ramoId - 1].selected = selected;
      return newState;
    });
  }

  handlePassed(ramoId) {
    let prereqPassed = true;

    for (let i = 0; i < MallaData.ramos[ramoId - 1].prereq.length; i++) {
      let idPrereq = MallaData.ramos[ramoId - 1].prereq[i];
      if (MallaData.ramos[idPrereq - 1].passed === false) {
        prereqPassed = false;
      }
    }
    if (prereqPassed === false) {
      this.setState((state) => ({
        alertPrereq: true,
      }));
      return;
    }
    if (MallaData.ramos[ramoId - 1].passed === false) {
      this.setState((prevState) => {
        let newState = { ...prevState };
        newState["MallaData"].ramos[ramoId - 1].passed = true;
        return newState;
      });
    } else {
      this.setState((prevState) => {
        let newState = { ...prevState };
        newState["MallaData"].ramos[ramoId - 1].passed = false;
        return newState;
      });
    }
  }

  renderRamo(ramo) {
    return (
      <Ramo
        onSelected={this.handleSelected}
        onPassed={this.handlePassed}
        ramo={ramo}
        key={ramo.id}
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
    const semestres = [];
    for (var i = 0; i < 4; i++) {
      semestres.push(<div className="row">{this.renderSemestre(i + 1)}</div>);
    }
    return semestres;
  }

  render() {
    return (
      <div>
        <div className="alert alert-warning" role="alert">
          Página en <strong>construcción!</strong>
        </div>
        {console.log(this.state.alertPrereq)}
        <div className="btn-group" role="group" aria-label="Basic example">
          <button type="button" className="btn btn-secondary">
            Informática y Telecomunicaciones
          </button>
          <button type="button" className="btn btn-secondary">
            Obras Civiles
          </button>
          <button type="button" className="btn btn-secondary">
            Industrial
          </button>
        </div>
        <div className="container-fluid">{this.renderMalla()}</div>
      </div>
    );
  }
}

export default Malla;

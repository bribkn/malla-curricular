import React, { Component } from "react";

class Ramo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderSelected = this.renderSelected.bind(this);
  }

  renderSelected() {
    if (this.props.ramo.selected === "selected") {
      return "card shadow lg text-center text-white bg-success m-2";
    } else if (this.props.ramo.selected === "unselected") {
      return "card shadow lg text-center border-success m-2 ";
    } else if (this.props.ramo.selected === "prereq") {
      return "card shadow lg text-center text-white bg-info m-2 ";
    } else {
      return "card shadow lgtext-center text-white bg-danger m-2";
    }
  }

  render() {
    return (
      <div
        className="col"
        onMouseEnter={() => {
          this.props.onSelected(
            this.props.ramo.id,
            this.props.semestre,
            "selected",
            this.props.ramo.prereq
          );
        }}
        onMouseLeave={() => {
          this.props.onSelected(
            this.props.ramo.id,
            this.props.semestre,
            "unselected",
            this.props.ramo.prereq
          );
        }}
        style={{ width: "15rem" }}
        className={this.renderSelected()}
      >
        <div className="card-header">{this.props.ramo.codigo}</div>
        <div className="card-body">
          <h5 className="card-title">{this.props.ramo.nombre}</h5>
          <p className="card-text">{this.props.ramo.creditos} CRÉDITOS</p>
        </div>
      </div>
    );
  }
}

export default Ramo;

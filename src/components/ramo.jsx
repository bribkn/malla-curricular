import React, { Component } from "react";

class Ramo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className="col"
        onMouseEnter={() => {
          this.props.onSelected(
            this.props.ramo.id,
            this.props.semestre,
            true,
            this.props.ramo.prereq
          );
        }}
        onMouseLeave={() => {
          this.props.onSelected(
            this.props.ramo.id,
            this.props.semestre,
            false,
            this.props.ramo.prereq
          );
        }}
        style={{ width: "10rem", textAlign: "center" }}
        className={
          this.props.ramo.selected
            ? "card text-white bg-success m-2"
            : "card border-success m-2 "
        }
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

import React, { Component } from "react";

class Ramo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderSelected = this.renderSelected.bind(this);
    this.renderLine = this.renderLine.bind(this);
  }

  renderSelected() {
    if (this.props.ramo.passed === true) {
      return "card shadow lg text-center text-white bg-success m-2";
    } else if (this.props.ramo.selected === "selected") {
      return "card shadow lg text-center text-white bg-success m-2";
    } else if (this.props.ramo.selected === "unselected") {
      return "card shadow lg text-center border-secondary m-2 ";
    } else if (this.props.ramo.selected === "prereq") {
      return "card shadow lg text-center text-white bg-info m-2 ";
    } else {
      return "card shadow lgtext-center text-white bg-danger m-2";
    }
  }

  renderLine() {
    if (this.props.ramo.passed) {
      return (
        <img
          src={require("../img/diagonal-line.png")}
          alt="diagonal-line"
          style={{
            width: "150px",
            top: "20px",
            left: "50px",
            position: "absolute",
            backgroundColor: "transparent",
          }}
        ></img>
      );
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
        onClick={() => {
          this.props.onPassed(this.props.ramo.id);
        }}
        key={this.props.ramo.id}
        style={{ width: "15rem", position: "relative" }}
        className={this.renderSelected()}
      >
        <div draggable="true">
          <div className="card-header">{this.props.ramo.codigo}</div>
          <div className="card-body">
            <h5 className="card-title">{this.props.ramo.nombre}</h5>
            <p className="card-text">{this.props.ramo.creditos} CRÉDITOS</p>
            {this.renderLine()}
          </div>
        </div>
      </div>
    );
  }
}

export default Ramo;

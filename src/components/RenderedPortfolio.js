import React, { Component } from "react";
import "../styles/components/rendered-portfolio.scss";

class RenderedPortfolio extends Component {
  render() {
    const investments = this.props.portfolio.map((investment, index) => (
      <tr className="investment" key={index}>
        <th>{investment.label}</th>
        <th>{investment.amountBought.toString()}</th>
        <th>
          <span className={investment.optimal ? "optimal" : "not-optimal"}>
            ${investment.priceBought.toString()}
          </span>
        </th>
      </tr>
    ));
    return (
      <table className="portfolio">
        <thead>
          <tr>
            <th>asset</th>
            <th>amount</th>
            <th>price bought</th>
          </tr>
        </thead>
        <tbody>{investments}</tbody>
      </table>
    );
  }
}

export default RenderedPortfolio;

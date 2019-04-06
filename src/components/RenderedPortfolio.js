import React, { Component } from "react";

class RenderedPortfolio extends Component {
  render() {
    const investments = this.props.portfolio.map((investment, index) => (
      <div className="investment" key={index}>
        {investment.id}: {investment.amountBought.toString()} *{" "}
        {investment.priceBought.toString()}
      </div>
    ));
    return <div className="portfolio">{investments}</div>;
  }
}

export default RenderedPortfolio;

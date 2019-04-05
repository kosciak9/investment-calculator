import React, { Component } from "react";

import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

import Select from "react-select";

import axios from "axios";

import { BigFloat32 } from "bigfloat";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amountBought: 1,
      priceBought: 1,
      tokenBought: {
        value: "btc",
        label: "Bitcoin",
        id: "bitcoin"
      },
      vsCurrenciesNow: {
        btc: new BigFloat32(1),
        usd: new BigFloat32(1),
        xrp: new BigFloat32(1),
        eth: new BigFloat32(1)
      }
    };
  }

  handleTokenChange = value => {
    this.setState({ tokenBought: value }, () => {
      this.updateTokenActualValue();
    });
  };

  updateTokenActualValue = () => {
    axios
      .get("/simple/price", {
        params: {
          ids: this.state.tokenBought.id,
          vs_currencies: "btc,eth,usd,xrp"
        }
      })
      .then(response => {
        const vsCurrenciesNow = response.data[this.state.tokenBought.id];
        this.setState({
          vsCurrenciesNow: {
            btc: new BigFloat32(vsCurrenciesNow.btc),
            eth: new BigFloat32(vsCurrenciesNow.eth),
            usd: new BigFloat32(vsCurrenciesNow.usd),
            xrp: new BigFloat32(vsCurrenciesNow.xrp)
          }
        });
      });
  };

  trimValuesForDisplay = (value = "1.0") => {
    const index = value.indexOf(".");
    if (index > 0) {
      value = value.substr(0, index + 3);
    }
    return value;
  };

  componentDidMount = () => {
    this.updateTokenActualValue();
  };

  render() {
    const options = [
      { value: "btc", label: "Bitcoin", id: "bitcoin" },
      { value: "eth", label: "Ethereum", id: "ethereum" },
      { value: "xrp", label: "Ripple", id: "ripple" }
    ];

    const amountBought = new BigFloat32(this.state.amountBought);
    const usdValueNow = new BigFloat32(this.state.vsCurrenciesNow.usd);
    const priceBought = new BigFloat32(this.state.priceBought);
    let usdEarnings = amountBought.mul(usdValueNow.sub(priceBought));
    usdEarnings = this.trimValuesForDisplay(usdEarnings.toString());
    const portfolioValue = {
      btc: amountBought.mul(this.state.vsCurrenciesNow.btc).toString(),
      eth: amountBought.mul(this.state.vsCurrenciesNow.eth).toString(),
      xrp: amountBought.mul(this.state.vsCurrenciesNow.xrp).toString()
    };

    for (let key in portfolioValue) {
      if (portfolioValue.hasOwnProperty(key)) {
        portfolioValue[key] = this.trimValuesForDisplay(portfolioValue[key]);
      }
    }

    return (
      <div className="App">
        <section className="investment column">
          <div className="range price-bought">
            <InputRange
              formatLabel={value => `$${value}`}
              maxValue={20000}
              minValue={1}
              value={this.state.priceBought}
              onChange={value => this.setState({ priceBought: value })}
            />
            <input
              max={20000}
              min={1}
              className="input price-input"
              type="number"
              onChange={event =>
                this.setState({ priceBought: Number(event.target.value) })
              }
              value={this.state.priceBought}
            />
          </div>
          <div className="range amount-bought">
            <InputRange
              maxValue={1000}
              minValue={1}
              value={this.state.amountBought}
              onChange={value => this.setState({ amountBought: value })}
            />
            <input
              max={1000}
              min={1}
              className="input amount-input"
              type="number"
              onChange={event =>
                this.setState({ amountBought: Number(event.target.value) })
              }
              value={this.state.amountBought}
            />
          </div>
          <Select
            className="token-select"
            value={this.state.tokenBought}
            onChange={this.handleTokenChange}
            options={options}
          />
        </section>
        <aside className="earnings column">
          <h3 className="heading">earnings:</h3>
          <div className="usd">${usdEarnings.toString()}</div>
          <h3 className="heading">portfolio value in other cryptos:</h3>
          <div className="btc">BTC: {portfolioValue.btc}</div>
          <div className="eth">ETH: {portfolioValue.eth}</div>
          <div className="xrp">XRP: {portfolioValue.xrp}</div>
        </aside>
      </div>
    );
  }
}

export default App;

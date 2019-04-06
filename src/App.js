import axios from "axios";
import { BigFloat32 } from "bigfloat";
import React, { Component } from "react";
import InputRange from "react-input-range";
import Select from "react-select";
import RenderedPortfolio from "./components/RenderedPortfolio";
import "./styles/app/input-range.scss";
import "./styles/app/layout.scss";
import "./styles/app/input-range.scss";
import "./styles/app/input-number.scss";
import "./styles/app/input-select.scss";
import "./styles/app/input-submit.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        amountBought: 1,
        priceBought: 1,
        tokenBought: {
          value: "btc",
          label: "Bitcoin",
          id: "bitcoin"
        },
        usdValueNow: new BigFloat32(1)
      },
      portfolio: [
        // { id: String, label: String, priceBought: BigFloat32, amountBought: BigFloat32, usdValueNow: BigFloat32,
        // optimal: Boolean }
      ]
    };
  }

  handleTokenChange = value => {
    this.setState({ form: { ...this.state.form, tokenBought: value } }, () => {
      this.updateTokenActualValue();
    });
  };

  updateTokenActualValue = () => {
    axios
      .get("/simple/price", {
        params: {
          ids: this.state.form.tokenBought.id,
          vs_currencies: "usd"
        }
      })
      .then(response => {
        const vsCurrenciesNow = response.data[this.state.form.tokenBought.id];
        this.setState({
          form: {
            ...this.state.form,
            usdValueNow: new BigFloat32(vsCurrenciesNow.usd)
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

  handleAddToPortfolio = () => {
    const priceBought = new BigFloat32(this.state.form.priceBought);
    const newInvestment = {
      id: this.state.form.tokenBought.id,
      label: this.state.form.tokenBought.label,
      priceBought,
      amountBought: new BigFloat32(this.state.form.amountBought),
      usdValueNow: this.state.form.usdValueNow,
      optimal: priceBought.cmp(this.state.form.usdValueNow) < 0
    };
    this.setState({ portfolio: [...this.state.portfolio, newInvestment] });
    console.log(newInvestment);
  };

  componentDidMount = () => {
    this.updateTokenActualValue();
  };

  calculateEarnings = () => {
    const { portfolio } = this.state;
    const sum = portfolio.reduce((sum, investment) => {
      console.log(investment);
      return sum.add(
        investment.amountBought.mul(
          investment.usdValueNow.sub(investment.priceBought)
        )
      );
    }, new BigFloat32(0));
    return sum;
  };

  render() {
    // TODO: load tokens from API
    const options = [
      { value: "btc", label: "Bitcoin", id: "bitcoin" },
      { value: "eth", label: "Ethereum", id: "ethereum" },
      { value: "xrp", label: "Ripple", id: "ripple" }
    ];

    const calculatedEarnings = this.trimValuesForDisplay(
      this.calculateEarnings().toString()
    );

    return (
      <div className="App">
        <section className="investment column">
          <h4>price when bought:</h4>
          <div className="range price-bought">
            <InputRange
              formatLabel={value => `$${value}`}
              maxValue={20000}
              minValue={1}
              value={this.state.form.priceBought}
              onChange={value =>
                this.setState({
                  form: { ...this.state.form, priceBought: value }
                })
              }
            />
            <input
              max={20000}
              min={1}
              className="input price-input"
              type="number"
              onChange={event =>
                this.setState({
                  form: {
                    ...this.state.form,
                    priceBought: Number(event.target.value)
                  }
                })
              }
              value={this.state.form.priceBought}
            />
          </div>
          <h4>amount bought:</h4>
          <div className="range amount-bought">
            <InputRange
              maxValue={1000}
              minValue={1}
              value={this.state.form.amountBought}
              onChange={value =>
                this.setState({
                  form: { ...this.state.form, amountBought: value }
                })
              }
            />
            <input
              max={1000}
              min={1}
              className="input amount-input"
              type="number"
              onChange={event =>
                this.setState({
                  form: {
                    ...this.state.form,
                    amountBought: Number(event.target.value)
                  }
                })
              }
              value={this.state.form.amountBought}
            />
          </div>
          <h4>token bought:</h4>
          <Select
            className="token-select-container"
            classNamePrefix="token-select"
            value={this.state.form.tokenBought}
            onChange={this.handleTokenChange}
            options={options}
          />
          <button
            className="add-button"
            type="submit"
            onClick={this.handleAddToPortfolio}
          >
            Add
          </button>
        </section>
        <aside className="earnings column">
          <div className="heading">earnings:</div>
          <h3 className="usd">${calculatedEarnings}</h3>
          <RenderedPortfolio portfolio={this.state.portfolio} />
        </aside>
      </div>
    );
  }
}

export default App;

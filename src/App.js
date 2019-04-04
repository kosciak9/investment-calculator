import React, { Component } from "react";
import NumberSlider from "./components/NumberSlider";

class App extends Component {
  render() {
    return (
      <div className="App">
        <section className="investment column">
          <NumberSlider minValue={1} maxValue={10000} heading={"Amount"} />
          <div className="token form-part">
            token:
            <input type="select" />
          </div>
        </section>
        <aside className="earnings column">
          <h1>earnings:</h1>
          <div className="usd">$1234.56</div>
          <div className="btc">12.56 BTC</div>
          <div className="eth">123.56 ETH</div>
          <div className="xrp">12345.78 XRP</div>
        </aside>
      </div>
    );
  }
}

export default App;

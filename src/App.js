import React, { Component } from "react";

class App extends Component {
  render() {
    return (
      <div className="App">
        <section className="investment column">
          <div className="price form-part">
            <input type="range" />
            price:
            <input type="number" />
          </div>
          <div className="amount form-part">
            <input type="range" />
            amount:
            <input type="number" />
          </div>
          <div className="token form-part">
            token:
            <input type="select" />
          </div>
        </section>
        <aside className="earnings column">
          <h1>earnings:</h1>
          <div class="usd">$1234.56</div>
          <div class="btc">12.56 BTC</div>
          <div class="eth">123.56 ETH</div>
          <div class="xrp">12345.78 XRP</div>
        </aside>
      </div>
    );
  }
}

export default App;

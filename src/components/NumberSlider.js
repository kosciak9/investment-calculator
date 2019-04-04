import React, { Component } from "react";

import "./NumberSlider.css";

class NumberSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.maxValue + props.minValue / 2
    };
  }

  handleInput = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    let { heading, minValue, maxValue } = this.props;
    if (!heading) heading = "NumberSlider";
    if (!minValue) minValue = 1;
    if (!maxValue) maxValue = 100;
    return (
      <div className="number-slider">
        <h2 className="slider-header">{heading}</h2>
        <div className="slider-container">
          <input
            className="slider"
            type="range"
            min-value={minValue}
            max-value={maxValue}
            value={this.state.value}
            onChange={this.handleInput}
          />
          <input
            value={this.state.value}
            onChange={this.handleInput}
            className="number-representation"
            type="number"
          />
        </div>
      </div>
    );
  }
}

export default NumberSlider;

import "normalize.css";
import React from "react";
import ReactDOM from "react-dom";
import Typography from "typography";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./styles/index/general.scss";


const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.666,
  headerFontFamily: ["Oswald"],
  bodyFontFamily: ["Open Sans", "sans-serif"]
  // See below for the full list of options.
});

typography.injectStyles();

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

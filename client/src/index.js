import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./HomePage";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import ReactGA from "react-ga4";

import App from "./App";
import "./index.css";

// Initialize Google Analytics
ReactGA.initialize("G-9VTWKG6EMZ");

// Track the initial page view
ReactGA.send({
  hitType: "pageview",
  page: window.location.pathname + window.location.search,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
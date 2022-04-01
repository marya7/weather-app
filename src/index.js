import React from "react";
import App from "./App";
import * as ReactDOMClient from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "./api/store";

const container = document.getElementById("root");

const root = ReactDOMClient.createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

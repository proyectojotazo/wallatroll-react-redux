import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";

import "./index.css";

import App from "./App";

import storage from "./utils/storage";
import { setAuthorizationHeader } from "./api/client";
import configureStore from "./store";

import "bootstrap/dist/css/bootstrap.min.css";

const accessToken = storage.get("token");
setAuthorizationHeader(accessToken);

const history = createBrowserHistory();

const store = configureStore({ auth: !!accessToken }, { history });

ReactDOM.render(
  <React.StrictMode>
    <App store={store} history={history} />
  </React.StrictMode>,
  document.getElementById("root")
);

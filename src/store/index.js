import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import * as reducers from "./reducers";

import userServices from "../api/userServices";
import adsServices from "../api/adsServices";

const api = { userServices, adsServices };

const rootReducers = combineReducers(reducers);

const configureStore = (preloadedState, { history }) => {
  const middlewares = [thunk.withExtraArgument({ api, history })];

  const store = createStore(
    rootReducers,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  return store;
};
export default configureStore;

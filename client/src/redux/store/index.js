
import thunk from "redux-thunk";
import rootReducer from "../reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { legacy_createStore as createStore, applyMiddleware } from "redux";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)) // middleware
);

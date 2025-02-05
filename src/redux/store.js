import { createStore } from "redux";
import CombineReducers from "./reducers/CombineReducer"

const store = createStore(CombineReducers);

export default store;
import { combineReducers } from "redux";
import userReducer from "./productReducers";
const reducers = combineReducers({
  count: userReducer,
});

export default reducers;
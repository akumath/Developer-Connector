import { combineReducers } from "redux";
import alertReducer from "./reducers/alert";
import authReducer from "./reducers/auth";

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
});

export default rootReducer;

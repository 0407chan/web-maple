import { combineReducers } from "redux";
import counter from "./counter";
import inventory from "./inventory";

const rootReducer = combineReducers({
  counter,
  inventory,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

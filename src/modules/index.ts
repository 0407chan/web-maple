import { combineReducers } from "redux";
import counter from "./counter";
import inventory from "./inventory";
import toolTip from "./toolTip";

const rootReducer = combineReducers({
  counter,
  inventory,
  toolTip,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

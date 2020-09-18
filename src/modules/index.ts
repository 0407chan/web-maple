import { combineReducers } from "redux";
import counter from "./counter";
import inventory from "./inventory";
import toolTip from "./toolTip";
import item from "./item";

const rootReducer = combineReducers({
  counter,
  inventory,
  toolTip,
  item,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

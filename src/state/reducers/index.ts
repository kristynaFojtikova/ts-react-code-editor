import { combineReducers } from "redux";
import cellReducer from "./cell-reducer";

const reducers = combineReducers({
  cells: cellReducer,
});

export type RootCell = ReturnType<typeof reducers>;

export default reducers;

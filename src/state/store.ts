import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { CellActionType } from "./action-types";
import reducers from "./reducers";

export const store = createStore(reducers, {}, applyMiddleware(thunk));

// QUICK MANUAL TEST SUITE

// store.dispatch({
//   type: CellActionType.INSERT_CELL_BEFORE,
//   payload: {
//     id: null,
//     type: "code",
//   },
// });

// console.log("State cell 1", store.getState());

// store.dispatch({
//   type: CellActionType.INSERT_CELL_BEFORE,
//   payload: {
//     id: null,
//     type: "text",
//   },
// });

// console.log("State cell 2", store.getState());
// store.dispatch({
//   type: CellActionType.UPDATE_CELL,
//   payload: {
//     id: store.getState().cells.order[0],
//     content: "Hello content 1",
//   },
// });
// store.dispatch({
//   type: CellActionType.UPDATE_CELL,
//   payload: {
//     id: store.getState().cells.order[1],
//     content: "Hello content 2",
//   },
// });

// console.log("State content", store.getState());

// store.dispatch({
//   type: CellActionType.MOVE_CELL,
//   payload: {
//     id: store.getState().cells.order[1],
//     direction: "up",
//   },
// });

// console.log("State move up", store.getState());

// store.dispatch({
//   type: CellActionType.MOVE_CELL,
//   payload: {
//     id: store.getState().cells.order[0],
//     direction: "down",
//   },
// });

// console.log("State move down", store.getState());

// store.dispatch({
//   type: CellActionType.DELETE_CELL,
//   payload: {
//     id: store.getState().cells.order[1],
//   },
// });

// console.log("State delete", store.getState());

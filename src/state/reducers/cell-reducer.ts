import produce from "immer";
import randomId from "../../util/randomId";
import { CellActionType } from "../action-types";
import { CellAction } from "../actions";
import Cell from "../Cell";

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const cellReducer = produce(
  (state: CellState = initialState, action: CellAction): CellState => {
    switch (action.type) {
      case CellActionType.UPDATE_CELL:
        const { id: updateId, content } = action.payload;
        state.data[updateId].content = content;
        return state;
      case CellActionType.DELETE_CELL:
        const { id: deleteId } = action.payload;
        delete state.data[deleteId];
        state.order = state.order.filter((id) => id !== deleteId);
        return state;
      case CellActionType.MOVE_CELL:
        const { id: moveId, direction } = action.payload;
        const moveIndex = state.order.findIndex((id) => id === moveId);
        const targetIndex =
          direction === "down" ? moveIndex + 1 : moveIndex - 1;
        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return state;
        }
        state.order[moveIndex] = state.order[targetIndex];
        state.order[targetIndex] = moveId;
        return state;
      case CellActionType.INSERT_CELL_BEFORE:
        const cell: Cell = {
          type: action.payload.type,
          id: randomId(),
          content: "",
        };
        state.data[cell.id] = cell;
        const foundIndex = state.order.findIndex(
          (id) => id === action.payload.id
        );
        if (foundIndex < 0) {
          state.order.push(cell.id);
        } else {
          state.order.splice(foundIndex, 0, cell.id);
        }
        return state;
      default:
        return state;
    }
  }
);

export default cellReducer;

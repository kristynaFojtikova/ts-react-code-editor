import { CellActionType } from "../action-types";
import {
  DeleteCellAction,
  InsertCellBeforeAction,
  MoveCellAction,
  UpdateCellAction,
  Direction,
} from "../actions";
import { CellType } from "../Cell";

export const updateCell = (id: string, content: string): UpdateCellAction => ({
  type: CellActionType.UPDATE_CELL,
  payload: { id, content },
});
export const insertCellBefore = (
  id: string,
  type: CellType
): InsertCellBeforeAction => ({
  type: CellActionType.INSERT_CELL_BEFORE,
  payload: {
    id,
    type,
  },
});

export const deleteCell = (id: string): DeleteCellAction => ({
  type: CellActionType.DELETE_CELL,
  payload: {
    id,
  },
});
export const moveCell = (id: string, direction: Direction): MoveCellAction => ({
  type: CellActionType.MOVE_CELL,
  payload: {
    id,
    direction,
  },
});

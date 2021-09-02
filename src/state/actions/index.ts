import { CellActionType } from "../action-types";
import { CellType } from "../Cell";

export type Direction = "up" | "down";

export interface MoveCellAction {
  type: CellActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface DeleteCellAction {
  type: CellActionType.DELETE_CELL;
  payload: {
    id: string;
  };
}

export interface UpdateCellAction {
  type: CellActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface InsertCellBeforeAction {
  type: CellActionType.INSERT_CELL_BEFORE;
  payload: {
    id: string | null;
    type: CellType;
  };
}

export type CellAction =
  | MoveCellAction
  | DeleteCellAction
  | UpdateCellAction
  | InsertCellBeforeAction;

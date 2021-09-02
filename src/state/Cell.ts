export type CellType = "code" | "text";

interface Cell {
  id: string;
  type: CellType;
  content: string;
}

export default Cell;

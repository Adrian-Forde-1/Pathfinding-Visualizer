export class UnweightedNode {
  constructor(
    isStart = false,
    isTarget = false,
    isWall = false,
    visited = false,
    parentNodeLocation = [],
    row,
    col
  ) {
    this.isStart = isStart;
    this.isTarget = isTarget;
    this.isWall = isWall;
    this.visited = visited;
    this.parentNodeLocation = parentNodeLocation;
    this.row = row;
    this.col = col;
  }
}

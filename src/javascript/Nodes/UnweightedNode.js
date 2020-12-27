export class UnweightedNode {
  isWall = false;
  isStart = false;
  isTarget = false;
  visited = false;
  parentNodeLocation = [];

  constructor(
    isStart = false,
    isTarget = false,
    isWall = false,
    visited = false,
    parentNodeLocation = []
  ) {
    this.isStart = isStart;
    this.isTarget = isTarget;
    this.isWall = isWall;
    this.visited = visited;
    this.parentNodeLocation = parentNodeLocation;
  }
}

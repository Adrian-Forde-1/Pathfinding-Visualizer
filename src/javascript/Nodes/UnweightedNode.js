export class UnweightedNode {
  constructor(
    isStart = false,
    isTarget = false,
    isWall = false,
    visited = false,
    parentNodeLocation = [],
    location
  ) {
    this.isStart = isStart;
    this.isTarget = isTarget;
    this.isWall = isWall;
    this.visited = visited;
    this.parentNodeLocation = parentNodeLocation;
    this.location = location;
  }

  getLocation = () => {
    return this.location;
  };
}

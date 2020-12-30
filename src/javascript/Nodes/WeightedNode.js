export class WeightedNode {
  isWall = false;
  isStart = false;
  isTarget = false;
  visited = false;
  distance = 9999999999;
  parentNodeLocation = [];

  constructor(
    isStart = false,
    isTarget = false,
    isWall = false,
    visited = false,
    parentNodeLocation = [],
    distance = 9999999999,
    location = []
  ) {
    this.isStart = isStart;
    this.isTarget = isTarget;
    this.isWall = isWall;
    this.visited = visited;
    this.parentNodeLocation = parentNodeLocation;
    this.distance = distance;
    this.location = location;
  }

  getLocation = () => {
    return this.location;
  };
}

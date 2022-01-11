class PathfindingAlgorithm {
  visitedArray = [];
  backTrackArray = [];

  targetNodeLocation = null;
  startNodeLocation = null;
  currentNodeLocation = null;
  endNodeLocation = null;
  grid = null;
  gridObj = null;

  stopVisualization = false;

  constructor(gridObj) {
    this.gridObj = gridObj;
    this.startNodeLocation = gridObj.getStartNodeLocation();
    this.currentNodeLocation = gridObj.getStartNodeLocation();
    this.targetNodeLocation = gridObj.getTargetNodeLocation();
    this.grid = gridObj.getGrid();
  }
}

export default PathfindingAlgorithm;

import { UnweightedNode } from "../Nodes/UnweightedNode.js";
import { compareArray } from "../helpers/util.js";

export class Grid {
  constructor(rows, cols, startNodeLocation, targetNodeLocation = []) {
    this.rows = rows;
    this.cols = cols;
    this.startNodeLocation = startNodeLocation;
    this.targetNodeLocation = targetNodeLocation;
    this.grid = [];
  }

  getRows = () => {
    return this.rows;
  };

  getCols = () => {
    return this.cols;
  };

  getGrid = () => {
    return this.grid;
  };

  getStartNodeLocation = () => {
    return this.startNodeLocation;
  };

  getTargetNodeLocation = () => {
    return this.targetNodeLocation;
  };

  setStartNodeLocation = (startNodeLocation) => {
    this.startNodeLocation = startNodeLocation;
  };

  setTargetNodeLocation = (targetNodeLocation) => {
    this.targetNodeLocation = targetNodeLocation;
  };

  createGrid = () => {
    for (let i = 0; i < this.rows; i++) {
      var row = [];
      for (let x = 0; x < this.cols; x++) {
        if (compareArray(this.startNodeLocation, new Array(i, x)))
          row.push(new UnweightedNode(true));
        else if (compareArray(this.targetNodeLocation, new Array(i, x)))
          row.push(new UnweightedNode(false, true));
        else row.push(new UnweightedNode());
      }
      this.grid.push(row);
    }
    // grid[START_NODE_LOCATION[0]][START_NODE_LOCATION[1]]["isStart"] = true;
    // grid[TARGET_NODE_LOCATION[0]][TARGET_NODE_LOCATION[1]]["isTarget"] = true;
  };

  adjacentEdges = (locations) => {
    var adjacentEdgesLocations = [];
    adjacentEdgesLocations.push([locations[0] - 1, locations[1]]);
    adjacentEdgesLocations.push([locations[0] + 1, locations[1]]);
    adjacentEdgesLocations.push([locations[0], locations[1] - 1]);
    adjacentEdgesLocations.push([locations[0], locations[1] + 1]);

    return adjacentEdgesLocations;
  };
}

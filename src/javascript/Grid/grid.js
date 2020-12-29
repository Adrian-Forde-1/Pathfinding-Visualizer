import { UnweightedNode } from "../Nodes/UnweightedNode.js";
import { WeightedNode } from "../Nodes/WeightedNode.js";
import { compareArray } from "../helpers/util.js";

export class Grid {
  constructor(rows, cols, startNodeLocation, targetNodeLocation = []) {
    this.rows = rows;
    this.cols = cols;
    this.startNodeLocation = startNodeLocation;
    this.targetNodeLocation = targetNodeLocation;
    this.grid = [];
    this.initialGrid = [];
    this.nodes = [];
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

  getNodes = () => {
    return this.nodes;
  };

  setStartNodeLocation = (startNodeLocation) => {
    this.startNodeLocation = startNodeLocation;
  };

  setTargetNodeLocation = (targetNodeLocation) => {
    this.targetNodeLocation = targetNodeLocation;
  };

  changeNodeType = (nodeType) => {
    console.log(nodeType);
    for (let i = 0; i < this.rows; i++) {
      for (let x = 0; x < this.cols; x++) {
        if (nodeType === "Unweighted") {
          if (compareArray(this.startNodeLocation, new Array(i, x)))
            this.grid[i][x] = new UnweightedNode(
              true,
              false,
              false,
              false,
              [],
              i,
              x
            );
          else if (compareArray(this.targetNodeLocation, new Array(i, x)))
            this.grid[i][x] = new UnweightedNode(
              false,
              true,
              false,
              false,
              [],
              i,
              x
            );
          else
            this.grid[i][x] = new UnweightedNode(
              false,
              false,
              false,
              false,
              [],
              i,
              x
            );
        } else if (nodeType === "Weighted") {
          if (compareArray(this.startNodeLocation, new Array(i, x)))
            this.grid[i][x] = new WeightedNode(
              true,
              false,
              false,
              false,
              [],
              i,
              x
            );
          else if (compareArray(this.targetNodeLocation, new Array(i, x)))
            this.grid[i][x] = new WeightedNode(
              false,
              true,
              false,
              false,
              [],
              i,
              x
            );
          else
            this.grid[i][x] = new WeightedNode(
              false,
              false,
              false,
              false,
              [],
              i,
              x
            );
        }
      }
    }
  };

  createGrid = (nodeType) => {
    for (let i = 0; i < this.rows; i++) {
      var row = [];
      var initialGridRow = [];
      for (let x = 0; x < this.cols; x++) {
        if (nodeType === "Unweighted") {
          if (compareArray(this.startNodeLocation, new Array(i, x)))
            row.push(new UnweightedNode(true, false, false, false, [], i, x));
          else if (compareArray(this.targetNodeLocation, new Array(i, x)))
            row.push(new UnweightedNode(false, true, false, false, [], i, x));
          else
            row.push(new UnweightedNode(false, false, false, false, [], i, x));

          initialGridRow.push(new UnweightedNode());
          this.nodes.push(new UnweightedNode());
        } else if (nodeType === "Weighted") {
          if (compareArray(this.startNodeLocation, new Array(i, x)))
            row.push(new Weighted(true, false, false, false, [], i, x));
          else if (compareArray(this.targetNodeLocation, new Array(i, x)))
            row.push(new Weighted(false, true, false, false, [], i, x));
          else row.push(new Weighted(false, false, false, false, [], i, x));

          initialGridRow.push(new Weighted());
          this.nodes.push(new Weighted());
        }
      }
      this.grid.push(row);
      this.initialGrid.push(initialGridRow);
    }
    // grid[START_NODE_LOCATION[0]][START_NODE_LOCATION[1]]["isStart"] = true;
    // grid[TARGET_NODE_LOCATION[0]][TARGET_NODE_LOCATION[1]]["isTarget"] = true;
  };

  clearVisited = () => {
    for (let i = 0; i < this.grid.length; i++) {
      for (let x = 0; x < this.grid[i].length; x++)
        this.grid[i][x]["visited"] = false;
    }
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

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
    this.wallLocations = [];
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

  getWallLocations = () => {
    return this.wallLocations;
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

  setWallLocations = (wallLocations) => {
    this.wallLocations = wallLocations;
  };

  changeNodeType = (nodeType) => {
    this.nodes = [];
    for (let i = 0; i < this.rows; i++) {
      for (let x = 0; x < this.cols; x++) {
        let foundWall = this.wallLocations.findIndex((location) =>
          compareArray(location, new Array(x, i))
        );
        let isWall = false;
        if (foundWall > -1) isWall = true;

        if (nodeType === "Unweighted") {
          if (compareArray(this.startNodeLocation, new Array(i, x))) {
            let node = new UnweightedNode(
              true,
              false,
              isWall,
              false,
              [],
              new Array(i, x)
            );
            this.grid[i][x] = node;
            this.nodes.push(node);
          } else if (compareArray(this.targetNodeLocation, new Array(i, x))) {
            let node = new UnweightedNode(
              false,
              true,
              isWall,
              false,
              [],
              new Array(i, x)
            );
            this.grid[i][x] = node;
            this.nodes.push(node);
          } else {
            let node = new UnweightedNode(
              false,
              false,
              isWall,
              false,
              [],
              new Array(i, x)
            );
            this.grid[i][x] = node;
            this.nodes.push(node);
          }
        } else if (nodeType === "Weighted") {
          if (compareArray(this.startNodeLocation, new Array(i, x))) {
            let node = new WeightedNode(
              true,
              false,
              isWall,
              false,
              [],
              9999999999,
              new Array(i, x)
            );
            this.grid[i][x] = node;
            this.nodes.push(node);
          } else if (compareArray(this.targetNodeLocation, new Array(i, x))) {
            let node = new WeightedNode(
              false,
              true,
              isWall,
              false,
              [],
              9999999999,
              new Array(i, x)
            );
            this.grid[i][x] = node;
            this.nodes.push(node);
          } else {
            let node = new WeightedNode(
              false,
              false,
              isWall,
              false,
              [],
              9999999999,
              new Array(i, x)
            );
            this.grid[i][x] = node;
            this.nodes.push(node);
          }
        }
      }
    }
  };

  createGrid = (nodeType) => {
    for (let i = 0; i < this.rows; i++) {
      var row = [];
      var initialGridRow = [];
      for (let x = 0; x < this.cols; x++) {
        let foundWall = this.wallLocations.findIndex((location) =>
          compareArray(location, new Array(x, i))
        );
        let isWall = false;
        if (foundWall > -1) isWall = true;

        if (nodeType === "Unweighted") {
          if (compareArray(this.startNodeLocation, new Array(i, x))) {
            let node = new UnweightedNode(
              true,
              false,
              isWall,
              false,
              [],
              new Array(i, x)
            );
            row.push(node);
            this.nodes.push(node);
          } else if (compareArray(this.targetNodeLocation, new Array(i, x))) {
            let node = new UnweightedNode(
              false,
              true,
              isWall,
              false,
              [],
              new Array(i, x)
            );
            row.push(node);
            this.nodes.push(node);
          } else {
            let node = new UnweightedNode(
              false,
              false,
              isWall,
              false,
              [],
              new Array(i, x)
            );
            row.push(node);
            this.nodes.push(node);
          }

          initialGridRow.push(new UnweightedNode());
        } else if (nodeType === "Weighted") {
          if (compareArray(this.startNodeLocation, new Array(i, x))) {
            let node = new Weighted(
              true,
              false,
              isWall,
              false,
              [],
              9999999999,
              new Array(i, x)
            );
            row.push();
            this.nodes.push(node);
          } else if (compareArray(this.targetNodeLocation, new Array(i, x))) {
            let node = new Weighted(
              false,
              true,
              isWall,
              false,
              [],
              9999999999,
              new Array(i, x)
            );
            row.push();
            this.nodes.push(node);
          } else {
            let node = new Weighted(
              false,
              false,
              isWall,
              false,
              [],
              9999999999,
              new Array(i, x)
            );
            row.push();
            this.nodes.push(node);
          }

          initialGridRow.push(new Weighted());
        }
      }
      this.grid.push(row);
      this.initialGrid.push(initialGridRow);
    }
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

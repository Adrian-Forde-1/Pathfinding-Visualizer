import { pathfindingAlgorithmBackTrack } from "../javascript/helpers/pathfindingHelpers.js";
import { compareArray } from "../javascript/helpers/util.js";

class DepthFirstSearch {
  visitedArray = [];
  DFSBackTrackArray = [];

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

  visualize() {
    this.gridObj.clearVisited();

    if (!this.gridObj.getNodeAtPosition(this.startNodeLocation)["isTarget"]) {
      return this.visualizationHelper();
    }
  }

  visualizationHelper() {
    if (
      !compareArray(this.targetNodeLocation, this.currentNodeLocation) ||
      (!this.stopVisualization && !compareArray(this.targetNodeLocation, this.currentNodeLocation))
    ) {
      // Get node using row and column and set visited to true
      this.gridObj.getNodeAtPosition(this.currentNodeLocation)["visited"] = true;
      // Add node to visited array
      this.visitedArray.push(this.currentNodeLocation);

      // Get adjacent edges of node
      let edges = this.gridObj.adjacentEdges(this.currentNodeLocation);

      // Check if all adjacent edges are visited
      if (this.gridObj.allEdgesVisited(edges)) this.backtrack();
      else {
        edges.forEach((edge) => {
          if (this.gridObj.isEdgeInGrid(edge) && !this.stopVisualization) {
            if (!this.gridObj.getNodeAtPosition(edge)["visited"]) {
              // Set visited to true so that this node will not be visited more than once
              this.gridObj.getNodeAtPosition(edge)["parentNodeLocation"] = this.currentNodeLocation;

              // If edge is end node
              if (compareArray(this.targetNodeLocation, edge)) {
                this.visitedArray.push(edge);
                this.endNodeLocation = edge;
                this.stopVisualization = true;
              }

              if (!this.gridObj.getNodeAtPosition(edge)["isWall"]) {
                this.currentNodeLocation = edge;
                return this.visualizationHelper();
              }
            }
          }
        });
      }
    }

    return {
      visitedArray: this.visitedArray,
      backTrackArray: pathfindingAlgorithmBackTrack(
        this.currentNodeLocation,
        this.startNodeLocation,
        this.grid
      ),
    };
  }

  backtrack() {
    if (
      this.gridObj.isEdgeInGrid(this.currentNodeLocation) &&
      this.gridObj.getNodeAtPosition(this.currentNodeLocation)["parentNodeLocation"].length > 0
    ) {
      let edgesOfParent = this.gridObj.adjacentEdges(
        this.gridObj.getNodeAtPosition(this.currentNodeLocation)["parentNodeLocation"]
      );

      if (
        this.gridObj.allEdgesVisited(edgesOfParent) &&
        compareArray(this.currentNodeLocation, this.startNodeLocation)
      ) {
        this.stopVisualization = true;
        return this.visualizationHelper();
      } else if (this.gridObj.allEdgesVisited(edgesOfParent)) {
        this.currentNodeLocation = this.gridObj.getNodeAtPosition(this.currentNodeLocation)[
          "parentNodeLocation"
        ];
        this.backtrack();
      } else {
        this.currentNodeLocation = this.gridObj.getNodeAtPosition(this.currentNodeLocation)[
          "parentNodeLocation"
        ];
        this.visualizationHelper();
      }
    }
  }
}

export default DepthFirstSearch;

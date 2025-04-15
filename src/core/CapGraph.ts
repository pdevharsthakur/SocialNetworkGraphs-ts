/**
 * @file CapGraph.ts
 * @description Implementation of the Graph interface that represents a social network.
 *
 * This class provides core functionality for social network analysis including:
 * - Building and maintaining the graph structure
 * - Finding strongly connected components (SCCs)
 * - Identifying trend setters in the network
 * - Simulating viral content sharing through the network
 * - Analyzing egonets (personal networks) of individual nodes
 *
 * The implementation uses adjacency lists for efficient graph operations and supports
 * various graph algorithms for community detection and influence analysis. This is the
 * central component of the social network analysis system.
 */
import { Graph, Node } from '../interfaces/interfaces.js';
import { CapNode } from './CapNode.js';
import { TrendSetterComparator } from '../algorithms/TrendSetterComparator.js';
import { OutputFormatter } from '../utils/OutputFormatter.js';

export class CapGraph implements Graph {
  private listMap: Map<number, CapNode>;
  private vertices: Set<number> | null = null;

  constructor(node?: number) {
    this.listMap = new Map<number, CapNode>();

    if (node !== undefined) {
      this.addVertex(node);
    }
  }

  getVertex(num: number): CapNode {
    const vertex = this.listMap.get(num);
    if (!vertex) {
      throw new Error(`Vertex ${num} not found`);
    }
    return vertex;
  }

  getVertexIDs(): Set<number> {
    return new Set(this.listMap.keys());
  }

  addVertex(num: number): void {
    this.listMap.set(num, new CapNode(num));
  }

  private addVertices(subGraph: CapGraph, nodes: Set<number>): void {
    nodes.forEach(nodeID => {
      if (!subGraph.getVertexIDs().has(nodeID)) {
        subGraph.addVertex(nodeID);
        const origiNode = this.getVertex(nodeID);
        const newNode = subGraph.getVertex(nodeID);

        origiNode.getNeighbors().forEach(neighbor => {
          newNode.addNeighbor(neighbor);
        });
      }
    });
  }

  addEdge(from: number, to: number): void {
    const fromNode = this.getVertex(from);
    fromNode.addNeighbor(to);

    const toNode = this.getVertex(to);
    toNode.addFollower(from);
  }

  removeEdge(from: number, to: number): void {
    const fromNode = this.getVertex(from);
    fromNode.removeNeighbor(to);
  }

  getEgonet(center: number): Graph {
    const centerNode = this.getVertex(center);
    const egoNodes: number[] = [...centerNode.getNeighbors(), center];
    const egonet = new CapGraph();

    // Add nodes
    egoNodes.forEach(n => {
      egonet.addVertex(n);
    });

    // Add edges
    egonet.getVertexIDs().forEach(n => {
      const egoNode = egonet.getVertex(n);
      const origiNode = this.getVertex(n);
      const origiNeighbors = origiNode.getNeighbors();

      origiNeighbors.forEach(neighbor => {
        if (egoNodes.includes(neighbor)) {
          egoNode.addNeighbor(neighbor);
        }
      });
    });

    return egonet;
  }

  getSCCs(): Graph[] {
    const sccNodeIDs: number[] = [];
    this.vertices = this.getVertexIDs();

    const vertexStack: number[] = Array.from(this.vertices);
    let finished = this.dfs(this, vertexStack, sccNodeIDs);

    const transposedGraph = this.transpose(this);
    sccNodeIDs.length = 0;
    const graphList = this.dfsGraphList(transposedGraph, finished, sccNodeIDs);

    return graphList;
  }

  dfs(graph: CapGraph, vertices: number[], sccNodeIDs: number[]): number[] {
    const visited = new Set<number>();
    const finished: number[] = [];

    while (vertices.length > 0) {
      const v = vertices.pop()!;
      if (!visited.has(v)) {
        this.dfsVisit(graph, v, visited, finished, sccNodeIDs);
      }
    }
    return finished;
  }

  dfsGraphList(graph: CapGraph, vertices: number[], sccNodeIDs: number[]): Graph[] {
    const visited = new Set<number>();
    const finished: number[] = [];
    let scc: CapGraph;
    const sccList: Graph[] = [];

    while (vertices.length > 0) {
      const v = vertices.pop()!;

      if (!visited.has(v)) {
        sccNodeIDs = this.dfsVisit(graph, v, visited, finished, sccNodeIDs);
        // Remove all node IDs to get it working
        vertices = vertices.filter(id => !sccNodeIDs.includes(id));
      }

      scc = new CapGraph(v);

      // Build the nodes of the new graph
      sccNodeIDs.forEach(nodeID => {
        scc.addVertex(nodeID);
        const origiNode = this.getVertex(nodeID);
        const sccNode = scc.getVertex(nodeID);

        origiNode.getNeighbors().forEach(n => {
          sccNode.addNeighbor(n);
        });
      });

      sccList.push(scc);
      sccNodeIDs.length = 0;
    }
    return sccList;
  }

  dfsVisit(
    graph: CapGraph,
    v: number,
    visited: Set<number>,
    finished: number[],
    sccNodeIDs: number[]
  ): number[] {
    visited.add(v);
    const vNode = graph.getVertex(v);
    const neighbors = vNode.getNeighbors();

    neighbors.forEach(n => {
      if (!visited.has(n)) {
        this.dfsVisit(graph, n, visited, finished, sccNodeIDs);
      }
    });

    finished.unshift(v);
    sccNodeIDs.push(v);
    return sccNodeIDs;
  }

  transpose(graph: CapGraph): CapGraph {
    const vertices = graph.getVertexIDs();
    const transposedGraph = new CapGraph();

    // Access each node
    vertices.forEach(v => {
      const origiNode = graph.getVertex(v);

      if (!transposedGraph.getVertexIDs().has(v)) {
        transposedGraph.addVertex(v);
      }

      const neighbors = origiNode.getNeighbors();

      neighbors.forEach(neighbor => {
        if (!transposedGraph.getVertexIDs().has(neighbor)) {
          transposedGraph.addVertex(neighbor);
        }
        const transposedNeighbor = transposedGraph.getVertex(neighbor);
        transposedNeighbor.addNeighbor(v);
      });
    });

    return transposedGraph;
  }

  identifyTrendSetters(): void {
    const SCCList = this.getSCCList();

    SCCList.forEach(scc => {
      const graphSize = scc.getVertexIDs().size;
      if (graphSize > 2) {
        // Assume top 10% in graph, rounded up, are trend setters
        const percentOfTrendSetters = 0.1;
        const numTrendSetters = this.calculatePercent(graphSize, percentOfTrendSetters);

        const comparator = new TrendSetterComparator();
        const followersQueue = this.buildNodeQueue(graphSize, scc, comparator);

        for (let i = 0; i < numTrendSetters; i++) {
          const trendyNode = followersQueue.shift();
          if (trendyNode) {
            trendyNode.setIsTrendSetter(true);
          }
        }
      }
    });
  }

  private buildNodeQueue(
    pqSize: number,
    graph: CapGraph,
    comparator: TrendSetterComparator
  ): CapNode[] {
    const nodeQueue: CapNode[] = [];

    // Add scc nodes to the numFollowerQueue
    graph.getVertexIDs().forEach(nodeID => {
      const node = this.getVertex(nodeID);
      nodeQueue.push(node);
    });

    // Sort the queue using the comparator
    nodeQueue.sort((a, b) => -comparator.compare(a, b)); // Reverse order for highest first

    return nodeQueue;
  }

  private calculatePercent(number: number, percentage: number): number {
    return Math.ceil(number * percentage);
  }

  private getSCCList(): CapGraph[] {
    const SCCList: CapGraph[] = [];
    this.getSCCs().forEach(graph => {
      const capgraph = graph as CapGraph;
      SCCList.push(capgraph);
    });
    return SCCList;
  }

  private shareVideo(nodeID: number, toVisit: number[], alreadyViewed: Set<number>): void {
    const node = this.getVertex(nodeID);
    if (!alreadyViewed.has(nodeID)) {
      alreadyViewed.add(nodeID);
    }

    const nodeFollowers = node.getFollowers();
    const numNodeFollowers = nodeFollowers.length;

    if (node.getIsTrendSetter()) {
      let followersExposed = 0;

      // First loop for trend setters
      // Determines if they should share
      for (const followerID of nodeFollowers) {
        const percent = 0.2;
        const maxFollowerViews = this.calculatePercent(numNodeFollowers, percent);

        if (alreadyViewed.has(followerID)) {
          followersExposed++;

          if (followersExposed > maxFollowerViews) {
            return;
          }
        }
      }
    }

    nodeFollowers.forEach(followerID => {
      if (!toVisit.includes(followerID)) {
        toVisit.push(followerID);
      }
      alreadyViewed.add(followerID);
    });
  }

  startViralSharing(startingNodeID: number): void {
    const toVisit: number[] = [];
    const visited = new Set<number>();
    const alreadyViewed = new Set<number>();

    // Add starting node
    alreadyViewed.add(startingNodeID);
    const startingNode = this.getVertex(startingNodeID);

    toVisit.push(startingNodeID);
    startingNode.getFollowers().forEach(f => toVisit.push(f));

    let n = 1;
    let currentGraphLength = 0;
    let previousGraphLength = 0;
    const subGraph = new CapGraph();

    while (toVisit.length > 0) {
      const nodeID = toVisit.shift()!;
      if (!visited.has(nodeID)) {
        this.shareVideo(nodeID, toVisit, alreadyViewed);
        visited.add(nodeID);
      }

      this.addVertices(subGraph, visited);
      currentGraphLength = subGraph.getVertexIDs().size;

      if (this.shouldContinueGenerating(n, 10, previousGraphLength, currentGraphLength)) {
        previousGraphLength = currentGraphLength;
        OutputFormatter.viralSimulationGeneration(n, Array.from(subGraph.getVertexIDs()));
        n++;
      }
    }
  }

  private shouldContinueGenerating(
    generationNum: number,
    maxGenerationNum: number,
    previousLength: number,
    currentLength: number
  ): boolean {
    return generationNum <= maxGenerationNum && previousLength !== currentLength;
  }

  private buildSubGraph(startingNodeID: number, nodes: Set<number>): CapGraph {
    const subGraph = new CapGraph(startingNodeID);

    nodes.forEach(nodeID => {
      subGraph.addVertex(nodeID);
      const origiNode = this.getVertex(nodeID);
      const newNode = subGraph.getVertex(nodeID);

      origiNode.getNeighbors().forEach(neighbor => {
        newNode.addNeighbor(neighbor);
      });
    });

    return subGraph;
  }

  startViralSharingWithLimit(startingNodeID: number, maxDepth: number = 3): void {
    const toVisit: Array<{ node: number; depth: number }> = [];
    const visited = new Set<number>();
    const alreadyViewed = new Set<number>();

    // Add starting node
    alreadyViewed.add(startingNodeID);
    const startingNode = this.getVertex(startingNodeID);

    toVisit.push({ node: startingNodeID, depth: 0 });
    startingNode.getFollowers().forEach(f => toVisit.push({ node: f, depth: 1 }));

    let n = 1;
    let currentGraphLength = 0;
    let previousGraphLength = 0;
    const subGraph = new CapGraph();

    console.log(`Starting viral sharing from node ${startingNodeID} with max depth ${maxDepth}`);

    while (toVisit.length > 0) {
      const next = toVisit.shift()!;
      const nodeID = next.node;
      const depth = next.depth;

      // Skip if we've reached max depth
      if (depth > maxDepth) continue;

      if (!visited.has(nodeID)) {
        // For large graphs, limit the detailed output
        if (visited.size % 1000 === 0) {
          console.log(`Processed ${visited.size} nodes, queue size: ${toVisit.length}`);
        }

        // Modified to include depth in viral sharing
        this.shareVideoWithDepth(nodeID, toVisit, alreadyViewed, depth);
        visited.add(nodeID);
      }

      this.addVertices(subGraph, visited);
      currentGraphLength = subGraph.getVertexIDs().size;

      if (this.shouldContinueGenerating(n, 10, previousGraphLength, currentGraphLength)) {
        previousGraphLength = currentGraphLength;

        // For large graphs, don't print the full export
        console.log(`Generation ${n}: ${currentGraphLength} nodes affected`);
        n++;
      }

      // Safety valve for very large graphs
      if (visited.size > 100000) {
        console.log('Reached maximum processing limit, stopping simulation');
        break;
      }
    }

    console.log(`Viral sharing complete. ${visited.size} nodes visited.`);
  }

  private shareVideoWithDepth(
    nodeID: number,
    toVisit: Array<{ node: number; depth: number }>,
    alreadyViewed: Set<number>,
    currentDepth: number
  ): void {
    const node = this.getVertex(nodeID);
    if (!alreadyViewed.has(nodeID)) {
      alreadyViewed.add(nodeID);
    }

    const nodeFollowers = node.getFollowers();
    const numNodeFollowers = nodeFollowers.length;

    if (node.getIsTrendSetter()) {
      let followersExposed = 0;
      for (const followerID of nodeFollowers) {
        const percent = 0.2;
        const maxFollowerViews = this.calculatePercent(numNodeFollowers, percent);

        if (alreadyViewed.has(followerID)) {
          followersExposed++;
          if (followersExposed > maxFollowerViews) {
            return;
          }
        }
      }
    }

    nodeFollowers.forEach(followerID => {
      if (!toVisit.some(item => item.node === followerID)) {
        toVisit.push({ node: followerID, depth: currentDepth + 1 });
      }
      alreadyViewed.add(followerID);
    });
  }

  exportGraph(): Map<number, Set<number>> {
    const graphRepresentation = new Map<number, Set<number>>();

    this.listMap.forEach((node, num) => {
      const neighbors = new Set<number>();
      node.getNeighbors().forEach(n => neighbors.add(n));
      graphRepresentation.set(num, neighbors);
    });

    return graphRepresentation;
  }
}

/**
 * @file index.ts
 * @description Main entry point for the Social Network Graph Analysis application.
 *
 * This file serves as the primary execution script for the application, responsible for:
 * - Processing command-line arguments for data files and parameters
 * - Loading and initializing the social network graph from data files
 * - Executing the core analysis algorithms on the loaded graph
 * - Performing trend setter identification
 * - Finding strongly connected components in the network
 * - Simulating viral content sharing through the network
 * - Displaying analysis results to the user
 *
 * The implementation demonstrates practical applications of graph theory concepts
 * to social network analysis, showing how algorithms can identify influential users
 * and communities within a social network structure.
 */
import { CapGraph } from './core/CapGraph.js';
import { GraphLoader } from './loaders/GraphLoader.js';
import { OutputFormatter } from './utils/OutputFormatter.js';
import fs from 'fs';
import path from 'path';

async function main() {
  /** Process command line arguments */
  const args = process.argv.slice(2);
  let dataFile = 'data/small_test_graph.txt';
  let startNode = 2;

  if (args.length > 0) {
    dataFile = args[0];
  }

  if (args.length > 1) {
    startNode = parseInt(args[1], 10);
  }

  // Display initial information
  OutputFormatter.graphLoading(dataFile, startNode);

  try {
    /** Check if the file exists */
    if (!fs.existsSync(dataFile)) {
      OutputFormatter.error(`File ${dataFile} does not exist`);
      const files = listDataFiles();
      OutputFormatter.availableDataFiles(files);
      return;
    }

    /** Create and load the graph */
    const graph = new CapGraph();
    await GraphLoader.loadGraph(graph, dataFile);

    // Estimate edge count based on known graph data
    const edgeCount = await estimateEdgeCount(dataFile);
    OutputFormatter.graphLoadingComplete(graph.getVertexIDs().size, edgeCount);

    /** Perform influence analysis */
    OutputFormatter.influenceAnalysisHeader();
    graph.identifyTrendSetters();

    /** Display trend setters */
    let trendSetterCount = 0;
    graph.getVertexIDs().forEach(nodeID => {
      const node = graph.getVertex(nodeID);
      if (node.getIsTrendSetter()) {
        trendSetterCount++;
        /** Limit output to avoid flooding console */
        if (trendSetterCount <= 10) {
          OutputFormatter.trendSetter(nodeID, node.getFollowers().length);
        }
      }
    });
    OutputFormatter.trendSetterTotal(trendSetterCount);

    /** Find SCCs */
    OutputFormatter.communityDetectionHeader();
    const sccs = graph.getSCCs();
    OutputFormatter.sccResult(sccs.length);

    /** Display first few SCCs */
    const maxSccsToShow = 3;
    for (let i = 0; i < Math.min(maxSccsToShow, sccs.length); i++) {
      const scc = sccs[i];
      OutputFormatter.sccDetail(i + 1, (scc as CapGraph).getVertexIDs().size);
    }

    /** Viral sharing simulation */
    OutputFormatter.viralSimulationHeader(startNode);
    if (graph.getVertexIDs().has(startNode)) {
      graph.startViralSharing(startNode);
    } else {
      OutputFormatter.error(`Node ${startNode} not found in graph. Skipping viral simulation.`);
    }

    /** Display analysis summary */
    OutputFormatter.analysisSummary({
      nodes: graph.getVertexIDs().size,
      edges: edgeCount,
      trendSetters: trendSetterCount,
      communities: sccs.length,
      startNode: startNode,
    });
  } catch (error) {
    OutputFormatter.error((error as Error).message);
  }
}

function listDataFiles(): string[] {
  const dataDir = 'data';
  const files: string[] = [];
  try {
    const dirFiles = fs.readdirSync(dataDir);
    dirFiles.forEach(file => {
      if (fs.statSync(path.join(dataDir, file)).isFile()) {
        files.push(path.join(dataDir, file));
      }
    });
    return files;
  } catch (error) {
    OutputFormatter.error(`Error listing data files: ${(error as Error).message}`);
    return [];
  }
}

/**
 * Estimates the number of edges in the graph by counting lines in the data file
 * Each line typically represents one edge in the graph
 */
async function estimateEdgeCount(dataFile: string): Promise<number> {
  try {
    const data = await fs.promises.readFile(dataFile, 'utf8');
    const lines = data.split('\n').filter(line => line.trim() !== '');
    return lines.length;
  } catch (error) {
    return 0; // If we can't count, return 0
  }
}

/** Main Function */
main().catch(error => OutputFormatter.error(error.message));

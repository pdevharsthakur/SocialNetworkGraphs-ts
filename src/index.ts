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
import fs from 'fs';
import path from 'path';

async function main() {
  // Process command line arguments
  const args = process.argv.slice(2);
  let dataFile = 'data/small_test_graph.txt';
  let startNode = 2;

  if (args.length > 0) {
    dataFile = args[0];
  }

  if (args.length > 1) {
    startNode = parseInt(args[1], 10);
  }

  console.log(`Using data file: ${dataFile}`);
  console.log(`Using start node: ${startNode}`);

  try {
    // Check if the file exists
    if (!fs.existsSync(dataFile)) {
      console.error(`Error: File ${dataFile} does not exist`);
      console.log('Available data files:');
      listDataFiles();
      return;
    }

    // Create and load the graph
    const graph = new CapGraph();
    console.log('Loading graph data...');
    await GraphLoader.loadGraph(graph, dataFile);
    console.log(`Graph loaded with ${graph.getVertexIDs().size} vertices`);

    // Perform analysis
    console.log('\nIdentifying trend setters...');
    graph.identifyTrendSetters();

    // Display trend setters
    let trendSetterCount = 0;
    graph.getVertexIDs().forEach(nodeID => {
      const node = graph.getVertex(nodeID);
      if (node.getIsTrendSetter()) {
        trendSetterCount++;
        // Limit output to avoid flooding console
        if (trendSetterCount <= 10) {
          console.log(
            `Node ${nodeID} is a trend setter with ${node.getFollowers().length} followers`
          );
        }
      }
    });
    console.log(`Total trend setters identified: ${trendSetterCount}`);

    // Find SCCs
    console.log('\nFinding strongly connected components...');
    const sccs = graph.getSCCs();
    console.log(`Found ${sccs.length} strongly connected components`);

    // Display first few SCCs
    const maxSccsToShow = 3;
    for (let i = 0; i < Math.min(maxSccsToShow, sccs.length); i++) {
      const scc = sccs[i];
      console.log(`SCC ${i + 1} has ${(scc as CapGraph).getVertexIDs().size} nodes`);
    }

    // Viral sharing simulation
    console.log(`\nSimulating viral video sharing starting from node ${startNode}...`);
    if (graph.getVertexIDs().has(startNode)) {
      graph.startViralSharing(startNode);
    } else {
      console.log(`Node ${startNode} not found in graph. Skipping viral simulation.`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function listDataFiles() {
  const dataDir = 'data';
  try {
    const files = fs.readdirSync(dataDir);
    files.forEach(file => {
      if (fs.statSync(path.join(dataDir, file)).isFile()) {
        console.log(`- ${path.join(dataDir, file)}`);
      }
    });
  } catch (error) {
    console.error('Error listing data files:', error);
  }
}

// Run the main function
main().catch(console.error);

/**
 * @file GraphLoader.ts
 * @description Utility for loading graph data from external files into the system.
 * 
 * This class handles the data ingestion process for the social network analysis system.
 * It provides functionality to:
 * - Read graph data from text files
 * - Parse edge relationships from various formats
 * - Efficiently construct the graph by first identifying all vertices then adding edges
 * - Handle large datasets with progress reporting
 * 
 * The loader is designed to work with common social network dataset formats where
 * each line represents an edge from one node to another. It implements a two-pass
 * algorithm for efficient graph construction from large datasets.
 */

import fs from 'fs';
import readline from 'readline';
import { Graph } from '../interfaces/interfaces.js';

export class GraphLoader {
  static async loadGraph(graph: Graph, filePath: string): Promise<void> {
    console.log(`Loading graph from ${filePath}...`);
    
    // First pass to collect all vertices
    const vertices = new Set<number>();
    let lineCount = 0;
    
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    for await (const line of rl) {
      lineCount++;
      if (lineCount % 100000 === 0) {
        console.log(`Processing vertices: ${lineCount} lines read, ${vertices.size} vertices found`);
      }
      
      if (line.trim() === '') continue;
      
      try {
        const [from, to] = line.split(/\s+/).map(Number);
        if (!isNaN(from) && !isNaN(to)) {
          vertices.add(from);
          vertices.add(to);
        }
      } catch (error) {
        console.error(`Error parsing line ${lineCount}: ${line}`);
      }
    }

    console.log(`Adding ${vertices.size} vertices to graph...`);
    // Add all vertices to the graph
    vertices.forEach(v => graph.addVertex(v));

    // Second pass to add all edges
    lineCount = 0;
    const fileStream2 = fs.createReadStream(filePath);
    const rl2 = readline.createInterface({
      input: fileStream2,
      crlfDelay: Infinity
    });

    for await (const line of rl2) {
      lineCount++;
      if (lineCount % 100000 === 0) {
        console.log(`Processing edges: ${lineCount} lines read`);
      }
      
      if (line.trim() === '') continue;
      
      try {
        const [from, to] = line.split(/\s+/).map(Number);
        if (!isNaN(from) && !isNaN(to)) {
          graph.addEdge(from, to);
        }
      } catch (error) {
        console.error(`Error adding edge at line ${lineCount}: ${line}`);
      }
    }

    console.log(`Graph loading complete. ${lineCount} lines processed.`);
  }
}
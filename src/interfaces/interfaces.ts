/**
 * @file interfaces.ts
 * @description Core type definitions for the Social Network Graph Analysis system.
 * 
 * This file defines the fundamental interfaces that establish the contract for
 * the graph data structures used throughout the application:
 * 
 * - Node: Represents a user in the social network with connections to other users
 * - Graph: Represents the entire social network structure with operations for analysis
 * 
 * These interfaces ensure type safety and provide a clear contract for implementations,
 *  They define the minimum required functionality for
 * any graph-based social network analysis in this application.
 */
export interface Node {
    addNeighbor(neighbor: number): void;
    getNeighbors(): number[];
    getID(): number;
  }
  
  export interface Graph {
    addVertex(num: number): void;
    addEdge(from: number, to: number): void;
    getEgonet(center: number): Graph;
    getSCCs(): Graph[];
    exportGraph(): Map<number, Set<number>>;
  }
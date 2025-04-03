/**
 * @file TrendSetterComparator.ts
 * @description Comparator for ranking nodes based on their influence in the network.
 *
 * This class provides comparison logic used to identify trend setters in the social network.
 * It implements a comparison strategy based on the number of neighbors (connections)
 * each node has, which serves as a basic measure of influence.
 *
 * The comparator is utilized in the trend setter identification algorithm to sort
 * nodes by their influence score, allowing the system to select the top percentage
 * of influential users in the network.
 */
import { CapNode } from '../core/CapNode.js';

export class TrendSetterComparator {
  compare(node1: CapNode, node2: CapNode): number {
    return node1.getNumNeighbors() - node2.getNumNeighbors();
  }
}

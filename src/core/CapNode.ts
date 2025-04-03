/**
 * @file CapNode.ts
 * @description Implementation of the Node interface for the social network graph.
 *
 * This class represents a node (user) in the social network with capabilities to:
 * - Track neighbors (users they follow)
 * - Track followers (users who follow them)
 * - Mark trend setters (influential users)
 *
 * Each node is identified by a unique numeric ID and maintains its network connections.
 * The implementation supports social network analysis operations including identifying
 * trend setters and simulating information propagation.
 */
import { Node } from '../interfaces/interfaces.js';

export class CapNode implements Node {
  private name: number;
  private neighbors: number[];
  private followers: number[];
  private isTrendSetter: boolean = false;

  constructor(name?: number) {
    this.name = name || 0;
    this.neighbors = [];
    this.followers = [];
  }

  getName(): number {
    return this.name;
  }

  addFollower(follower: number): void {
    this.followers.push(follower);
  }

  getFollowers(): number[] {
    return this.followers;
  }

  addNeighbor(neighbor: number): void {
    this.neighbors.push(neighbor);
  }

  removeNeighbor(neighbor: number): void {
    const index = this.neighbors.indexOf(neighbor);
    if (index === -1) {
      console.log("removeNeighbor couldn't find the object");
    }
    this.neighbors.splice(index, 1);
  }

  getNeighbors(): number[] {
    return this.neighbors;
  }

  getNumNeighbors(): number {
    return this.neighbors.length;
  }

  getID(): number {
    return this.name;
  }

  getIsTrendSetter(): boolean {
    return this.isTrendSetter;
  }

  setIsTrendSetter(bool: boolean): void {
    this.isTrendSetter = bool;
  }
}

# Social Network Graphs Project Explanation

## 🚀 Project Overview

This project is a **social network graph analysis tool** designed to help understand connections and information flow within social networks like Facebook and Twitter. It processes data representing user connections (e.g., who follows whom) and performs various analyses to:

*   Identify influential users.
*   Detect communities or clusters.
*   Simulate how content spreads through the network.

## ⚙️ How It Works Internally

The project is built using **TypeScript** and leverages **graph theory** concepts to model social networks.

### 1. Graph Construction
The program reads data files where each line signifies a connection (follow) from one user to another. It constructs a **directed graph**:
*   **Vertices** (nodes) represent individual users.
*   **Edges** represent the "follows" relationship between users.

### 2. Node Structure
Each user (node) in the graph stores:
*   A unique `ID` number.
*   A list of `neighbors` (users they follow).
*   A list of `followers` (users who follow them).
*   A flag indicating if they are a **"trend setter"**.

### 3. Analysis Features
The tool provides several key analysis capabilities:
*   **Influential User Identification**: Pinpointing users with significant reach (trend setters).
*   **Community Detection**: Finding groups of tightly connected users (**strongly connected components**).
*   **Content Spread Simulation**: Modeling how information (**viral content**) propagates through the network.

## 💡 Algorithms in Simple Terms

### 1. Trend Setter Identification
This algorithm identifies users who have a significantly higher number of followers compared to others. The program flags the top 10% of users with the most followers as **"trend setters"**.

> **In everyday terms**: Imagine scanning Instagram and picking out users with the most followers. These are the influencers (trend setters) who can potentially reach and influence a large audience.

### 2. Strongly Connected Components (SCC)
This algorithm finds groups (components) where every user in the group can reach every other user within the same group by following the connection paths. These represent **communities** or "bubbles" within the network.

> **In everyday terms**: Think of friend circles where everyone is connected, directly or indirectly. In social media, these are often groups where information tends to circulate internally.

### 3. Viral Content Simulation
This algorithm simulates the spread of content (like a post or video) starting from a specific user. It tracks how the content propagates as followers potentially re-share it with their own followers over successive steps (generations).

> **In everyday terms**: It's like watching how a popular meme or video spreads. One person shares it, their friends see and share it, then *their* friends share it, and so on. This simulation shows how content can "go viral" across the network.

## 🖥️ Understanding the Terminal Output

Let's break down the provided sample output:

```text
Using data file: data/small_test_graph.txt
Using start node: 2
```
*   The analysis uses the network defined in `data/small_test_graph.txt`.
*   The viral simulation will begin with user `2`.

```text
Loading graph data...
Loading graph from data/small_test_graph.txt...
Adding 14 vertices to graph...
Graph loading complete. 34 lines processed.
Graph loaded with 14 vertices
```
*   The program successfully loaded the graph data.
*   The network consists of **14 users** (vertices) and **34 connections** (edges).

```text
Identifying trend setters...
Node 6 is a trend setter with 3 followers
Node 9 is a trend setter with 3 followers
Total trend setters identified: 2
```
*   Two influential users were identified: **User #6** and **User #9**.
*   Each of these trend setters has 3 followers in this small network.

```text
Finding strongly connected components...
Found 1 strongly connected components
SCC 1 has 14 nodes
```
*   The analysis found only **one strongly connected component**.
*   This component includes all 14 nodes, meaning the entire network is interconnected – everyone can eventually reach everyone else through some path. Information has the potential to spread widely.

```text
Simulating viral video sharing starting from node 2...
Generation 1: Nodes reached: 2
Generation 2: Nodes reached: 2, 1
Generation 3: Nodes reached: 2, 1, 3
Generation 4: Nodes reached: 2, 1, 3, 7
Generation 5: Nodes reached: 2, 1, 3, 7, 6
Generation 6: Nodes reached: 2, 1, 3, 7, 6, 8
Generation 7: Nodes reached: 2, 1, 3, 7, 6, 8, 4
Generation 8: Nodes reached: 2, 1, 3, 7, 6, 8, 4, 5
Generation 9: Nodes reached: 2, 1, 3, 7, 6, 8, 4, 5, 9
Generation 10: Nodes reached: 2, 1, 3, 7, 6, 8, 4, 5, 9, 12
```
*   This section traces the simulated spread of content starting from user `2`:
    *   **Generation 1**: Only user `2` has the content.
    *   **Generation 2**: User `1` (likely followed by `2`) now has it.
    *   **Generation 3**: User `3` receives it.
    *   ...and so on.
    *   By **Generation 10**, the content has reached 10 distinct users (`2, 1, 3, 7, 6, 8, 4, 5, 9, 12`).
*   This simulation shows the *reach* and *speed* of information spread from a specific starting point.

## ✅ Conclusion

This project effectively demonstrates how mathematical **graph theory** provides powerful tools for analyzing real-world social networks, understanding influence, identifying communities, and modeling the dynamics of information flow.

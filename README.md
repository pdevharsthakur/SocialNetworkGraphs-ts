# 🌐 Social Network Graph Analysis

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)](https://pnpm.io/)

A TypeScript implementation of graph algorithms for social network analysis, demonstrating key concepts in graph theory applied to real-world social networks.

## 📚 Project Overview

This project implements a set of graph algorithms to analyze social network data, focusing on:

- 🧮 **Graph Theory Fundamentals**: Directed graphs, adjacency lists, graph traversal
- 🔍 **Community Detection**: Finding strongly connected components (SCCs) in the network
- ⭐ **Influence Analysis**: Identifying trend setters (influential users)
- 🌊 **Information Flow Simulation**: Modeling viral content propagation through the network
- 🧩 **Egonet Analysis**: Examining personal networks of individual users

The implementation uses real social network datasets (Twitter, Facebook) to demonstrate these algorithms at scale.

## 📋 Features

- **Strongly Connected Components**: Find communities where information can flow between any two members
- **Trend Setter Identification**: Locate the most influential users in the network
- **Viral Content Simulation**: Model how content spreads through the network from any starting point
- **Graph Visualization**: Analyze the structure of social networks
- **Scalable Architecture**: Process graphs ranging from small test cases to real-world networks with millions of edges

## 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/social-network-graphs-ts.git
cd social-network-graphs-ts

# Install dependencies
pnpm install
```

## 🚀 Running the Application

### Build the Project

```bash
pnpm build
```

### Run with Different Datasets

```bash
# Run with small test graph (default)
pnpm start

# Run with specific datasets
pnpm start:small     # Small test graph (14 nodes, 34 edges)
pnpm start:facebook  # Facebook dataset (1000 users)
pnpm start:twitter   # Twitter dataset (full network)
```

### Run with Custom Parameters

```bash
# Format: pnpm start <datafile> <startNode>
# Example: Run with Facebook data starting viral simulation from node 42
node dist/index.js data/facebook_1000.txt 42
```

### Development Mode

```bash
# Build and run in one command
pnpm dev
```

## 📊 Datasets

The project includes several real-world social network datasets:

| Dataset | Description | Nodes | Edges | Source |
|---------|-------------|-------|-------|--------|
| `small_test_graph.txt` | Simple test graph | 14 | 34 | - |
| `facebook_1000.txt` | Facebook friendships (small) | 1,000 | ~15,000 | Stanford SNAP |
| `facebook_2000.txt` | Facebook friendships (medium) | 2,000 | ~30,000 | Stanford SNAP |
| `facebook_ucsd.txt` | UCSD Facebook network | ~14,000 | ~450,000 | Amanda L. Traud, et al. |
| `twitter_combined.txt` | Twitter follower network | ~80,000 | ~1.8M | Stanford SNAP |
| `twitter_higgs.txt` | Twitter retweets (Higgs boson) | ~450,000 | ~14M | Stanford SNAP |

## 🏗️ Project Structure

```
social-network-graphs-ts/
├── src/                    # Source code
│   ├── core/               # Core implementations
│   │   ├── CapGraph.ts     # Graph implementation
│   │   └── CapNode.ts      # Node implementation
│   ├── interfaces/         # TypeScript interfaces
│   │   └── interfaces.ts   # Graph and Node interfaces
│   ├── algorithms/         # Algorithm implementations
│   │   └── TrendSetterComparator.ts  # Influence ranking
│   ├── loaders/            # Data loading utilities
│   │   └── GraphLoader.ts  # File parsing and graph construction
│   ├── utils/              # Utility functions
│   └── index.ts            # Main entry point
├── data/                   # Dataset files
│   ├── small_test_graph.txt
│   ├── facebook_*.txt
│   └── twitter_*.txt
└── dist/                   # Compiled JavaScript
```

## 💻 Code Formatting

This project uses Prettier for consistent code formatting:

```bash
# Format all TypeScript files in src/
pnpm format

# Format all supported files in the project
pnpm format:all
```

## 🧪 Key Algorithms

### 1. Strongly Connected Components (Kosaraju's Algorithm)

The project implements Kosaraju's algorithm for finding strongly connected components:
1. Perform DFS on the original graph and keep track of finish times
2. Transpose the graph (reverse all edges)
3. Perform DFS on the transposed graph in order of decreasing finish times

### 2. Trend Setter Identification

Influential users are identified based on:
- Number of connections (degree centrality)
- Position in the network
- Ability to reach other users

### 3. Viral Content Propagation

The simulation models how information spreads:
- Starting from any node
- Following connection pathways
- With configurable propagation characteristics

## 📄 License

This project is licensed under the ISC License.

## ✨ Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 
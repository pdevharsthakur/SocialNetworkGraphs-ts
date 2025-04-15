# 🌐 Social Network Graphs Project Explanation (SocialGraph)

## 🚀 Project Overview

This project is a **social network graph analysis tool** designed to help understand connections and information flow within social networks like Facebook and Twitter. It processes data representing user connections (e.g., who follows whom) and performs various analyses to:

- Identify influential users
- Detect communities or clusters
- Simulate how content spreads through the network

## ⚙️ How It Works Internally

The project is built using **TypeScript** and leverages **graph theory** concepts to model social networks.

### 1. Graph Construction

The program reads data files where each line signifies a connection (follow) from one user to another. It constructs a **directed graph**:

- **Vertices** (nodes) represent individual users
- **Edges** represent the "follows" relationship between users

For example, a line in the data file that reads `1 2` means "user 1 follows user 2," creating a directed edge from node 1 to node 2.

### 2. Node Structure

Each user (node) in the graph stores:

- A unique `ID` number
- A list of `neighbors` (users they follow)
- A list of `followers` (users who follow them)
- A flag indicating if they are a **"trend setter"**

This data structure allows the program to navigate through connections in both directions and identify important users in the network.

### 3. Analysis Features

The tool provides several key analysis capabilities:

- **Influential User Identification**: Pinpointing users with significant reach (trend setters)
- **Community Detection**: Finding groups of tightly connected users (**strongly connected components**)
- **Content Spread Simulation**: Modeling how information (**viral content**) propagates through the network

## 🎨 Output Formatting

The project features a dedicated `OutputFormatter` class that creates visually organized, color-coded terminal output:

| Section             | Color   | Emoji | Description                            |
| ------------------- | ------- | ----- | -------------------------------------- |
| Graph Loading       | Blue    | 🗂️    | Data loading and initial setup         |
| Influence Analysis  | Yellow  | 🌟    | Trend setter identification            |
| Community Detection | Magenta | 🧑‍🤝‍🧑    | Strongly connected components analysis |
| Viral Simulation    | Cyan    | 🌊    | Content propagation simulation         |
| Analysis Summary    | Green   | 📊    | Final results overview                 |

The output is structured with:

- Visual separators between sections
- Consistent indentation and hierarchical formatting
- Color-coded success/error messages
- Comprehensive summary section

## 💡 Algorithms in Simple Terms

### 1. Trend Setter Identification

This algorithm identifies users who have a significantly higher number of followers compared to others. The program flags the top 10% of users with the most followers as **"trend setters"**.

> **In everyday terms**: Imagine scanning Instagram and picking out users with the most followers. These are the influencers (trend setters) who can potentially reach and influence a large audience.

### 2. Strongly Connected Components (SCC)

This algorithm finds groups (components) where every user in the group can reach every other user within the same group by following the connection paths. These represent **communities** or "bubbles" within the network.

> **In everyday terms**: Think of friend circles where everyone is connected, directly or indirectly. In social media, these are often groups where information tends to circulate internally.

### 3. Viral Content Simulation

This algorithm simulates the spread of content (like a post or video) starting from a specific user. It tracks how the content propagates as followers potentially re-share it with their own followers over successive steps (generations).

> **In everyday terms**: It's like watching how a popular meme or video spreads. One person shares it, their friends see and share it, then _their_ friends share it, and so on. This simulation shows how content can "go viral" across the network.

## 🖥️ Understanding the Terminal Output

Here's a sample of the enhanced output:

```
🗂️ [Graph Loading]
  - Reading data from: data/small_test_graph.txt
  - Start node for simulation: 2
  Loading graph from data/small_test_graph.txt...
  Adding 14 vertices to graph...
  ✓ Graph loading complete. 34 lines processed.
  - Result: 14 users, 34 connections

───────────────────────────────────────────────────
🌟 [Influence Analysis]
  - Trend setters (top influencers):
      • Node 6 (3 followers)
      • Node 9 (3 followers)
  - Total trend setters: 2

───────────────────────────────────────────────────
🧑‍🤝‍🧑 [Community Detection]
  - Strongly Connected Components found: 1
  - Community 1: 14 nodes

───────────────────────────────────────────────────
🌊 [Viral Content Simulation]
  - Starting from node 2:
      • Generation 1: 2
      • Generation 2: 2, 1
      • Generation 3: 2, 1, 3
      • Generation 4: 2, 1, 3, 7
      • Generation 5: 2, 1, 3, 7, 6
      • Generation 6: 2, 1, 3, 7, 6, 8
      • Generation 7: 2, 1, 3, 7, 6, 8, 4
      • Generation 8: 2, 1, 3, 7, 6, 8, 4, 5
      • Generation 9: 2, 1, 3, 7, 6, 8, 4, 5, 9
      • Generation 10: 2, 1, 3, 7, 6, 8, 4, 5, 9, 12

───────────────────────────────────────────────────
📊 [Analysis Summary]
  - Network Size: 14 users, 34 connections
  - Influential Users: 2 trend setters identified
  - Communities: 1 strongly connected components
  - Viral Simulation: Started from user 2
```

Let's break down what each section of this output means in detail:

### Graph Loading Section

```
🗂️ [Graph Loading]
  - Reading data from: data/small_test_graph.txt
  - Start node for simulation: 2
  Loading graph from data/small_test_graph.txt...
  Adding 14 vertices to graph...
  ✓ Graph loading complete. 34 lines processed.
  - Result: 14 users, 34 connections
```

This section tells us:

- The **data source** - The analysis is using a file called `small_test_graph.txt`
- The **starting point** - Node 2 will be the initial user for the viral simulation
- The **graph size** - The network consists of 14 users (vertices) and 34 connections (edges)
- The **loading process** - Data was successfully loaded and processed

The number of connections (34) indicates how densely connected this small network is. With 14 users, each user has an average of about 2-3 connections to other users.

### Influence Analysis Section

```
🌟 [Influence Analysis]
  - Trend setters (top influencers):
      • Node 6 (3 followers)
      • Node 9 (3 followers)
  - Total trend setters: 2
```

This section identifies the most influential users in the network:

- **User #6** has 3 followers - This makes them an influencer in this small network
- **User #9** also has 3 followers - Making them equally influential
- **Total trend setters**: 2 out of 14 users (about 14% of the network) qualify as trend setters

These trend setters are crucial in the network because information that starts with or passes through them can reach more people more quickly. In a real social network, these would be accounts with larger audiences.

### Community Detection Section

```
🧑‍🤝‍🧑 [Community Detection]
  - Strongly Connected Components found: 1
  - Community 1: 14 nodes
```

This section reveals the community structure of the network:

- Only **one strongly connected component** was found
- This component includes **all 14 nodes** in the network

This means the entire network is interconnected – every user can reach every other user by following some path of connections. In social network terms, this is a tight-knit community where information has the potential to eventually reach everyone.

If there were multiple components, it would indicate separate isolated communities that don't interact with each other.

### Viral Simulation Section

```
🌊 [Viral Content Simulation]
  - Starting from node 2:
      • Generation 1: 2
      • Generation 2: 2, 1
      • Generation 3: 2, 1, 3
      • Generation 4: 2, 1, 3, 7
      • Generation 5: 2, 1, 3, 7, 6
      • Generation 6: 2, 1, 3, 7, 6, 8
      • Generation 7: 2, 1, 3, 7, 6, 8, 4
      • Generation 8: 2, 1, 3, 7, 6, 8, 4, 5
      • Generation 9: 2, 1, 3, 7, 6, 8, 4, 5, 9
      • Generation 10: 2, 1, 3, 7, 6, 8, 4, 5, 9, 12
```

This section traces how content would spread through the network:

- **Generation 1**: Only user `2` has the content initially
- **Generation 2**: User `1` (who follows user `2`) now sees and shares the content
- **Generation 3**: User `3` receives the content
- **Generation 4**: User `7` is added to the spread
- **Generation 5**: User `6` (one of our trend setters!) gets the content, which may accelerate sharing
- ...and so on
- By **Generation 10**, the content has reached 10 out of 14 users in the network

This simulation shows:

- The **speed** of information spread (10 generations to reach 71% of the network)
- The **path** the information takes (which users see it in which order)
- The **reach** (how many users eventually see the content)

Note that by Generation 9, the content reaches user `9`, who is another trend setter, further boosting potential spread.

### Analysis Summary Section

```
📊 [Analysis Summary]
  - Network Size: 14 users, 34 connections
  - Influential Users: 2 trend setters identified
  - Communities: 1 strongly connected components
  - Viral Simulation: Started from user 2
```

This section provides a concise overview of all findings:

- **Network Structure**: 14 users with 34 connections between them
- **Influence Distribution**: 2 trend setters were identified
- **Community Structure**: 1 cohesive community
- **Simulation Context**: The viral spread simulation started from user 2

This summary helps quickly understand the key characteristics of the analyzed network.

## 🛠️ Build and Development

The project includes enhanced build and formatting scripts that provide:

- Visually organized build output with progress indicators
- Detailed formatting reports for code quality maintenance
- Step-by-step feedback during process execution
- Clear error handling with detailed contextual information

These tools make the development process more efficient and user-friendly.

## 🔢 Behind the Scenes: The Math and Algorithms

For those interested in the technical aspects, here's what's happening behind the scenes:

1. **Graph Theory Implementation**: The project uses adjacency lists to efficiently store and traverse the graph structure.

2. **Trend Setter Algorithm**:

   - Calculates the number of followers for each user
   - Sorts users by follower count
   - Selects the top 10% (rounded up) as trend setters

3. **SCC Detection**: Uses Kosaraju's algorithm to find strongly connected components:

   - Performs DFS on the original graph and tracks finish times
   - Transposes the graph (reverses all edges)
   - Performs DFS on the transposed graph in order of decreasing finish times

4. **Viral Simulation Algorithm**: Uses a modified breadth-first search (BFS) to simulate content propagation:
   - Starts from the initial user
   - Simulates content sharing to followers in waves (generations)
   - Applies special rules for trend setters (they may reach more followers)
   - Tracks which users have seen the content at each step

## ✅ Conclusion

This project effectively demonstrates how mathematical **graph theory** provides powerful tools for analyzing real-world social networks, understanding influence, identifying communities, and modeling the dynamics of information flow.

By visualizing these concepts through colored, structured output, the project makes complex network analysis accessible and intuitive. This type of analysis has real-world applications in marketing, information security, social science research, and recommendation systems.

# 📊 Social Network Analysis Datasets

This document describes the data files included in this project for social network analysis.

## 🔍 Dataset Overview

| Dataset                                        | Type     | Nodes    | Edges    | Connectivity        |
| ---------------------------------------------- | -------- | -------- | -------- | ------------------- |
| [`small_test_graph.txt`](#small_test_graph)    | Test     | 14       | 34       | Fully connected     |
| [`facebook_1000.txt`](#facebook_1000txt)       | Facebook | 1,000    | ~15,000  | Fully connected     |
| [`facebook_2000.txt`](#facebook_2000txt)       | Facebook | 2,000    | ~30,000  | Not fully connected |
| [`facebook_ucsd.txt`](#facebook_ucsd)          | Facebook | ~14,000  | ~450,000 | Mixed               |
| [`twitter_combined.txt`](#twitter_combinedtxt) | Twitter  | ~80,000  | ~1.8M    | Mixed               |
| [`twitter_higgs.txt`](#twitter_higgstxt)       | Twitter  | ~450,000 | ~14M     | Mixed               |

## 📁 Folders

| Folder        | Description                                                                                                                           |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `ego_answers` | Files used by the EgoGrader to test whether the answers produced by the user's code are correct. Do not modify these files.           |
| `scc`         | Files used by the SCCGrader to test the user's implementation of the strongly connected components method. Do not modify these files. |
| `scc_answers` | Files used by the SCCGrader to test whether the answers produced by the user's code are correct. Do not modify these files.           |

## 📄 Files

> **⚠️ Important:** Some of these files are used by our graders so please do not modify them if you would like to use the user-side graders to test your code. You are welcome to make copies of them and modify them.

### Test Network

#### <a id="small_test_graph"></a> `small_test_graph.txt`

- **Description:** Small test graph for algorithm verification and debugging
- **Size:** 14 nodes, 34 edges
- **Characteristics:** Fully connected, suitable for quick testing

### Facebook Networks

#### <a id="facebook_ucsd"></a> `facebook_ucsd.txt`

- **Description:** Facebook friendships between students at UCSD in 2005
- **Size:** ~14,000 nodes, ~450,000 edges
- **Format:** Directed edges (each edge also appears in reverse order, making the final result undirected)
- **Original Format:** Matlab sparse matrix, processed with Python for easier reading
- **Source:** [Internet Archive](https://archive.org/details/oxford-2005-facebook-matrix)
- **Citation:**
  > Facebook data scrape related to paper "The Social Structure of Facebook Networks", by Amanda L. Traud, Peter J. Mucha, Mason A. Porter.

#### <a id="facebook_1000txt"></a> `facebook_1000.txt`

- **Description:** Smaller version of facebook_ucsd.txt containing only the first 1000 vertices
- **Size:** 1,000 nodes, ~15,000 edges
- **Characteristics:** Fully connected network
- **Use Case:** Good for initial testing of algorithms that might be slow on larger datasets

#### <a id="facebook_2000txt"></a> `facebook_2000.txt`

- **Description:** Smaller version of facebook_ucsd.txt containing only the first 2000 vertices
- **Size:** 2,000 nodes, ~30,000 edges
- **Characteristics:** Not fully connected
- **Use Case:** Useful for testing algorithms with large runtimes and analyzing disconnected components

### Twitter Networks

#### <a id="twitter_combinedtxt"></a> `twitter_combined.txt`

- **Description:** Directed edges linking Twitter followers to the users they follow
- **Size:** ~80,000 nodes, ~1.8 million edges
- **Format:** Each line represents a follower relationship
- **Source:** [Stanford's Snap Network Database](https://snap.stanford.edu/data/egonets-Twitter.html)

#### <a id="twitter_higgstxt"></a> `twitter_higgs.txt`

- **Description:** People who retweeted messages of others at the time of the Higgs boson discovery
- **Size:** ~450,000 nodes, ~14 million edges
- **Research Value:** Shows information propagation around a significant scientific event
- **Source:** [Stanford's Snap Network Database](http://snap.stanford.edu/data/higgs-twitter.html)

## 📋 File Format

In all of the files, each line represents an edge in the following format:

```
source_vertex_id target_vertex_id
```

Example:

```
1 2  // User 1 follows/is connected to User 2
```

## 📈 Working with Large Datasets

When working with the larger datasets (especially `twitter_higgs.txt`):

- Consider sampling or using smaller datasets during initial development
- Ensure your algorithms can handle large sparse graphs efficiently
- For viral simulations, choose starting nodes carefully as results may vary significantly

---

**Note:** You do not need to use these specific files in your project - feel free to use any data you think may be appropriate.

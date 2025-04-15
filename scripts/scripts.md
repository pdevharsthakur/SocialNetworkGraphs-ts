# 📚 Social Network Graphs Project Scripts

This document outlines the various scripts available in the project, their functionality, and how to use them effectively.

## 🔧 Build Script (`build.mjs`)

The build script orchestrates the compilation and preparation of the project for execution, providing a clean, detailed output with visual organization.

### Features

- ✨ **Visually Organized Output:** Clear headers, sections, and formatted messages
- 🔍 **Detailed Progress Reporting:** Step-by-step feedback for each build phase
- 🧩 **TypeScript Compilation:** Compiles all source files with proper error handling
- 📋 **Data File Management:** Copies required data files to the distribution folder
- ❌ **Robust Error Handling:** Properly formatted error messages with context

### Usage

```bash
# Build the entire project
pnpm build
```

### Implementation Details

The build script performs these sequential operations:

1. **Environment Setup**

   - Identifies project directories (root, data, distribution)
   - Creates the `dist` directory if it doesn't exist

2. **TypeScript Compilation**

   - Executes the TypeScript compiler (`tsc`)
   - Captures and formats any compilation errors
   - Reports compilation success/failure

3. **Data Files Copying**

   - Checks for and creates the `dist/data` directory if needed
   - Identifies all data files in the source data directory
   - Copies each file with detailed progress reporting
   - Verifies successful copy operations

4. **Final Reporting**
   - Provides a build completion message
   - Suggests next steps for running the application

## 🎨 Format Script (`format.mjs`)

The format script ensures consistent code style across the project, managing the application of Prettier formatting rules to various file types.

### Features

- 🖌️ **Comprehensive Formatting:** Handles TypeScript, JavaScript, JSON, and Markdown files
- 🔍 **Selective Processing:** Supports focusing only on specific file types
- 📊 **Detailed Statistics:** Reports on the total files examined, formatted, and unchanged
- 📝 **File-by-File Reporting:** Individual status for each processed file
- ❌ **Clear Error Reporting:** Properly formatted errors with contextual details

### Usage

```bash
# Format all files in the project
pnpm format

# Format only TypeScript files
pnpm format:ts

# Check formatting without making changes
pnpm format:check
```

### Command-Line Flags

| Flag        | Description                  |
| ----------- | ---------------------------- |
| `--ts-only` | Only format TypeScript files |

### Implementation Details

The format script performs these operations:

1. **Argument Parsing**

   - Handles command-line flags (e.g., `--ts-only`)
   - Adjusts processing behavior accordingly

2. **File Discovery**

   - Uses glob patterns to locate relevant files
   - Groups files by type (TypeScript, JavaScript, JSON/Markdown)

3. **Prettier Integration**

   - Executes Prettier on each file
   - Compares before/after content to determine if formatting was needed
   - Reports status for each file (formatted/unchanged/failed)

4. **Result Reporting**
   - Provides statistics on processed files
   - Color-codes output by result type
   - Suggests next steps based on outcomes

## 🚀 NPM Scripts

The following scripts are defined in `package.json` for convenient execution:

| Script           | Description                                  |
| ---------------- | -------------------------------------------- |
| `build`          | Builds the entire project using `build.mjs`  |
| `start`          | Runs the application with default settings   |
| `start:small`    | Runs the application with a small test graph |
| `start:facebook` | Runs the application with Facebook dataset   |
| `start:twitter`  | Runs the application with Twitter dataset    |
| `dev`            | Builds the project and immediately runs it   |
| `format`         | Formats all code files using `format.mjs`    |
| `format:ts`      | Formats only TypeScript files                |
| `format:check`   | Checks formatting without making changes     |

## 📊 Application Output Formatting

The project features a dedicated `OutputFormatter` class that provides consistent, visually organized output in the terminal for the social network analysis results.

### Features

- 🎨 **Color-Coded Sections:** Each analysis phase has its own distinct color
- 🔖 **Visual Separators:** Clear separation between different stages of analysis
- 🔤 **Consistent Indentation:** Hierarchical formatting for better readability
- 🗂️ **Conceptual Organization:** Output grouped by graph theory concepts
- 📋 **Summary Statistics:** Final overview of analysis results

### Color Coding

| Section             | Color   | Emoji | Description                            |
| ------------------- | ------- | ----- | -------------------------------------- |
| Graph Loading       | Blue    | 🗂️    | Data loading and initial setup         |
| Influence Analysis  | Yellow  | 🌟    | Trend setter identification            |
| Community Detection | Magenta | 🧑‍🤝‍🧑    | Strongly connected components analysis |
| Viral Simulation    | Cyan    | 🌊    | Content propagation simulation         |
| Analysis Summary    | Green   | 📊    | Final results overview                 |
| Errors              | Red     | ❌    | Error messages                         |

### Implementation

The `OutputFormatter` class uses chalk to provide colorful, structured output with:

- Bold section headers with emojis
- Gray separators between sections
- White highlights for important values
- Indented subsections for hierarchical information
- Color-coded success and error messages

### Usage in Code

To use the formatter in new code:

```typescript
// Import the formatter
import { OutputFormatter } from './utils/OutputFormatter.js';

// Display a section header
OutputFormatter.influenceAnalysisHeader();

// Display a specific result
OutputFormatter.trendSetter(nodeID, followerCount);

// Show an error
OutputFormatter.error('Something went wrong');

// Display final results
OutputFormatter.analysisSummary({
  nodes: 1000,
  edges: 5000,
  trendSetters: 100,
  communities: 10,
  startNode: 1,
});
```

## 🖥️ Sample Outputs

These samples illustrate the visual formatting applied to the application's output.

### Build Process

```
════════════════════════════════════════════════════════════
  Building Social Network Graph Analysis Tool
════════════════════════════════════════════════════════════

  → Compiling TypeScript

  Copying Data Files
  ────────────────────────────────────────────────
  → Found 8 data files to copy
    • facebook_1000.txt
    • facebook_2000.txt
    • facebook_ucsd.txt
    • small_test_graph.txt
    • twitter_combined.txt
    • twitter_higgs.txt
  ✓ Copied 6 data files

  ✨ Build completed successfully!
  You can now run the application using:
    pnpm start
```

### Formatting Process

```
════════════════════════════════════════════════════════════
  Formatting Social Network Graph Analysis Codebase
════════════════════════════════════════════════════════════

  TypeScript Files
  ────────────────────────────────────────────────
  → Found 7 files to format
    • src/index.ts (formatted)
    • src/utils/OutputFormatter.ts (formatted)
    • src/loaders/GraphLoader.ts (formatted)
    • src/interfaces/interfaces.ts (already formatted)
    • src/core/CapNode.ts (already formatted)
    • src/core/CapGraph.ts (already formatted)
    • src/algorithms/TrendSetterComparator.ts (already formatted)

  📊 Formatting Results:
    Total files examined: 7
    Formatted successfully: 3
    Already formatted: 4

  ✨ TypeScript formatting completed successfully!
   All TypeScript files are now properly formatted.
```

### Application Output

```
🗂️ [Graph Loading]
  - Reading data from: data/small_test_graph.txt
  - Start node for simulation: 1
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
  - Starting from node 1:
      • Generation 1: 1
      • Generation 2: 1, 2
      • Generation 3: 1, 2, 3
      • Generation 4: 1, 2, 3, 7
      • Generation 5: 1, 2, 3, 7, 6

───────────────────────────────────────────────────
📊 [Analysis Summary]
  - Network Size: 14 users, 34 connections
  - Influential Users: 2 trend setters identified
  - Communities: 1 strongly connected components
  - Viral Simulation: Started from user 1
```

## 🧠 Best Practices

- **Always build before running:** Ensure your changes are compiled by running `pnpm build` before testing
- **Format regularly:** Run `pnpm format` before committing to maintain consistent code style
- **Use the right dataset:** Choose the appropriate `start:*` script based on the size of data you want to analyze
- **Check the build output:** Look for warnings and errors in the build process output

## 🔄 Script Development

When modifying or extending these scripts, follow these guidelines:

1. **Maintain visual consistency:** Use the same styling and formatting patterns
2. **Preserve error handling:** Ensure robust error handling remains in place
3. **Add JSDoc comments:** Document new functions with proper JSDoc formatting
4. **Update this documentation:** Keep this document in sync with script changes

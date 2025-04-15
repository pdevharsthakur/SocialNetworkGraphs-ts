/**
 * @file OutputFormatter.ts
 * @description Utility for formatting console output with chalk and emojis.
 *
 * This file provides helper functions to create visually appealing and structured
 * console output for the social network graph analysis application, using:
 * - Emojis for visual anchors
 * - Chalk for colorful output
 * - Consistent formatting for different parts of the analysis
 */
import chalk from 'chalk';

/**
 * Interface for analysis summary data
 */
interface AnalysisSummary {
  nodes: number;
  edges: number;
  trendSetters: number;
  communities: number;
  startNode: number;
}

export class OutputFormatter {
  /**
   * Creates a visual separator line
   */
  private static separator(): void {
    console.log(chalk.gray('\n───────────────────────────────────────────────────'));
  }

  /**
   * Displays the graph loading information
   */
  static graphLoading(dataFile: string, startNode: number): void {
    console.log('\n' + chalk.blue.bold('🗂️ [Graph Loading]'));
    console.log(chalk.blue(`  - Reading data from: ${chalk.white(dataFile)}`));
    console.log(chalk.blue(`  - Start node for simulation: ${chalk.white(startNode.toString())}`));
  }

  /**
   * Displays a loading message with proper formatting
   */
  static loadingMessage(message: string): void {
    console.log(chalk.blue(`  ${message}`));
  }

  /**
   * Displays a loading progress message
   */
  static loadingProgress(message: string): void {
    console.log(chalk.blue(`    ${message}`));
  }

  /**
   * Displays a loading success message
   */
  static loadingSuccess(message: string): void {
    console.log(chalk.green(`  ✓ ${message}`));
  }

  /**
   * Displays a message when graph loading is complete
   */
  static graphLoadingComplete(vertexCount: number, edgeCount: number): void {
    console.log(
      chalk.green(
        `  - ${chalk.white.bold('Result')}: ${chalk.white(`${vertexCount} users, ${edgeCount} connections`)}`
      )
    );
  }

  /**
   * Displays the influence analysis section header
   */
  static influenceAnalysisHeader(): void {
    this.separator();
    console.log(chalk.yellow.bold('🌟 [Influence Analysis]'));
    console.log(chalk.yellow('  - Trend setters (top influencers):'));
  }

  /**
   * Displays a trend setter entry
   */
  static trendSetter(nodeID: number, followerCount: number): void {
    console.log(
      chalk.yellow(
        `      • Node ${chalk.white(nodeID.toString())} (${chalk.white(`${followerCount} followers`)})`
      )
    );
  }

  /**
   * Displays the total trend setter count
   */
  static trendSetterTotal(count: number): void {
    console.log(chalk.yellow(`  - Total trend setters: ${chalk.white(count.toString())}`));
  }

  /**
   * Displays the community detection section header
   */
  static communityDetectionHeader(): void {
    this.separator();
    console.log(chalk.magenta.bold('🧑‍🤝‍🧑 [Community Detection]'));
  }

  /**
   * Displays SCC information
   */
  static sccResult(sccCount: number): void {
    console.log(
      chalk.magenta(`  - Strongly Connected Components found: ${chalk.white(sccCount.toString())}`)
    );
  }

  /**
   * Displays information about a specific SCC
   */
  static sccDetail(index: number, nodeCount: number): void {
    console.log(
      chalk.magenta(
        `  - Community ${chalk.white(index.toString())}: ${chalk.white(`${nodeCount} nodes`)}`
      )
    );
  }

  /**
   * Displays the viral simulation section header
   */
  static viralSimulationHeader(startNode: number): void {
    this.separator();
    console.log(chalk.cyan.bold('🌊 [Viral Content Simulation]'));
    console.log(chalk.cyan(`  - Starting from node ${chalk.white(startNode.toString())}:`));
  }

  /**
   * Displays a generation in the viral simulation
   */
  static viralSimulationGeneration(generation: number, nodes: number[]): void {
    console.log(
      chalk.cyan(
        `      • Generation ${chalk.white(generation.toString())}: ${chalk.white(nodes.join(', '))}`
      )
    );
  }

  /**
   * Displays an error message
   */
  static error(message: string): void {
    console.log('\n' + chalk.red(`❌ Error: ${message}`));
  }

  /**
   * Displays a list of available data files
   */
  static availableDataFiles(files: string[]): void {
    console.log('\n' + chalk.blue.bold('📂 Available data files:'));
    files.forEach(file => {
      console.log(chalk.blue(`  - ${chalk.white(file)}`));
    });
  }

  /**
   * Displays a summary of the analysis results
   */
  static analysisSummary(summary: AnalysisSummary): void {
    this.separator();
    console.log(chalk.green.bold('📊 [Analysis Summary]'));
    console.log(
      chalk.green(
        `  - Network Size: ${chalk.white(`${summary.nodes} users, ${summary.edges} connections`)}`
      )
    );
    console.log(
      chalk.green(
        `  - Influential Users: ${chalk.white(`${summary.trendSetters} trend setters identified`)}`
      )
    );
    console.log(
      chalk.green(
        `  - Communities: ${chalk.white(`${summary.communities} strongly connected components`)}`
      )
    );
    console.log(
      chalk.green(`  - Viral Simulation: ${chalk.white(`Started from user ${summary.startNode}`)}`)
    );

    // Add a final separator for a clean end
    console.log(chalk.gray('\n───────────────────────────────────────────────────\n'));
  }
}

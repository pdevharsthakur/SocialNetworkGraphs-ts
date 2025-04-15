#!/usr/bin/env node

/**
 * @file format.mjs
 * @description Code formatting script for the Social Network Graph Analysis application.
 *
 * This script provides clean, detailed output during the code formatting process,
 * with proper error handling and visual structure.
 */

import { execSync } from 'child_process';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Parse command line arguments
const args = process.argv.slice(2);
const tsOnly = args.includes('--ts-only');

/**
 * Prints a header section in the terminal
 */
function printHeader(title) {
  const separator = '═'.repeat(60);
  console.log('\n' + chalk.magenta.bold(separator));
  console.log(chalk.magenta.bold(`  ${title}`));
  console.log(chalk.magenta.bold(separator) + '\n');
}

/**
 * Prints a section header
 */
function printSection(section) {
  const separator = '─'.repeat(50);
  console.log('\n' + chalk.cyan.bold(`  ${section}`));
  console.log(chalk.cyan(separator));
}

/**
 * Prints a step in the formatting process
 */
function printStep(step, details = '') {
  console.log(chalk.yellow(`  → ${step}`) + (details ? chalk.gray(` ${details}`) : ''));
}

/**
 * Prints a success message
 */
function printSuccess(message) {
  console.log(chalk.green(`  ✓ ${message}`));
}

/**
 * Prints statistics about formatted files
 */
function printStats(counts) {
  const { total, formatted, unchanged, failed } = counts;

  console.log('\n' + chalk.cyan('  📊 Formatting Results:'));
  console.log(chalk.white(`    Total files examined: ${chalk.bold(total)}`));

  if (formatted > 0) {
    console.log(chalk.green(`    Formatted successfully: ${chalk.bold(formatted)}`));
  }

  if (unchanged > 0) {
    console.log(chalk.blue(`    Already formatted: ${chalk.bold(unchanged)}`));
  }

  if (failed > 0) {
    console.log(chalk.red(`    Failed to format: ${chalk.bold(failed)}`));
  }
}

/**
 * Prints an error message with details
 */
function printError(title, error) {
  console.log('\n' + chalk.red.bold(`  ❌ ${title}`));

  if (error) {
    const errorLines = error.toString().split('\n');
    console.log(chalk.red('    Error details:'));
    errorLines.forEach(line => {
      console.log(chalk.red(`      ${line}`));
    });
  }
}

/**
 * Format a specific set of files
 */
function formatFiles(pattern, description) {
  printSection(description);

  try {
    // Find all files matching the pattern
    const files = glob.sync(pattern, { cwd: rootDir });

    if (files.length === 0) {
      console.log(chalk.yellow(`  ℹ️ No files found matching pattern: ${pattern}`));
      return { total: 0, formatted: 0, unchanged: 0, failed: 0 };
    }

    printStep(`Found ${files.length} files to format`);

    // Format counts
    let formatted = 0;
    let unchanged = 0;
    let failed = 0;

    // Process each file with Prettier
    files.forEach(file => {
      const filePath = path.join(rootDir, file);
      const relativePath = path.relative(rootDir, filePath);

      try {
        // Get file content before formatting to check if it changed
        const contentBefore = fs.readFileSync(filePath, 'utf-8');

        // Run Prettier
        execSync(`npx prettier --write "${filePath}"`, {
          cwd: rootDir,
          stdio: 'pipe',
        });

        // Get content after formatting
        const contentAfter = fs.readFileSync(filePath, 'utf-8');

        if (contentBefore === contentAfter) {
          unchanged++;
          console.log(chalk.blue(`    • ${relativePath} ${chalk.gray('(already formatted)')}`));
        } else {
          formatted++;
          console.log(chalk.green(`    • ${relativePath} ${chalk.gray('(formatted)')}`));
        }
      } catch (error) {
        failed++;
        console.log(chalk.red(`    • ${relativePath} ${chalk.gray('(failed)')}`));
        console.log(chalk.red(`      ${error.message.split('\n')[0]}`));
      }
    });

    return { total: files.length, formatted, unchanged, failed };
  } catch (error) {
    printError(`Failed to format ${description}`, error);
    return { total: 0, formatted: 0, unchanged: 0, failed: 1 };
  }
}

/**
 * Main format function
 */
async function format() {
  printHeader('Formatting Social Network Graph Analysis Codebase');

  try {
    // Format TypeScript files
    const tsResults = formatFiles('src/**/*.ts', 'TypeScript Files');

    // If ts-only flag is provided, skip other files
    if (tsOnly) {
      printStats(tsResults);

      // Final message for TypeScript only
      if (tsResults.failed > 0) {
        console.log(
          '\n' + chalk.yellow.bold('  ⚠️ TypeScript formatting completed with some errors')
        );
        console.log(
          chalk.yellow('   Please check the errors above and fix them manually if needed.\n')
        );
      } else if (tsResults.formatted > 0) {
        console.log('\n' + chalk.green.bold('  ✨ TypeScript formatting completed successfully!'));
        console.log(chalk.green('   All TypeScript files are now properly formatted.\n'));
      } else {
        console.log(
          '\n' + chalk.blue.bold('  ✨ All TypeScript files are already properly formatted!')
        );
        console.log(chalk.blue('   No changes were needed.\n'));
      }

      return;
    }

    // Format JavaScript files
    const jsResults = formatFiles('scripts/**/*.{js,mjs}', 'JavaScript Files');

    // Format JSON, markdown, etc.
    const otherResults = formatFiles('**/*.{json,md}', 'JSON and Markdown Files');

    // Print overall results
    const totals = {
      total: tsResults.total + jsResults.total + otherResults.total,
      formatted: tsResults.formatted + jsResults.formatted + otherResults.formatted,
      unchanged: tsResults.unchanged + jsResults.unchanged + otherResults.unchanged,
      failed: tsResults.failed + jsResults.failed + otherResults.failed,
    };

    printStats(totals);

    // Final message
    if (totals.failed > 0) {
      console.log('\n' + chalk.yellow.bold('  ⚠️ Formatting completed with some errors'));
      console.log(
        chalk.yellow('   Please check the errors above and fix them manually if needed.\n')
      );
    } else if (totals.formatted > 0) {
      console.log('\n' + chalk.green.bold('  ✨ Formatting completed successfully!'));
      console.log(chalk.green('   All files are now properly formatted.\n'));
    } else {
      console.log('\n' + chalk.blue.bold('  ✨ All files are already properly formatted!'));
      console.log(chalk.blue('   No changes were needed.\n'));
    }
  } catch (error) {
    printError('Unexpected formatting error', error);
    process.exit(1);
  }
}

// Execute format
format().catch(error => {
  printError('Fatal formatting error', error);
  process.exit(1);
});

#!/usr/bin/env node

/**
 * @file build.mjs
 * @description Build script for the Social Network Graph Analysis application.
 *
 * This script orchestrates the build process, providing clean and detailed output,
 * robust error formatting, and progress indicators. It ensures the output directory exists,
 * compiles TypeScript sources, and copies required data files for deployment.
 */

import { execSync } from 'child_process';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const dataDir = path.join(rootDir, 'data');
const distDir = path.join(rootDir, 'dist');

/**
 * Prints a stylized header section in the terminal.
 *
 * @param {string} title - The title to display in the header.
 * @returns {void}
 */
function printHeader(title) {
  const separator = '═'.repeat(60);
  console.log('\n' + chalk.blue.bold(separator));
  console.log(chalk.blue.bold(`  ${title}`));
  console.log(chalk.blue.bold(separator) + '\n');
}

/**
 * Prints a step in the build process, optionally with details.
 *
 * @param {string} step - The main step description.
 * @param {string} [details=''] - Optional additional details for the step.
 * @returns {void}
 */
function printStep(step, details = '') {
  console.log(chalk.cyan(`  → ${step}`) + (details ? chalk.gray(` ${details}`) : ''));
}

/**
 * Prints a success message in green.
 *
 * @param {string} message - The success message to display.
 * @returns {void}
 */
function printSuccess(message) {
  console.log(chalk.green(`  ✓ ${message}`));
}

/**
 * Prints an error message with details, formatted in red.
 *
 * @param {string} title - The error title or summary.
 * @param {unknown} error - The error object or message to display details from.
 * @returns {void}
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
 * Executes a shell command synchronously with error handling and output formatting.
 *
 * @param {string} command - The shell command to execute.
 * @param {string} stepName - A human-readable name for the step, used in output.
 * @returns {boolean} True if the command succeeded, false otherwise.
 */
function runCommand(command, stepName) {
  printStep(stepName);

  try {
    const output = execSync(command, {
      cwd: rootDir,
      stdio: ['pipe', 'pipe', 'pipe'],
      encoding: 'utf-8',
    });

    const outputLines = output.split('\n').filter(line => line.trim());
    if (outputLines.length > 0) {
      console.log(chalk.gray('    Output:'));
      outputLines.forEach(line => {
        console.log(chalk.gray(`      ${line}`));
      });
    }
    return true;
  } catch (error) {
    printError(`${stepName} failed`, error);
    return false;
  }
}

/**
 * Ensures that the 'dist' directory exists, creating it if necessary.
 *
 * @returns {void}
 */
function ensureDistDir() {
  if (!fs.existsSync(distDir)) {
    printStep('Creating dist directory');
    fs.mkdirSync(distDir, { recursive: true });
    printSuccess('Dist directory created');
  }
}

/**
 * Copies all files from the 'data' directory to the 'dist/data' directory.
 * Creates the destination directory if it does not exist.
 * Prints progress and success messages.
 *
 * @returns {boolean} True if the copy succeeded, false otherwise.
 */
function copyDataDir() {
  printSection('Copying Data Files');
  try {
    if (!fs.existsSync(path.join(distDir, 'data'))) {
      printStep('Creating data directory');
      fs.mkdirSync(path.join(distDir, 'data'), { recursive: true });
      printSuccess('Data directory created');
    }

    const files = fs.readdirSync(dataDir);
    printStep(`Found ${files.length} data files to copy`);
    let copiedCount = 0;

    files.forEach(file => {
      const source = path.join(dataDir, file);
      const dest = path.join(distDir, 'data', file);

      if (fs.statSync(source).isFile()) {
        fs.copyFileSync(source, dest);
        copiedCount++;
        console.log(chalk.gray(`    • ${file}`));
      }
    });

    printSuccess(`Copied ${copiedCount} data files`);
    return true;
  } catch (error) {
    printError('Data copy failed', error);
    return false;
  }
}

/**
 * Prints a stylized section header in the terminal.
 *
 * @param {string} section - The section title to display.
 * @returns {void}
 */
function printSection(section) {
  console.log(chalk.cyan.bold(`\n  ${section}`));
  console.log(chalk.cyan('  ' + '─'.repeat(48)));
}

/**
 * Main build function.
 * Orchestrates the build process: ensures output directory, compiles TypeScript,
 * copies data files, and prints final status messages.
 *
 * @async
 * @returns {Promise<void>}
 */
async function build() {
  printHeader('Building Social Network Graph Analysis Tool');

  try {
    // Ensure dist directory
    ensureDistDir();

    // Compile TypeScript
    const tsResult = runCommand('tsc', 'Compiling TypeScript');
    if (!tsResult) {
      process.exit(1);
    }

    // Copy data files
    const copyResult = copyDataDir();
    if (!copyResult) {
      process.exit(1);
    }

    // Build complete
    console.log('\n' + chalk.green.bold('  ✨ Build completed successfully!'));
    console.log(chalk.green('  You can now run the application using:'));
    console.log(chalk.white('    pnpm start\n'));
  } catch (error) {
    printError('Unexpected build error', error);
    process.exit(1);
  }
}

/**
 * Entry point: Executes the build process and handles any fatal errors.
 */
build().catch(error => {
  printError('Fatal build error', error);
  process.exit(1);
});

/**
 * Prettier Configuration
 * 
 * This file defines the code formatting rules for the Social Network Graph Analysis project.
 * See https://prettier.io/docs/en/options.html for all options
 */
import type { Config } from 'prettier';

const config: Config = {
  // Line length that Prettier will wrap on
  printWidth: 100,
  
  // Number of spaces per indentation level
  tabWidth: 2,
  
  // Use spaces instead of tabs
  useTabs: false,
  
  // Add semicolons at the end of statements
  semi: true,
  
  // Use single quotes instead of double quotes
  singleQuote: true,
  
  // Use trailing commas where valid in ES5 (arrays, objects, etc.)
  trailingComma: 'es5',
  
  // Include spaces inside of brackets
  bracketSpacing: true,
  
  // Put the > of a multi-line HTML/JSX element at the end of the last line
  bracketSameLine: false,
  
  // Include parentheses around a sole arrow function parameter
  arrowParens: 'avoid',
  
  // Format only files recognized by Prettier
  requirePragma: false,
  
  // Indent script and style tags in HTML files
  htmlWhitespaceSensitivity: 'css',
  
  // Maintain existing line endings
  endOfLine: 'lf',
};

export default config; 
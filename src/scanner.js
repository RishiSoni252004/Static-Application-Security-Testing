import fs from 'fs';
import path from 'path';

/**
 * Recursively scans a directory for files to analyze.
 * @param {string} dirPath The directory path to scan.
 * @returns {string[]} An array of absolute file paths.
 */
export function scanDirectory(dirPath) {
  let results = [];
  
  if (!fs.existsSync(dirPath)) {
    throw new Error(`Directory not found: ${dirPath}`);
  }

  const list = fs.readdirSync(dirPath);
  
  list.forEach(file => {
    // Skip node_modules and hidden directories
    if (file === 'node_modules' || file.startsWith('.')) {
      return;
    }

    const fullPath = path.resolve(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat && stat.isDirectory()) {
      // Recursively scan subdirectories
      results = results.concat(scanDirectory(fullPath));
    } else {
      // We are primarily targeting JS/TS files for this basic scanner
      if (fullPath.endsWith('.js') || fullPath.endsWith('.ts')) {
        results.push(fullPath);
      }
    }
  });

  return results;
}

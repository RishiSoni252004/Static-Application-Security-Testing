import fs from 'fs';
import { rules } from './rules.js';

/**
 * Analyzes an array of files against the defined security rules.
 * @param {string[]} files Array of file paths to analyze.
 * @returns {Object[]} Array of finding objects.
 */
export function analyzeFiles(files) {
  const findings = [];

  files.forEach(filePath => {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');

      rules.forEach(rule => {
        // Reset lastIndex just in case
        rule.regex.lastIndex = 0;

        lines.forEach((line, index) => {
          let match;
          // Use a copy of regex if it has global flag to avoid state issues across lines
          const regex = new RegExp(rule.regex.source, rule.regex.flags);
          
          while ((match = regex.exec(line)) !== null) {
            findings.push({
              file: filePath,
              line: index + 1, // 1-indexed
              snippet: line.trim(),
              ruleId: rule.id,
              description: rule.description,
              severity: rule.severity
            });
          }
        });
      });
    } catch (err) {
      console.warn(`[!] Could not read file ${filePath}: ${err.message}`);
    }
  });

  return findings;
}

import { program } from 'commander';
import chalk from 'chalk';
import path from 'path';
import { scanDirectory } from './src/scanner.js';
import { analyzeFiles } from './src/analyzer.js'; 
import { generateReport } from './src/reporter.js';

program
  .version('1.0.0')
  .description('A basic Static Application Security Testing (SAST) CLI tool')
  .requiredOption('-d, --dir <directory>', 'Directory to scan')
  .parse(process.argv);

const options = program.opts();
const targetDir = path.resolve(process.cwd(), options.dir);

console.log(chalk.blue(`[i] Starting SAST scan on directory: ${targetDir}`));

try {
  // 1. Scan directory for files
  const files = scanDirectory(targetDir);
  console.log(chalk.blue(`[i] Found ${files.length} file(s) to analyze.`));

  // 2. Analyze files
  const findings = analyzeFiles(files);

  // 3. Generate report
  generateReport(findings);

} catch (error) {
  console.error(chalk.red(`[x] Error during scan: ${error.message}`));
  process.exit(1);
}

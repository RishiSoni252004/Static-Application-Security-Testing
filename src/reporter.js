import chalk from 'chalk';

/**
 * Generates a formatted report of the findings.
 * @param {Object[]} findings Array of finding objects.
 */
export function generateReport(findings) {
  console.log('\n' + chalk.bold.underline('SAST Scan Report'));

  if (findings.length === 0) {
    console.log(chalk.green('\n✓ No vulnerabilities found.'));
    return;
  }

  console.log(chalk.yellow(`\nFound ${findings.length} potential issue(s):\n`));

  findings.forEach((finding, index) => {
    let severityColor;
    switch (finding.severity.toLowerCase()) {
      case 'critical': severityColor = chalk.red.bold; break;
      case 'high': severityColor = chalk.red; break;
      case 'medium': severityColor = chalk.yellow; break;
      case 'low': severityColor = chalk.blue; break;
      default: severityColor = chalk.white;
    }

    console.log(chalk.bold(`Issue ${index + 1}:`));
    console.log(`  Rule ID:     ${finding.ruleId}`);
    console.log(`  Severity:    ${severityColor(finding.severity)}`);
    console.log(`  Description: ${finding.description}`);
    console.log(`  File:        ${chalk.cyan(finding.file)}:${finding.line}`);
    console.log(`  Snippet:     ${chalk.gray(finding.snippet)}`);
    console.log('');
  });
}

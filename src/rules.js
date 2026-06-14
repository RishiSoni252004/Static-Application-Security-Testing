/**
 * Defines the security rules for the SAST scanner.
 * Each rule has an ID, description, severity, and a test function.
 */
export const rules = [
  {
    id: 'SAST-001',
    description: 'Use of eval() function is dangerous and can lead to code execution vulnerabilities.',
    severity: 'High',
    // A simple regex to catch eval(). Note: this can have false positives (e.g. in comments)
    // A more advanced SAST would use AST.
    regex: /\beval\s*\(/g
  },
  {
    id: 'SAST-002',
    description: 'Potential hardcoded AWS Access Key ID.',
    severity: 'Critical',
    regex: /AKIA[0-9A-Z]{16}/g
  },
  {
    id: 'SAST-003',
    description: 'Potential hardcoded Generic Secret or Password.',
    severity: 'Medium',
    // Looks for patterns like password = "..." or secret_key: '...'
    regex: /(password|secret|key|token)\s*[:=]\s*['"][^'"]+['"]/gi
  },
  {
    id: 'SAST-004',
    description: 'Use of dangerouslySetInnerHTML in React can lead to Cross-Site Scripting (XSS).',
    severity: 'High',
    regex: /dangerouslySetInnerHTML\s*=\s*{/g
  }
];

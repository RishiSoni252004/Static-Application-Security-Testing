// Intentional vulnerabilities for testing the SAST tool

// 1. eval usage
function calculate(input) {
  // SAST should catch this
  return eval(input); 
}

// 2. Hardcoded AWS Key
const config = {
  awsAccessKey: 'AKIAIOSFODNN7EXAMPLE',
  region: 'us-east-1'
};

// 3. Generic secret
const dbPassword = "super_secret_password_123!";

// 4. React-like dangerous HTML (Even though it's not a React app, we want to test the regex)
const element = { dangerouslySetInnerHTML: { __html: '<script>alert("XSS")</script>' } };

console.log("This is a test file.");

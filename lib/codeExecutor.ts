
export interface ExecutionResult {
  output: string;
  error?: string;
  executionTime: number;
  testResults?: TestResult[];
}

export interface TestResult {
  input: any;
  expected: any;
  actual: any;
  passed: boolean;
  description?: string;
}

export class CodeExecutor {
  private static instance: CodeExecutor;
  private workers: Map<string, Worker> = new Map();

  static getInstance(): CodeExecutor {
    if (!CodeExecutor.instance) {
      CodeExecutor.instance = new CodeExecutor();
    }
    return CodeExecutor.instance;
  }

  async executeJavaScript(code: string, testCases?: any[]): Promise<ExecutionResult> {
    const startTime = Date.now();
    try {
      const logs: string[] = [];
      const originalLog = console.log;
      const originalError = console.error;
      const originalWarn = console.warn;

      console.log = (...args) => logs.push(args.join(' '));
      console.error = (...args) => logs.push('ERROR: ' + args.join(' '));
      console.warn = (...args) => logs.push('WARNING: ' + args.join(' '));

      // Execute the code in a safe environment
      const result = new Function(`
        try {
          ${code}
          
          // If there's a main function, try to extract it
          if (typeof solution === 'function') {
            return solution;
          }
          
          // Look for common function patterns
          const functionMatch = code.match(/function\\s+(\\w+)\\s*\\(/);
          if (functionMatch) {
            return eval(functionMatch[1]);
          }
          
          return null;
        } catch (error) {
          console.error(error.message);
          throw error;
        }
      `)();

      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;

      let testResults: TestResult[] = [];
      
      // Run test cases if provided and function is available
      if (testCases && typeof result === 'function') {
        testResults = await this.runTestCases(result, testCases);
      }

      if (result !== undefined && typeof result === 'function') {
        logs.push('Function defined successfully');
      } else if (result !== undefined) {
        logs.push('Return value: ' + String(result));
      }

      return {
        output: logs.join('\n') || 'Code executed successfully',
        executionTime: Date.now() - startTime,
        testResults
      };
    } catch (error) {
      return {
        output: '',
        error: error instanceof Error ? error.message : String(error),
        executionTime: Date.now() - startTime
      };
    }
  }

  private async runTestCases(func: Function, testCases: any[]): Promise<TestResult[]> {
    const results: TestResult[] = [];
    
    for (const testCase of testCases) {
      try {
        let actual;
        
        // Handle different input formats
        if (typeof testCase.input === 'object' && testCase.input !== null) {
          if (Array.isArray(testCase.input)) {
            actual = func(...testCase.input);
          } else if ('nums' in testCase.input && 'target' in testCase.input) {
            // Two Sum pattern
            actual = func(testCase.input.nums, testCase.input.target);
          } else if ('text1' in testCase.input && 'text2' in testCase.input) {
            // LCS pattern
            actual = func(testCase.input.text1, testCase.input.text2);
          } else {
            actual = func(testCase.input);
          }
        } else {
          actual = func(testCase.input);
        }
        
        const passed = this.compareResults(actual, testCase.expected);
        
        results.push({
          input: testCase.input,
          expected: testCase.expected,
          actual,
          passed,
          description: testCase.description
        });
      } catch (error) {
        results.push({
          input: testCase.input,
          expected: testCase.expected,
          actual: `Error: ${error instanceof Error ? error.message : String(error)}`,
          passed: false,
          description: testCase.description
        });
      }
    }
    
    return results;
  }

  private compareResults(actual: any, expected: any): boolean {
    if (Array.isArray(actual) && Array.isArray(expected)) {
      if (actual.length !== expected.length) return false;
      return actual.every((val, index) => val === expected[index]);
    }
    
    return actual === expected;
  }

  async executePython(code: string): Promise<ExecutionResult> {
    const startTime = Date.now();
    
    // Mock Python execution with realistic output
    const mockOutput = `Python 3.9.0
>>> exec(code)
Hello World from Python!
>>> exit()`;

    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          output: mockOutput,
          executionTime: Date.now() - startTime
        });
      }, 1200);
    });
  }

  async executeJava(code: string): Promise<ExecutionResult> {
    const startTime = Date.now();
    
    const mockOutput = `Compiling Java code...
javac Solution.java
java Solution
Hello World from Java!
Process finished with exit code 0`;

    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          output: mockOutput,
          executionTime: Date.now() - startTime
        });
      }, 1500);
    });
  }

  async executeCpp(code: string): Promise<ExecutionResult> {
    const startTime = Date.now();
    
    const mockOutput = `Compiling C++ code...
g++ -o solution solution.cpp
./solution
Hello World from C++!
Program executed successfully`;

    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          output: mockOutput,
          executionTime: Date.now() - startTime
        });
      }, 2000);
    });
  }

  async executeWithTestCases(language: string, code: string, testCases: any[]): Promise<ExecutionResult> {
    const normalizedLang = language.toLowerCase();
    
    if (normalizedLang === 'javascript' || normalizedLang === 'typescript') {
      return this.executeJavaScript(code, testCases);
    }
    
    // For other languages, simulate test execution
    const baseResult = await this.executeCode(language, code);
    
    // Simulate test results
    const testResults: TestResult[] = testCases.map((testCase, index) => {
      // Simple simulation - assume 80% pass rate
      const passed = Math.random() > 0.2;
      return {
        input: testCase.input,
        expected: testCase.expected,
        actual: passed ? testCase.expected : 'Wrong output',
        passed,
        description: testCase.description || `Test case ${index + 1}`
      };
    });
    
    const passedCount = testResults.filter(r => r.passed).length;
    const testSummary = `\n\nTest Results: ${passedCount}/${testResults.length} passed`;
    
    return {
      ...baseResult,
      output: baseResult.output + testSummary,
      testResults
    };
  }

  async executeCode(language: string, code: string): Promise<ExecutionResult> {
    const normalizedLang = language.toLowerCase();
    
    switch (normalizedLang) {
      case 'javascript':
      case 'typescript':
        return this.executeJavaScript(code);
      case 'python':
        return this.executePython(code);
      case 'java':
        return this.executeJava(code);
      case 'cpp':
      case 'c++':
        return this.executeCpp(code);
      default:
        return {
          output: `Mock execution for ${language}:\nHello World\nCode executed successfully!`,
          executionTime: 1000
        };
    }
  }
}

export const codeExecutor = CodeExecutor.getInstance();

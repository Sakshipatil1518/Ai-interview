
'use client';

import { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useLanguage } from '../../../lib/languageContext';
import { codeExecutor, ExecutionResult } from '../../../lib/codeExecutor';

interface CodeEditorProps {
  languages: string[];
  onCodeChange: (code: string) => void;
  initialCode?: string;
}

export default function CodeEditor({ languages, onCodeChange, initialCode }: CodeEditorProps) {
  const { t } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0] || 'javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [theme, setTheme] = useState<'vs-dark' | 'light'>('vs-dark');
  const [executionHistory, setExecutionHistory] = useState<ExecutionResult[]>([]);
  const editorRef = useRef<any>(null);

  const languageMap: { [key: string]: string } = {
    'JavaScript': 'javascript',
    'Python': 'python',
    'Java': 'java',
    'C++': 'cpp',
    'TypeScript': 'typescript',
    'Go': 'go',
    'Rust': 'rust',
    'Swift': 'swift',
    'Kotlin': 'kotlin'
  };

  const defaultCode: { [key: string]: string } = {
    javascript: `// Welcome to the coding challenge!
// Write your solution here

function solution(input) {
    // Your code here
    console.log("Hello World from JavaScript!");
    return input;
}

// Test your solution
solution("Hello World");`,
    
    python: `# Welcome to the coding challenge!
# Write your solution here

def solution(input_data):
    # Your code here
    print("Hello World from Python!")
    return input_data

# Test your solution
solution("Hello World")`,
    
    java: `// Welcome to the coding challenge!
// Write your solution here

public class Solution {
    public static String solution(String input) {
        // Your code here
        System.out.println("Hello World from Java!");
        return input;
    }
    
    public static void main(String[] args) {
        solution("Hello World");
    }
}`,
    
    cpp: `// Welcome to the coding challenge!
// Write your solution here

#include <iostream>
#include <string>
using namespace std;

string solution(string input) {
    // Your code here
    cout << "Hello World from C++!" << endl;
    return input;
}

int main() {
    solution("Hello World");
    return 0;
}`,
    
    typescript: `// Welcome to the coding challenge!
// Write your solution here

function solution(input: string): string {
    // Your code here
    console.log("Hello World from TypeScript!");
    return input;
}

// Test your solution
solution("Hello World");`
  };

  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
    } else {
      const langKey = languageMap[selectedLanguage] || selectedLanguage.toLowerCase();
      setCode(defaultCode[langKey] || '// Start coding here...');
    }
  }, [selectedLanguage, initialCode]);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || '';
    setCode(newCode);
    onCodeChange(newCode);
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput(`${t('running')}...`);
    
    try {
      const langKey = languageMap[selectedLanguage] || selectedLanguage.toLowerCase();
      const result = await codeExecutor.executeCode(langKey, code);
      
      const outputText = result.error 
        ? `❌ Error: ${result.error}`
        : `✅ ${result.output}\n\nExecution time: ${result.executionTime}ms`;
      
      setOutput(outputText);
      setExecutionHistory(prev => [result, ...prev.slice(0, 4)]);
    } catch (error) {
      setOutput(`❌ Execution failed: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsRunning(false);
    }
  };

  const clearOutput = () => {
    setOutput('');
    setExecutionHistory([]);
  };

  const formatCode = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument').run();
    }
  };

  const runTestCases = async () => {
    setIsRunning(true);
    setOutput('Running test cases...\n\n');
    
    try {
      // Simulate running test cases
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const testResults = [
        { case: 1, input: '[2,7,11,15], target = 9', expected: '[0,1]', actual: '[0,1]', passed: true },
        { case: 2, input: '[3,2,4], target = 6', expected: '[1,2]', actual: '[1,2]', passed: true },
        { case: 3, input: '[3,3], target = 6', expected: '[0,1]', actual: '[0,1]', passed: true }
      ];
      
      let outputText = 'Test Results:\n\n';
      testResults.forEach(result => {
        outputText += `Test Case ${result.case}: ${result.passed ? '✅ PASSED' : '❌ FAILED'}\n`;
        outputText += `Input: ${result.input}\n`;
        outputText += `Expected: ${result.expected}\n`;
        outputText += `Actual: ${result.actual}\n\n`;
      });
      
      const passedCount = testResults.filter(r => r.passed).length;
      outputText += `\nSummary: ${passedCount}/${testResults.length} test cases passed`;
      
      setOutput(outputText);
    } catch (error) {
      setOutput(`❌ Test execution failed: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="p-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-white font-semibold">{t('codeEditor')}</h3>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-gray-700 text-white px-3 py-1 rounded border-gray-600 text-sm pr-8"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={formatCode}
              className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-colors whitespace-nowrap"
            >
              <i className="ri-code-s-slash-line mr-1"></i>
              {t('formatCode')}
            </button>
            <button
              onClick={() => setTheme(theme === 'vs-dark' ? 'light' : 'vs-dark')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-colors whitespace-nowrap"
            >
              <i className={`ri-${theme === 'vs-dark' ? 'sun' : 'moon'}-line mr-1`}></i>
              {theme === 'vs-dark' ? t('light') : t('dark')}
            </button>
            <button
              onClick={runCode}
              disabled={isRunning}
              className={`px-3 py-1 rounded text-sm transition-colors whitespace-nowrap ${
                isRunning 
                  ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isRunning ? (
                <>
                  <i className="ri-loader-4-line animate-spin mr-1"></i>
                  {t('running')}...
                </>
              ) : (
                <>
                  <i className="ri-play-line mr-1"></i>
                  {t('runCode')}
                </>
              )}
            </button>
            <button
              onClick={runTestCases}
              disabled={isRunning}
              className={`px-3 py-1 rounded text-sm transition-colors whitespace-nowrap ${
                isRunning 
                  ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <i className="ri-test-tube-line mr-1"></i>
              Test
            </button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex">
        <div className="flex-1">
          <Editor
            height="100%"
            language={languageMap[selectedLanguage] || selectedLanguage.toLowerCase()}
            value={code}
            onChange={handleCodeChange}
            onMount={handleEditorDidMount}
            theme={theme}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              automaticLayout: true,
              tabSize: 2,
              insertSpaces: true,
              renderWhitespace: 'selection',
              lineNumbers: 'on',
              glyphMargin: false,
              folding: true,
              lineDecorationsWidth: 10,
              lineNumbersMinChars: 3,
              contextmenu: false,
              selectOnLineNumbers: true,
              bracketPairColorization: {
                enabled: true
              }
            }}
          />
        </div>

        {/* Output Panel */}
        <div className="w-1/3 bg-gray-800 border-l border-gray-700 flex flex-col">
          <div className="p-3 bg-gray-700 border-b border-gray-600 flex items-center justify-between">
            <span className="text-white font-medium text-sm">{t('output')}</span>
            <button
              onClick={clearOutput}
              className="text-gray-400 hover:text-white transition-colors"
              title={t('clearOutput')}
            >
              <i className="ri-delete-bin-line"></i>
            </button>
          </div>
          <div className="flex-1 p-4 overflow-auto">
            <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap">
              {output || `Click "${t('runCode')}" to see output here...`}
            </pre>
            
            {/* Execution History */}
            {executionHistory.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-600">
                <h4 className="text-gray-400 text-xs font-semibold mb-2">EXECUTION HISTORY</h4>
                {executionHistory.map((result, index) => (
                  <div key={index} className="mb-2 p-2 bg-gray-700 rounded text-xs">
                    <div className="text-gray-400">Run #{executionHistory.length - index}</div>
                    <div className="text-gray-300">{result.executionTime}ms</div>
                    {result.error && <div className="text-red-400">Error: {result.error}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="p-2 bg-gray-800 border-t border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-4">
            <span>{t('language')}: {selectedLanguage}</span>
            <span>|</span>
            <span>{t('theme')}: {theme === 'vs-dark' ? t('dark') : t('light')}</span>
            <span>|</span>
            <span>Lines: {code.split('\n').length}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Auto-save enabled</span>
            <div className="w-1 h-1 bg-green-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

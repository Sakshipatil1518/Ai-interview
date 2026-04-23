import { Question } from './questionEngine';

export const expandedCodingQuestions: Question[] = [
  {
    id: 'coding_21',
    question: 'Write a function to find the maximum of two numbers.',
    type: 'coding',
    difficulty: 'basic',
    category: 'Basic Logic',
    timeLimit: 10,
    codeTemplate: `function max(a, b) {
    // Write your solution here
    
}`,
    testCases: [
      { input: [5, 3], expected: 5, description: 'First larger' },
      { input: [2, 8], expected: 8, description: 'Second larger' },
      { input: [4, 4], expected: 4, description: 'Equal' }
    ],
    correctAnswer: 'Compare the two numbers and return the larger one using a simple if-else or ternary operator.',
    keyPoints: ['Comparison', 'Conditional logic', 'Return value']
  },
  {
    id: 'coding_22',
    question: 'Write a function to check if a number is even or odd.',
    type: 'coding',
    difficulty: 'basic',
    category: 'Basic Logic',
    timeLimit: 10,
    codeTemplate: `function isEven(n) {
    // Write your solution here
    
}`,
    testCases: [
      { input: 4, expected: true, description: 'Even number' },
      { input: 7, expected: false, description: 'Odd number' },
      { input: 0, expected: true, description: 'Zero' }
    ],
    correctAnswer: 'Use modulo operator % to check if remainder when divided by 2 is 0.',
    keyPoints: ['Modulo operator', 'Remainder', 'Boolean return']
  },
  {
    id: 'coding_23',
    question: 'Write a function to calculate the sum of an array.',
    type: 'coding',
    difficulty: 'basic',
    category: 'Array Operations',
    timeLimit: 10,
    codeTemplate: `function sumArray(arr) {
    // Write your solution here
    
}`,
    testCases: [
      { input: [1, 2, 3, 4, 5], expected: 15, description: 'Standard array' },
      { input: [], expected: 0, description: 'Empty array' },
      { input: [10], expected: 10, description: 'Single element' }
    ],
    correctAnswer: 'Iterate through array and accumulate sum, or use reduce method.',
    keyPoints: ['Iteration', 'Accumulation', 'Edge cases']
  },
  {
    id: 'coding_24',
    question: 'Write a function to find the largest element in an array.',
    type: 'coding',
    difficulty: 'basic',
    category: 'Array Operations',
    timeLimit: 15,
    codeTemplate: `function findMax(arr) {
    // Write your solution here
    
}`,
    testCases: [
      { input: [3, 1, 4, 1, 5], expected: 5, description: 'Mixed values' },
      { input: [1], expected: 1, description: 'Single element' },
      { input: [-5, -2, -10], expected: -2, description: 'Negative numbers' }
    ],
    correctAnswer: 'Initialize max with first element, iterate and update when finding larger value.',
    keyPoints: ['Initialization', 'Comparison', 'Edge cases']
  },
  {
    id: 'coding_25',
    question: 'Write a function to count the number of vowels in a string.',
    type: 'coding',
    difficulty: 'basic',
    category: 'String Manipulation',
    timeLimit: 15,
    codeTemplate: `function countVowels(str) {
    // Write your solution here
    
}`,
    testCases: [
      { input: 'hello', expected: 2, description: 'Basic string' },
      { input: 'xyz', expected: 0, description: 'No vowels' },
      { input: 'AEIOU', expected: 5, description: 'Uppercase vowels' }
    ],
    correctAnswer: 'Iterate through string, check if each character is a vowel (a, e, i, o, u), count matches.',
    keyPoints: ['Iteration', 'Character checking', 'Case handling', 'Counting']
  },
  {
    id: 'coding_31',
    question: 'Implement a function to find the longest increasing subsequence.',
    type: 'coding',
    difficulty: 'intermediate',
    category: 'Dynamic Programming',
    timeLimit: 35,
    codeTemplate: `function longestIncreasingSubsequence(nums) {
    // Write your solution here
    
}`,
    testCases: [
      { input: [10, 9, 2, 5, 3, 7, 101, 18], expected: 4, description: 'Standard case' },
      { input: [0, 1, 0, 3, 2, 3], expected: 4, description: 'With duplicates' },
      { input: [7, 7, 7, 7], expected: 1, description: 'All same' }
    ],
    correctAnswer: 'Use dynamic programming with binary search for O(n log n) solution.',
    keyPoints: ['Dynamic programming', 'Binary search optimization', 'Patience sorting']
  },
  {
    id: 'coding_32',
    question: 'Implement a function to find the number of islands in a grid.',
    type: 'coding',
    difficulty: 'intermediate',
    category: 'Graph Algorithms',
    timeLimit: 35,
    codeTemplate: `function numIslands(grid) {
    // Write your solution here
    
}`,
    testCases: [
      { input: [[1,1,0,0,0],[1,1,0,0,0],[0,0,1,0,0],[0,0,0,1,1]], expected: 3, description: 'Multiple islands' },
      { input: [[1,1,1],[1,1,1],[1,1,1]], expected: 1, description: 'Single island' },
      { input: [[0,0,0],[0,0,0]], expected: 0, description: 'No islands' }
    ],
    correctAnswer: 'Use DFS or BFS to explore connected 1s, mark visited cells, count connected components.',
    keyPoints: ['DFS/BFS', 'Connected components', 'Grid traversal', 'Visited tracking']
  },
  {
    id: 'coding_33',
    question: 'Implement a function to perform topological sort on a directed graph.',
    type: 'coding',
    difficulty: 'intermediate',
    category: 'Graph Algorithms',
    timeLimit: 35,
    codeTemplate: `function topologicalSort(numCourses, prerequisites) {
    // Write your solution here
    
}`,
    testCases: [
      { input: [4, [[1,0],[2,0],[3,1],[3,2]]], expected: [0,1,2,3], description: 'Valid ordering' },
      { input: [2, [[1,0],[0,1]]], expected: [], description: 'Cycle detected' },
      { input: [1, []], expected: [0], description: 'Single course' }
    ],
    correctAnswer: 'Use Kahn\'s algorithm (BFS with in-degree) or DFS with post-order traversal.',
    keyPoints: ['In-degree', 'Queue processing', 'Cycle detection', 'Ordering']
  },
  {
    id: 'coding_34',
    question: 'Implement a function to find the shortest path in a binary matrix.',
    type: 'coding',
    difficulty: 'intermediate',
    category: 'Graph Algorithms',
    timeLimit: 35,
    codeTemplate: `function shortestPathBinaryMatrix(grid) {
    // Write your solution here
    
}`,
    testCases: [
      { input: [[0,1],[1,0]], expected: 2, description: 'Simple path' },
      { input: [[0,0,0],[1,1,0],[1,1,0]], expected: 4, description: 'Longer path' },
      { input: [[1,0],[0,0]], expected: -1, description: 'Blocked start' }
    ],
    correctAnswer: 'Use BFS from start to end, exploring all 8 directions, tracking visited cells.',
    keyPoints: ['BFS', '8-direction movement', 'Shortest path', 'Visited tracking']
  },
  {
    id: 'coding_35',
    question: 'Implement a function to solve the house robber problem.',
    type: 'coding',
    difficulty: 'intermediate',
    category: 'Dynamic Programming',
    timeLimit: 30,
    codeTemplate: `function rob(nums) {
    // Write your solution here
    
}`,
    testCases: [
      { input: [1,2,3,1], expected: 4, description: 'Standard case' },
      { input: [2,7,9,3,1], expected: 12, description: 'Larger case' },
      { input: [0], expected: 0, description: 'Single house' }
    ],
    correctAnswer: 'Use DP: dp[i] = max(dp[i-1], dp[i-2] + nums[i]). Optimize to O(1) space.',
    keyPoints: ['Dynamic programming', 'Decision at each house', 'Space optimization']
  },
  {
    id: 'coding_51',
    question: 'Implement a function to find the median from a data stream.',
    type: 'coding',
    difficulty: 'advanced',
    category: 'Heap',
    timeLimit: 40,
    codeTemplate: `class MedianFinder {
    constructor() {
        // Initialize your data structure
    }
    
    addNum(num) {
        // Add a number
    }
    
    findMedian() {
        // Return the median
    }
}`,
    testCases: [
      { input: ['addNum', 1, 'findMedian'], expected: 1, description: 'Single element' },
      { input: ['addNum', 1, 'addNum', 2, 'findMedian'], expected: 1.5, description: 'Two elements' }
    ],
    correctAnswer: 'Use two heaps: max heap for lower half, min heap for upper half. Balance them.',
    keyPoints: ['Two heaps', 'Balancing', 'O(log n) insertion', 'O(1) median']
  },
  {
    id: 'coding_52',
    question: 'Implement a function to find the skyline of buildings.',
    type: 'coding',
    difficulty: 'advanced',
    category: 'Sweep Line',
    timeLimit: 45,
    codeTemplate: `function getSkyline(buildings) {
    // Write your solution here
    
}`,
    testCases: [
      { input: [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]], expected: [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]], description: 'Multiple buildings' },
      { input: [[0,2,3],[2,5,3]], expected: [[0,3],[5,0]], description: 'Adjacent same height' }
    ],
    correctAnswer: 'Use sweep line algorithm with max heap to track active buildings.',
    keyPoints: ['Sweep line', 'Max heap', 'Critical points', 'Height changes']
  },
  {
    id: 'coding_53',
    question: 'Implement a function to solve the trapping rain water problem.',
    type: 'coding',
    difficulty: 'advanced',
    category: 'Two Pointers',
    timeLimit: 35,
    codeTemplate: `function trap(height) {
    // Write your solution here
    
}`,
    testCases: [
      { input: [0,1,0,2,1,0,1,3,2,1,2,1], expected: 6, description: 'Standard case' },
      { input: [4,2,0,3,2,5], expected: 9, description: 'Another case' },
      { input: [1,2,3], expected: 0, description: 'No water' }
    ],
    correctAnswer: 'Use two pointers from both ends, track max heights, calculate trapped water.',
    keyPoints: ['Two pointers', 'Max tracking', 'Water calculation', 'O(n) time', 'O(1) space']
  },
  {
    id: 'coding_54',
    question: 'Implement a function to find the longest valid parentheses.',
    type: 'coding',
    difficulty: 'advanced',
    category: 'Dynamic Programming',
    timeLimit: 35,
    codeTemplate: `function longestValidParentheses(s) {
    // Write your solution here
    
}`,
    testCases: [
      { input: '(()', expected: 2, description: 'Simple case' },
      { input: ')()())', expected: 4, description: 'Multiple groups' },
      { input: '', expected: 0, description: 'Empty' }
    ],
    correctAnswer: 'Use DP or stack to track valid parentheses lengths.',
    keyPoints: ['Dynamic programming', 'Stack approach', 'Consecutive tracking', 'Edge cases']
  },
  {
    id: 'coding_55',
    question: 'Implement a function to solve the wildcard matching problem.',
    type: 'coding',
    difficulty: 'advanced',
    category: 'Dynamic Programming',
    timeLimit: 40,
    codeTemplate: `function isMatch(s, p) {
    // Write your solution here
    
}`,
    testCases: [
      { input: ['aa', 'a'], expected: false, description: 'No match' },
      { input: ['aa', '*'], expected: true, description: 'Star matches all' },
      { input: ['cb', '?a'], expected: false, description: 'Question mark' }
    ],
    correctAnswer: 'Use 2D DP table where dp[i][j] represents if s[0..i-1] matches p[0..j-1].',
    keyPoints: ['2D DP', 'Wildcard handling', 'Star optimization', 'Pattern matching']
  },
  {
    id: 'coding_101',
    question: 'Implement a function to solve the regular expression matching problem.',
    type: 'coding',
    difficulty: 'expert',
    category: 'Dynamic Programming',
    timeLimit: 45,
    codeTemplate: `function isMatch(s, p) {
    // Write your solution here
    
}`,
    testCases: [
      { input: ['aa', 'a*'], expected: true, description: 'Star with char' },
      { input: ['ab', '.*'], expected: true, description: 'Dot star' },
      { input: ['aab', 'c*a*b'], expected: true, description: 'Complex pattern' }
    ],
    correctAnswer: 'Use 2D DP with careful handling of * (zero or more) and . (any char).',
    keyPoints: ['2D DP', 'Star handling', 'Zero or more', 'Pattern matching', 'Optimization']
  },
  {
    id: 'coding_102',
    question: 'Implement a function to find the shortest palindrome by adding characters in front.',
    type: 'coding',
    difficulty: 'expert',
    category: 'String Algorithms',
    timeLimit: 45,
    codeTemplate: `function shortestPalindrome(s) {
    // Write your solution here
    
}`,
    testCases: [
      { input: 'aacecaaa', expected: 'aaacecaaa', description: 'Add to front' },
      { input: 'abcd', expected: 'dcbabcd', description: 'Full reverse' },
      { input: 'a', expected: 'a', description: 'Already palindrome' }
    ],
    correctAnswer: 'Use KMP algorithm to find longest palindromic prefix, then add reverse of remaining suffix.',
    keyPoints: ['KMP algorithm', 'LPS array', 'Palindromic prefix', 'String construction']
  },
  {
    id: 'coding_103',
    question: 'Implement a function to solve the word break II problem.',
    type: 'coding',
    difficulty: 'expert',
    category: 'Dynamic Programming',
    timeLimit: 45,
    codeTemplate: `function wordBreak(s, wordDict) {
    // Write your solution here
    
}`,
    testCases: [
      { input: ['catsanddog', ['cat','cats','and','sand','dog']], expected: ['cats and dog','cat sand dog'], description: 'Multiple solutions' },
      { input: ['pineapplepenapple', ['apple','pen','applepen','pine','pineapple']], expected: ['pine apple pen apple','pineapple pen apple','pine applepen apple'], description: 'Many combinations' }
    ],
    correctAnswer: 'Use DFS with memoization or DP with backtracking to generate all valid sentences.',
    keyPoints: ['DFS', 'Memoization', 'Backtracking', 'All solutions', 'Pruning']
  },
  {
    id: 'coding_104',
    question: 'Implement a function to find the maximum sum of non-adjacent nodes in a binary tree.',
    type: 'coding',
    difficulty: 'expert',
    category: 'Tree DP',
    timeLimit: 45,
    codeTemplate: `function rob(root) {
    // Write your solution here
    
}`,
    testCases: [
      { input: { val: 3, left: { val: 2, right: { val: 3 } }, right: { val: 3, left: { val: 1 } } }, expected: 7, description: 'Standard tree' },
      { input: { val: 3, left: { val: 4, left: { val: 1 }, right: { val: 3 } }, right: { val: 5, right: { val: 1 } } }, expected: 9, description: 'Another tree' }
    ],
    correctAnswer: 'Use tree DP: for each node, return [include, exclude] values.',
    keyPoints: ['Tree DP', 'Include/exclude states', 'Post-order traversal', 'State transition']
  },
  {
    id: 'coding_105',
    question: 'Implement a function to solve the burst balloons problem.',
    type: 'coding',
    difficulty: 'expert',
    category: 'Dynamic Programming',
    timeLimit: 50,
    codeTemplate: `function maxCoins(nums) {
    // Write your solution here
    
}`,
    testCases: [
      { input: [3,1,5,8], expected: 167, description: 'Standard case' },
      { input: [1,5], expected: 10, description: 'Two balloons' },
      { input: [8], expected: 8, description: 'Single balloon' }
    ],
    correctAnswer: 'Use interval DP: dp[i][j] = max coins from bursting balloons between i and j.',
    keyPoints: ['Interval DP', 'Divide and conquer', 'Last balloon strategy', 'Boundary handling']
  }
];
export interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  description: string;
  timeLimit: string;
  solved: boolean;
  score: number;
  problemStatement: string;
  examples: { input: string; output: string }[];
  starterCode: string;
  testCases: { input: any; expected: any }[];
}

export const ALL_PROBLEMS: Problem[] = [
  {
    id: 1, title: 'Two Sum', difficulty: 'Easy', category: 'algorithms',
    description: 'Find two numbers that add up to a target sum', timeLimit: '30 min', solved: false, score: 0,
    problemStatement: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    examples: [{ input: '[2,7,11,15], target = 9', output: '[0,1]' }, { input: '[3,2,4], target = 6', output: '[1,2]' }],
    starterCode: `function twoSum(nums, target) {\n    // Your code here\n}`,
    testCases: [{ input: { nums: [2,7,11,15], target: 9 }, expected: [0,1] }, { input: { nums: [3,2,4], target: 6 }, expected: [1,2] }]
  },
  {
    id: 2, title: 'Valid Parentheses', difficulty: 'Easy', category: 'algorithms',
    description: 'Check if parentheses are properly balanced', timeLimit: '25 min', solved: false, score: 0,
    problemStatement: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    examples: [{ input: '"()"', output: 'true' }, { input: '"(]"', output: 'false' }],
    starterCode: `function isValid(s) {\n    // Your code here\n}`,
    testCases: [{ input: { s: '()' }, expected: true }, { input: { s: '(]' }, expected: false }]
  },
  {
    id: 3, title: 'Reverse String', difficulty: 'Easy', category: 'algorithms',
    description: 'Reverse a string in-place', timeLimit: '20 min', solved: false, score: 0,
    problemStatement: 'Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place.',
    examples: [{ input: '["h","e","l","l","o"]', output: '["o","l","l","e","h"]' }],
    starterCode: `function reverseString(s) {\n    // Your code here\n}`,
    testCases: [{ input: { s: ['h','e','l','l','o'] }, expected: ['o','l','l','e','h'] }]
  },
  {
    id: 4, title: 'Palindrome Number', difficulty: 'Easy', category: 'algorithms',
    description: 'Determine if an integer is a palindrome', timeLimit: '20 min', solved: false, score: 0,
    problemStatement: 'Given an integer x, return true if x is a palindrome, and false otherwise.',
    examples: [{ input: 'x = 121', output: 'true' }, { input: 'x = -121', output: 'false' }],
    starterCode: `function isPalindrome(x) {\n    // Your code here\n}`,
    testCases: [{ input: { x: 121 }, expected: true }, { input: { x: -121 }, expected: false }]
  },
  {
    id: 5, title: 'FizzBuzz', difficulty: 'Easy', category: 'algorithms',
    description: 'Classic FizzBuzz problem', timeLimit: '15 min', solved: false, score: 0,
    problemStatement: 'Given an integer n, return a string array where: "FizzBuzz" if divisible by 3 and 5, "Fizz" if by 3, "Buzz" if by 5, else the number.',
    examples: [{ input: 'n = 3', output: '["1","2","Fizz"]' }, { input: 'n = 5', output: '["1","2","Fizz","4","Buzz"]' }],
    starterCode: `function fizzBuzz(n) {\n    // Your code here\n}`,
    testCases: [{ input: { n: 3 }, expected: ['1','2','Fizz'] }, { input: { n: 5 }, expected: ['1','2','Fizz','4','Buzz'] }]
  },
  {
    id: 6, title: 'Maximum Subarray', difficulty: 'Medium', category: 'algorithms',
    description: 'Find the contiguous subarray with the largest sum', timeLimit: '35 min', solved: false, score: 0,
    problemStatement: 'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
    examples: [{ input: '[-2,1,-3,4,-1,2,1,-5,4]', output: '6' }, { input: '[1]', output: '1' }],
    starterCode: `function maxSubArray(nums) {\n    // Your code here\n}`,
    testCases: [{ input: { nums: [-2,1,-3,4,-1,2,1,-5,4] }, expected: 6 }, { input: { nums: [1] }, expected: 1 }]
  },
  {
    id: 7, title: 'Merge Intervals', difficulty: 'Medium', category: 'algorithms',
    description: 'Merge all overlapping intervals', timeLimit: '40 min', solved: false, score: 0,
    problemStatement: 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.',
    examples: [{ input: '[[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' }],
    starterCode: `function merge(intervals) {\n    // Your code here\n}`,
    testCases: [{ input: { intervals: [[1,3],[2,6],[8,10],[15,18]] }, expected: [[1,6],[8,10],[15,18]] }]
  },
  {
    id: 8, title: 'Longest Substring Without Repeating', difficulty: 'Medium', category: 'algorithms',
    description: 'Find the length of the longest substring without repeating characters', timeLimit: '40 min', solved: false, score: 0,
    problemStatement: 'Given a string s, find the length of the longest substring without repeating characters.',
    examples: [{ input: '"abcabcbb"', output: '3' }, { input: '"bbbbb"', output: '1' }],
    starterCode: `function lengthOfLongestSubstring(s) {\n    // Your code here\n}`,
    testCases: [{ input: { s: 'abcabcbb' }, expected: 3 }, { input: { s: 'bbbbb' }, expected: 1 }]
  },
  {
    id: 9, title: 'Search in Rotated Sorted Array', difficulty: 'Medium', category: 'algorithms',
    description: 'Search for a target in a rotated sorted array', timeLimit: '40 min', solved: false, score: 0,
    problemStatement: 'Given a rotated sorted array nums and a target, return the index of target or -1 if not found.',
    examples: [{ input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' }, { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1' }],
    starterCode: `function search(nums, target) {\n    // Your code here\n}`,
    testCases: [{ input: { nums: [4,5,6,7,0,1,2], target: 0 }, expected: 4 }, { input: { nums: [4,5,6,7,0,1,2], target: 3 }, expected: -1 }]
  },
  {
    id: 10, title: 'Coin Change', difficulty: 'Medium', category: 'algorithms',
    description: 'Find minimum number of coins to make amount', timeLimit: '45 min', solved: false, score: 0,
    problemStatement: 'Given coins of different denominations and an amount, return the fewest number of coins needed to make up that amount.',
    examples: [{ input: 'coins = [1,5,11], amount = 11', output: '1' }, { input: 'coins = [2], amount = 3', output: '-1' }],
    starterCode: `function coinChange(coins, amount) {\n    // Your code here\n}`,
    testCases: [{ input: { coins: [1,5,11], amount: 11 }, expected: 1 }, { input: { coins: [2], amount: 3 }, expected: -1 }]
  },
  {
    id: 11, title: 'Word Search', difficulty: 'Medium', category: 'algorithms',
    description: 'Search for a word in a 2D grid', timeLimit: '50 min', solved: false, score: 0,
    problemStatement: 'Given an m x n grid of characters board and a string word, return true if word exists in the grid.',
    examples: [{ input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: 'true' }],
    starterCode: `function exist(board, word) {\n    // Your code here\n}`,
    testCases: [{ input: { board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'ABCCED' }, expected: true }]
  },
  {
    id: 12, title: 'Trapping Rain Water', difficulty: 'Hard', category: 'algorithms',
    description: 'Calculate how much water can be trapped after raining', timeLimit: '60 min', solved: false, score: 0,
    problemStatement: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    examples: [{ input: '[0,1,0,2,1,0,1,3,2,1,2,1]', output: '6' }, { input: '[4,2,0,3,2,5]', output: '9' }],
    starterCode: `function trap(height) {\n    // Your code here\n}`,
    testCases: [{ input: { height: [0,1,0,2,1,0,1,3,2,1,2,1] }, expected: 6 }, { input: { height: [4,2,0,3,2,5] }, expected: 9 }]
  },
  {
    id: 13, title: 'Median of Two Sorted Arrays', difficulty: 'Hard', category: 'algorithms',
    description: 'Find the median of two sorted arrays in O(log(m+n))', timeLimit: '60 min', solved: false, score: 0,
    problemStatement: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
    examples: [{ input: 'nums1 = [1,3], nums2 = [2]', output: '2.00000' }, { input: 'nums1 = [1,2], nums2 = [3,4]', output: '2.50000' }],
    starterCode: `function findMedianSortedArrays(nums1, nums2) {\n    // Your code here\n}`,
    testCases: [{ input: { nums1: [1,3], nums2: [2] }, expected: 2.0 }, { input: { nums1: [1,2], nums2: [3,4] }, expected: 2.5 }]
  },
  {
    id: 14, title: 'N-Queens', difficulty: 'Hard', category: 'algorithms',
    description: 'Place N queens on an NxN chessboard so no two queens attack each other', timeLimit: '70 min', solved: false, score: 0,
    problemStatement: 'The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Return all distinct solutions.',
    examples: [{ input: 'n = 4', output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' }],
    starterCode: `function solveNQueens(n) {\n    // Your code here\n}`,
    testCases: [{ input: { n: 1 }, expected: [['Q']] }]
  },
  {
    id: 15, title: 'Sliding Window Maximum', difficulty: 'Hard', category: 'algorithms',
    description: 'Find the maximum in each sliding window of size k', timeLimit: '55 min', solved: false, score: 0,
    problemStatement: 'Given an array nums and a sliding window of size k, return the max sliding window.',
    examples: [{ input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[3,3,5,5,6,7]' }],
    starterCode: `function maxSlidingWindow(nums, k) {\n    // Your code here\n}`,
    testCases: [{ input: { nums: [1,3,-1,-3,5,3,6,7], k: 3 }, expected: [3,3,5,5,6,7] }]
  },
  {
    id: 16, title: 'Jump Game', difficulty: 'Medium', category: 'algorithms',
    description: 'Determine if you can reach the last index', timeLimit: '35 min', solved: false, score: 0,
    problemStatement: 'Given an integer array nums where each element represents your maximum jump length, return true if you can reach the last index.',
    examples: [{ input: '[2,3,1,1,4]', output: 'true' }, { input: '[3,2,1,0,4]', output: 'false' }],
    starterCode: `function canJump(nums) {\n    // Your code here\n}`,
    testCases: [{ input: { nums: [2,3,1,1,4] }, expected: true }, { input: { nums: [3,2,1,0,4] }, expected: false }]
  },
  {
    id: 17, title: 'Product of Array Except Self', difficulty: 'Medium', category: 'algorithms',
    description: 'Return array where each element is product of all others', timeLimit: '40 min', solved: false, score: 0,
    problemStatement: 'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].',
    examples: [{ input: '[1,2,3,4]', output: '[24,12,8,6]' }],
    starterCode: `function productExceptSelf(nums) {\n    // Your code here\n}`,
    testCases: [{ input: { nums: [1,2,3,4] }, expected: [24,12,8,6] }]
  },
  {
    id: 18, title: 'Find Peak Element', difficulty: 'Medium', category: 'algorithms',
    description: 'Find a peak element in an array', timeLimit: '30 min', solved: false, score: 0,
    problemStatement: 'A peak element is an element that is strictly greater than its neighbors. Given an integer array nums, find a peak element, and return its index.',
    examples: [{ input: '[1,2,3,1]', output: '2' }, { input: '[1,2,1,3,5,6,4]', output: '5' }],
    starterCode: `function findPeakElement(nums) {\n    // Your code here\n}`,
    testCases: [{ input: { nums: [1,2,3,1] }, expected: 2 }]
  },
  {
    id: 19, title: 'Rotate Array', difficulty: 'Easy', category: 'algorithms',
    description: 'Rotate an array to the right by k steps', timeLimit: '25 min', solved: false, score: 0,
    problemStatement: 'Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.',
    examples: [{ input: 'nums = [1,2,3,4,5,6,7], k = 3', output: '[5,6,7,1,2,3,4]' }],
    starterCode: `function rotate(nums, k) {\n    // Your code here\n}`,
    testCases: [{ input: { nums: [1,2,3,4,5,6,7], k: 3 }, expected: [5,6,7,1,2,3,4] }]
  },
  {
    id: 20, title: 'Longest Increasing Subsequence', difficulty: 'Hard', category: 'algorithms',
    description: 'Find the length of the longest strictly increasing subsequence', timeLimit: '55 min', solved: false, score: 0,
    problemStatement: 'Given an integer array nums, return the length of the longest strictly increasing subsequence.',
    examples: [{ input: '[10,9,2,5,3,7,101,18]', output: '4' }, { input: '[0,1,0,3,2,3]', output: '4' }],
    starterCode: `function lengthOfLIS(nums) {\n    // Your code here\n}`,
    testCases: [{ input: { nums: [10,9,2,5,3,7,101,18] }, expected: 4 }]
  },

  {
    id: 21, title: 'Binary Tree Inorder Traversal', difficulty: 'Easy', category: 'data-structures',
    description: 'Return inorder traversal of a binary tree', timeLimit: '25 min', solved: false, score: 0,
    problemStatement: 'Given the root of a binary tree, return the inorder traversal of its nodes values.',
    examples: [{ input: 'root = [1,null,2,3]', output: '[1,3,2]' }, { input: 'root = []', output: '[]' }],
    starterCode: `function inorderTraversal(root) {\n    // Your code here\n}`,
    testCases: [{ input: { root: [1,null,2,3] }, expected: [1,3,2] }, { input: { root: [] }, expected: [] }]
  },
  {
    id: 22, title: 'Implement Stack using Queues', difficulty: 'Easy', category: 'data-structures',
    description: 'Implement a stack using only queue operations', timeLimit: '30 min', solved: false, score: 0,
    problemStatement: 'Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support push, pop, top, and empty operations.',
    examples: [{ input: 'push(1), push(2), top() -> 2, pop() -> 2, empty() -> false', output: 'null, null, 2, 2, false' }],
    starterCode: `class MyStack {\n    constructor() {}\n    push(x) {}\n    pop() {}\n    top() {}\n    empty() {}\n}`,
    testCases: [{ input: { ops: ['push','push','top','pop','empty'], vals: [1,2,null,null,null] }, expected: [null,null,2,2,false] }]
  },
  {
    id: 23, title: 'Linked List Cycle', difficulty: 'Easy', category: 'data-structures',
    description: 'Detect if a linked list has a cycle', timeLimit: '25 min', solved: false, score: 0,
    problemStatement: 'Given head, the head of a linked list, determine if the linked list has a cycle in it.',
    examples: [{ input: 'head = [3,2,0,-4], pos = 1', output: 'true' }, { input: 'head = [1,2], pos = -1', output: 'false' }],
    starterCode: `function hasCycle(head) {\n    // Your code here\n}`,
    testCases: [{ input: { head: [3,2,0,-4], pos: 1 }, expected: true }, { input: { head: [1,2], pos: -1 }, expected: false }]
  },
  {
    id: 24, title: 'Reverse Linked List', difficulty: 'Easy', category: 'data-structures',
    description: 'Reverse a singly linked list', timeLimit: '25 min', solved: false, score: 0,
    problemStatement: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    examples: [{ input: '[1,2,3,4,5]', output: '[5,4,3,2,1]' }, { input: '[1,2]', output: '[2,1]' }],
    starterCode: `function reverseList(head) {\n    // Your code here\n}`,
    testCases: [{ input: { head: [1,2,3,4,5] }, expected: [5,4,3,2,1] }]
  },
  {
    id: 25, title: 'Maximum Depth of Binary Tree', difficulty: 'Easy', category: 'data-structures',
    description: 'Find the maximum depth of a binary tree', timeLimit: '20 min', solved: false, score: 0,
    problemStatement: 'Given the root of a binary tree, return its maximum depth.',
    examples: [{ input: 'root = [3,9,20,null,null,15,7]', output: '3' }, { input: 'root = [1,null,2]', output: '2' }],
    starterCode: `function maxDepth(root) {\n    // Your code here\n}`,
    testCases: [{ input: { root: [3,9,20,null,null,15,7] }, expected: 3 }]
  },
  {
    id: 26, title: 'Merge Two Sorted Lists', difficulty: 'Easy', category: 'data-structures',
    description: 'Merge two sorted linked lists into one sorted list', timeLimit: '25 min', solved: false, score: 0,
    problemStatement: 'You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list.',
    examples: [{ input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]' }],
    starterCode: `function mergeTwoLists(list1, list2) {\n    // Your code here\n}`,
    testCases: [{ input: { list1: [1,2,4], list2: [1,3,4] }, expected: [1,1,2,3,4,4] }]
  },
  {
    id: 27, title: 'LRU Cache', difficulty: 'Medium', category: 'data-structures',
    description: 'Design and implement an LRU cache', timeLimit: '50 min', solved: false, score: 0,
    problemStatement: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class with get and put operations.',
    examples: [{ input: 'capacity=2, put(1,1), put(2,2), get(1)->1, put(3,3), get(2)->-1', output: '[null,null,1,null,-1]' }],
    starterCode: `class LRUCache {\n    constructor(capacity) {}\n    get(key) {}\n    put(key, value) {}\n}`,
    testCases: [{ input: { capacity: 2, ops: ['put','put','get','put','get'], vals: [[1,1],[2,2],[1],[3,3],[2]] }, expected: [null,null,1,null,-1] }]
  },
  {
    id: 28, title: 'Binary Search Tree Validation', difficulty: 'Medium', category: 'data-structures',
    description: 'Validate if a binary tree is a valid BST', timeLimit: '35 min', solved: false, score: 0,
    problemStatement: 'Given the root of a binary tree, determine if it is a valid binary search tree (BST).',
    examples: [{ input: 'root = [2,1,3]', output: 'true' }, { input: 'root = [5,1,4,null,null,3,6]', output: 'false' }],
    starterCode: `function isValidBST(root) {\n    // Your code here\n}`,
    testCases: [{ input: { root: [2,1,3] }, expected: true }, { input: { root: [5,1,4,null,null,3,6] }, expected: false }]
  },
  {
    id: 29, title: 'Kth Largest Element in Array', difficulty: 'Medium', category: 'data-structures',
    description: 'Find the kth largest element in an unsorted array', timeLimit: '40 min', solved: false, score: 0,
    problemStatement: 'Given an integer array nums and an integer k, return the kth largest element in the array.',
    examples: [{ input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' }, { input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', output: '4' }],
    starterCode: `function findKthLargest(nums, k) {\n    // Your code here\n}`,
    testCases: [{ input: { nums: [3,2,1,5,6,4], k: 2 }, expected: 5 }]
  },
  {
    id: 30, title: 'Graph BFS', difficulty: 'Medium', category: 'data-structures',
    description: 'Implement Breadth-First Search on a graph', timeLimit: '40 min', solved: false, score: 0,
    problemStatement: 'Given a graph represented as an adjacency list and a starting node, return the BFS traversal order.',
    examples: [{ input: 'graph = {0:[1,2], 1:[3], 2:[3], 3:[]}, start = 0', output: '[0,1,2,3]' }],
    starterCode: `function bfs(graph, start) {\n    // Your code here\n}`,
    testCases: [{ input: { graph: {0:[1,2],1:[3],2:[3],3:[]}, start: 0 }, expected: [0,1,2,3] }]
  },
  {
    id: 31, title: 'Trie Implementation', difficulty: 'Medium', category: 'data-structures',
    description: 'Implement a Trie (prefix tree)', timeLimit: '45 min', solved: false, score: 0,
    problemStatement: 'Implement a trie with insert, search, and startsWith methods.',
    examples: [{ input: 'insert("apple"), search("apple") -> true, search("app") -> false, startsWith("app") -> true', output: '[null,true,false,true]' }],
    starterCode: `class Trie {\n    constructor() {}\n    insert(word) {}\n    search(word) {}\n    startsWith(prefix) {}\n}`,
    testCases: [{ input: { ops: ['insert','search','startsWith'], vals: ['apple','apple','app'] }, expected: [null,true,true] }]
  },
  {
    id: 32, title: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard', category: 'data-structures',
    description: 'Serialize and deserialize a binary tree', timeLimit: '60 min', solved: false, score: 0,
    problemStatement: 'Design an algorithm to serialize and deserialize a binary tree. Serialization is the process of converting a tree to a string, and deserialization is converting the string back to the tree.',
    examples: [{ input: 'root = [1,2,3,null,null,4,5]', output: '[1,2,3,null,null,4,5]' }],
    starterCode: `function serialize(root) {\n    // Your code here\n}\nfunction deserialize(data) {\n    // Your code here\n}`,
    testCases: [{ input: { root: [1,2,3] }, expected: [1,2,3] }]
  },
  {
    id: 33, title: 'Word Ladder', difficulty: 'Hard', category: 'data-structures',
    description: 'Find shortest transformation sequence from beginWord to endWord', timeLimit: '65 min', solved: false, score: 0,
    problemStatement: 'Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord.',
    examples: [{ input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: '5' }],
    starterCode: `function ladderLength(beginWord, endWord, wordList) {\n    // Your code here\n}`,
    testCases: [{ input: { beginWord: 'hit', endWord: 'cog', wordList: ['hot','dot','dog','lot','log','cog'] }, expected: 5 }]
  },
  {
    id: 34, title: 'Find Median from Data Stream', difficulty: 'Hard', category: 'data-structures',
    description: 'Find the median of a data stream', timeLimit: '60 min', solved: false, score: 0,
    problemStatement: 'Implement the MedianFinder class that supports addNum and findMedian operations on a data stream.',
    examples: [{ input: 'addNum(1), addNum(2), findMedian() -> 1.5, addNum(3), findMedian() -> 2.0', output: '[null,null,1.5,null,2.0]' }],
    starterCode: `class MedianFinder {\n    constructor() {}\n    addNum(num) {}\n    findMedian() {}\n}`,
    testCases: [{ input: { ops: ['addNum','addNum','findMedian'], vals: [1,2,null] }, expected: [null,null,1.5] }]
  },
  {
    id: 35, title: 'Alien Dictionary', difficulty: 'Hard', category: 'data-structures',
    description: 'Determine the order of characters in an alien language', timeLimit: '70 min', solved: false, score: 0,
    problemStatement: 'Given a list of words from an alien language dictionary, return a string of the unique characters in the alien language sorted in lexicographically increasing order.',
    examples: [{ input: 'words = ["wrt","wrf","er","ett","rftt"]', output: '"wertf"' }],
    starterCode: `function alienOrder(words) {\n    // Your code here\n}`,
    testCases: [{ input: { words: ['z','x'] }, expected: 'zx' }]
  },
  {
    id: 36, title: 'Min Stack', difficulty: 'Easy', category: 'data-structures',
    description: 'Design a stack that supports push, pop, top, and getMin in O(1)', timeLimit: '30 min', solved: false, score: 0,
    problemStatement: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.',
    examples: [{ input: 'push(-2), push(0), push(-3), getMin()->-3, pop(), top()->0, getMin()->-2', output: '[null,null,null,-3,null,0,-2]' }],
    starterCode: `class MinStack {\n    constructor() {}\n    push(val) {}\n    pop() {}\n    top() {}\n    getMin() {}\n}`,
    testCases: [{ input: { ops: ['push','push','push','getMin','pop','top','getMin'], vals: [-2,0,-3,null,null,null,null] }, expected: [null,null,null,-3,null,0,-2] }]
  },
  {
    id: 37, title: 'Number of Islands', difficulty: 'Medium', category: 'data-structures',
    description: 'Count the number of islands in a 2D grid', timeLimit: '40 min', solved: false, score: 0,
    problemStatement: 'Given an m x n 2D binary grid which represents a map of 1s (land) and 0s (water), return the number of islands.',
    examples: [{ input: '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: '1' }],
    starterCode: `function numIslands(grid) {\n    // Your code here\n}`,
    testCases: [{ input: { grid: [['1','1','0'],['0','1','0'],['0','0','1']] }, expected: 2 }]
  },
  {
    id: 38, title: 'Clone Graph', difficulty: 'Medium', category: 'data-structures',
    description: 'Deep clone a graph', timeLimit: '40 min', solved: false, score: 0,
    problemStatement: 'Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.',
    examples: [{ input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', output: '[[2,4],[1,3],[2,4],[1,3]]' }],
    starterCode: `function cloneGraph(node) {\n    // Your code here\n}`,
    testCases: [{ input: { adjList: [[2,4],[1,3],[2,4],[1,3]] }, expected: [[2,4],[1,3],[2,4],[1,3]] }]
  },
  {
    id: 39, title: 'Lowest Common Ancestor of BST', difficulty: 'Medium', category: 'data-structures',
    description: 'Find the lowest common ancestor of two nodes in a BST', timeLimit: '35 min', solved: false, score: 0,
    problemStatement: 'Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.',
    examples: [{ input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8', output: '6' }],
    starterCode: `function lowestCommonAncestor(root, p, q) {\n    // Your code here\n}`,
    testCases: [{ input: { root: [6,2,8], p: 2, q: 8 }, expected: 6 }]
  },
  {
    id: 40, title: 'Course Schedule', difficulty: 'Medium', category: 'data-structures',
    description: 'Determine if you can finish all courses given prerequisites', timeLimit: '45 min', solved: false, score: 0,
    problemStatement: 'There are numCourses courses you have to take. Given prerequisites pairs, return true if you can finish all courses.',
    examples: [{ input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true' }, { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', output: 'false' }],
    starterCode: `function canFinish(numCourses, prerequisites) {\n    // Your code here\n}`,
    testCases: [{ input: { numCourses: 2, prerequisites: [[1,0]] }, expected: true }, { input: { numCourses: 2, prerequisites: [[1,0],[0,1]] }, expected: false }]
  },

  {
    id: 41, title: 'Design URL Shortener', difficulty: 'Medium', category: 'system-design',
    description: 'Design a URL shortening service like bit.ly', timeLimit: '60 min', solved: false, score: 0,
    problemStatement: 'Design a URL shortening service that can encode a URL to a shortened URL and decode the shortened URL to get the original URL.',
    examples: [{ input: 'encode("https://leetcode.com/problems/design-tinyurl")', output: '"http://tinyurl.com/4e9iAk"' }],
    starterCode: `class URLShortener {\n    constructor() {}\n    encode(longUrl) {}\n    decode(shortUrl) {}\n}`,
    testCases: [{ input: { operation: 'encode', url: 'https://example.com' }, expected: 'shortened_url' }]
  },
  {
    id: 42, title: 'Design Chat System', difficulty: 'Hard', category: 'system-design',
    description: 'Design a scalable real-time chat messaging system', timeLimit: '90 min', solved: false, score: 0,
    problemStatement: 'Design a chat system that supports real-time messaging, group chats, message history, and handles millions of users.',
    examples: [{ input: 'sendMessage(userId1, userId2, "Hello")', output: 'message_id: 123' }],
    starterCode: `class ChatSystem {\n    constructor() {}\n    sendMessage(senderId, receiverId, message) {}\n    getMessages(chatId, limit) {}\n    createGroupChat(userIds, chatName) {}\n}`,
    testCases: [{ input: { operation: 'sendMessage', senderId: 'user1', receiverId: 'user2', message: 'Hello' }, expected: 'message_sent' }]
  },
  {
    id: 43, title: 'Design Load Balancer', difficulty: 'Hard', category: 'system-design',
    description: 'Design a distributed load balancer system', timeLimit: '75 min', solved: false, score: 0,
    problemStatement: 'Design a load balancer that distributes incoming requests across multiple servers using different algorithms like round-robin, least connections, and weighted.',
    examples: [{ input: 'addServer("server1", "192.168.1.1:8080")', output: 'server_added' }],
    starterCode: `class LoadBalancer {\n    constructor() {}\n    addServer(serverId, serverAddress) {}\n    removeServer(serverId) {}\n    getNextServer() {}\n}`,
    testCases: [{ input: { operation: 'addServer', serverId: 'server1', address: '192.168.1.1:8080' }, expected: 'server_added' }]
  },
  {
    id: 44, title: 'Design LRU Cache System', difficulty: 'Medium', category: 'system-design',
    description: 'Design an LRU cache with TTL support', timeLimit: '50 min', solved: false, score: 0,
    problemStatement: 'Design a cache system that supports LRU eviction policy and time-to-live (TTL) for cached items.',
    examples: [{ input: 'cache.put("key1", "value1", 60)', output: 'item_cached' }],
    starterCode: `class LRUCache {\n    constructor(capacity) {}\n    get(key) {}\n    put(key, value, ttl) {}\n    delete(key) {}\n}`,
    testCases: [{ input: { operation: 'put', key: 'key1', value: 'value1', ttl: 60 }, expected: 'cached' }]
  },
  {
    id: 45, title: 'Design Twitter', difficulty: 'Medium', category: 'system-design',
    description: 'Design a simplified version of Twitter', timeLimit: '70 min', solved: false, score: 0,
    problemStatement: 'Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and see the 10 most recent tweets in the user\'s news feed.',
    examples: [{ input: 'postTweet(1, 5), getNewsFeed(1) -> [5], follow(1, 2), postTweet(2, 6), getNewsFeed(1) -> [6, 5]', output: '[null,[5],null,null,[6,5]]' }],
    starterCode: `class Twitter {\n    constructor() {}\n    postTweet(userId, tweetId) {}\n    getNewsFeed(userId) {}\n    follow(followerId, followeeId) {}\n    unfollow(followerId, followeeId) {}\n}`,
    testCases: [{ input: { ops: ['postTweet','getNewsFeed'], vals: [[1,5],[1]] }, expected: [null,[5]] }]
  },
  {
    id: 46, title: 'Design Rate Limiter', difficulty: 'Medium', category: 'system-design',
    description: 'Design a rate limiter to control API request rates', timeLimit: '60 min', solved: false, score: 0,
    problemStatement: 'Design a rate limiter that allows at most N requests per second per user. Implement using the token bucket or sliding window algorithm.',
    examples: [{ input: 'isAllowed("user1") -> true (first request)', output: 'true' }],
    starterCode: `class RateLimiter {\n    constructor(maxRequests, windowMs) {}\n    isAllowed(userId) {}\n    reset(userId) {}\n}`,
    testCases: [{ input: { maxRequests: 3, windowMs: 1000 }, expected: 'initialized' }]
  },
  {
    id: 47, title: 'Design Notification System', difficulty: 'Hard', category: 'system-design',
    description: 'Design a push notification system for mobile apps', timeLimit: '80 min', solved: false, score: 0,
    problemStatement: 'Design a notification system that can send push notifications to millions of users across iOS, Android, and web platforms with delivery guarantees.',
    examples: [{ input: 'sendNotification(userId, "New message!", {type: "chat"})', output: 'notification_queued' }],
    starterCode: `class NotificationSystem {\n    constructor() {}\n    sendNotification(userId, message, metadata) {}\n    subscribe(userId, deviceToken, platform) {}\n    unsubscribe(userId, deviceToken) {}\n}`,
    testCases: [{ input: { operation: 'subscribe', userId: 'user1', token: 'abc123', platform: 'ios' }, expected: 'subscribed' }]
  },
  {
    id: 48, title: 'Design Search Autocomplete', difficulty: 'Hard', category: 'system-design',
    description: 'Design a search autocomplete system', timeLimit: '75 min', solved: false, score: 0,
    problemStatement: 'Design a search autocomplete system for a search engine. For each character a user types, return the top 3 historical hot sentences that have the same prefix as the part of the sentence already typed.',
    examples: [{ input: 'input("i"), input(" "), input("a")', output: '["i love you","i love leetcode","i loveisland"]' }],
    starterCode: `class AutocompleteSystem {\n    constructor(sentences, times) {}\n    input(c) {}\n}`,
    testCases: [{ input: { sentences: ['i love you','island','iroman'], times: [5,3,2] }, expected: 'initialized' }]
  },
  {
    id: 49, title: 'Design File System', difficulty: 'Medium', category: 'system-design',
    description: 'Design an in-memory file system', timeLimit: '65 min', solved: false, score: 0,
    problemStatement: 'Design an in-memory file system to simulate the following functions: ls, mkdir, addContentToFile, readContentFromFile.',
    examples: [{ input: 'mkdir("/a/b/c"), addContentToFile("/a/b/c/d", "hello"), readContentFromFile("/a/b/c/d")', output: '"hello"' }],
    starterCode: `class FileSystem {\n    constructor() {}\n    ls(path) {}\n    mkdir(path) {}\n    addContentToFile(filePath, content) {}\n    readContentFromFile(filePath) {}\n}`,
    testCases: [{ input: { op: 'mkdir', path: '/a/b/c' }, expected: null }]
  },
  {
    id: 50, title: 'Design Parking Lot', difficulty: 'Medium', category: 'system-design',
    description: 'Design an object-oriented parking lot system', timeLimit: '60 min', solved: false, score: 0,
    problemStatement: 'Design a parking lot system that supports multiple levels, different vehicle sizes (motorcycle, car, bus), and can park/unpark vehicles and check availability.',
    examples: [{ input: 'parkVehicle("car", "ABC123") -> spot_id, unparkVehicle("ABC123") -> true', output: 'spot_id, true' }],
    starterCode: `class ParkingLot {\n    constructor(levels, spotsPerLevel) {}\n    parkVehicle(vehicleType, licensePlate) {}\n    unparkVehicle(licensePlate) {}\n    getAvailableSpots(vehicleType) {}\n}`,
    testCases: [{ input: { levels: 3, spotsPerLevel: 30 }, expected: 'initialized' }]
  },
  {
    id: 51, title: 'Design Elevator System', difficulty: 'Hard', category: 'system-design',
    description: 'Design an elevator control system for a building', timeLimit: '85 min', solved: false, score: 0,
    problemStatement: 'Design an elevator system for a building with multiple elevators. The system should efficiently handle floor requests and minimize wait times.',
    examples: [{ input: 'requestElevator(floor=5, direction="up")', output: 'elevator_id: 2' }],
    starterCode: `class ElevatorSystem {\n    constructor(numElevators, numFloors) {}\n    requestElevator(floor, direction) {}\n    pressFloorButton(elevatorId, floor) {}\n    getElevatorStatus(elevatorId) {}\n}`,
    testCases: [{ input: { numElevators: 3, numFloors: 20 }, expected: 'initialized' }]
  },
  {
    id: 52, title: 'Design Distributed Key-Value Store', difficulty: 'Hard', category: 'system-design',
    description: 'Design a distributed key-value store like Redis', timeLimit: '90 min', solved: false, score: 0,
    problemStatement: 'Design a distributed key-value store that supports get, put, delete operations with replication, partitioning, and fault tolerance.',
    examples: [{ input: 'put("key1", "value1"), get("key1") -> "value1"', output: '"value1"' }],
    starterCode: `class DistributedKVStore {\n    constructor(nodes) {}\n    get(key) {}\n    put(key, value) {}\n    delete(key) {}\n    rebalance() {}\n}`,
    testCases: [{ input: { nodes: ['node1','node2','node3'] }, expected: 'initialized' }]
  },
  {
    id: 53, title: 'Design Video Streaming Service', difficulty: 'Hard', category: 'system-design',
    description: 'Design a video streaming platform like YouTube', timeLimit: '90 min', solved: false, score: 0,
    problemStatement: 'Design a video streaming service that handles video upload, transcoding, storage, CDN distribution, and streaming to millions of concurrent users.',
    examples: [{ input: 'uploadVideo(userId, videoFile, metadata)', output: 'video_id: "abc123"' }],
    starterCode: `class VideoStreamingService {\n    constructor() {}\n    uploadVideo(userId, videoFile, metadata) {}\n    streamVideo(videoId, userId, quality) {}\n    searchVideos(query, filters) {}\n    getRecommendations(userId) {}\n}`,
    testCases: [{ input: { operation: 'upload', userId: 'user1' }, expected: 'video_queued' }]
  },
  {
    id: 54, title: 'Design Payment System', difficulty: 'Hard', category: 'system-design',
    description: 'Design a payment processing system', timeLimit: '85 min', solved: false, score: 0,
    problemStatement: 'Design a payment system that handles transactions, supports multiple payment methods, ensures ACID properties, and handles failures gracefully.',
    examples: [{ input: 'processPayment(fromAccount, toAccount, amount, currency)', output: 'transaction_id: "txn_123"' }],
    starterCode: `class PaymentSystem {\n    constructor() {}\n    processPayment(fromAccount, toAccount, amount, currency) {}\n    refund(transactionId) {}\n    getTransactionStatus(transactionId) {}\n}`,
    testCases: [{ input: { operation: 'processPayment', amount: 100, currency: 'USD' }, expected: 'transaction_created' }]
  },
  {
    id: 55, title: 'Design Ride Sharing Service', difficulty: 'Hard', category: 'system-design',
    description: 'Design a ride-sharing platform like Uber', timeLimit: '90 min', solved: false, score: 0,
    problemStatement: 'Design a ride-sharing service that matches riders with drivers, handles real-time location tracking, surge pricing, and trip management.',
    examples: [{ input: 'requestRide(riderId, pickup, destination)', output: 'ride_id: "ride_456", driver: "driver_789"' }],
    starterCode: `class RideSharingService {\n    constructor() {}\n    requestRide(riderId, pickup, destination) {}\n    acceptRide(driverId, rideId) {}\n    updateLocation(driverId, lat, lng) {}\n    completeRide(rideId) {}\n}`,
    testCases: [{ input: { operation: 'requestRide', riderId: 'rider1' }, expected: 'ride_queued' }]
  },
  {
    id: 56, title: 'Design E-commerce Platform', difficulty: 'Hard', category: 'system-design',
    description: 'Design a scalable e-commerce platform like Amazon', timeLimit: '90 min', solved: false, score: 0,
    problemStatement: 'Design an e-commerce platform that handles product catalog, inventory management, shopping cart, order processing, and recommendation engine.',
    examples: [{ input: 'addToCart(userId, productId, quantity)', output: 'cart_updated' }],
    starterCode: `class EcommercePlatform {\n    constructor() {}\n    addToCart(userId, productId, quantity) {}\n    checkout(userId, paymentInfo) {}\n    searchProducts(query, filters) {}\n    getRecommendations(userId) {}\n}`,
    testCases: [{ input: { operation: 'addToCart', userId: 'user1', productId: 'prod1', quantity: 2 }, expected: 'cart_updated' }]
  },
  {
    id: 57, title: 'Design Social Media Feed', difficulty: 'Hard', category: 'system-design',
    description: 'Design a social media news feed system', timeLimit: '80 min', solved: false, score: 0,
    problemStatement: 'Design a social media news feed system that generates personalized feeds for users based on their connections and interests, handling millions of posts per day.',
    examples: [{ input: 'getFeed(userId, page=1, limit=20)', output: 'Array of 20 post objects' }],
    starterCode: `class SocialFeed {\n    constructor() {}\n    createPost(userId, content, media) {}\n    getFeed(userId, page, limit) {}\n    likePost(userId, postId) {}\n    followUser(followerId, followeeId) {}\n}`,
    testCases: [{ input: { operation: 'createPost', userId: 'user1', content: 'Hello World' }, expected: 'post_created' }]
  },
  {
    id: 58, title: 'Design Booking System', difficulty: 'Medium', category: 'system-design',
    description: 'Design a hotel/flight booking system', timeLimit: '70 min', solved: false, score: 0,
    problemStatement: 'Design a booking system that handles searching for available rooms/flights, making reservations, handling concurrent bookings, and managing cancellations.',
    examples: [{ input: 'searchAvailability(checkIn, checkOut, guests)', output: 'Array of available rooms' }],
    starterCode: `class BookingSystem {\n    constructor() {}\n    searchAvailability(checkIn, checkOut, guests) {}\n    makeReservation(userId, roomId, checkIn, checkOut) {}\n    cancelReservation(reservationId) {}\n    getReservation(reservationId) {}\n}`,
    testCases: [{ input: { operation: 'searchAvailability', guests: 2 }, expected: 'rooms_array' }]
  },
  {
    id: 59, title: 'Design API Gateway', difficulty: 'Hard', category: 'system-design',
    description: 'Design an API gateway for microservices', timeLimit: '80 min', solved: false, score: 0,
    problemStatement: 'Design an API gateway that handles routing, authentication, rate limiting, load balancing, and monitoring for a microservices architecture.',
    examples: [{ input: 'routeRequest(path="/users/1", method="GET", headers)', output: 'response from user-service' }],
    starterCode: `class APIGateway {\n    constructor(services) {}\n    routeRequest(path, method, headers, body) {}\n    authenticate(token) {}\n    rateLimit(clientId) {}\n    logRequest(request, response) {}\n}`,
    testCases: [{ input: { path: '/users/1', method: 'GET' }, expected: 'routed' }]
  },
  {
    id: 60, title: 'Design Monitoring System', difficulty: 'Hard', category: 'system-design',
    description: 'Design a system monitoring and alerting platform', timeLimit: '85 min', solved: false, score: 0,
    problemStatement: 'Design a monitoring system like Datadog that collects metrics, logs, and traces from distributed services, stores them efficiently, and triggers alerts based on thresholds.',
    examples: [{ input: 'recordMetric("cpu_usage", 85.5, {host: "server1"})', output: 'metric_recorded' }],
    starterCode: `class MonitoringSystem {\n    constructor() {}\n    recordMetric(name, value, tags) {}\n    queryMetrics(name, startTime, endTime, tags) {}\n    createAlert(metricName, threshold, condition) {}\n    getAlerts(severity) {}\n}`,
    testCases: [{ input: { operation: 'recordMetric', name: 'cpu', value: 85 }, expected: 'recorded' }]
  },

  {
    id: 61, title: 'React Counter Component', difficulty: 'Easy', category: 'frontend',
    description: 'Build a counter component with increment, decrement, and reset', timeLimit: '20 min', solved: false, score: 0,
    problemStatement: 'Create a React counter component that has increment (+1), decrement (-1), and reset (0) buttons. The count should never go below 0.',
    examples: [{ input: 'Initial count = 0, click increment', output: 'count = 1' }, { input: 'count = 0, click decrement', output: 'count = 0 (no negative)' }],
    starterCode: `function Counter() {\n    // Use useState to manage count\n    // Return JSX with buttons and count display\n}`,
    testCases: [{ input: { action: 'increment', initial: 0 }, expected: 1 }, { input: { action: 'decrement', initial: 0 }, expected: 0 }]
  },
  {
    id: 62, title: 'Debounce Function', difficulty: 'Medium', category: 'frontend',
    description: 'Implement a debounce utility function', timeLimit: '35 min', solved: false, score: 0,
    problemStatement: 'Implement a debounce function that delays invoking func until after wait milliseconds have elapsed since the last time the debounced function was invoked.',
    examples: [{ input: 'debounce(fn, 300) called 5 times in 100ms', output: 'fn called once after 300ms' }],
    starterCode: `function debounce(func, wait) {\n    // Your code here\n}`,
    testCases: [{ input: { calls: 5, interval: 100, wait: 300 }, expected: 1 }]
  },
  {
    id: 63, title: 'Throttle Function', difficulty: 'Medium', category: 'frontend',
    description: 'Implement a throttle utility function', timeLimit: '35 min', solved: false, score: 0,
    problemStatement: 'Implement a throttle function that invokes func at most once per every wait milliseconds.',
    examples: [{ input: 'throttle(fn, 100) called 10 times in 500ms', output: 'fn called ~5 times' }],
    starterCode: `function throttle(func, wait) {\n    // Your code here\n}`,
    testCases: [{ input: { calls: 10, interval: 50, wait: 100 }, expected: 5 }]
  },
  {
    id: 64, title: 'Infinite Scroll', difficulty: 'Medium', category: 'frontend',
    description: 'Implement infinite scroll with lazy loading', timeLimit: '45 min', solved: false, score: 0,
    problemStatement: 'Implement an infinite scroll component that loads more items when the user scrolls near the bottom of the page. Use Intersection Observer API.',
    examples: [{ input: 'User scrolls to 90% of page', output: 'Fetch next 20 items and append to list' }],
    starterCode: `function InfiniteScroll({ fetchData, renderItem }) {\n    // Implement infinite scroll\n}`,
    testCases: [{ input: { scrollPosition: 0.9, itemsLoaded: 20 }, expected: 40 }]
  },
  {
    id: 65, title: 'Virtual DOM Diff', difficulty: 'Hard', category: 'frontend',
    description: 'Implement a simple virtual DOM diffing algorithm', timeLimit: '70 min', solved: false, score: 0,
    problemStatement: 'Implement a virtual DOM diffing algorithm that compares two virtual DOM trees and returns the minimal set of changes needed to update the real DOM.',
    examples: [{ input: 'oldVDOM = {tag:"div", children:[{tag:"p",text:"Hello"}]}, newVDOM = {tag:"div", children:[{tag:"p",text:"World"}]}', output: '[{type:"UPDATE_TEXT", path:[0], value:"World"}]' }],
    starterCode: `function diff(oldVDOM, newVDOM) {\n    // Return array of patches\n}`,
    testCases: [{ input: { old: { tag: 'div', text: 'Hello' }, new: { tag: 'div', text: 'World' } }, expected: [{ type: 'UPDATE_TEXT', value: 'World' }] }]
  },
  {
    id: 66, title: 'Promise.all Implementation', difficulty: 'Medium', category: 'frontend',
    description: 'Implement your own Promise.all', timeLimit: '40 min', solved: false, score: 0,
    problemStatement: 'Implement a myPromiseAll function that takes an array of promises and returns a promise that resolves when all promises resolve, or rejects when any promise rejects.',
    examples: [{ input: 'myPromiseAll([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)])', output: '[1, 2, 3]' }],
    starterCode: `function myPromiseAll(promises) {\n    // Your code here\n}`,
    testCases: [{ input: { promises: [1, 2, 3] }, expected: [1, 2, 3] }]
  },
  {
    id: 67, title: 'Event Emitter', difficulty: 'Medium', category: 'frontend',
    description: 'Implement a custom event emitter class', timeLimit: '40 min', solved: false, score: 0,
    problemStatement: 'Implement an EventEmitter class with on, off, emit, and once methods.',
    examples: [{ input: 'emitter.on("click", handler), emitter.emit("click", data)', output: 'handler called with data' }],
    starterCode: `class EventEmitter {\n    constructor() {}\n    on(event, listener) {}\n    off(event, listener) {}\n    emit(event, ...args) {}\n    once(event, listener) {}\n}`,
    testCases: [{ input: { event: 'click', emitCount: 3 }, expected: 3 }]
  },
  {
    id: 68, title: 'Deep Clone Object', difficulty: 'Medium', category: 'frontend',
    description: 'Implement a deep clone function for JavaScript objects', timeLimit: '35 min', solved: false, score: 0,
    problemStatement: 'Implement a deepClone function that creates a deep copy of an object, handling nested objects, arrays, dates, and circular references.',
    examples: [{ input: 'deepClone({a: 1, b: {c: 2}})', output: '{a: 1, b: {c: 2}} (new reference)' }],
    starterCode: `function deepClone(obj) {\n    // Your code here\n}`,
    testCases: [{ input: { obj: { a: 1, b: { c: 2 } } }, expected: { a: 1, b: { c: 2 } } }]
  },
  {
    id: 69, title: 'Flatten Nested Array', difficulty: 'Easy', category: 'frontend',
    description: 'Flatten a deeply nested array to a specified depth', timeLimit: '25 min', solved: false, score: 0,
    problemStatement: 'Implement a flatten function that flattens a nested array to a given depth. If depth is Infinity, flatten completely.',
    examples: [{ input: 'flatten([1,[2,[3,[4]],5]], 2)', output: '[1,2,3,[4],5]' }, { input: 'flatten([1,[2,[3]]], Infinity)', output: '[1,2,3]' }],
    starterCode: `function flatten(arr, depth = 1) {\n    // Your code here\n}`,
    testCases: [{ input: { arr: [1,[2,[3,[4]],5]], depth: 2 }, expected: [1,2,3,[4],5] }]
  },
  {
    id: 70, title: 'Curry Function', difficulty: 'Hard', category: 'frontend',
    description: 'Implement a curry function that supports partial application', timeLimit: '50 min', solved: false, score: 0,
    problemStatement: 'Implement a curry function that transforms a function of multiple arguments into a sequence of functions each taking a single argument.',
    examples: [{ input: 'curry(add)(1)(2)(3)', output: '6' }, { input: 'curry(add)(1, 2)(3)', output: '6' }],
    starterCode: `function curry(fn) {\n    // Your code here\n}`,
    testCases: [{ input: { fn: 'add', args: [1,2,3] }, expected: 6 }]
  },
  {
    id: 71, title: 'Memoize Function', difficulty: 'Medium', category: 'frontend',
    description: 'Implement a memoization utility', timeLimit: '35 min', solved: false, score: 0,
    problemStatement: 'Implement a memoize function that caches the results of function calls and returns the cached result when the same inputs occur again.',
    examples: [{ input: 'memoize(expensiveFn)(5) called twice', output: 'computed once, cached second time' }],
    starterCode: `function memoize(fn) {\n    // Your code here\n}`,
    testCases: [{ input: { calls: 2, arg: 5 }, expected: 1 }]
  },
  {
    id: 72, title: 'Implement Drag and Drop', difficulty: 'Hard', category: 'frontend',
    description: 'Implement drag and drop functionality without libraries', timeLimit: '65 min', solved: false, score: 0,
    problemStatement: 'Implement a drag and drop system using native browser APIs (mousedown, mousemove, mouseup events) that allows reordering items in a list.',
    examples: [{ input: 'Drag item from position 0 to position 2', output: 'List reordered correctly' }],
    starterCode: `class DragAndDrop {\n    constructor(container) {}\n    enable() {}\n    disable() {}\n    onReorder(callback) {}\n}`,
    testCases: [{ input: { from: 0, to: 2, items: ['a','b','c'] }, expected: ['b','c','a'] }]
  },
  {
    id: 73, title: 'CSS Flexbox Layout', difficulty: 'Easy', category: 'frontend',
    description: 'Create a responsive flexbox layout', timeLimit: '20 min', solved: false, score: 0,
    problemStatement: 'Create a responsive navigation bar using CSS Flexbox that has a logo on the left, navigation links in the center, and action buttons on the right.',
    examples: [{ input: 'Desktop: logo | nav links | buttons', output: 'Proper flexbox layout' }],
    starterCode: `/* Write CSS for the navbar */\n.navbar {\n    /* Your styles here */\n}\n.nav-logo {}\n.nav-links {}\n.nav-actions {}`,
    testCases: [{ input: { viewport: 'desktop' }, expected: 'horizontal layout' }]
  },
  {
    id: 74, title: 'Implement Pagination', difficulty: 'Medium', category: 'frontend',
    description: 'Build a reusable pagination component', timeLimit: '40 min', solved: false, score: 0,
    problemStatement: 'Implement a pagination component that shows page numbers, previous/next buttons, and handles edge cases like first/last page.',
    examples: [{ input: 'totalItems=100, itemsPerPage=10, currentPage=5', output: 'Shows pages 3,4,5,6,7 with prev/next' }],
    starterCode: `function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {\n    // Your code here\n}`,
    testCases: [{ input: { totalItems: 100, itemsPerPage: 10, currentPage: 5 }, expected: { totalPages: 10, hasNext: true, hasPrev: true } }]
  },
  {
    id: 75, title: 'Form Validation', difficulty: 'Medium', category: 'frontend',
    description: 'Implement comprehensive form validation', timeLimit: '40 min', solved: false, score: 0,
    problemStatement: 'Implement a form validation system that validates email, password strength, phone number, and custom rules. Show real-time error messages.',
    examples: [{ input: 'email = "invalid-email"', output: 'Error: Invalid email format' }, { input: 'password = "weak"', output: 'Error: Password must be 8+ chars with numbers and symbols' }],
    starterCode: `class FormValidator {\n    constructor(rules) {}\n    validate(field, value) {}\n    validateAll(formData) {}\n    getErrors() {}\n}`,
    testCases: [{ input: { email: 'test@example.com' }, expected: { valid: true } }, { input: { email: 'invalid' }, expected: { valid: false } }]
  },
  {
    id: 76, title: 'Implement Observable', difficulty: 'Hard', category: 'frontend',
    description: 'Implement a basic Observable/RxJS-like pattern', timeLimit: '60 min', solved: false, score: 0,
    problemStatement: 'Implement a basic Observable class with subscribe, map, filter, and merge operators.',
    examples: [{ input: 'Observable.from([1,2,3]).map(x => x*2).filter(x => x > 2).subscribe(console.log)', output: '4, 6' }],
    starterCode: `class Observable {\n    constructor(subscribeFn) {}\n    subscribe(observer) {}\n    map(fn) {}\n    filter(fn) {}\n    static from(iterable) {}\n}`,
    testCases: [{ input: { values: [1,2,3], mapFn: 'x*2', filterFn: 'x>2' }, expected: [4,6] }]
  },
  {
    id: 77, title: 'Implement Router', difficulty: 'Hard', category: 'frontend',
    description: 'Build a client-side router from scratch', timeLimit: '65 min', solved: false, score: 0,
    problemStatement: 'Implement a client-side router that handles URL changes, route matching with parameters, navigation guards, and history management.',
    examples: [{ input: 'router.navigate("/users/123")', output: 'Renders UserDetail component with id=123' }],
    starterCode: `class Router {\n    constructor(routes) {}\n    navigate(path) {}\n    addRoute(path, component) {}\n    addGuard(guard) {}\n    getCurrentRoute() {}\n}`,
    testCases: [{ input: { path: '/users/123', routes: ['/users/:id'] }, expected: { matched: true, params: { id: '123' } } }]
  },
  {
    id: 78, title: 'Implement State Management', difficulty: 'Hard', category: 'frontend',
    description: 'Build a Redux-like state management system', timeLimit: '70 min', solved: false, score: 0,
    problemStatement: 'Implement a simple state management library similar to Redux with createStore, dispatch, getState, and subscribe functionality.',
    examples: [{ input: 'store.dispatch({type: "INCREMENT"}), store.getState()', output: '{count: 1}' }],
    starterCode: `function createStore(reducer, initialState) {\n    // Your code here\n    return { getState, dispatch, subscribe };\n}`,
    testCases: [{ input: { action: { type: 'INCREMENT' }, initial: { count: 0 } }, expected: { count: 1 } }]
  },
  {
    id: 79, title: 'Intersection Observer Lazy Load', difficulty: 'Medium', category: 'frontend',
    description: 'Implement lazy loading images using Intersection Observer', timeLimit: '35 min', solved: false, score: 0,
    problemStatement: 'Implement a lazy loading system for images using the Intersection Observer API. Images should only load when they enter the viewport.',
    examples: [{ input: 'Image enters viewport', output: 'src attribute set, image loads' }],
    starterCode: `function lazyLoadImages(selector) {\n    // Use IntersectionObserver\n}`,
    testCases: [{ input: { imagesInViewport: 3, totalImages: 10 }, expected: 3 }]
  },
  {
    id: 80, title: 'Web Worker Communication', difficulty: 'Hard', category: 'frontend',
    description: 'Implement communication between main thread and Web Workers', timeLimit: '60 min', solved: false, score: 0,
    problemStatement: 'Implement a system that offloads heavy computation to Web Workers and communicates results back to the main thread using postMessage and onmessage.',
    examples: [{ input: 'computeInWorker(heavyTask, data)', output: 'Promise resolving with result' }],
    starterCode: `function computeInWorker(taskFn, data) {\n    // Create worker, send data, return promise\n}`,
    testCases: [{ input: { task: 'fibonacci', n: 40 }, expected: 102334155 }]
  },

  {
    id: 81, title: 'REST API Design', difficulty: 'Easy', category: 'backend',
    description: 'Design RESTful API endpoints for a blog application', timeLimit: '30 min', solved: false, score: 0,
    problemStatement: 'Design RESTful API endpoints for a blog with posts, comments, and users. Include proper HTTP methods, status codes, and request/response formats.',
    examples: [{ input: 'GET /posts?page=1&limit=10', output: '{ posts: [...], total: 100, page: 1 }' }],
    starterCode: `// Define your API routes\nconst routes = {\n    // GET /posts\n    getPosts: async (req, res) => {},\n    // POST /posts\n    createPost: async (req, res) => {},\n    // GET /posts/:id\n    getPost: async (req, res) => {},\n};`,
    testCases: [{ input: { method: 'GET', path: '/posts' }, expected: { status: 200 } }]
  },
  {
    id: 82, title: 'JWT Authentication', difficulty: 'Medium', category: 'backend',
    description: 'Implement JWT-based authentication middleware', timeLimit: '45 min', solved: false, score: 0,
    problemStatement: 'Implement JWT authentication with token generation, verification, refresh tokens, and middleware for protecting routes.',
    examples: [{ input: 'POST /auth/login with credentials', output: '{ accessToken, refreshToken }' }],
    starterCode: `class AuthService {\n    generateToken(userId, role) {}\n    verifyToken(token) {}\n    refreshToken(refreshToken) {}\n    revokeToken(token) {}\n}`,
    testCases: [{ input: { userId: 'user1', role: 'admin' }, expected: { hasAccessToken: true, hasRefreshToken: true } }]
  },
  {
    id: 83, title: 'Database Connection Pool', difficulty: 'Medium', category: 'backend',
    description: 'Implement a database connection pool', timeLimit: '50 min', solved: false, score: 0,
    problemStatement: 'Implement a connection pool that manages a fixed number of database connections, queues requests when all connections are busy, and handles connection failures.',
    examples: [{ input: 'pool.getConnection() when all 10 connections busy', output: 'Queued, resolved when connection available' }],
    starterCode: `class ConnectionPool {\n    constructor(maxConnections, connectionFactory) {}\n    getConnection() {}\n    releaseConnection(conn) {}\n    destroy() {}\n}`,
    testCases: [{ input: { maxConnections: 10, requests: 15 }, expected: { queued: 5 } }]
  },
  {
    id: 84, title: 'GraphQL Schema Design', difficulty: 'Medium', category: 'backend',
    description: 'Design a GraphQL schema for a social network', timeLimit: '55 min', solved: false, score: 0,
    problemStatement: 'Design a GraphQL schema for a social network with users, posts, comments, and likes. Include queries, mutations, and subscriptions.',
    examples: [{ input: 'query { user(id: "1") { name, posts { title, likes } } }', output: '{ user: { name: "John", posts: [...] } }' }],
    starterCode: `const typeDefs = \`\n    type User {\n        # Define User type\n    }\n    type Post {\n        # Define Post type\n    }\n    type Query {\n        # Define queries\n    }\n    type Mutation {\n        # Define mutations\n    }\n\`;`,
    testCases: [{ input: { query: 'user', fields: ['name','email'] }, expected: { valid: true } }]
  },
  {
    id: 85, title: 'Implement Middleware Pipeline', difficulty: 'Medium', category: 'backend',
    description: 'Build an Express-like middleware pipeline', timeLimit: '45 min', solved: false, score: 0,
    problemStatement: 'Implement a middleware pipeline similar to Express.js that processes requests through a chain of middleware functions with next() support.',
    examples: [{ input: 'app.use(logger), app.use(auth), app.get("/", handler)', output: 'Request processed through logger -> auth -> handler' }],
    starterCode: `class App {\n    constructor() { this.middlewares = []; }\n    use(middleware) {}\n    get(path, handler) {}\n    post(path, handler) {}\n    handleRequest(req, res) {}\n}`,
    testCases: [{ input: { middlewareCount: 3, path: '/' }, expected: { executionOrder: [0,1,2] } }]
  },
  {
    id: 86, title: 'Implement Caching Layer', difficulty: 'Medium', category: 'backend',
    description: 'Build a multi-level caching system', timeLimit: '50 min', solved: false, score: 0,
    problemStatement: 'Implement a caching layer with L1 (in-memory) and L2 (Redis-like) cache, cache invalidation strategies, and cache-aside pattern.',
    examples: [{ input: 'cache.get("user:1") - L1 miss, L2 hit', output: 'Returns from L2, populates L1' }],
    starterCode: `class CacheLayer {\n    constructor(l1Size, l2Config) {}\n    get(key) {}\n    set(key, value, ttl) {}\n    invalidate(key) {}\n    invalidatePattern(pattern) {}\n}`,
    testCases: [{ input: { key: 'user:1', l1Hit: false, l2Hit: true }, expected: { source: 'l2', l1Populated: true } }]
  },
  {
    id: 87, title: 'Message Queue Implementation', difficulty: 'Hard', category: 'backend',
    description: 'Implement a simple message queue system', timeLimit: '65 min', solved: false, score: 0,
    problemStatement: 'Implement a message queue with publish/subscribe pattern, message acknowledgment, dead letter queue, and retry logic.',
    examples: [{ input: 'queue.publish("orders", {orderId: 123}), queue.subscribe("orders", handler)', output: 'handler called with message' }],
    starterCode: `class MessageQueue {\n    constructor() {}\n    publish(topic, message) {}\n    subscribe(topic, handler) {}\n    acknowledge(messageId) {}\n    retry(messageId) {}\n}`,
    testCases: [{ input: { topic: 'orders', messages: 5 }, expected: { delivered: 5 } }]
  },
  {
    id: 88, title: 'Implement OAuth 2.0 Flow', difficulty: 'Hard', category: 'backend',
    description: 'Implement OAuth 2.0 authorization code flow', timeLimit: '75 min', solved: false, score: 0,
    problemStatement: 'Implement the OAuth 2.0 authorization code flow with PKCE, including authorization endpoint, token endpoint, and token refresh.',
    examples: [{ input: 'GET /oauth/authorize?client_id=...&redirect_uri=...&code_challenge=...', output: 'Redirect with authorization code' }],
    starterCode: `class OAuthServer {\n    constructor(clients, users) {}\n    authorize(clientId, redirectUri, codeChallenge, scope) {}\n    exchangeCode(code, codeVerifier, clientId) {}\n    refreshToken(refreshToken, clientId) {}\n}`,
    testCases: [{ input: { clientId: 'app1', scope: 'read' }, expected: { hasAuthCode: true } }]
  },
  {
    id: 89, title: 'Database Query Optimizer', difficulty: 'Hard', category: 'backend',
    description: 'Implement a simple SQL query optimizer', timeLimit: '80 min', solved: false, score: 0,
    problemStatement: 'Implement a query optimizer that analyzes SQL queries, suggests indexes, rewrites inefficient queries, and estimates query costs.',
    examples: [{ input: 'SELECT * FROM users WHERE email = "test@example.com"', output: 'Suggest index on email column, estimated cost: 1' }],
    starterCode: `class QueryOptimizer {\n    constructor(schema, statistics) {}\n    analyze(query) {}\n    suggestIndexes(query) {}\n    estimateCost(query) {}\n    rewrite(query) {}\n}`,
    testCases: [{ input: { query: 'SELECT * FROM users WHERE id = 1' }, expected: { optimized: true } }]
  },
  {
    id: 90, title: 'Implement WebSocket Server', difficulty: 'Hard', category: 'backend',
    description: 'Build a WebSocket server with rooms and broadcasting', timeLimit: '70 min', solved: false, score: 0,
    problemStatement: 'Implement a WebSocket server that supports multiple rooms, broadcasting to room members, private messaging, and connection management.',
    examples: [{ input: 'client.join("room1"), server.broadcast("room1", "Hello")', output: 'All room1 members receive "Hello"' }],
    starterCode: `class WebSocketServer {\n    constructor(port) {}\n    onConnection(socket) {}\n    joinRoom(socketId, room) {}\n    broadcast(room, message) {}\n    sendPrivate(socketId, message) {}\n}`,
    testCases: [{ input: { room: 'room1', members: 5, message: 'Hello' }, expected: { delivered: 5 } }]
  },
  {
    id: 91, title: 'Implement Task Scheduler', difficulty: 'Medium', category: 'backend',
    description: 'Build a cron-like task scheduler', timeLimit: '55 min', solved: false, score: 0,
    problemStatement: 'Implement a task scheduler that supports cron expressions, one-time scheduled tasks, recurring tasks, and task cancellation.',
    examples: [{ input: 'scheduler.schedule("0 * * * *", task)', output: 'task runs every hour' }],
    starterCode: `class TaskScheduler {\n    constructor() {}\n    schedule(cronExpression, task) {}\n    scheduleOnce(delay, task) {}\n    cancel(taskId) {}\n    getScheduledTasks() {}\n}`,
    testCases: [{ input: { cron: '* * * * *', duration: 3 }, expected: { executions: 3 } }]
  },
  {
    id: 92, title: 'Implement Circuit Breaker', difficulty: 'Hard', category: 'backend',
    description: 'Implement the circuit breaker pattern for fault tolerance', timeLimit: '60 min', solved: false, score: 0,
    problemStatement: 'Implement a circuit breaker that monitors failures, opens the circuit after threshold failures, and automatically tests recovery after a timeout.',
    examples: [{ input: '5 consecutive failures -> circuit opens, requests fail fast', output: 'CircuitOpenError thrown' }],
    starterCode: `class CircuitBreaker {\n    constructor(threshold, timeout) {}\n    execute(fn) {}\n    getState() {}\n    reset() {}\n}`,
    testCases: [{ input: { failures: 5, threshold: 5 }, expected: { state: 'OPEN' } }]
  },
  {
    id: 93, title: 'Build HTTP Client', difficulty: 'Medium', category: 'backend',
    description: 'Implement an HTTP client with retry and timeout', timeLimit: '50 min', solved: false, score: 0,
    problemStatement: 'Implement an HTTP client that supports GET, POST, PUT, DELETE methods, automatic retries with exponential backoff, timeout handling, and request interceptors.',
    examples: [{ input: 'client.get("https://api.example.com/users", { timeout: 5000, retries: 3 })', output: 'Response or error after 3 retries' }],
    starterCode: `class HttpClient {\n    constructor(baseURL, defaultOptions) {}\n    get(path, options) {}\n    post(path, body, options) {}\n    addInterceptor(interceptor) {}\n    retry(fn, retries, delay) {}\n}`,
    testCases: [{ input: { url: '/users', retries: 3 }, expected: { attempted: 1 } }]
  },
  {
    id: 94, title: 'Implement Saga Pattern', difficulty: 'Hard', category: 'backend',
    description: 'Implement the Saga pattern for distributed transactions', timeLimit: '80 min', solved: false, score: 0,
    problemStatement: 'Implement the Saga pattern for managing distributed transactions with compensating transactions for rollback.',
    examples: [{ input: 'saga: [bookFlight, bookHotel, chargeCard] - chargeCard fails', output: 'cancelHotel, cancelFlight compensations run' }],
    starterCode: `class Saga {\n    constructor() { this.steps = []; }\n    addStep(action, compensation) {}\n    execute() {}\n    rollback(failedStep) {}\n}`,
    testCases: [{ input: { steps: 3, failAt: 2 }, expected: { compensations: 2 } }]
  },
  {
    id: 95, title: 'Implement CQRS Pattern', difficulty: 'Hard', category: 'backend',
    description: 'Implement Command Query Responsibility Segregation', timeLimit: '75 min', solved: false, score: 0,
    problemStatement: 'Implement CQRS pattern separating read and write operations, with command handlers, query handlers, and event sourcing.',
    examples: [{ input: 'commandBus.dispatch(new CreateUserCommand(data))', output: 'User created, UserCreatedEvent emitted' }],
    starterCode: `class CommandBus {\n    constructor() {}\n    register(commandType, handler) {}\n    dispatch(command) {}\n}\nclass QueryBus {\n    constructor() {}\n    register(queryType, handler) {}\n    execute(query) {}\n}`,
    testCases: [{ input: { command: 'CreateUser', data: { name: 'John' } }, expected: { success: true } }]
  },
  {
    id: 96, title: 'Build API Rate Limiter', difficulty: 'Medium', category: 'backend',
    description: 'Implement sliding window rate limiting for APIs', timeLimit: '50 min', solved: false, score: 0,
    problemStatement: 'Implement a sliding window rate limiter that tracks requests per user/IP, supports different limits for different endpoints, and returns proper 429 responses.',
    examples: [{ input: '101st request within 1 minute (limit=100)', output: '429 Too Many Requests with Retry-After header' }],
    starterCode: `class RateLimiter {\n    constructor() {}\n    middleware(limit, windowMs) {}\n    isRateLimited(key, limit, windowMs) {}\n    getRemainingRequests(key, limit, windowMs) {}\n}`,
    testCases: [{ input: { requests: 101, limit: 100, windowMs: 60000 }, expected: { limited: true, status: 429 } }]
  },
  {
    id: 97, title: 'Implement Event Sourcing', difficulty: 'Hard', category: 'backend',
    description: 'Build an event sourcing system', timeLimit: '85 min', solved: false, score: 0,
    problemStatement: 'Implement event sourcing where state changes are stored as a sequence of events. Include event store, aggregate reconstruction, and projections.',
    examples: [{ input: 'events: [AccountCreated, MoneyDeposited(100), MoneyWithdrawn(30)]', output: 'Account balance: 70' }],
    starterCode: `class EventStore {\n    constructor() {}\n    append(aggregateId, events) {}\n    getEvents(aggregateId) {}\n    createSnapshot(aggregateId) {}\n}\nclass Aggregate {\n    apply(event) {}\n    reconstruct(events) {}\n}`,
    testCases: [{ input: { events: ['Created','Deposited:100','Withdrawn:30'] }, expected: { balance: 70 } }]
  },
  {
    id: 98, title: 'Implement Service Discovery', difficulty: 'Hard', category: 'backend',
    description: 'Build a service discovery and registry system', timeLimit: '75 min', solved: false, score: 0,
    problemStatement: 'Implement a service registry where microservices can register themselves, discover other services, and handle health checks and deregistration.',
    examples: [{ input: 'registry.register("user-service", "http://localhost:3001", {health: "/health"})', output: 'service_registered' }],
    starterCode: `class ServiceRegistry {\n    constructor() {}\n    register(name, url, metadata) {}\n    deregister(name, instanceId) {}\n    discover(name) {}\n    healthCheck() {}\n}`,
    testCases: [{ input: { service: 'user-service', url: 'http://localhost:3001' }, expected: { registered: true } }]
  },
  {
    id: 99, title: 'Build Dependency Injection Container', difficulty: 'Hard', category: 'backend',
    description: 'Implement an IoC/DI container', timeLimit: '70 min', solved: false, score: 0,
    problemStatement: 'Implement a dependency injection container that supports singleton and transient lifetimes, constructor injection, and circular dependency detection.',
    examples: [{ input: 'container.register("UserService", UserService, ["DatabaseService"]), container.resolve("UserService")', output: 'UserService instance with DatabaseService injected' }],
    starterCode: `class DIContainer {\n    constructor() {}\n    register(name, constructor, dependencies, lifetime) {}\n    resolve(name) {}\n    detectCircular(name, visited) {}\n}`,
    testCases: [{ input: { service: 'UserService', deps: ['DB'] }, expected: { resolved: true } }]
  },
  {
    id: 100, title: 'Implement Distributed Lock', difficulty: 'Hard', category: 'backend',
    description: 'Implement a distributed locking mechanism', timeLimit: '70 min', solved: false, score: 0,
    problemStatement: 'Implement a distributed lock using Redis-like operations that prevents race conditions in distributed systems, with TTL, lock renewal, and deadlock prevention.',
    examples: [{ input: 'lock.acquire("resource:1", ttl=5000)', output: 'lock_token or null if already locked' }],
    starterCode: `class DistributedLock {\n    constructor(store) {}\n    acquire(resource, ttl) {}\n    release(resource, token) {}\n    renew(resource, token, ttl) {}\n    isLocked(resource) {}\n}`,
    testCases: [{ input: { resource: 'order:1', ttl: 5000 }, expected: { acquired: true } }]
  },
];

export const STARTER_CODE_BY_LANG: Record<string, Record<number, string>> = {
  JavaScript: {
    1: `function twoSum(nums, target) {\n    // Your code here\n    \n}`,
    2: `function isValid(s) {\n    // Your code here\n    \n}`,
    3: `function reverseString(s) {\n    // Your code here\n    \n}`,
    4: `function isPalindrome(x) {\n    // Your code here\n    \n}`,
    5: `function fizzBuzz(n) {\n    // Your code here\n    \n}`,
    6: `function maxSubArray(nums) {\n    // Your code here\n    \n}`,
    7: `function merge(intervals) {\n    // Your code here\n    \n}`,
    8: `function lengthOfLongestSubstring(s) {\n    // Your code here\n    \n}`,
    9: `function search(nums, target) {\n    // Your code here\n    \n}`,
    10: `function coinChange(coins, amount) {\n    // Your code here\n    \n}`,
    11: `function exist(board, word) {\n    // Your code here\n    \n}`,
    12: `function trap(height) {\n    // Your code here\n    \n}`,
    13: `function findMedianSortedArrays(nums1, nums2) {\n    // Your code here\n    \n}`,
    14: `function solveNQueens(n) {\n    // Your code here\n    \n}`,
    15: `function maxSlidingWindow(nums, k) {\n    // Your code here\n    \n}`,
    16: `function canJump(nums) {\n    // Your code here\n    \n}`,
    17: `function productExceptSelf(nums) {\n    // Your code here\n    \n}`,
    18: `function findPeakElement(nums) {\n    // Your code here\n    \n}`,
    19: `function rotate(nums, k) {\n    // Your code here\n    \n}`,
    20: `function lengthOfLIS(nums) {\n    // Your code here\n    \n}`,
    21: `function inorderTraversal(root) {\n    // Your code here\n    \n}`,
    22: `class MyStack {\n    constructor() {}\n    push(x) {}\n    pop() {}\n    top() {}\n    empty() {}\n}`,
    23: `function hasCycle(head) {\n    // Your code here\n    \n}`,
    24: `function reverseList(head) {\n    // Your code here\n    \n}`,
    25: `function maxDepth(root) {\n    // Your code here\n    \n}`,
    26: `function mergeTwoLists(list1, list2) {\n    // Your code here\n    \n}`,
    27: `class LRUCache {\n    constructor(capacity) {}\n    get(key) {}\n    put(key, value) {}\n}`,
    28: `function isValidBST(root) {\n    // Your code here\n    \n}`,
    29: `function findKthLargest(nums, k) {\n    // Your code here\n    \n}`,
    30: `function bfs(graph, start) {\n    // Your code here\n    \n}`,
    31: `class Trie {\n    constructor() {}\n    insert(word) {}\n    search(word) {}\n    startsWith(prefix) {}\n}`,
    32: `function serialize(root) {\n    // Your code here\n}\nfunction deserialize(data) {\n    // Your code here\n}`,
    33: `function ladderLength(beginWord, endWord, wordList) {\n    // Your code here\n    \n}`,
    34: `class MedianFinder {\n    constructor() {}\n    addNum(num) {}\n    findMedian() {}\n}`,
    35: `function alienOrder(words) {\n    // Your code here\n    \n}`,
    36: `class MinStack {\n    constructor() {}\n    push(val) {}\n    pop() {}\n    top() {}\n    getMin() {}\n}`,
    37: `function numIslands(grid) {\n    // Your code here\n    \n}`,
    38: `function cloneGraph(node) {\n    // Your code here\n    \n}`,
    39: `function lowestCommonAncestor(root, p, q) {\n    // Your code here\n    \n}`,
    40: `function canFinish(numCourses, prerequisites) {\n    // Your code here\n    \n}`,
  },
  Python: {
    1: `def two_sum(nums, target):\n    # Your code here\n    pass`,
    2: `def is_valid(s: str) -> bool:\n    # Your code here\n    pass`,
    3: `def reverse_string(s):\n    # Your code here\n    pass`,
    4: `def is_palindrome(x: int) -> bool:\n    # Your code here\n    pass`,
    5: `def fizz_buzz(n: int):\n    # Your code here\n    pass`,
    6: `def max_sub_array(nums):\n    # Your code here\n    pass`,
    7: `def merge(intervals):\n    # Your code here\n    pass`,
    8: `def length_of_longest_substring(s: str) -> int:\n    # Your code here\n    pass`,
    9: `def search(nums, target: int) -> int:\n    # Your code here\n    pass`,
    10: `def coin_change(coins, amount: int) -> int:\n    # Your code here\n    pass`,
    11: `def exist(board, word: str) -> bool:\n    # Your code here\n    pass`,
    12: `def trap(height) -> int:\n    # Your code here\n    pass`,
    13: `def find_median_sorted_arrays(nums1, nums2) -> float:\n    # Your code here\n    pass`,
    14: `def solve_n_queens(n: int):\n    # Your code here\n    pass`,
    15: `def max_sliding_window(nums, k: int):\n    # Your code here\n    pass`,
    16: `def can_jump(nums) -> bool:\n    # Your code here\n    pass`,
    17: `def product_except_self(nums):\n    # Your code here\n    pass`,
    18: `def find_peak_element(nums) -> int:\n    # Your code here\n    pass`,
    19: `def rotate(nums, k: int) -> None:\n    # Your code here\n    pass`,
    20: `def length_of_lis(nums) -> int:\n    # Your code here\n    pass`,
    21: `def inorder_traversal(root):\n    # Your code here\n    pass`,
    22: `class MyStack:\n    def __init__(self): pass\n    def push(self, x): pass\n    def pop(self): pass\n    def top(self): pass\n    def empty(self): pass`,
    23: `def has_cycle(head) -> bool:\n    # Your code here\n    pass`,
    24: `def reverse_list(head):\n    # Your code here\n    pass`,
    25: `def max_depth(root) -> int:\n    # Your code here\n    pass`,
    26: `def merge_two_lists(list1, list2):\n    # Your code here\n    pass`,
    27: `class LRUCache:\n    def __init__(self, capacity): pass\n    def get(self, key): pass\n    def put(self, key, value): pass`,
    28: `def is_valid_bst(root) -> bool:\n    # Your code here\n    pass`,
    29: `def find_kth_largest(nums, k: int) -> int:\n    # Your code here\n    pass`,
    30: `def bfs(graph, start):\n    # Your code here\n    pass`,
    31: `class Trie:\n    def __init__(self): pass\n    def insert(self, word): pass\n    def search(self, word): pass\n    def starts_with(self, prefix): pass`,
    32: `def serialize(root): pass\ndef deserialize(data): pass`,
    33: `def ladder_length(begin_word, end_word, word_list) -> int:\n    # Your code here\n    pass`,
    34: `class MedianFinder:\n    def __init__(self): pass\n    def add_num(self, num): pass\n    def find_median(self): pass`,
    35: `def alien_order(words) -> str:\n    # Your code here\n    pass`,
    36: `class MinStack:\n    def __init__(self): pass\n    def push(self, val): pass\n    def pop(self): pass\n    def top(self): pass\n    def get_min(self): pass`,
    37: `def num_islands(grid) -> int:\n    # Your code here\n    pass`,
    38: `def clone_graph(node):\n    # Your code here\n    pass`,
    39: `def lowest_common_ancestor(root, p, q):\n    # Your code here\n    pass`,
    40: `def can_finish(num_courses, prerequisites) -> bool:\n    # Your code here\n    pass`,
  },
  Java: {
    1: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n        return new int[]{};\n    }\n}`,
    2: `class Solution {\n    public boolean isValid(String s) {\n        // Your code here\n        return false;\n    }\n}`,
    3: `class Solution {\n    public void reverseString(char[] s) {\n        // Your code here\n    }\n}`,
    4: `class Solution {\n    public boolean isPalindrome(int x) {\n        // Your code here\n        return false;\n    }\n}`,
    5: `class Solution {\n    public List<String> fizzBuzz(int n) {\n        // Your code here\n        return new ArrayList<>();\n    }\n}`,
    6: `class Solution {\n    public int maxSubArray(int[] nums) {\n        // Your code here\n        return 0;\n    }\n}`,
    7: `class Solution {\n    public int[][] merge(int[][] intervals) {\n        // Your code here\n        return new int[][]{};\n    }\n}`,
    8: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Your code here\n        return 0;\n    }\n}`,
    9: `class Solution {\n    public int search(int[] nums, int target) {\n        // Your code here\n        return -1;\n    }\n}`,
    10: `class Solution {\n    public int coinChange(int[] coins, int amount) {\n        // Your code here\n        return -1;\n    }\n}`,
    11: `class Solution {\n    public boolean exist(char[][] board, String word) {\n        // Your code here\n        return false;\n    }\n}`,
    12: `class Solution {\n    public int trap(int[] height) {\n        // Your code here\n        return 0;\n    }\n}`,
    13: `class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        // Your code here\n        return 0.0;\n    }\n}`,
    14: `class Solution {\n    public List<List<String>> solveNQueens(int n) {\n        // Your code here\n        return new ArrayList<>();\n    }\n}`,
    15: `class Solution {\n    public int[] maxSlidingWindow(int[] nums, int k) {\n        // Your code here\n        return new int[]{};\n    }\n}`,
    16: `class Solution {\n    public boolean canJump(int[] nums) {\n        // Your code here\n        return false;\n    }\n}`,
    17: `class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        // Your code here\n        return new int[]{};\n    }\n}`,
    18: `class Solution {\n    public int findPeakElement(int[] nums) {\n        // Your code here\n        return 0;\n    }\n}`,
    19: `class Solution {\n    public void rotate(int[] nums, int k) {\n        // Your code here\n    }\n}`,
    20: `class Solution {\n    public int lengthOfLIS(int[] nums) {\n        // Your code here\n        return 0;\n    }\n}`,
    21: `class Solution {\n    public List<Integer> inorderTraversal(TreeNode root) {\n        // Your code here\n        return new ArrayList<>();\n    }\n}`,
    22: `class MyStack {\n    public MyStack() {}\n    public void push(int x) {}\n    public int pop() { return 0; }\n    public int top() { return 0; }\n    public boolean empty() { return true; }\n}`,
    23: `class Solution {\n    public boolean hasCycle(ListNode head) {\n        // Your code here\n        return false;\n    }\n}`,
    24: `class Solution {\n    public ListNode reverseList(ListNode head) {\n        // Your code here\n        return null;\n    }\n}`,
    25: `class Solution {\n    public int maxDepth(TreeNode root) {\n        // Your code here\n        return 0;\n    }\n}`,
    26: `class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        // Your code here\n        return null;\n    }\n}`,
    27: `class LRUCache {\n    public LRUCache(int capacity) {}\n    public int get(int key) { return -1; }\n    public void put(int key, int value) {}\n}`,
    28: `class Solution {\n    public boolean isValidBST(TreeNode root) {\n        // Your code here\n        return false;\n    }\n}`,
    29: `class Solution {\n    public int findKthLargest(int[] nums, int k) {\n        // Your code here\n        return 0;\n    }\n}`,
    30: `class Solution {\n    public List<Integer> bfs(Map<Integer, List<Integer>> graph, int start) {\n        // Your code here\n        return new ArrayList<>();\n    }\n}`,
    31: `class Trie {\n    public Trie() {}\n    public void insert(String word) {}\n    public boolean search(String word) { return false; }\n    public boolean startsWith(String prefix) { return false; }\n}`,
    32: `class Codec {\n    public String serialize(TreeNode root) { return ""; }\n    public TreeNode deserialize(String data) { return null; }\n}`,
    33: `class Solution {\n    public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n        // Your code here\n        return 0;\n    }\n}`,
    34: `class MedianFinder {\n    public MedianFinder() {}\n    public void addNum(int num) {}\n    public double findMedian() { return 0.0; }\n}`,
    35: `class Solution {\n    public String alienOrder(String[] words) {\n        // Your code here\n        return "";\n    }\n}`,
    36: `class MinStack {\n    public MinStack() {}\n    public void push(int val) {}\n    public void pop() {}\n    public int top() { return 0; }\n    public int getMin() { return 0; }\n}`,
    37: `class Solution {\n    public int numIslands(char[][] grid) {\n        // Your code here\n        return 0;\n    }\n}`,
    38: `class Solution {\n    public Node cloneGraph(Node node) {\n        // Your code here\n        return null;\n    }\n}`,
    39: `class Solution {\n    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n        // Your code here\n        return null;\n    }\n}`,
    40: `class Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        // Your code here\n        return false;\n    }\n}`,
  },
  'C++': {
    1: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Your code here\n        return {};\n    }\n};`,
    2: `class Solution {\npublic:\n    bool isValid(string s) {\n        // Your code here\n        return false;\n    }\n};`,
    3: `class Solution {\npublic:\n    void reverseString(vector<char>& s) {\n        // Your code here\n    }\n};`,
    4: `class Solution {\npublic:\n    bool isPalindrome(int x) {\n        // Your code here\n        return false;\n    }\n};`,
    5: `class Solution {\npublic:\n    vector<string> fizzBuzz(int n) {\n        // Your code here\n        return {};\n    }\n};`,
    6: `class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        // Your code here\n        return 0;\n    }\n};`,
    7: `class Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        // Your code here\n        return {};\n    }\n};`,
    8: `class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // Your code here\n        return 0;\n    }\n};`,
    9: `class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        // Your code here\n        return -1;\n    }\n};`,
    10: `class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        // Your code here\n        return -1;\n    }\n};`,
    11: `class Solution {\npublic:\n    bool exist(vector<vector<char>>& board, string word) {\n        // Your code here\n        return false;\n    }\n};`,
    12: `class Solution {\npublic:\n    int trap(vector<int>& height) {\n        // Your code here\n        return 0;\n    }\n};`,
    13: `class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        // Your code here\n        return 0.0;\n    }\n};`,
    14: `class Solution {\npublic:\n    vector<vector<string>> solveNQueens(int n) {\n        // Your code here\n        return {};\n    }\n};`,
    15: `class Solution {\npublic:\n    vector<int> maxSlidingWindow(vector<int>& nums, int k) {\n        // Your code here\n        return {};\n    }\n};`,
    16: `class Solution {\npublic:\n    bool canJump(vector<int>& nums) {\n        // Your code here\n        return false;\n    }\n};`,
    17: `class Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        // Your code here\n        return {};\n    }\n};`,
    18: `class Solution {\npublic:\n    int findPeakElement(vector<int>& nums) {\n        // Your code here\n        return 0;\n    }\n};`,
    19: `class Solution {\npublic:\n    void rotate(vector<int>& nums, int k) {\n        // Your code here\n    }\n};`,
    20: `class Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n        // Your code here\n        return 0;\n    }\n};`,
    21: `class Solution {\npublic:\n    vector<int> inorderTraversal(TreeNode* root) {\n        // Your code here\n        return {};\n    }\n};`,
    22: `class MyStack {\npublic:\n    MyStack() {}\n    void push(int x) {}\n    int pop() { return 0; }\n    int top() { return 0; }\n    bool empty() { return true; }\n};`,
    23: `class Solution {\npublic:\n    bool hasCycle(ListNode *head) {\n        // Your code here\n        return false;\n    }\n};`,
    24: `class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        // Your code here\n        return nullptr;\n    }\n};`,
    25: `class Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        // Your code here\n        return 0;\n    }\n};`,
    26: `class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        // Your code here\n        return nullptr;\n    }\n};`,
    27: `class LRUCache {\npublic:\n    LRUCache(int capacity) {}\n    int get(int key) { return -1; }\n    void put(int key, int value) {}\n};`,
    28: `class Solution {\npublic:\n    bool isValidBST(TreeNode* root) {\n        // Your code here\n        return false;\n    }\n};`,
    29: `class Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        // Your code here\n        return 0;\n    }\n};`,
    30: `class Solution {\npublic:\n    vector<int> bfs(unordered_map<int, vector<int>>& graph, int start) {\n        // Your code here\n        return {};\n    }\n};`,
    31: `class Trie {\npublic:\n    Trie() {}\n    void insert(string word) {}\n    bool search(string word) { return false; }\n    bool startsWith(string prefix) { return false; }\n};`,
    32: `class Codec {\npublic:\n    string serialize(TreeNode* root) { return ""; }\n    TreeNode* deserialize(string data) { return nullptr; }\n};`,
    33: `class Solution {\npublic:\n    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {\n        // Your code here\n        return 0;\n    }\n};`,
    34: `class MedianFinder {\npublic:\n    MedianFinder() {}\n    void addNum(int num) {}\n    double findMedian() { return 0.0; }\n};`,
    35: `class Solution {\npublic:\n    string alienOrder(vector<string>& words) {\n        // Your code here\n        return "";\n    }\n};`,
    36: `class MinStack {\npublic:\n    MinStack() {}\n    void push(int val) {}\n    void pop() {}\n    int top() { return 0; }\n    int getMin() { return 0; }\n};`,
    37: `class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        // Your code here\n        return 0;\n    }\n};`,
    38: `class Solution {\npublic:\n    Node* cloneGraph(Node* node) {\n        // Your code here\n        return nullptr;\n    }\n};`,
    39: `class Solution {\npublic:\n    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n        // Your code here\n        return nullptr;\n    }\n};`,
    40: `class Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        // Your code here\n        return false;\n    }\n};`,
  },
};

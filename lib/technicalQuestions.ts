import { Question } from './questionEngine';

export const expandedTechnicalQuestions: Question[] = [
  {
    id: 'technical_31',
    question: 'What is an API and why is it used?',
    type: 'technical',
    difficulty: 'basic',
    category: 'API Fundamentals',
    correctAnswer: 'An API (Application Programming Interface) is a set of rules that allows different software applications to communicate with each other.',
    keyPoints: ['Definition', 'Communication protocol', 'Request/response', 'Integration', 'Abstraction']
  },
  {
    id: 'technical_32',
    question: 'What is the difference between a compiler and an interpreter?',
    type: 'technical',
    difficulty: 'basic',
    category: 'Programming Fundamentals',
    correctAnswer: 'A compiler translates the entire source code into machine code before execution. An interpreter translates and executes code line by line.',
    keyPoints: ['Translation method', 'Execution timing', 'Performance', 'Error handling', 'Use cases']
  },
  {
    id: 'technical_33',
    question: 'What is a variable in programming?',
    type: 'technical',
    difficulty: 'basic',
    category: 'Programming Basics',
    correctAnswer: 'A variable is a named storage location in memory that holds a value which can be changed during program execution.',
    keyPoints: ['Storage location', 'Named reference', 'Mutable value', 'Data type', 'Scope']
  },
  {
    id: 'technical_34',
    question: 'What is the difference between a function and a method?',
    type: 'technical',
    difficulty: 'basic',
    category: 'Programming Concepts',
    correctAnswer: 'A function is a standalone block of code. A method is a function associated with an object or class.',
    keyPoints: ['Association', 'Object context', 'Data access', 'Invocation', 'Scope']
  },
  {
    id: 'technical_35',
    question: 'What is a database?',
    type: 'technical',
    difficulty: 'basic',
    category: 'Database Fundamentals',
    correctAnswer: 'A database is an organized collection of structured data stored electronically for efficient storage and retrieval.',
    keyPoints: ['Data storage', 'Structured organization', 'Retrieval', 'Management', 'Persistence']
  },
  {
    id: 'technical_36',
    question: 'What is the difference between frontend and backend development?',
    type: 'technical',
    difficulty: 'basic',
    category: 'Web Development',
    correctAnswer: 'Frontend focuses on user interface and client-side. Backend handles server-side logic, databases, and architecture.',
    keyPoints: ['Client-side', 'Server-side', 'User interface', 'Business logic', 'Technologies']
  },
  {
    id: 'technical_37',
    question: 'What is a bug in software?',
    type: 'technical',
    difficulty: 'basic',
    category: 'Software Quality',
    correctAnswer: 'A bug is an error, flaw, or fault in software that causes incorrect or unexpected results.',
    keyPoints: ['Error definition', 'Unexpected behavior', 'Causes', 'Impact', 'Resolution']
  },
  {
    id: 'technical_38',
    question: 'What is version control and why is it important?',
    type: 'technical',
    difficulty: 'basic',
    category: 'Development Tools',
    correctAnswer: 'Version control tracks changes to code over time, allowing collaboration, reverting changes, and maintaining history.',
    keyPoints: ['Change tracking', 'Collaboration', 'History', 'Rollback', 'Branching']
  },
  {
    id: 'technical_39',
    question: 'What is the difference between a library and a framework?',
    type: 'technical',
    difficulty: 'basic',
    category: 'Development Tools',
    correctAnswer: 'A library provides specific functionality you call when needed. A framework provides structure and calls your code.',
    keyPoints: ['Control flow', 'Inversion of control', 'Specific vs holistic', 'Flexibility', 'Learning curve']
  },
  {
    id: 'technical_40',
    question: 'What is debugging?',
    type: 'technical',
    difficulty: 'basic',
    category: 'Software Quality',
    correctAnswer: 'Debugging is the process of identifying, analyzing, and removing errors from software.',
    keyPoints: ['Error identification', 'Root cause analysis', 'Fixing', 'Testing', 'Tools']
  },
  {
    id: 'technical_51',
    question: 'Explain how DNS works.',
    type: 'technical',
    difficulty: 'intermediate',
    category: 'Networking',
    correctAnswer: 'DNS translates domain names to IP addresses through a hierarchical query process involving root, TLD, and authoritative servers.',
    keyPoints: ['Name resolution', 'Hierarchy', 'Caching', 'Query process', 'Record types']
  },
  {
    id: 'technical_52',
    question: 'What is the difference between TCP and UDP?',
    type: 'technical',
    difficulty: 'intermediate',
    category: 'Networking',
    correctAnswer: 'TCP is connection-oriented and reliable. UDP is connectionless and faster but unreliable.',
    keyPoints: ['Connection', 'Reliability', 'Speed', 'Use cases', 'Header size']
  },
  {
    id: 'technical_53',
    question: 'Explain how a hash table works.',
    type: 'technical',
    difficulty: 'intermediate',
    category: 'Data Structures',
    correctAnswer: 'A hash table uses a hash function to map keys to array indices for O(1) average access, handling collisions with chaining or open addressing.',
    keyPoints: ['Hash function', 'Key-value storage', 'Collision handling', 'Time complexity', 'Load factor']
  },
  {
    id: 'technical_54',
    question: 'What is the difference between a stack and a queue?',
    type: 'technical',
    difficulty: 'intermediate',
    category: 'Data Structures',
    correctAnswer: 'Stack is LIFO (Last In First Out). Queue is FIFO (First In First Out).',
    keyPoints: ['LIFO vs FIFO', 'Operations', 'Use cases', 'Implementation', 'Applications']
  },
  {
    id: 'technical_55',
    question: 'Explain the concept of recursion.',
    type: 'technical',
    difficulty: 'intermediate',
    category: 'Algorithms',
    correctAnswer: 'Recursion is a function calling itself to solve smaller instances of the same problem, with a base case to stop.',
    keyPoints: ['Self-calling', 'Base case', 'Call stack', 'Divide and conquer', 'Termination']
  },
  {
    id: 'technical_71',
    question: 'Explain how consistent hashing works.',
    type: 'technical',
    difficulty: 'advanced',
    category: 'Distributed Systems',
    correctAnswer: 'Consistent hashing maps keys and nodes to a ring. Adding/removing nodes only affects adjacent keys, minimizing redistribution.',
    keyPoints: ['Hash ring', 'Virtual nodes', 'Minimal redistribution', 'Scalability', 'Load balancing']
  },
  {
    id: 'technical_72',
    question: 'What is the difference between Paxos and Raft consensus algorithms?',
    type: 'technical',
    difficulty: 'advanced',
    category: 'Distributed Systems',
    correctAnswer: 'Paxos is theoretically proven but complex. Raft is designed for understandability with a strong leader.',
    keyPoints: ['Leader election', 'Log replication', 'Safety', 'Understandability', 'Implementation']
  },
  {
    id: 'technical_73',
    question: 'Explain how a bloom filter works.',
    type: 'technical',
    difficulty: 'advanced',
    category: 'Data Structures',
    correctAnswer: 'A bloom filter uses multiple hash functions to set bits in a bit array. It can definitively say an element is NOT present.',
    keyPoints: ['Probabilistic', 'Space efficient', 'False positives', 'Hash functions', 'Use cases']
  },
  {
    id: 'technical_74',
    question: 'What is the difference between B-trees and B+ trees?',
    type: 'technical',
    difficulty: 'advanced',
    category: 'Data Structures',
    correctAnswer: 'B-trees store data in all nodes. B+ trees store data only in leaves with linked leaf nodes for efficient range queries.',
    keyPoints: ['Data storage', 'Leaf linking', 'Range queries', 'Fanout', 'Database indexing']
  },
  {
    id: 'technical_75',
    question: 'Explain how database query optimization works.',
    type: 'technical',
    difficulty: 'advanced',
    category: 'Database',
    correctAnswer: 'Query optimizers analyze query structure, statistics, and indexes to choose the most efficient execution plan.',
    keyPoints: ['Execution plans', 'Cost estimation', 'Statistics', 'Index selection', 'Join ordering']
  },
  {
    id: 'technical_101',
    question: 'Explain the design and trade-offs of the Raft consensus algorithm.',
    type: 'technical',
    difficulty: 'expert',
    category: 'Distributed Systems',
    correctAnswer: 'Raft uses a strong leader for log replication with leader election based on timeouts. It prioritizes understandability over optimal performance.',
    keyPoints: ['Leader-based', 'Term logic', 'Log matching', 'Commit rules', 'Understandability']
  },
  {
    id: 'technical_102',
    question: 'How would you design a distributed transaction system?',
    type: 'technical',
    difficulty: 'expert',
    category: 'Distributed Systems',
    correctAnswer: 'Use 2PC for strong consistency or Saga pattern for eventual consistency. Consider TCC for better performance.',
    keyPoints: ['2PC', 'Saga pattern', 'TCC', 'Failure handling', 'Compensation']
  },
  {
    id: 'technical_103',
    question: 'Explain the implementation details of a high-performance LSM-tree storage engine.',
    type: 'technical',
    difficulty: 'expert',
    category: 'Database',
    correctAnswer: 'LSM-tree uses in-memory memtable, WAL for durability, and SSTables on disk. Compaction strategies balance write vs read amplification.',
    keyPoints: ['Memtable', 'SSTables', 'Compaction', 'Bloom filters', 'Write amplification']
  },
  {
    id: 'technical_104',
    question: 'How would you design a globally distributed database with strong consistency?',
    type: 'technical',
    difficulty: 'expert',
    category: 'Database',
    correctAnswer: 'Use Paxos/Raft for consensus, implement vector clocks, support tunable consistency levels, and optimize leader placement.',
    keyPoints: ['Consensus', 'Clock synchronization', 'Tunable consistency', 'Leader placement', 'Conflict resolution']
  },
  {
    id: 'technical_105',
    question: 'Explain the implementation of a just-in-time compiler.',
    type: 'technical',
    difficulty: 'expert',
    category: 'Compilers',
    correctAnswer: 'JIT compiles bytecode to native code at runtime using profiling to identify hot paths and speculative optimization.',
    keyPoints: ['Profiling', 'Speculative optimization', 'Deoptimization', 'Tiered compilation', 'Code cache']
  }
];
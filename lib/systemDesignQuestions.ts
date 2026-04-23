import { Question } from './questionEngine';

export const expandedSystemDesignQuestions: Question[] = [
  {
    id: 'system_16',
    question: 'Design a distributed cache system like Redis Cluster.',
    type: 'system-design',
    difficulty: 'advanced',
    category: 'Caching Systems',
    hints: ['Data partitioning', 'Replication strategy', 'Cache eviction', 'Consistency'],
    timeLimit: 60,
    correctAnswer: 'Use consistent hashing for data distribution, implement master-slave replication, support various eviction policies.',
    keyPoints: ['Consistent hashing', 'Replication', 'Eviction policies', 'Failure handling', 'Memory management']
  },
  {
    id: 'system_17',
    question: 'Design a real-time analytics dashboard system.',
    type: 'system-design',
    difficulty: 'advanced',
    category: 'Analytics Systems',
    hints: ['Data ingestion', 'Stream processing', 'Query optimization', 'Real-time updates'],
    timeLimit: 60,
    correctAnswer: 'Use Kafka for ingestion, Flink/Spark for stream processing, pre-aggregate metrics, use time-series database.',
    keyPoints: ['Stream processing', 'Pre-aggregation', 'Time-series DB', 'WebSocket', 'Query optimization']
  },
  {
    id: 'system_18',
    question: 'Design a multi-tenant SaaS application.',
    type: 'system-design',
    difficulty: 'advanced',
    category: 'SaaS Architecture',
    hints: ['Tenant isolation', 'Data partitioning', 'Resource sharing', 'Customization'],
    timeLimit: 60,
    correctAnswer: 'Implement tenant identification middleware, use schema-per-tenant or shared database with tenant ID.',
    keyPoints: ['Tenant isolation', 'Data partitioning', 'Resource management', 'Customization', 'Security']
  },
  {
    id: 'system_19',
    question: 'Design a recommendation system for an e-commerce platform.',
    type: 'system-design',
    difficulty: 'advanced',
    category: 'Recommendation Systems',
    hints: ['User profiling', 'Item features', 'Collaborative filtering', 'Real-time scoring'],
    timeLimit: 60,
    correctAnswer: 'Combine collaborative filtering with content-based approaches, use feature stores, implement real-time scoring pipeline.',
    keyPoints: ['Collaborative filtering', 'Content-based', 'Feature store', 'Real-time scoring', 'A/B testing']
  },
  {
    id: 'system_20',
    question: 'Design a log aggregation and analysis system.',
    type: 'system-design',
    difficulty: 'advanced',
    category: 'Observability',
    hints: ['Log collection', 'Storage efficiency', 'Search capabilities', 'Alerting'],
    timeLimit: 60,
    correctAnswer: 'Use agents for collection, Kafka for buffering, Elasticsearch for indexing, implement log rotation and compression.',
    keyPoints: ['Log collection', 'Indexing', 'Search', 'Storage optimization', 'Alerting']
  },
  {
    id: 'system_21',
    question: 'Design a payment processing system.',
    type: 'system-design',
    difficulty: 'advanced',
    category: 'Financial Systems',
    hints: ['Transaction integrity', 'Fraud detection', 'Idempotency', 'Compliance'],
    timeLimit: 60,
    correctAnswer: 'Ensure ACID transactions, implement idempotency keys, integrate fraud detection, support multiple payment methods.',
    keyPoints: ['ACID', 'Idempotency', 'Fraud detection', 'Compliance', 'Audit trails']
  },
  {
    id: 'system_22',
    question: 'Design a content moderation system.',
    type: 'system-design',
    difficulty: 'advanced',
    category: 'Content Systems',
    hints: ['Automated detection', 'Human review', 'Scalability', 'Latency requirements'],
    timeLimit: 60,
    correctAnswer: 'Use ML models for automated filtering, implement tiered review, prioritize by risk score.',
    keyPoints: ['ML detection', 'Human review', 'Risk scoring', 'Prioritization', 'Latency']
  },
  {
    id: 'system_23',
    question: 'Design a feature flag system.',
    type: 'system-design',
    difficulty: 'advanced',
    category: 'Developer Tools',
    hints: ['Flag evaluation', 'Targeting rules', 'Performance', 'Safety mechanisms'],
    timeLimit: 45,
    correctAnswer: 'Support boolean and multivariate flags, implement user targeting, use local caching for performance.',
    keyPoints: ['Flag types', 'Targeting', 'Caching', 'Kill switches', 'Analytics']
  },
  {
    id: 'system_24',
    question: 'Design a configuration management system.',
    type: 'system-design',
    difficulty: 'advanced',
    category: 'Infrastructure',
    hints: ['Config distribution', 'Versioning', 'Validation', 'Secret management'],
    timeLimit: 45,
    correctAnswer: 'Support environment-specific configs, implement validation schemas, use secure storage for secrets.',
    keyPoints: ['Environment separation', 'Validation', 'Secrets', 'Versioning', 'Distribution']
  },
  {
    id: 'system_25',
    question: 'Design a service mesh architecture.',
    type: 'system-design',
    difficulty: 'advanced',
    category: 'Microservices',
    hints: ['Sidecar pattern', 'Traffic management', 'Observability', 'Security'],
    timeLimit: 60,
    correctAnswer: 'Use sidecar proxies for service communication, implement mTLS, support traffic splitting.',
    keyPoints: ['Sidecar', 'mTLS', 'Traffic management', 'Tracing', 'Service discovery']
  },
  {
    id: 'system_31',
    question: 'Design a globally distributed database with strong consistency.',
    type: 'system-design',
    difficulty: 'expert',
    category: 'Database Systems',
    hints: ['Consensus protocol', 'Clock synchronization', 'Conflict resolution', 'Latency optimization'],
    timeLimit: 75,
    correctAnswer: 'Use Paxos/Raft for consensus across regions, implement hybrid logical clocks, support tunable consistency levels.',
    keyPoints: ['Consensus', 'Clock sync', 'Tunable consistency', 'Leader placement', 'Partition handling']
  },
  {
    id: 'system_32',
    question: 'Design a high-frequency trading platform.',
    type: 'system-design',
    difficulty: 'expert',
    category: 'Financial Systems',
    hints: ['Ultra-low latency', 'Fault tolerance', 'Regulatory compliance', 'Risk management'],
    timeLimit: 75,
    correctAnswer: 'Optimize for microsecond latency with kernel bypass networking, implement hot-hot redundancy.',
    keyPoints: ['Low latency', 'Kernel bypass', 'Redundancy', 'Pre-validation', 'Determinism']
  },
  {
    id: 'system_33',
    question: 'Design a planet-scale CDN with edge computing.',
    type: 'system-design',
    difficulty: 'expert',
    category: 'Content Delivery',
    hints: ['Edge locations', 'Dynamic content', 'Compute at edge', 'Cache optimization'],
    timeLimit: 75,
    correctAnswer: 'Deploy thousands of edge locations, support dynamic content personalization, run serverless functions at edge.',
    keyPoints: ['Edge deployment', 'Edge compute', 'Predictive caching', 'Anycast', 'Personalization']
  },
  {
    id: 'system_34',
    question: 'Design a search engine for the entire web.',
    type: 'system-design',
    difficulty: 'expert',
    category: 'Search Systems',
    hints: ['Web crawling', 'Indexing pipeline', 'Ranking algorithms', 'Query processing'],
    timeLimit: 75,
    correctAnswer: 'Implement distributed crawling with politeness, use inverted index with sharding, apply ML-based ranking.',
    keyPoints: ['Distributed crawling', 'Inverted index', 'ML ranking', 'Real-time updates', 'Query scaling']
  },
  {
    id: 'system_35',
    question: 'Design a blockchain-based distributed ledger system.',
    type: 'system-design',
    difficulty: 'expert',
    category: 'Blockchain',
    hints: ['Consensus mechanism', 'Smart contracts', 'Scalability', 'Finality'],
    timeLimit: 75,
    correctAnswer: 'Choose appropriate consensus (PoW, PoS, BFT), implement EVM-compatible smart contracts, use sharding for scalability.',
    keyPoints: ['Consensus', 'Smart contracts', 'Sharding', 'BFT', 'Throughput']
  }
];
import { expandedBehavioralQuestions } from './behavioralQuestions';
import { expandedTechnicalQuestions } from './technicalQuestions';
import { expandedCodingQuestions } from './codingQuestions';
import { expandedSystemDesignQuestions } from './systemDesignQuestions';

export interface Question {
  id: string;
  question: string;
  type: 'behavioral' | 'technical' | 'coding' | 'system-design';
  difficulty: 'basic' | 'intermediate' | 'advanced' | 'expert';
  category: string;
  expectedApproach?: string;
  hints?: string[];
  timeLimit?: number;
  codeTemplate?: string;
  testCases?: Array<{
    input: any;
    expected: any;
    description?: string;
  }>;
  correctAnswer: string;
  keyPoints: string[];
  exampleAnswer?: string; // Added for behavioral questions
}

export interface TestCase {
  input: any;
  expected: any;
  description?: string;
}

export interface AnswerValidation {
  isCorrect: boolean;
  score: number;
  feedback: string;
  correctAnswer: string;
  keyPointsCovered: string[];
  missedPoints: string[];
}

class QuestionEngine {
  private static instance: QuestionEngine;
  private sessionUsedQuestions: Map<string, Set<string>> = new Map();
  private currentSessionId: string = 'default';
  
  static getInstance(): QuestionEngine {
    if (!QuestionEngine.instance) {
      QuestionEngine.instance = new QuestionEngine();
    }
    return QuestionEngine.instance;
  }

  private get usedQuestions(): Set<string> {
    if (!this.sessionUsedQuestions.has(this.currentSessionId)) {
      this.sessionUsedQuestions.set(this.currentSessionId, new Set());
    }
    return this.sessionUsedQuestions.get(this.currentSessionId)!;
  }

  // Combine original questions with expanded pools
  private behavioralQuestions: Question[] = [
    {
      id: 'behavioral_1',
      question: 'Tell me about a time when you had to work with a difficult team member.',
      type: 'behavioral',
      difficulty: 'basic',
      category: 'Teamwork & Collaboration',
      expectedApproach: 'STAR method',
      correctAnswer: 'Should demonstrate conflict resolution, communication skills, and professional approach to handling difficult situations.',
      keyPoints: ['Situation description', 'Task/challenge', 'Action taken', 'Result achieved', 'Lessons learned'],
      exampleAnswer: 'In my previous role as a software developer, I worked with a team member who consistently missed deadlines and was resistant to feedback (Situation). My task was to ensure our project stayed on track while maintaining team harmony (Task). I approached them privately to understand their challenges, offered help with time management, and suggested pair programming sessions (Action). As a result, their performance improved, deadlines were met, and our team relationship strengthened (Result).'
    },
    {
      id: 'behavioral_2',
      question: 'Describe a situation where you had to learn a new technology quickly.',
      type: 'behavioral',
      difficulty: 'intermediate',
      category: 'Learning & Adaptability',
      expectedApproach: 'STAR method',
      correctAnswer: 'Should show learning agility, resourcefulness, and ability to apply new knowledge effectively.',
      keyPoints: ['Learning approach', 'Resources used', 'Time management', 'Application of knowledge', 'Results'],
      exampleAnswer: 'When our company decided to migrate to React from jQuery, I had only two weeks to become proficient (Situation). I needed to lead the frontend development for a critical client project (Task). I created a structured learning plan: completed online tutorials, built practice projects, joined React communities, and paired with experienced developers (Action). I successfully delivered the project on time and became the go-to React expert on my team (Result).'
    },
    {
      id: 'behavioral_3',
      question: 'Tell me about a time when you made a mistake at work.',
      type: 'behavioral',
      difficulty: 'intermediate',
      category: 'Problem Solving & Accountability',
      expectedApproach: 'STAR method',
      correctAnswer: 'Should demonstrate accountability, problem-solving skills, and learning from mistakes.',
      keyPoints: ['Mistake acknowledgment', 'Impact assessment', 'Corrective actions', 'Prevention measures', 'Lessons learned'],
      exampleAnswer: 'I accidentally deployed code to production that broke the user authentication system, affecting 10,000+ users (Situation). I needed to quickly restore service and prevent future incidents (Task). I immediately rolled back the deployment, communicated with stakeholders, implemented a hotfix, and established better testing procedures (Action). Service was restored within 30 minutes, and we implemented automated testing that prevented similar issues (Result).'
    },
    {
      id: 'behavioral_4',
      question: 'Describe a time when you had to meet a tight deadline.',
      type: 'behavioral',
      difficulty: 'basic',
      category: 'Time Management & Pressure',
      expectedApproach: 'STAR method',
      correctAnswer: 'Should show time management skills, prioritization, and ability to work under pressure.',
      keyPoints: ['Deadline challenge', 'Prioritization strategy', 'Resource management', 'Communication', 'Results'],
      exampleAnswer: 'Our client moved up their product launch by two weeks, requiring us to deliver a complex feature ahead of schedule (Situation). I needed to coordinate with multiple teams to meet this accelerated timeline (Task). I broke down the work into smaller tasks, prioritized critical features, worked extra hours, and maintained daily communication with stakeholders (Action). We delivered the feature on time with positive client feedback (Result).'
    },
    {
      id: 'behavioral_5',
      question: 'Tell me about a time when you had to convince a team to adopt your idea.',
      type: 'behavioral',
      difficulty: 'intermediate',
      category: 'Leadership & Influence',
      expectedApproach: 'STAR method',
      correctAnswer: 'Should show persuasion skills, data-driven arguments, and ability to build consensus.',
      keyPoints: ['Idea presentation', 'Resistance handling', 'Evidence/data used', 'Stakeholder buy-in', 'Outcome'],
      exampleAnswer: 'I proposed migrating our legacy system to microservices, but the team was concerned about complexity (Situation). I needed to convince them this would improve scalability (Task). I created a proof of concept, presented performance benchmarks, addressed concerns through Q&A, and proposed a gradual migration plan (Action). The team approved the migration, and we achieved 40% better performance (Result).'
    },
    {
      id: 'behavioral_6',
      question: 'Describe a situation where you had to handle multiple competing priorities.',
      type: 'behavioral',
      difficulty: 'intermediate',
      category: 'Time Management & Prioritization',
      expectedApproach: 'STAR method',
      correctAnswer: 'Should demonstrate prioritization framework, delegation, and stakeholder communication.',
      keyPoints: ['Competing demands', 'Prioritization method', 'Stakeholder management', 'Resource allocation', 'Successful delivery'],
      exampleAnswer: 'I was leading three projects simultaneously with overlapping deadlines (Situation). I needed to deliver all three without compromising quality (Task). I used the Eisenhower matrix to prioritize, delegated non-critical tasks, negotiated timeline adjustments with stakeholders, and focused on high-impact activities (Action). All projects were delivered on time with positive client feedback (Result).'
    },
    {
      id: 'behavioral_7',
      question: 'Tell me about a time when you received critical feedback.',
      type: 'behavioral',
      difficulty: 'basic',
      category: 'Self-Improvement & Growth',
      expectedApproach: 'STAR method',
      correctAnswer: 'Should show openness to feedback, self-awareness, and concrete improvements.',
      keyPoints: ['Feedback received', 'Initial reaction', 'Action plan', 'Changes implemented', 'Results demonstrated'],
      exampleAnswer: 'My manager told me my technical documentation was unclear and confusing for junior developers (Situation). I needed to improve my communication skills (Task). I took a technical writing course, requested peer reviews, created templates, and sought regular feedback on my docs (Action). My documentation quality scores improved by 60% and junior dev onboarding time decreased (Result).'
    },
    {
      id: 'behavioral_8',
      question: 'Describe a time when you had to deal with an angry customer or stakeholder.',
      type: 'behavioral',
      difficulty: 'advanced',
      category: 'Conflict Resolution',
      expectedApproach: 'STAR method',
      correctAnswer: 'Should show empathy, de-escalation skills, and problem resolution.',
      keyPoints: ['Emotional situation', 'Active listening', 'Empathy demonstration', 'Solution offering', 'Relationship repair'],
      exampleAnswer: 'A major client was furious when we missed a critical deadline due to a vendor issue (Situation). I needed to restore their confidence and address their concerns (Task). I listened without interrupting, acknowledged their frustration, explained the root cause transparently, offered compensation, and implemented daily status updates (Action). The client renewed their contract and praised our handling of the situation (Result).'
    },
    {
      id: 'behavioral_9',
      question: 'Tell me about a time when you went above and beyond your job responsibilities.',
      type: 'behavioral',
      difficulty: 'intermediate',
      category: 'Initiative & Ownership',
      expectedApproach: 'STAR method',
      correctAnswer: 'Should show initiative, extra effort, and impact beyond role requirements.',
      keyPoints: ['Identified opportunity', 'Extra effort taken', 'Challenges overcome', 'Impact achieved', 'Recognition received'],
      exampleAnswer: 'I noticed our deployment process took 4 hours and caused frequent production issues (Situation). I took initiative to improve it even though it was not in my role (Task). I researched CI/CD best practices, built a proof of concept, presented to leadership, and implemented the solution after hours (Action). Deployment time reduced to 15 minutes with 90% fewer issues. I received a spot bonus and promoted to senior engineer (Result).'
    },
    {
      id: 'behavioral_10',
      question: 'Describe a situation where you had to mentor or train someone.',
      type: 'behavioral',
      difficulty: 'intermediate',
      category: 'Leadership & Mentoring',
      expectedApproach: 'STAR method',
      correctAnswer: 'Should demonstrate teaching ability, patience, and investment in others growth.',
      keyPoints: ['Mentee needs', 'Training approach', 'Progress monitoring', 'Challenges addressed', 'Mentee growth'],
      exampleAnswer: 'A new junior developer joined our team with strong theoretical knowledge but limited practical experience (Situation). I was assigned as their mentor to help them ramp up quickly (Task). I created a structured onboarding plan, paired with them daily, reviewed their code constructively, and encouraged questions (Action). They became productive in 3 weeks instead of the usual 2 months and later became a mentor themselves (Result).'
    },
    {
      id: 'behavioral_11',
      question: 'Tell me about a time when you had to make a decision with incomplete information.',
      type: 'behavioral',
      difficulty: 'advanced',
      category: 'Decision Making',
      expectedApproach: 'STAR method',
      correctAnswer: 'Should show analytical thinking, risk assessment, and decisive action.',
      keyPoints: ['Information gaps', 'Analysis approach', 'Risk evaluation', 'Decision rationale', 'Outcome validation'],
      exampleAnswer: 'We needed to choose a database technology before completing the full requirements analysis (Situation). I had to make the call to keep the project on schedule (Task). I evaluated core requirements, consulted with senior architects, assessed scalability needs, and chose PostgreSQL based on 80% confidence (Action). The choice proved correct as requirements evolved, saving us from a costly migration later (Result).'
    },
    {
      id: 'behavioral_12',
      question: 'Describe a time when you had to adapt to a significant change at work.',
      type: 'behavioral',
      difficulty: 'intermediate',
      category: 'Adaptability & Change Management',
      expectedApproach: 'STAR method',
      correctAnswer: 'Should demonstrate flexibility, positive attitude, and successful adaptation.',
      keyPoints: ['Change described', 'Initial challenges', 'Adaptation strategy', 'Support sought', 'Successful transition'],
      exampleAnswer: 'Our company was acquired and we had to migrate to completely different tools and processes (Situation). I needed to adapt quickly while maintaining productivity (Task). I attended all training sessions, sought mentorship from new colleagues, documented learnings for my team, and maintained a positive attitude (Action). I was among the first to become productive and helped train others, earning recognition from new leadership (Result).'
    },
    {
      id: 'behavioral_13',
      question: 'Tell me about a time when you had to say no to a request.',
      type: 'behavioral',
      difficulty: 'advanced',
      category: 'Assertiveness & Boundary Setting',
      expectedApproach: 'STAR method',
      correctAnswer: 'Should show diplomacy, explanation of constraints, and alternative solutions.',
      keyPoints: ['Request context', 'Reasons for declining', 'Alternative offered', 'Communication approach', 'Outcome'],
      exampleAnswer: 'A stakeholder demanded a feature that would compromise security and delay our launch (Situation). I needed to decline while maintaining the relationship (Task). I explained the security risks with data, proposed a phased approach for post-launch, and offered an alternative MVP solution (Action). They appreciated the transparency and agreed to the alternative. We launched on time with secure code (Result).'
    },
    {
      id: 'behavioral_14',
      question: 'Describe a situation where you had to collaborate with a remote or distributed team.',
      type: 'behavioral',
      difficulty: 'intermediate',
      category: 'Remote Collaboration',
      expectedApproach: 'STAR method',
      correctAnswer: 'Should show communication skills, time zone management, and cultural awareness.',
      keyPoints: ['Team distribution', 'Communication tools', 'Time zone challenges', 'Collaboration methods', 'Project success'],
      exampleAnswer: 'I led a project with team members across 4 time zones including India, Europe, and US (Situation). I needed to ensure smooth collaboration despite geographic challenges (Task). I established async communication protocols, scheduled overlap hours for critical discussions, used detailed documentation, and rotated meeting times fairly (Action). We delivered the project 2 weeks early with zero communication-related blockers (Result).'
    },
    {
      id: 'behavioral_15',
      question: 'Tell me about a time when you identified a potential problem before it became serious.',
      type: 'behavioral',
      difficulty: 'intermediate',
      category: 'Proactive Problem Solving',
      expectedApproach: 'STAR method',
      correctAnswer: 'Should show foresight, preventive action, and risk mitigation.',
      keyPoints: ['Early warning signs', 'Problem analysis', 'Preventive actions', 'Stakeholder communication', 'Problem avoided'],
      exampleAnswer: 'I noticed our server response times gradually increasing during load testing (Situation). I suspected a memory leak that could cause production outage (Task). I analyzed logs, identified the leak in the caching layer, implemented a fix, and added monitoring alerts (Action). We avoided a potential outage that would have affected 100K+ users and saved an estimated $50K in downtime costs (Result).'
    },
    {
      id: 'behavioral_16',
      question: 'Describe a time when you had to work with limited resources or budget.',
      type: 'behavioral',
      difficulty: 'intermediate',
      category: 'Resourcefulness',
      expectedApproach: 'STAR method',
      correctAnswer: 'Should demonstrate creativity, prioritization, and achieving results with constraints.',
      keyPoints: ['Resource constraints', 'Creative solutions', 'Prioritization', 'Efficiency gains', 'Results achieved'],
      exampleAnswer: 'Our startup needed a marketing automation tool but had zero budget for software (Situation). I needed to build a solution using only existing resources (Task). I used open-source tools, wrote custom scripts, leveraged free tiers creatively, and automated manual processes (Action). We achieved 90% of paid tool functionality for free, saved $12K annually, and scaled to 10K customers (Result).'
    },
    {
      id: 'behavioral_17',
      question: 'Tell me about a time when you had to give difficult feedback to a colleague.',
      type: 'behavioral',
      difficulty: 'advanced',
      category: 'Difficult Conversations',
      expectedApproach: 'STAR method',
      correctAnswer: 'Should show empathy, directness, and focus on behavior not personality.',
      keyPoints: ['Feedback context', 'Preparation', 'Delivery approach', 'Colleague reaction', 'Outcome improvement'],
      exampleAnswer: 'A peer\'s code quality was affecting the team, but they were defensive about criticism (Situation). I needed to address this while preserving our working relationship (Task). I prepared specific examples, used the SBI model, focused on impact not person, and offered pair programming support (Action). They received it well, improved significantly, and thanked me for being direct yet supportive (Result).'
    },
    {
      id: 'behavioral_18',
      question: 'Describe a situation where you had to balance technical debt with new features.',
      type: 'behavioral',
      difficulty: 'advanced',
      category: 'Technical Decision Making',
      expectedApproach: 'STAR method',
      correctAnswer: 'Should show business understanding, technical judgment, and stakeholder alignment.',
      keyPoints: ['Technical debt assessment', 'Business priorities', 'Stakeholder negotiation', 'Refactoring plan', 'Balanced outcome'],
      exampleAnswer: 'Our codebase had accumulated significant debt but product wanted 5 new features for Q4 (Situation). I needed to balance code health with business needs (Task). I quantified debt impact, proposed 70/30 split on features vs refactoring, created a roadmap with quick wins, and got buy-in from both engineering and product (Action). We shipped 4 features plus critical refactoring, improving performance by 35% without missing business goals (Result).'
    },
    {
      id: 'behavioral_19',
      question: 'Tell me about a time when you failed at something and what you learned.',
      type: 'behavioral',
      difficulty: 'basic',
      category: 'Resilience & Learning',
      expectedApproach: 'STAR method',
      correctAnswer: 'Should show ownership of failure, genuine learning, and applied lessons.',
      keyPoints: ['Failure described', 'Personal accountability', 'Lessons extracted', 'Changes made', 'Future success'],
      exampleAnswer: 'I over-engineered a feature trying to make it perfect, missing the deadline and disappointing the client (Situation). I failed to balance quality with timeliness (Task). I took full responsibility, apologized to stakeholders, delivered an MVP quickly, and reflected on my perfectionism tendency (Action). I now use the "good enough" principle and MVP approach, delivering consistently on time with 95% client satisfaction (Result).'
    },
    {
      id: 'behavioral_20',
      question: 'Describe a time when you had to build consensus among stakeholders with conflicting interests.',
      type: 'behavioral',
      difficulty: 'expert',
      category: 'Stakeholder Management',
      expectedApproach: 'STAR method',
      correctAnswer: 'Should show facilitation skills, finding common ground, and win-win solutions.',
      keyPoints: ['Conflicting interests', 'Facilitation approach', 'Common ground identified', 'Compromise reached', 'Outcome satisfaction'],
      exampleAnswer: 'Engineering wanted a complete rebuild while Product wanted iterative improvements (Situation). I needed to align both teams on the path forward (Task). I organized workshops to understand concerns, found data showing hybrid approach, proposed phased rebuild with iterative releases, and created shared success metrics (Action). Both teams bought in, we reduced technical debt by 40% while shipping new features, and team morale improved (Result).'
    },
    ...expandedBehavioralQuestions
  ];

  private technicalQuestions: Question[] = [
    {
      id: 'technical_1',
      question: 'Explain the difference between SQL and NoSQL databases. When would you use each?',
      type: 'technical',
      difficulty: 'intermediate',
      category: 'Database Design',
      correctAnswer: 'SQL databases are relational with ACID properties, structured schema, and complex queries. NoSQL databases are non-relational, schema-flexible, and horizontally scalable. Use SQL for complex relationships and transactions; NoSQL for large-scale, flexible data.',
      keyPoints: ['ACID properties', 'Schema flexibility', 'Scalability', 'Query complexity', 'Use cases']
    },
    {
      id: 'technical_2',
      question: 'What is the difference between authentication and authorization?',
      type: 'technical',
      difficulty: 'basic',
      category: 'Security',
      correctAnswer: 'Authentication verifies who you are (identity verification), while authorization determines what you can access (permission control). Authentication comes first, then authorization.',
      keyPoints: ['Identity verification', 'Permission control', 'Security layers', 'Implementation methods']
    },
    {
      id: 'technical_3',
      question: 'Explain how RESTful APIs work and their key principles.',
      type: 'technical',
      difficulty: 'intermediate',
      category: 'API Design',
      correctAnswer: 'REST uses HTTP methods (GET, POST, PUT, DELETE) with stateless communication, resource-based URLs, and standard status codes. Key principles: stateless, cacheable, uniform interface, layered system.',
      keyPoints: ['HTTP methods', 'Stateless communication', 'Resource-based URLs', 'Status codes', 'REST principles']
    },
    {
      id: 'technical_4',
      question: 'What is the difference between synchronous and asynchronous programming?',
      type: 'technical',
      difficulty: 'intermediate',
      category: 'Programming Concepts',
      correctAnswer: 'Synchronous execution blocks until completion, while asynchronous allows other operations to run while waiting. Async uses callbacks, promises, or async/await for non-blocking operations.',
      keyPoints: ['Blocking vs non-blocking', 'Callbacks and promises', 'Concurrency', 'Use cases', 'Performance implications']
    },
    {
      id: 'technical_5',
      question: 'Explain the concept of load balancing and why it is important.',
      type: 'technical',
      difficulty: 'intermediate',
      category: 'System Architecture',
      correctAnswer: 'Load balancing distributes incoming traffic across multiple servers to prevent any single server from being overwhelmed. It improves availability, scalability, and fault tolerance.',
      keyPoints: ['Traffic distribution', 'High availability', 'Scalability', 'Health checks', 'Load balancing algorithms']
    },
    {
      id: 'technical_6',
      question: 'What are the differences between HTTP and HTTPS?',
      type: 'technical',
      difficulty: 'basic',
      category: 'Web Protocols',
      correctAnswer: 'HTTPS is HTTP with SSL/TLS encryption. It provides data encryption, authentication, and integrity. HTTPS uses port 443, HTTP uses port 80. HTTPS requires SSL certificates.',
      keyPoints: ['Encryption', 'SSL/TLS certificates', 'Port differences', 'Security benefits', 'Performance impact']
    },
    {
      id: 'technical_7',
      question: 'Explain the CAP theorem and its implications for distributed systems.',
      type: 'technical',
      difficulty: 'advanced',
      category: 'Distributed Systems',
      correctAnswer: 'CAP theorem states that a distributed system can only guarantee two of three: Consistency, Availability, and Partition tolerance. Since partition tolerance is required, you must choose between CP or AP systems.',
      keyPoints: ['Consistency', 'Availability', 'Partition tolerance', 'Trade-offs', 'Real-world examples']
    },
    {
      id: 'technical_8',
      question: 'What is the difference between a process and a thread?',
      type: 'technical',
      difficulty: 'intermediate',
      category: 'Operating Systems',
      correctAnswer: 'A process is an independent program with its own memory space. Threads are lightweight units within a process sharing the same memory. Processes are isolated; threads share resources.',
      keyPoints: ['Memory isolation', 'Resource sharing', 'Context switching', 'Concurrency', 'Use cases']
    },
    {
      id: 'technical_9',
      question: 'Explain how garbage collection works in modern programming languages.',
      type: 'technical',
      difficulty: 'advanced',
      category: 'Memory Management',
      correctAnswer: 'Garbage collection automatically reclaims memory occupied by objects no longer in use. Common algorithms include reference counting, mark-and-sweep, and generational GC. It prevents memory leaks but adds overhead.',
      keyPoints: ['Memory reclamation', 'GC algorithms', 'Stop-the-world', 'Generational hypothesis', 'Performance tuning']
    },
    {
      id: 'technical_10',
      question: 'What is the difference between vertical and horizontal scaling?',
      type: 'technical',
      difficulty: 'intermediate',
      category: 'Scalability',
      correctAnswer: 'Vertical scaling adds more power (CPU, RAM) to existing servers. Horizontal scaling adds more servers to distribute load. Vertical has limits; horizontal provides better fault tolerance and elasticity.',
      keyPoints: ['Scale up vs scale out', 'Resource limits', 'Cost implications', 'Fault tolerance', 'Implementation complexity']
    },
    {
      id: 'technical_11',
      question: 'Explain the concept of database indexing and when to use it.',
      type: 'technical',
      difficulty: 'intermediate',
      category: 'Database Optimization',
      correctAnswer: 'Indexes speed up data retrieval by creating data structures (like B-trees) for quick lookups. Use on frequently queried columns, but avoid over-indexing as it slows writes and increases storage.',
      keyPoints: ['Index structures', 'Query performance', 'Write overhead', 'Storage cost', 'Index selection']
    },
    {
      id: 'technical_12',
      question: 'What is the difference between OAuth and JWT?',
      type: 'technical',
      difficulty: 'advanced',
      category: 'Authentication',
      correctAnswer: 'OAuth is an authorization framework for delegated access. JWT is a token format for securely transmitting information. OAuth can use JWT tokens, but they solve different problems.',
      keyPoints: ['Authorization vs token format', 'OAuth flows', 'JWT structure', 'Use cases', 'Security considerations']
    },
    {
      id: 'technical_13',
      question: 'Explain how CDNs work and their benefits.',
      type: 'technical',
      difficulty: 'intermediate',
      category: 'Web Performance',
      correctAnswer: 'CDNs distribute content across geographically dispersed servers. They cache content closer to users, reducing latency, improving load times, and reducing origin server load.',
      keyPoints: ['Content caching', 'Geographic distribution', 'Latency reduction', 'Bandwidth savings', 'DDoS protection']
    },
    {
      id: 'technical_14',
      question: 'What is the difference between stateful and stateless applications?',
      type: 'technical',
      difficulty: 'intermediate',
      category: 'Application Architecture',
      correctAnswer: 'Stateful applications store client session data between requests. Stateless applications treat each request independently, storing session data externally. Stateless scales better; stateful can be simpler.',
      keyPoints: ['Session management', 'Data persistence', 'Scalability', 'Complexity trade-offs', 'Storage strategies']
    },
    {
      id: 'technical_15',
      question: 'Explain the concept of eventual consistency in distributed databases.',
      type: 'technical',
      difficulty: 'advanced',
      category: 'Database Systems',
      correctAnswer: 'Eventual consistency guarantees that if no new updates are made, eventually all accesses will return the last updated value. It prioritizes availability over immediate consistency in distributed systems.',
      keyPoints: ['Consistency models', 'Replication lag', 'Conflict resolution', 'Use cases', 'Trade-offs']
    },
    {
      id: 'technical_16',
      question: 'What is the difference between unit tests, integration tests, and end-to-end tests?',
      type: 'technical',
      difficulty: 'intermediate',
      category: 'Testing',
      correctAnswer: 'Unit tests test individual components in isolation. Integration tests verify component interactions. E2E tests simulate real user scenarios across the entire application. They form the testing pyramid.',
      keyPoints: ['Test scope', 'Isolation vs integration', 'Speed trade-offs', 'Test pyramid', 'Coverage strategies']
    },
    {
      id: 'technical_17',
      question: 'Explain how browser caching works and its types.',
      type: 'technical',
      difficulty: 'intermediate',
      category: 'Web Performance',
      correctAnswer: 'Browser caching stores web resources locally to reduce server requests. Types: memory cache (fastest, short-lived), disk cache (persistent), service worker cache (programmable), and push cache (session-based).',
      keyPoints: ['Cache types', 'Cache headers', 'Cache invalidation', 'Performance impact', 'Cache strategies']
    },
    {
      id: 'technical_18',
      question: 'What is the difference between monolithic and microservices architecture?',
      type: 'technical',
      difficulty: 'intermediate',
      category: 'System Architecture',
      correctAnswer: 'Monolithic has all components in a single codebase. Microservices split functionality into independent services. Monolithic is simpler; microservices offer better scalability and independent deployment.',
      keyPoints: ['Architecture patterns', 'Deployment strategies', 'Scaling approaches', 'Complexity comparison', 'When to choose each']
    },
    {
      id: 'technical_19',
      question: 'Explain the concept of connection pooling in databases.',
      type: 'technical',
      difficulty: 'intermediate',
      category: 'Database Optimization',
      correctAnswer: 'Connection pooling maintains a cache of database connections for reuse. It reduces connection overhead, improves performance, and manages resource limits. Pools have min/max sizes and timeout settings.',
      keyPoints: ['Connection reuse', 'Pool configuration', 'Performance benefits', 'Resource management', 'Timeout handling']
    },
    {
      id: 'technical_20',
      question: 'What is the difference between WebSockets and HTTP polling?',
      type: 'technical',
      difficulty: 'intermediate',
      category: 'Real-time Communication',
      correctAnswer: 'WebSockets provide full-duplex, persistent connections for real-time data. HTTP polling repeatedly makes HTTP requests. WebSockets are more efficient for real-time; polling is simpler and works everywhere.',
      keyPoints: ['Connection persistence', 'Bandwidth efficiency', 'Latency', 'Server load', 'Fallback strategies']
    },
    {
      id: 'technical_21',
      question: 'Explain the concept of rate limiting and its implementation strategies.',
      type: 'technical',
      difficulty: 'advanced',
      category: 'API Design',
      correctAnswer: 'Rate limiting controls request frequency to prevent abuse. Strategies include token bucket, leaky bucket, fixed window, and sliding window. Implemented at gateway, application, or database level.',
      keyPoints: ['Limiting algorithms', 'Threshold strategies', 'Response handling', 'Distributed systems', 'Monitoring']
    },
    {
      id: 'technical_22',
      question: 'What is the difference between optimistic and pessimistic locking?',
      type: 'technical',
      difficulty: 'advanced',
      category: 'Database Concurrency',
      correctAnswer: 'Optimistic locking assumes conflicts are rare and checks at update time. Pessimistic locking assumes conflicts are likely and locks data during reads. Optimistic is better for read-heavy; pessimistic for write-heavy.',
      keyPoints: ['Locking strategies', 'Conflict detection', 'Performance implications', 'Use cases', 'Implementation approaches']
    },
    {
      id: 'technical_23',
      question: 'Explain how Docker containers differ from virtual machines.',
      type: 'technical',
      difficulty: 'intermediate',
      category: 'DevOps',
      correctAnswer: 'Containers share the host OS kernel, making them lightweight. VMs include full OS instances, making them heavier but more isolated. Containers start faster; VMs provide stronger isolation.',
      keyPoints: ['OS-level virtualization', 'Resource efficiency', 'Startup time', 'Isolation levels', 'Use cases']
    },
    {
      id: 'technical_24',
      question: 'What is the difference between strong consistency and eventual consistency?',
      type: 'technical',
      difficulty: 'advanced',
      category: 'Distributed Systems',
      correctAnswer: 'Strong consistency guarantees all reads see the latest write. Eventual consistency allows temporary inconsistency but guarantees convergence. Strong consistency sacrifices availability; eventual prioritizes it.',
      keyPoints: ['Consistency guarantees', 'Availability trade-offs', 'Latency implications', 'Application requirements', 'Database selection']
    },
    {
      id: 'technical_25',
      question: 'Explain the concept of circuit breakers in microservices.',
      type: 'technical',
      difficulty: 'advanced',
      category: 'Microservices',
      correctAnswer: 'Circuit breakers prevent cascading failures by stopping requests to failing services. States: closed (normal), open (failing, reject requests), half-open (testing recovery). Improves system resilience.',
      keyPoints: ['Failure detection', 'State transitions', 'Fallback mechanisms', 'Recovery strategies', 'Implementation patterns']
    },
    {
      id: 'technical_26',
      question: 'What is the difference between SQL injection and XSS attacks?',
      type: 'technical',
      difficulty: 'intermediate',
      category: 'Security',
      correctAnswer: 'SQL injection inserts malicious SQL through user input to manipulate databases. XSS injects malicious scripts into web pages viewed by other users. Both exploit insufficient input validation but target different layers.',
      keyPoints: ['Attack vectors', 'Prevention methods', 'Input validation', 'Output encoding', 'Security layers']
    },
    {
      id: 'technical_27',
      question: 'Explain how continuous integration and continuous deployment work.',
      type: 'technical',
      difficulty: 'intermediate',
      category: 'DevOps',
      correctAnswer: 'CI automatically builds and tests code on every commit. CD automatically deploys passing builds to production. Together they enable rapid, reliable software delivery with automated quality gates.',
      keyPoints: ['Automation pipelines', 'Quality gates', 'Testing strategies', 'Deployment strategies', 'Rollback mechanisms']
    },
    {
      id: 'technical_28',
      question: 'What is the difference between blocking and non-blocking I/O?',
      type: 'technical',
      difficulty: 'advanced',
      category: 'I/O Operations',
      correctAnswer: 'Blocking I/O waits for operations to complete before continuing. Non-blocking I/O returns immediately and uses callbacks or polling. Non-blocking scales better but is more complex to implement.',
      keyPoints: ['I/O models', 'Thread usage', 'Scalability', 'Complexity trade-offs', 'Event loops']
    },
    {
      id: 'technical_29',
      question: 'Explain the concept of database sharding and its challenges.',
      type: 'technical',
      difficulty: 'advanced',
      category: 'Database Scaling',
      correctAnswer: 'Sharding splits data across multiple databases based on a key. It enables horizontal scaling but adds complexity for queries, transactions, and rebalancing. Choose shard keys carefully.',
      keyPoints: ['Data distribution', 'Shard key selection', 'Query complexity', 'Cross-shard transactions', 'Rebalancing']
    },
    {
      id: 'technical_30',
      question: 'What is the difference between client-side and server-side rendering?',
      type: 'technical',
      difficulty: 'intermediate',
      category: 'Web Development',
      correctAnswer: 'SSR generates HTML on the server for faster initial load and SEO. CSR renders in browser for richer interactivity. Modern apps often use hybrid approaches like hydration or static generation.',
      keyPoints: ['Rendering location', 'Initial load time', 'SEO implications', 'Interactivity', 'Hydration patterns']
    },
    ...expandedTechnicalQuestions
  ];

  private codingQuestions: Question[] = [
    {
      id: 'coding_1',
      question: 'Write a function to reverse a string without using built-in reverse methods.',
      type: 'coding',
      difficulty: 'basic',
      category: 'String Manipulation',
      timeLimit: 15,
      codeTemplate: `function reverseString(str) {
    // Write your solution here
    
}`,
      testCases: [
        { input: 'hello', expected: 'olleh', description: 'Basic string reversal' },
        { input: 'world', expected: 'dlrow', description: 'Another basic case' },
        { input: '', expected: '', description: 'Empty string' },
        { input: 'a', expected: 'a', description: 'Single character' }
      ],
      correctAnswer: 'Use a loop to iterate through the string from end to beginning, or use two pointers approach, or convert to array and swap elements.',
      keyPoints: ['Loop iteration', 'String indexing', 'Character manipulation', 'Edge cases']
    },
    {
      id: 'coding_2',
      question: 'Implement a function to find two numbers in an array that add up to a target sum.',
      type: 'coding',
      difficulty: 'intermediate',
      category: 'Array & Hash Map',
      timeLimit: 30,
      codeTemplate: `function twoSum(nums, target) {
    // Write your solution here
    
}`,
      testCases: [
        { input: [[2, 7, 11, 15], 9], expected: [0, 1], description: 'Basic two sum' },
        { input: [[3, 2, 4], 6], expected: [1, 2], description: 'Different indices' },
        { input: [[3, 3], 6], expected: [0, 1], description: 'Duplicate numbers' }
      ],
      correctAnswer: 'Use a hash map to store numbers and their indices. For each number, check if target - number exists in the hash map.',
      keyPoints: ['Hash map usage', 'Time complexity O(n)', 'Index tracking', 'Edge cases']
    },
    {
      id: 'coding_3',
      question: 'Write a function to check if a number is prime.',
      type: 'coding',
      difficulty: 'basic',
      category: 'Mathematical Algorithms',
      timeLimit: 20,
      codeTemplate: `function isPrime(n) {
    // Write your solution here
    
}`,
      testCases: [
        { input: 17, expected: true, description: 'Prime number' },
        { input: 4, expected: false, description: 'Composite number' },
        { input: 2, expected: true, description: 'Smallest prime' },
        { input: 1, expected: false, description: 'Edge case: 1' }
      ],
      correctAnswer: 'Check if number is less than 2 (not prime), then check divisibility from 2 to sqrt(n). If no divisors found, it\'s prime.',
      keyPoints: ['Edge cases handling', 'Optimization with sqrt', 'Loop efficiency', 'Mathematical logic']
    },
    {
      id: 'coding_4',
      question: 'Implement a function to find the longest common subsequence between two strings.',
      type: 'coding',
      difficulty: 'advanced',
      category: 'Dynamic Programming',
      timeLimit: 45,
      codeTemplate: `function longestCommonSubsequence(text1, text2) {
    // Write your solution here
    
}`,
      testCases: [
        { input: ['abcde', 'ace'], expected: 3, description: 'Basic LCS' },
        { input: ['abc', 'abc'], expected: 3, description: 'Identical strings' },
        { input: ['abc', 'def'], expected: 0, description: 'No common subsequence' }
      ],
      correctAnswer: 'Use dynamic programming with 2D array. If characters match, add 1 to diagonal value. Otherwise, take maximum of left or top value.',
      keyPoints: ['Dynamic programming', '2D array', 'Character comparison', 'Optimal substructure']
    },
    {
      id: 'coding_5',
      question: 'Write a function to check if a string is a palindrome.',
      type: 'coding',
      difficulty: 'basic',
      category: 'String Manipulation',
      timeLimit: 15,
      codeTemplate: `function isPalindrome(str) {
    // Write your solution here
    
}`,
      testCases: [
        { input: 'racecar', expected: true, description: 'Palindrome string' },
        { input: 'hello', expected: false, description: 'Non-palindrome' },
        { input: '', expected: true, description: 'Empty string' },
        { input: 'a', expected: true, description: 'Single character' }
      ],
      correctAnswer: 'Compare characters from both ends moving towards center, or reverse string and compare with original.',
      keyPoints: ['Two pointers', 'Character comparison', 'Edge cases', 'Efficiency']
    },
    {
      id: 'coding_6',
      question: 'Implement a function to merge two sorted arrays into one sorted array.',
      type: 'coding',
      difficulty: 'intermediate',
      category: 'Array Operations',
      timeLimit: 25,
      codeTemplate: `function mergeSortedArrays(arr1, arr2) {
    // Write your solution here
    
}`,
      testCases: [
        { input: [[1, 3, 5], [2, 4, 6]], expected: [1, 2, 3, 4, 5, 6], description: 'Basic merge' },
        { input: [[1, 2], [3, 4]], expected: [1, 2, 3, 4], description: 'Sequential merge' },
        { input: [[], [1, 2]], expected: [1, 2], description: 'One empty array' }
      ],
      correctAnswer: 'Use two pointers to compare elements from both arrays and add smaller one to result. Handle remaining elements.',
      keyPoints: ['Two pointers', 'Comparison logic', 'Edge handling', 'Time complexity O(n)']
    },
    {
      id: 'coding_7',
      question: 'Write a function to find the maximum subarray sum (Kadane\'s algorithm).',
      type: 'coding',
      difficulty: 'intermediate',
      category: 'Array Algorithms',
      timeLimit: 30,
      codeTemplate: `function maxSubArraySum(nums) {
    // Write your solution here
    
}`,
      testCases: [
        { input: [-2, 1, -3, 4, -1, 2, 1, -5, 4], expected: 6, description: 'Mixed numbers' },
        { input: [1], expected: 1, description: 'Single element' },
        { input: [-1, -2, -3], expected: -1, description: 'All negative' }
      ],
      correctAnswer: 'Track current sum and maximum sum. If current sum becomes negative, reset to 0. Update max sum at each step.',
      keyPoints: ['Kadane algorithm', 'Current/max tracking', 'Negative handling', 'Time complexity O(n)']
    },
    {
      id: 'coding_8',
      question: 'Implement a function to check if a binary tree is balanced.',
      type: 'coding',
      difficulty: 'advanced',
      category: 'Tree Algorithms',
      timeLimit: 35,
      codeTemplate: `function isBalanced(root) {
    // Write your solution here
    
}`,
      testCases: [
        { input: { val: 1, left: { val: 2 }, right: { val: 3 } }, expected: true, description: 'Balanced tree' },
        { input: { val: 1, left: { val: 2, left: { val: 3 } } }, expected: false, description: 'Unbalanced tree' },
        { input: null, expected: true, description: 'Empty tree' }
      ],
      correctAnswer: 'Calculate height of each subtree recursively. Tree is balanced if left and right heights differ by at most 1.',
      keyPoints: ['Tree traversal', 'Height calculation', 'Recursion', 'Time complexity O(n)']
    },
    {
      id: 'coding_9',
      question: 'Write a function to implement binary search on a sorted array.',
      type: 'coding',
      difficulty: 'intermediate',
      category: 'Search Algorithms',
      timeLimit: 25,
      codeTemplate: `function binarySearch(arr, target) {
    // Write your solution here
    
}`,
      testCases: [
        { input: [[1, 3, 5, 7, 9], 5], expected: 2, description: 'Target found' },
        { input: [[1, 3, 5, 7, 9], 4], expected: -1, description: 'Target not found' },
        { input: [[], 1], expected: -1, description: 'Empty array' }
      ],
      correctAnswer: 'Compare target with middle element. If equal, return index. If target is smaller, search left half. Otherwise, search right half.',
      keyPoints: ['Divide and conquer', 'Midpoint calculation', 'Boundary handling', 'Time complexity O(log n)']
    },
    {
      id: 'coding_10',
      question: 'Implement a function to find the first non-repeating character in a string.',
      type: 'coding',
      difficulty: 'intermediate',
      category: 'String & Hash Map',
      timeLimit: 25,
      codeTemplate: `function firstNonRepeatingChar(str) {
    // Write your solution here
    
}`,
      testCases: [
        { input: 'leetcode', expected: 'l', description: 'First unique char' },
        { input: 'loveleetcode', expected: 'v', description: 'Multiple unique' },
        { input: 'aabb', expected: null, description: 'No unique char' }
      ],
      correctAnswer: 'Use hash map to count character frequencies. Then iterate through string to find first character with count 1.',
      keyPoints: ['Hash map counting', 'Two-pass approach', 'Character frequency', 'Time complexity O(n)']
    },
    {
      id: 'coding_11',
      question: 'Write a function to implement a queue using two stacks.',
      type: 'coding',
      difficulty: 'intermediate',
      category: 'Data Structures',
      timeLimit: 30,
      codeTemplate: `class QueueUsingStacks {
    constructor() {
        this.stack1 = [];
        this.stack2 = [];
    }
    
    enqueue(x) {
        // Write your solution here
    }
    
    dequeue() {
        // Write your solution here
    }
}`,
      testCases: [
        { input: ['enqueue', 1, 'enqueue', 2, 'dequeue'], expected: 1, description: 'Basic queue operations' },
        { input: ['dequeue'], expected: null, description: 'Empty queue' }
      ],
      correctAnswer: 'Use one stack for enqueue, another for dequeue. When dequeuing, if second stack is empty, pop all from first stack to second.',
      keyPoints: ['Stack operations', 'Data transfer', 'Amortized O(1)', 'Edge cases']
    },
    {
      id: 'coding_12',
      question: 'Implement a function to find all anagrams in a string.',
      type: 'coding',
      difficulty: 'advanced',
      category: 'String Algorithms',
      timeLimit: 35,
      codeTemplate: `function findAnagrams(s, p) {
    // Write your solution here
    
}`,
      testCases: [
        { input: ['cbaebabacd', 'abc'], expected: [0, 6], description: 'Multiple anagrams' },
        { input: ['abab', 'ab'], expected: [0, 1, 2], description: 'Overlapping anagrams' },
        { input: ['abc', 'd'], expected: [], description: 'No anagrams' }
      ],
      correctAnswer: 'Use sliding window with character frequency count. Compare window frequency with pattern frequency.',
      keyPoints: ['Sliding window', 'Frequency arrays', 'Window comparison', 'Time complexity O(n)']
    },
    {
      id: 'coding_13',
      question: 'Write a function to calculate the factorial of a number.',
      type: 'coding',
      difficulty: 'basic',
      category: 'Recursion',
      timeLimit: 15,
      codeTemplate: `function factorial(n) {
    // Write your solution here
    
}`,
      testCases: [
        { input: 5, expected: 120, description: 'Standard factorial' },
        { input: 0, expected: 1, description: 'Zero factorial' },
        { input: 1, expected: 1, description: 'One factorial' }
      ],
      correctAnswer: 'Use recursion: n! = n * (n-1)!. Base case: 0! = 1. Or use iterative approach with a loop.',
      keyPoints: ['Recursion', 'Base case', 'Iterative alternative', 'Edge cases']
    },
    {
      id: 'coding_14',
      question: 'Implement a function to detect a cycle in a linked list.',
      type: 'coding',
      difficulty: 'intermediate',
      category: 'Linked List',
      timeLimit: 30,
      codeTemplate: `function hasCycle(head) {
    // Write your solution here
    
}`,
      testCases: [
        { input: 'cyclic', expected: true, description: 'List with cycle' },
        { input: 'linear', expected: false, description: 'Linear list' },
        { input: null, expected: false, description: 'Empty list' }
      ],
      correctAnswer: 'Use Floyd\'s cycle detection: two pointers, one moves 1 step, other moves 2 steps. If they meet, there is a cycle.',
      keyPoints: ["Floyd's algorithm", 'Two pointers', 'Cycle detection', 'Time complexity O(n)']
    },
    {
      id: 'coding_15',
      question: 'Write a function to find the kth largest element in an array.',
      type: 'coding',
      difficulty: 'advanced',
      category: 'Heap & Sorting',
      timeLimit: 35,
      codeTemplate: `function findKthLargest(nums, k) {
    // Write your solution here
    
}`,
      testCases: [
        { input: [[3, 2, 1, 5, 6, 4], 2], expected: 5, description: '2nd largest' },
        { input: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], expected: 4, description: '4th largest with duplicates' },
        { input: [[1], 1], expected: 1, description: 'Single element' }
      ],
      correctAnswer: 'Use min-heap of size k, or use QuickSelect algorithm for O(n) average time, or sort and access index.',
      keyPoints: ['Heap usage', 'QuickSelect', 'Sorting', 'Time complexity optimization']
    },
    {
      id: 'coding_16',
      question: 'Implement a function to check if two strings are one edit away.',
      type: 'coding',
      difficulty: 'intermediate',
      category: 'String Manipulation',
      timeLimit: 30,
      codeTemplate: `function isOneEditAway(s1, s2) {
    // Write your solution here
    
}`,
      testCases: [
        { input: ['pale', 'ple'], expected: true, description: 'One deletion' },
        { input: ['pales', 'pale'], expected: true, description: 'One insertion' },
        { input: ['pale', 'bale'], expected: true, description: 'One replacement' },
        { input: ['pale', 'bake'], expected: false, description: 'Two edits' }
      ],
      correctAnswer: 'Check length difference. If same length, check for one replacement. If differs by 1, check for one insertion/deletion.',
      keyPoints: ['Length comparison', 'Character comparison', 'Edit counting', 'Edge cases']
    },
    {
      id: 'coding_17',
      question: 'Write a function to implement depth-first search on a graph.',
      type: 'coding',
      difficulty: 'intermediate',
      category: 'Graph Algorithms',
      timeLimit: 30,
      codeTemplate: `function dfs(graph, startNode) {
    // Write your solution here
    
}`,
      testCases: [
        { input: [{ A: ['B', 'C'], B: ['D'], C: [], D: [] }, 'A'], expected: ['A', 'B', 'D', 'C'], description: 'Basic DFS' },
        { input: [{ A: [] }, 'A'], expected: ['A'], description: 'Single node' }
      ],
      correctAnswer: 'Use stack or recursion. Mark visited nodes. Visit node, then recursively visit all unvisited neighbors.',
      keyPoints: ['Stack/recursion', 'Visited tracking', 'Adjacency list', 'Traversal order']
    },
    {
      id: 'coding_18',
      question: 'Implement a function to solve the climbing stairs problem (Fibonacci variant).',
      type: 'coding',
      difficulty: 'intermediate',
      category: 'Dynamic Programming',
      timeLimit: 25,
      codeTemplate: `function climbStairs(n) {
    // Write your solution here
    
}`,
      testCases: [
        { input: 3, expected: 3, description: '3 stairs' },
        { input: 4, expected: 5, description: '4 stairs' },
        { input: 1, expected: 1, description: '1 stair' }
      ],
      correctAnswer: 'Use dynamic programming. dp[i] = dp[i-1] + dp[i-2]. Can optimize to O(1) space using two variables.',
      keyPoints: ['Fibonacci pattern', 'Dynamic programming', 'Space optimization', 'Base cases']
    },
    {
      id: 'coding_19',
      question: 'Write a function to group anagrams together from an array of strings.',
      type: 'coding',
      difficulty: 'intermediate',
      category: 'Hash Map',
      timeLimit: 30,
      codeTemplate: `function groupAnagrams(strs) {
    // Write your solution here
    
}`,
      testCases: [
        { input: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'], expected: [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']], description: 'Multiple groups' },
        { input: [''], expected: [['']], description: 'Empty string' },
        { input: ['a'], expected: [['a']], description: 'Single char' }
      ],
      correctAnswer: 'Use sorted string as key in hash map. Group strings with same sorted characters together.',
      keyPoints: ['Hash map grouping', 'String sorting', 'Character counting alternative', 'Time complexity O(n*k log k)']
    },
    {
      id: 'coding_20',
      question: 'Implement a function to find the diameter of a binary tree.',
      type: 'coding',
      difficulty: 'advanced',
      category: 'Tree Algorithms',
      timeLimit: 35,
      codeTemplate: `function diameterOfBinaryTree(root) {
    // Write your solution here
    
}`,
      testCases: [
        { input: { val: 1, left: { val: 2, left: { val: 4 }, right: { val: 5 } }, right: { val: 3 } }, expected: 3, description: 'Basic tree' },
        { input: { val: 1 }, expected: 0, description: 'Single node' },
        { input: null, expected: 0, description: 'Empty tree' }
      ],
      correctAnswer: 'Calculate height recursively. Diameter at each node is left height + right height. Track maximum diameter.',
      keyPoints: ['Height calculation', 'Diameter tracking', 'Post-order traversal', 'Global maximum']
    },
    ...expandedCodingQuestions
  ];

  private systemDesignQuestions: Question[] = [
    {
      id: 'system_1',
      question: 'Design a URL shortening service like bit.ly. Consider scalability, reliability, and performance.',
      type: 'system-design',
      difficulty: 'advanced',
      category: 'System Architecture',
      hints: ['Database design', 'Caching strategy', 'Load balancing', 'URL encoding'],
      timeLimit: 60,
      correctAnswer: 'Use base62 encoding for short URLs, implement caching layer, use load balancers, design for horizontal scaling with database sharding.',
      keyPoints: ['URL encoding', 'Database design', 'Caching', 'Load balancing', 'Scalability']
    },
    {
      id: 'system_2',
      question: 'Design a chat application that supports real-time messaging for millions of users.',
      type: 'system-design',
      difficulty: 'expert',
      category: 'Real-time Systems',
      hints: ['WebSocket connections', 'Message queuing', 'Database partitioning', 'Push notifications'],
      timeLimit: 75,
      correctAnswer: 'Use WebSocket for real-time communication, implement message queues, partition data by user/chat, use CDN for media, implement push notifications.',
      keyPoints: ['WebSocket', 'Message queuing', 'Data partitioning', 'Real-time communication', 'Scalability']
    },
    {
      id: 'system_3',
      question: 'Design a video streaming service like YouTube.',
      type: 'system-design',
      difficulty: 'expert',
      category: 'Media Systems',
      hints: ['Content delivery', 'Video transcoding', 'Metadata management', 'Recommendation system'],
      timeLimit: 75,
      correctAnswer: 'Use CDN for video delivery, implement adaptive bitrate streaming, transcode videos to multiple formats, use distributed metadata storage, implement recommendation engine.',
      keyPoints: ['CDN', 'Video transcoding', 'Adaptive streaming', 'Metadata storage', 'Recommendations']
    },
    {
      id: 'system_4',
      question: 'Design a ride-sharing service like Uber.',
      type: 'system-design',
      difficulty: 'advanced',
      category: 'Real-time Systems',
      hints: ['Geospatial indexing', 'Matching algorithm', 'Real-time tracking', 'Payment processing'],
      timeLimit: 75,
      correctAnswer: 'Use geospatial databases for driver location, implement efficient matching algorithms, real-time tracking with WebSockets, payment service integration, surge pricing.',
      keyPoints: ['Geospatial data', 'Matching algorithms', 'Real-time updates', 'Payment systems', 'Dynamic pricing']
    },
    {
      id: 'system_5',
      question: 'Design a social media feed system like Twitter.',
      type: 'system-design',
      difficulty: 'advanced',
      category: 'Social Systems',
      hints: ['Feed generation', 'Fan-out strategies', 'Caching', 'Timeline aggregation'],
      timeLimit: 60,
      correctAnswer: 'Use fan-out on write for celebrities, fan-out on read for normal users, implement feed caching, use timeline aggregation, handle high read/write ratios.',
      keyPoints: ['Fan-out strategies', 'Feed generation', 'Caching layers', 'Timeline aggregation', 'Scalability']
    },
    {
      id: 'system_6',
      question: 'Design a web crawler for search engines.',
      type: 'system-design',
      difficulty: 'advanced',
      category: 'Distributed Systems',
      hints: ['URL frontier', 'Deduplication', 'Politeness policy', 'Distributed crawling'],
      timeLimit: 60,
      correctAnswer: 'Implement URL frontier with priority queue, use bloom filters for deduplication, respect robots.txt, distribute crawling across multiple nodes, store content in distributed storage.',
      keyPoints: ['URL frontier', 'Deduplication', 'Politeness', 'Distributed architecture', 'Content storage']
    },
    {
      id: 'system_7',
      question: 'Design an e-commerce platform like Amazon.',
      type: 'system-design',
      difficulty: 'expert',
      category: 'E-commerce',
      hints: ['Product catalog', 'Inventory management', 'Payment processing', 'Order fulfillment'],
      timeLimit: 75,
      correctAnswer: 'Separate product catalog service, inventory management with real-time updates, payment gateway integration, order processing pipeline, recommendation engine, search functionality.',
      keyPoints: ['Catalog service', 'Inventory', 'Payments', 'Order processing', 'Search', 'Recommendations']
    },
    {
      id: 'system_8',
      question: 'Design a rate limiter for API endpoints.',
      type: 'system-design',
      difficulty: 'advanced',
      category: 'API Design',
      hints: ['Token bucket', 'Sliding window', 'Distributed storage', 'Performance'],
      timeLimit: 45,
      correctAnswer: 'Use token bucket or sliding window algorithm, store counters in Redis, handle distributed systems, return appropriate headers, implement different limits per user tier.',
      keyPoints: ['Rate limiting algorithms', 'Distributed storage', 'Headers', 'User tiers', 'Performance']
    },
    {
      id: 'system_9',
      question: 'Design a file storage and sharing service like Dropbox.',
      type: 'system-design',
      difficulty: 'advanced',
      category: 'Storage Systems',
      hints: ['File chunking', 'Deduplication', 'Sync protocol', 'Conflict resolution'],
      timeLimit: 60,
      correctAnswer: 'Chunk files for efficient storage, use content-addressable storage for deduplication, implement delta sync, handle conflict resolution, use metadata servers for file organization.',
      keyPoints: ['File chunking', 'Deduplication', 'Sync protocol', 'Conflict resolution', 'Metadata management']
    },
    {
      id: 'system_10',
      question: 'Design a search autocomplete system.',
      type: 'system-design',
      difficulty: 'intermediate',
      category: 'Search Systems',
      hints: ['Trie data structure', 'Caching', 'Ranking', 'Personalization'],
      timeLimit: 45,
      correctAnswer: 'Use Trie for prefix matching, cache popular queries, implement ranking by frequency and recency, personalize based on user history, handle high query volume.',
      keyPoints: ['Trie structure', 'Caching', 'Ranking algorithms', 'Personalization', 'High throughput']
    },
    {
      id: 'system_11',
      question: 'Design a distributed key-value store like Redis.',
      type: 'system-design',
      difficulty: 'expert',
      category: 'Distributed Systems',
      hints: ['Data partitioning', 'Replication', 'Consistency', 'Failure handling'],
      timeLimit: 75,
      correctAnswer: 'Use consistent hashing for partitioning, implement master-slave replication, handle network partitions, support tunable consistency, implement failure detection.',
      keyPoints: ['Consistent hashing', 'Replication', 'Partition tolerance', 'Consistency levels', 'Failure detection']
    },
    {
      id: 'system_12',
      question: 'Design a news feed ranking system.',
      type: 'system-design',
      difficulty: 'advanced',
      category: 'Recommendation Systems',
      hints: ['Ranking signals', 'Machine learning', 'Real-time updates', 'A/B testing'],
      timeLimit: 60,
      correctAnswer: 'Use multiple ranking signals (recency, relevance, engagement), implement ML models for personalization, handle real-time updates, support A/B testing, optimize for user engagement.',
      keyPoints: ['Ranking signals', 'ML models', 'Real-time processing', 'A/B testing', 'Engagement optimization']
    },
    {
      id: 'system_13',
      question: 'Design a location-based service like Yelp.',
      type: 'system-design',
      difficulty: 'advanced',
      category: 'Geospatial Systems',
      hints: ['Geospatial indexing', 'Search radius', 'Review system', 'Business data'],
      timeLimit: 60,
      correctAnswer: 'Use geospatial indexes for location queries, implement efficient radius search, handle business data with photos/reviews, support filtering by category/price/rating.',
      keyPoints: ['Geospatial indexing', 'Radius search', 'Business profiles', 'Reviews', 'Filtering']
    },
    {
      id: 'system_14',
      question: 'Design a distributed task scheduler like Cron.',
      type: 'system-design',
      difficulty: 'advanced',
      category: 'Distributed Systems',
      hints: ['Task storage', 'Scheduling algorithm', 'Worker coordination', 'Failure recovery'],
      timeLimit: 60,
      correctAnswer: 'Store tasks in database with schedule info, use leader election for scheduling, distribute tasks to workers, handle task failures with retries, support job dependencies.',
      keyPoints: ['Task storage', 'Scheduling', 'Worker management', 'Failure recovery', 'Job dependencies']
    },
    {
      id: 'system_15',
      question: 'Design a distributed message queue like Kafka.',
      type: 'system-design',
      difficulty: 'expert',
      category: 'Messaging Systems',
      hints: ['Topic partitioning', 'Consumer groups', 'Persistence', 'Replication'],
      timeLimit: 75,
      correctAnswer: 'Partition topics for parallelism, implement consumer groups for load balancing, persist messages to disk, replicate partitions for fault tolerance, handle backpressure.',
      keyPoints: ['Topic partitioning', 'Consumer groups', 'Persistence', 'Replication', 'Backpressure']
    },
    ...expandedSystemDesignQuestions
  ];

  resetUsedQuestions(): void {
    this.currentSessionId = `session_${Date.now()}_${Math.random()}`;
    this.sessionUsedQuestions.set(this.currentSessionId, new Set());
    // Clean up old sessions to prevent memory leaks
    if (this.sessionUsedQuestions.size > 10) {
      const keys = Array.from(this.sessionUsedQuestions.keys());
      keys.slice(0, keys.length - 5).forEach(k => this.sessionUsedQuestions.delete(k));
    }
  }

  generateQuestion(
    role: string,
    industry: string,
    experience: string,
    difficulty: 'basic' | 'intermediate' | 'advanced' | 'expert',
    type: 'behavioral' | 'technical' | 'coding' | 'system-design'
  ): Question {
    let questionPool: Question[] = [];

    switch (type) {
      case 'behavioral':
        questionPool = this.behavioralQuestions.filter(q => 
          q.difficulty === difficulty && !this.usedQuestions.has(q.id)
        );
        break;
      case 'technical':
        questionPool = this.technicalQuestions.filter(q => 
          q.difficulty === difficulty && !this.usedQuestions.has(q.id)
        );
        break;
      case 'coding':
        questionPool = this.codingQuestions.filter(q => 
          q.difficulty === difficulty && !this.usedQuestions.has(q.id)
        );
        break;
      case 'system-design':
        questionPool = this.systemDesignQuestions.filter(q => 
          q.difficulty === difficulty && !this.usedQuestions.has(q.id)
        );
        break;
    }

    // If no unused questions of the specified difficulty, try other difficulties
    if (questionPool.length === 0) {
      const allQuestions = type === 'behavioral' ? this.behavioralQuestions :
                          type === 'technical' ? this.technicalQuestions :
                          type === 'coding' ? this.codingQuestions :
                          this.systemDesignQuestions;
      
      questionPool = allQuestions.filter(q => !this.usedQuestions.has(q.id));
    }

    // If still no questions, reset used questions and try again
    if (questionPool.length === 0) {
      this.resetUsedQuestions();
      questionPool = type === 'behavioral' ? this.behavioralQuestions :
                    type === 'technical' ? this.technicalQuestions :
                    type === 'coding' ? this.codingQuestions :
                    this.systemDesignQuestions;
    }

    const selectedQuestion = questionPool[Math.floor(Math.random() * questionPool.length)];
    this.usedQuestions.add(selectedQuestion.id);

    return selectedQuestion;
  }

  validateAnswer(questionId: string, userAnswer: string, userCode?: string): AnswerValidation {
    const allQuestions = [
      ...this.behavioralQuestions,
      ...this.technicalQuestions,
      ...this.codingQuestions,
      ...this.systemDesignQuestions
    ];

    const question = allQuestions.find(q => q.id === questionId);
    if (!question) {
      return {
        isCorrect: false,
        score: 0,
        feedback: 'Question not found',
        correctAnswer: 'Unknown',
        keyPointsCovered: [],
        missedPoints: []
      };
    }

    const answer = userCode || userAnswer;
    const keyPointsCovered: string[] = [];
    const missedPoints: string[] = [];

    // Check which key points are covered
    question.keyPoints.forEach(point => {
      if (answer.toLowerCase().includes(point.toLowerCase()) || 
          this.checkSemanticMatch(answer, point)) {
        keyPointsCovered.push(point);
      } else {
        missedPoints.push(point);
      }
    });

    const coverageRatio = keyPointsCovered.length / question.keyPoints.length;
    const score = Math.round(coverageRatio * 100);
    const isCorrect = score >= 70; // 70% threshold for correctness

    let feedback = '';
    if (score >= 90) {
      feedback = 'Excellent answer! You covered all the key points comprehensively.';
    } else if (score >= 70) {
      feedback = 'Good answer! You covered most of the important points.';
    } else if (score >= 50) {
      feedback = 'Fair answer, but you missed some important points.';
    } else {
      feedback = 'Your answer needs improvement. Please review the key concepts.';
    }

    return {
      isCorrect,
      score,
      feedback,
      correctAnswer: question.correctAnswer,
      keyPointsCovered,
      missedPoints
    };
  }

  private checkSemanticMatch(answer: string, keyPoint: string): boolean {
    // Simple semantic matching - in a real implementation, you might use NLP
    const synonyms: { [key: string]: string[] } = {
      'authentication': ['auth', 'login', 'identity', 'verification'],
      'authorization': ['permission', 'access control', 'privileges'],
      'database': ['db', 'data store', 'storage'],
      'scalability': ['scaling', 'scale', 'performance'],
      'caching': ['cache', 'memory', 'storage']
    };

    const answerLower = answer.toLowerCase();
    const keyPointLower = keyPoint.toLowerCase();

    // Check for synonyms
    for (const [key, values] of Object.entries(synonyms)) {
      if (keyPointLower.includes(key)) {
        return values.some(synonym => answerLower.includes(synonym));
      }
    }

    return false;
  }
}

export const questionEngine = QuestionEngine.getInstance();

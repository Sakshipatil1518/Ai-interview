import { Question } from './questionEngine';

export const expandedBehavioralQuestions: Question[] = [
  {
    id: 'behavioral_21',
    question: 'Tell me about yourself.',
    type: 'behavioral',
    difficulty: 'basic',
    category: 'Self Introduction',
    expectedApproach: 'Brief professional summary',
    correctAnswer: 'Provide a concise summary of your professional background, key skills, and what you are looking for in your next role.',
    keyPoints: ['Professional background', 'Key skills', 'Career goals', 'Relevance to role'],
    exampleAnswer: 'I am a software engineer with 5 years of experience in full-stack development. I specialize in React and Node.js, and I have led teams to deliver products used by millions of users.'
  },
  {
    id: 'behavioral_22',
    question: 'Why do you want to work here?',
    type: 'behavioral',
    difficulty: 'basic',
    category: 'Motivation',
    expectedApproach: 'Company research alignment',
    correctAnswer: 'Show you have researched the company and explain how your values and goals align with theirs.',
    keyPoints: ['Company research', 'Values alignment', 'Role interest', 'Growth opportunity'],
    exampleAnswer: 'I have been following your company\'s innovative work in AI for the past two years. Your commitment to ethical AI development aligns with my values.'
  },
  {
    id: 'behavioral_23',
    question: 'What are your strengths?',
    type: 'behavioral',
    difficulty: 'basic',
    category: 'Self Awareness',
    expectedApproach: 'Relevant strengths with examples',
    correctAnswer: 'Mention 2-3 strengths relevant to the job with specific examples of how you have used them.',
    keyPoints: ['Relevant strengths', 'Specific examples', 'Job alignment', 'Results shown'],
    exampleAnswer: 'My key strengths are problem-solving and communication. In my last role, I identified a critical bug that was causing 20% of our customer complaints.'
  },
  {
    id: 'behavioral_24',
    question: 'What are your weaknesses?',
    type: 'behavioral',
    difficulty: 'basic',
    category: 'Self Awareness',
    expectedApproach: 'Real weakness with improvement plan',
    correctAnswer: 'Mention a real weakness that is not critical to the job, and explain how you are working to improve it.',
    keyPoints: ['Honest weakness', 'Non-critical to role', 'Improvement efforts', 'Progress made'],
    exampleAnswer: 'I tend to be overly detail-oriented, which sometimes slows me down. I have been working on prioritizing tasks using the Eisenhower matrix.'
  },
  {
    id: 'behavioral_25',
    question: 'Where do you see yourself in 5 years?',
    type: 'behavioral',
    difficulty: 'basic',
    category: 'Career Planning',
    expectedApproach: 'Realistic growth plan',
    correctAnswer: 'Show ambition while being realistic about growth within the company.',
    keyPoints: ['Career growth', 'Skill development', 'Company contribution', 'Realistic timeline'],
    exampleAnswer: 'In 5 years, I see myself as a technical lead or architect, mentoring a team while still hands-on with coding.'
  },
  {
    id: 'behavioral_26',
    question: 'Why should we hire you?',
    type: 'behavioral',
    difficulty: 'basic',
    category: 'Value Proposition',
    expectedApproach: 'Unique value proposition',
    correctAnswer: 'Connect your specific skills and experiences to the company\'s needs.',
    keyPoints: ['Unique skills', 'Relevant experience', 'Problem-solving ability', 'Cultural fit'],
    exampleAnswer: 'You should hire me because I bring 7 years of experience scaling systems exactly like yours.'
  },
  {
    id: 'behavioral_27',
    question: 'Tell me about a time you showed leadership.',
    type: 'behavioral',
    difficulty: 'basic',
    category: 'Leadership',
    expectedApproach: 'STAR method',
    correctAnswer: 'Demonstrate leadership through influence, not just authority.',
    keyPoints: ['Leadership situation', 'Actions taken', 'Team impact', 'Results achieved'],
    exampleAnswer: 'When our tech lead was unexpectedly out for 3 weeks during a critical release, I stepped up to coordinate the team.'
  },
  {
    id: 'behavioral_28',
    question: 'Describe a time you had to explain a technical concept to a non-technical person.',
    type: 'behavioral',
    difficulty: 'basic',
    category: 'Communication',
    expectedApproach: 'Simplification without condescension',
    correctAnswer: 'Show ability to translate technical concepts into understandable terms.',
    keyPoints: ['Technical concept', 'Audience adaptation', 'Analogies used', 'Understanding achieved'],
    exampleAnswer: 'I had to explain our microservices architecture to the marketing team using the analogy of a restaurant with specialized stations.'
  },
  {
    id: 'behavioral_29',
    question: 'Tell me about a time you had to prioritize multiple tasks.',
    type: 'behavioral',
    difficulty: 'basic',
    category: 'Time Management',
    expectedApproach: 'Prioritization framework',
    correctAnswer: 'Show systematic approach to prioritization.',
    keyPoints: ['Multiple tasks', 'Prioritization method', 'Stakeholder communication', 'Successful completion'],
    exampleAnswer: 'I had three competing deadlines in one week. I used the MoSCoW method to prioritize Must, Should, Could, and Won\'t have features.'
  },
  {
    id: 'behavioral_30',
    question: 'Describe a time you received praise for your work.',
    type: 'behavioral',
    difficulty: 'basic',
    category: 'Achievement',
    expectedApproach: 'Humble acknowledgment',
    correctAnswer: 'Share credit with team while highlighting your contribution.',
    keyPoints: ['Achievement context', 'Your contribution', 'Team collaboration', 'Impact of work'],
    exampleAnswer: 'My team received praise from the CEO for reducing customer churn by 25%. I led the data analysis that identified the pain points.'
  },
  {
    id: 'behavioral_41',
    question: 'Tell me about a time you had to influence without authority.',
    type: 'behavioral',
    difficulty: 'intermediate',
    category: 'Influence',
    expectedApproach: 'Persuasion through expertise',
    correctAnswer: 'Show ability to lead and influence without formal authority.',
    keyPoints: ['Influence challenge', 'Expertise demonstration', 'Relationship building', 'Outcome'],
    exampleAnswer: 'I needed to convince another team to adopt our API standards, but I had no authority over them. I built relationships and demonstrated benefits with data.'
  },
  {
    id: 'behavioral_42',
    question: 'Describe a time you had to manage a project with unclear requirements.',
    type: 'behavioral',
    difficulty: 'intermediate',
    category: 'Project Management',
    expectedApproach: 'Clarification and iteration',
    correctAnswer: 'Show ability to drive clarity in ambiguous situations.',
    keyPoints: ['Ambiguity context', 'Clarification approach', 'Stakeholder engagement', 'Successful delivery'],
    exampleAnswer: 'I was assigned a project with vague goals and no clear success metrics. I conducted stakeholder interviews and created prototypes for feedback.'
  },
  {
    id: 'behavioral_43',
    question: 'Tell me about a time you had to rebuild trust after a mistake.',
    type: 'behavioral',
    difficulty: 'intermediate',
    category: 'Trust Building',
    expectedApproach: 'Accountability and consistency',
    correctAnswer: 'Show ability to rebuild trust through consistent actions.',
    keyPoints: ['Trust breach', 'Accountability', 'Consistent actions', 'Trust restoration'],
    exampleAnswer: 'I missed a critical deadline that affected another team\'s launch. I took full responsibility and delivered the next three projects early.'
  },
  {
    id: 'behavioral_44',
    question: 'Describe a time you had to manage conflicting stakeholder expectations.',
    type: 'behavioral',
    difficulty: 'intermediate',
    category: 'Stakeholder Management',
    expectedApproach: 'Balancing competing needs',
    correctAnswer: 'Show ability to navigate conflicting demands.',
    keyPoints: ['Conflicting expectations', 'Negotiation approach', 'Win-win solution', 'Satisfaction achieved'],
    exampleAnswer: 'Marketing wanted features fast; Engineering wanted stability. I proposed a phased approach with feature flags.'
  },
  {
    id: 'behavioral_45',
    question: 'Tell me about a time you had to develop a new skill quickly for a project.',
    type: 'behavioral',
    difficulty: 'intermediate',
    category: 'Rapid Learning',
    expectedApproach: 'Accelerated learning',
    correctAnswer: 'Show ability to learn quickly and apply effectively.',
    keyPoints: ['Skill needed', 'Learning approach', 'Application', 'Results'],
    exampleAnswer: 'A project required GraphQL expertise, which I did not have. I had 2 weeks to become proficient and completed an intensive course.'
  },
  {
    id: 'behavioral_61',
    question: 'Tell me about a time you had to turn around a failing team.',
    type: 'behavioral',
    difficulty: 'advanced',
    category: 'Team Turnaround',
    expectedApproach: 'Systematic team improvement',
    correctAnswer: 'Show ability to diagnose and fix team dysfunction.',
    keyPoints: ['Team dysfunction', 'Diagnosis approach', 'Intervention strategy', 'Turnaround results'],
    exampleAnswer: 'I inherited a team with low morale, high turnover, and missed deadlines. Within 6 months, turnover dropped to zero and morale improved 40%.'
  },
  {
    id: 'behavioral_62',
    question: 'Describe a time you had to manage a political situation at work.',
    type: 'behavioral',
    difficulty: 'advanced',
    category: 'Office Politics',
    expectedApproach: 'Navigating politics diplomatically',
    correctAnswer: 'Show ability to navigate organizational politics effectively.',
    keyPoints: ['Political context', 'Navigation strategy', 'Neutrality', 'Successful outcome'],
    exampleAnswer: 'Two VPs were competing for control of our project. I maintained neutrality and facilitated a conversation about shared goals.'
  },
  {
    id: 'behavioral_63',
    question: 'Tell me about a time you had to make a decision with ethical implications.',
    type: 'behavioral',
    difficulty: 'advanced',
    category: 'Ethics',
    expectedApproach: 'Ethical decision making',
    correctAnswer: 'Show ability to navigate ethical dilemmas.',
    keyPoints: ['Ethical dilemma', 'Considerations', 'Decision rationale', 'Outcome'],
    exampleAnswer: 'We discovered a feature was collecting more user data than disclosed. I advocated for transparency and we delayed launch to fix it.'
  },
  {
    id: 'behavioral_64',
    question: 'Describe a time you had to drive organizational change.',
    type: 'behavioral',
    difficulty: 'advanced',
    category: 'Change Management',
    expectedApproach: 'Leading transformation',
    correctAnswer: 'Show ability to lead significant organizational change.',
    keyPoints: ['Change initiative', 'Resistance management', 'Communication strategy', 'Adoption success'],
    exampleAnswer: 'I led the adoption of Agile across a 200-person engineering organization. Within a year, 90% of teams adopted Agile.'
  },
  {
    id: 'behavioral_65',
    question: 'Tell me about a time you had to manage a high-performer with attitude issues.',
    type: 'behavioral',
    difficulty: 'advanced',
    category: 'Difficult Talent Management',
    expectedApproach: 'Balancing performance and behavior',
    correctAnswer: 'Show ability to address behavior issues with high performers.',
    keyPoints: ['High performer context', 'Behavior issues', 'Management approach', 'Outcome'],
    exampleAnswer: 'Our top developer was brilliant but dismissive of colleagues. I had direct conversations about impact and set clear expectations.'
  },
  {
    id: 'behavioral_101',
    question: 'Tell me about a time you had to transform an organization\'s culture.',
    type: 'behavioral',
    difficulty: 'expert',
    category: 'Culture Transformation',
    expectedApproach: 'Cultural transformation leadership',
    correctAnswer: 'Show ability to drive fundamental cultural change.',
    keyPoints: ['Cultural assessment', 'Vision creation', 'Change strategy', 'Sustained transformation'],
    exampleAnswer: 'Our engineering culture had become risk-averse and siloed. Within 18 months, we went from 2 experiments per quarter to 20.'
  },
  {
    id: 'behavioral_102',
    question: 'Describe a time you had to lead through a company crisis or major setback.',
    type: 'behavioral',
    difficulty: 'expert',
    category: 'Crisis Leadership',
    expectedApproach: 'Leading through major crisis',
    correctAnswer: 'Show ability to lead organizations through significant challenges.',
    keyPoints: ['Crisis context', 'Leadership under pressure', 'Team stabilization', 'Recovery strategy'],
    exampleAnswer: 'Our company faced a major product failure that required 40% layoffs. We retained 95% of key talent and returned to growth within a year.'
  },
  {
    id: 'behavioral_103',
    question: 'Tell me about a time you had to make a strategic bet that could make or break your team/company.',
    type: 'behavioral',
    difficulty: 'expert',
    category: 'Strategic Decision Making',
    expectedApproach: 'High-stakes strategic decisions',
    correctAnswer: 'Show ability to make bold strategic decisions.',
    keyPoints: ['Strategic context', 'Decision analysis', 'Risk management', 'Outcome'],
    exampleAnswer: 'I recommended we pivot our entire product strategy to focus on enterprise instead of SMB. Within 2 years, enterprise revenue exceeded our previous total by 3x.'
  },
  {
    id: 'behavioral_104',
    question: 'Describe a time you had to manage a complex stakeholder ecosystem with competing interests.',
    type: 'behavioral',
    difficulty: 'expert',
    category: 'Complex Stakeholder Management',
    expectedApproach: 'Multi-stakeholder navigation',
    correctAnswer: 'Show ability to manage complex stakeholder landscapes.',
    keyPoints: ['Stakeholder complexity', 'Alignment strategy', 'Negotiation', 'Successful navigation'],
    exampleAnswer: 'I led a platform migration affecting 10 departments. We achieved 95% adoption with minimal disruption.'
  },
  {
    id: 'behavioral_105',
    question: 'Tell me about a time you had to rebuild trust with customers after a major failure.',
    type: 'behavioral',
    difficulty: 'expert',
    category: 'Trust Recovery',
    expectedApproach: 'Customer trust restoration',
    correctAnswer: 'Show ability to restore customer confidence after failures.',
    keyPoints: ['Failure impact', 'Trust rebuilding strategy', 'Transparency', 'Relationship restoration'],
    exampleAnswer: 'A data loss incident affected 500 enterprise customers. We retained 98% of customers and received praise for our handling of the crisis.'
  }
];
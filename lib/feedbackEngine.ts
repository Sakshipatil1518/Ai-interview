
import { AnswerValidation } from './questionEngine';

export interface FeedbackScore {
  technical: number;
  communication: number;
  problemSolving: number;
  codeQuality: number;
  overall: number;
}

export interface RealTimeFeedback {
  timestamp: number;
  category: 'technical' | 'communication' | 'problemSolving' | 'codeQuality';
  score: number;
  comment: string;
  suggestion: string;
}

export interface QuestionResult {
  questionId: string;
  question: string;
  userAnswer: string;
  userCode?: string;
  validation: AnswerValidation;
  timestamp: number;
  timeSpent: number;
}

export interface InterviewSummary {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  averageScore: number;
  totalTime: number;
  questionResults: QuestionResult[];
  overallFeedback: string;
  improvementAreas: string[];
  strengths: string[];
  realTimeStrengths: string[];
  realTimeWeaknesses: string[];
  categoryBreakdown: {
    behavioral: { correct: number; total: number; avgScore: number };
    technical: { correct: number; total: number; avgScore: number };
    coding: { correct: number; total: number; avgScore: number };
    systemDesign: { correct: number; total: number; avgScore: number };
  };
}

export interface LiveInterviewData {
  sessionId: string;
  startTime: number;
  currentQuestion: number;
  totalQuestions: number;
  currentScore: number;
  timeElapsed: number;
  strengths: string[];
  weaknesses: string[];
  categoryScores: FeedbackScore;
  recentAnswers: QuestionResult[];
  isActive: boolean;
}

export class FeedbackEngine {
  private static instance: FeedbackEngine;
  private feedbackHistory: RealTimeFeedback[] = [];
  private questionResults: QuestionResult[] = [];
  private currentScores: FeedbackScore = {
    technical: 0,
    communication: 0,
    problemSolving: 0,
    codeQuality: 0,
    overall: 0
  };
  private liveInterviewData: LiveInterviewData | null = null;
  private realTimeStrengths: string[] = [];
  private realTimeWeaknesses: string[] = [];
  private listeners: Array<(data: LiveInterviewData) => void> = [];

  static getInstance(): FeedbackEngine {
    if (!FeedbackEngine.instance) {
      FeedbackEngine.instance = new FeedbackEngine();
    }
    return FeedbackEngine.instance;
  }

  startLiveInterview(sessionId: string): void {
    this.liveInterviewData = {
      sessionId,
      startTime: Date.now(),
      currentQuestion: 0,
      totalQuestions: 0,
      currentScore: 0,
      timeElapsed: 0,
      strengths: [],
      weaknesses: [],
      categoryScores: { ...this.currentScores },
      recentAnswers: [],
      isActive: true
    };
    this.notifyListeners();
  }

  endLiveInterview(): void {
    if (this.liveInterviewData) {
      this.liveInterviewData.isActive = false;
      this.notifyListeners();
    }
  }

  addLiveDataListener(callback: (data: LiveInterviewData) => void): void {
    this.listeners.push(callback);
  }

  removeLiveDataListener(callback: (data: LiveInterviewData) => void): void {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  private notifyListeners(): void {
    if (this.liveInterviewData) {
      this.listeners.forEach(callback => callback({ ...this.liveInterviewData! }));
    }
  }

  analyzeResponse(response: string, codeSnippet?: string): RealTimeFeedback[] {
    const feedback: RealTimeFeedback[] = [];
    const timestamp = Date.now();

    // Analyze communication
    const communicationScore = this.analyzeCommunication(response);
    feedback.push({
      timestamp,
      category: 'communication',
      score: communicationScore,
      comment: this.getCommunicationComment(communicationScore),
      suggestion: this.getCommunicationSuggestion(communicationScore)
    });

    // Analyze technical content
    const technicalScore = this.analyzeTechnicalContent(response);
    feedback.push({
      timestamp,
      category: 'technical',
      score: technicalScore,
      comment: this.getTechnicalComment(technicalScore),
      suggestion: this.getTechnicalSuggestion(technicalScore)
    });

    // Analyze code quality if code is provided
    if (codeSnippet) {
      const codeQualityScore = this.analyzeCodeQuality(codeSnippet);
      feedback.push({
        timestamp,
        category: 'codeQuality',
        score: codeQualityScore,
        comment: this.getCodeQualityComment(codeQualityScore),
        suggestion: this.getCodeQualitySuggestion(codeQualityScore)
      });
    }

    // Analyze problem-solving approach
    const problemSolvingScore = this.analyzeProblemSolving(response, codeSnippet);
    feedback.push({
      timestamp,
      category: 'problemSolving',
      score: problemSolvingScore,
      comment: this.getProblemSolvingComment(problemSolvingScore),
      suggestion: this.getProblemSolvingSuggestion(problemSolvingScore)
    });

    this.feedbackHistory.push(...feedback);
    this.updateCurrentScores(feedback);
    this.updateRealTimeStrengthsWeaknesses(feedback);

    return feedback;
  }

  addQuestionResult(result: QuestionResult): void {
    this.questionResults.push(result);
    this.updateScoresFromValidation(result.validation);
    this.updateLiveInterviewData(result);
    this.updateRealTimeAnalysis(result);
  }

  private updateLiveInterviewData(result: QuestionResult): void {
    if (this.liveInterviewData) {
      this.liveInterviewData.currentQuestion += 1;
      this.liveInterviewData.totalQuestions = this.questionResults.length;
      this.liveInterviewData.timeElapsed = Date.now() - this.liveInterviewData.startTime;
      this.liveInterviewData.currentScore = this.currentScores.overall;
      this.liveInterviewData.categoryScores = { ...this.currentScores };
      this.liveInterviewData.recentAnswers = this.questionResults.slice(-5);
      this.liveInterviewData.strengths = [...this.realTimeStrengths];
      this.liveInterviewData.weaknesses = [...this.realTimeWeaknesses];
      
      this.notifyListeners();
    }
  }

  private updateRealTimeAnalysis(result: QuestionResult): void {
    const { validation } = result;
    
    // Update strengths based on performance
    if (validation.isCorrect && validation.score >= 80) {
      if (result.question.toLowerCase().includes('team') || result.question.toLowerCase().includes('collaboration')) {
        this.addStrength('Excellent teamwork and collaboration skills');
      }
      if (result.question.toLowerCase().includes('technical') || result.question.toLowerCase().includes('database')) {
        this.addStrength('Strong technical knowledge and understanding');
      }
      if (result.userCode) {
        this.addStrength('Solid coding and algorithm implementation');
      }
      if (result.timeSpent < 120) { // Less than 2 minutes
        this.addStrength('Quick problem-solving and decision making');
      }
    }

    // Update weaknesses based on poor performance
    if (!validation.isCorrect || validation.score < 60) {
      if (result.question.toLowerCase().includes('behavioral')) {
        this.addWeakness('Behavioral interview responses need improvement');
      }
      if (result.question.toLowerCase().includes('technical')) {
        this.addWeakness('Technical concepts require strengthening');
      }
      if (result.userCode && validation.score < 50) {
        this.addWeakness('Coding skills and algorithm implementation');
      }
      if (validation.missedPoints.length > 2) {
        this.addWeakness('Missing key concepts in answers');
      }
    }

    // Communication analysis
    if (result.userAnswer.length < 50) {
      this.addWeakness('Answers too brief - provide more detailed explanations');
    } else if (result.userAnswer.length > 500 && !result.userAnswer.includes('because') && !result.userAnswer.includes('therefore')) {
      this.addWeakness('Improve answer structure and clarity');
    }

    // Time management analysis
    if (result.timeSpent > 300) { // More than 5 minutes
      this.addWeakness('Time management - consider more concise responses');
    }
  }

  private addStrength(strength: string): void {
    if (!this.realTimeStrengths.includes(strength)) {
      this.realTimeStrengths.push(strength);
      // Keep only the most recent 5 strengths
      if (this.realTimeStrengths.length > 5) {
        this.realTimeStrengths.shift();
      }
    }
  }

  private addWeakness(weakness: string): void {
    if (!this.realTimeWeaknesses.includes(weakness)) {
      this.realTimeWeaknesses.push(weakness);
      // Keep only the most recent 5 weaknesses
      if (this.realTimeWeaknesses.length > 5) {
        this.realTimeWeaknesses.shift();
      }
    }
  }

  private updateRealTimeStrengthsWeaknesses(feedback: RealTimeFeedback[]): void {
    feedback.forEach(fb => {
      if (fb.score >= 80) {
        switch (fb.category) {
          case 'technical':
            this.addStrength('Strong technical knowledge and expertise');
            break;
          case 'communication':
            this.addStrength('Excellent communication and articulation');
            break;
          case 'problemSolving':
            this.addStrength('Great analytical and problem-solving skills');
            break;
          case 'codeQuality':
            this.addStrength('High-quality code and best practices');
            break;
        }
      } else if (fb.score < 60) {
        switch (fb.category) {
          case 'technical':
            this.addWeakness('Technical knowledge needs improvement');
            break;
          case 'communication':
            this.addWeakness('Communication skills require development');
            break;
          case 'problemSolving':
            this.addWeakness('Problem-solving approach needs work');
            break;
          case 'codeQuality':
            this.addWeakness('Code quality and best practices');
            break;
        }
      }
    });
  }

  getRealTimeStrengths(): string[] {
    return [...this.realTimeStrengths];
  }

  getRealTimeWeaknesses(): string[] {
    return [...this.realTimeWeaknesses];
  }

  getLiveInterviewData(): LiveInterviewData | null {
    return this.liveInterviewData ? { ...this.liveInterviewData } : null;
  }

  private updateScoresFromValidation(validation: AnswerValidation): void {
    // Update scores based on answer validation
    const score = validation.score;
    
    // Distribute score across categories based on question performance
    this.currentScores.technical = Math.round((this.currentScores.technical + score) / 2);
    this.currentScores.communication = Math.round((this.currentScores.communication + score) / 2);
    this.currentScores.problemSolving = Math.round((this.currentScores.problemSolving + score) / 2);
    
    if (validation.correctAnswer.includes('function') || validation.correctAnswer.includes('code')) {
      this.currentScores.codeQuality = Math.round((this.currentScores.codeQuality + score) / 2);
    }

    this.updateOverallScore();
  }

  private updateOverallScore(): void {
    const { technical, communication, problemSolving, codeQuality } = this.currentScores;
    this.currentScores.overall = Math.round((technical + communication + problemSolving + codeQuality) / 4);
  }

  generateInterviewSummary(): InterviewSummary {
    const totalQuestions = this.questionResults.length;
    const correctAnswers = this.questionResults.filter(r => r.validation.isCorrect).length;
    const incorrectAnswers = totalQuestions - correctAnswers;
    
    const totalScore = this.questionResults.reduce((sum, r) => sum + r.validation.score, 0);
    const averageScore = totalQuestions > 0 ? Math.round(totalScore / totalQuestions) : 0;
    
    const totalTime = this.questionResults.reduce((sum, r) => sum + r.timeSpent, 0);

    const strengths = this.identifyStrengths();
    const improvementAreas = this.identifyImprovementAreas();
    const overallFeedback = this.generateOverallFeedback(averageScore, correctAnswers, totalQuestions);

    // Category breakdown
    const categoryBreakdown = this.generateCategoryBreakdown();

    return {
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      averageScore,
      totalTime,
      questionResults: this.questionResults,
      overallFeedback,
      improvementAreas,
      strengths,
      realTimeStrengths: this.realTimeStrengths,
      realTimeWeaknesses: this.realTimeWeaknesses,
      categoryBreakdown
    };
  }

  private generateCategoryBreakdown() {
    const categories = {
      behavioral: { correct: 0, total: 0, totalScore: 0, avgScore: 0 },
      technical: { correct: 0, total: 0, totalScore: 0, avgScore: 0 },
      coding: { correct: 0, total: 0, totalScore: 0, avgScore: 0 },
      systemDesign: { correct: 0, total: 0, totalScore: 0, avgScore: 0 }
    };

    this.questionResults.forEach(result => {
      const questionType = result.question.toLowerCase();
      let category: keyof typeof categories = 'technical';
      
      if (questionType.includes('team') || questionType.includes('challenge') || questionType.includes('time when')) {
        category = 'behavioral';
      } else if (result.userCode) {
        category = 'coding';
      } else if (questionType.includes('design') || questionType.includes('system')) {
        category = 'systemDesign';
      }

      categories[category].total++;
      categories[category].totalScore += result.validation.score;
      if (result.validation.isCorrect) {
        categories[category].correct++;
      }
    });

    // Calculate average scores
    Object.keys(categories).forEach(key => {
      const cat = categories[key as keyof typeof categories];
      cat.avgScore = cat.total > 0 ? Math.round(cat.totalScore / cat.total) : 0;
    });

    return categories;
  }

  private identifyStrengths(): string[] {
    const strengths: string[] = [];
    const scores = this.currentScores;

    if (scores.technical >= 75) strengths.push('Strong technical knowledge');
    if (scores.communication >= 75) strengths.push('Excellent communication skills');
    if (scores.problemSolving >= 75) strengths.push('Great problem-solving approach');
    if (scores.codeQuality >= 75) strengths.push('High-quality code implementation');

    // Analyze question results for specific strengths
    const correctBehavioral = this.questionResults.filter(r => 
      r.question.includes('team') || r.question.includes('challenge') && r.validation.isCorrect
    ).length;
    
    if (correctBehavioral > 0) strengths.push('Good behavioral interview responses');

    const correctCoding = this.questionResults.filter(r => 
      r.userCode && r.validation.isCorrect
    ).length;
    
    if (correctCoding > 0) strengths.push('Solid coding problem-solving skills');

    // Add real-time strengths
    strengths.push(...this.realTimeStrengths);

    return [...new Set(strengths)]; // Remove duplicates
  }

  private identifyImprovementAreas(): string[] {
    const areas: string[] = [];
    const scores = this.currentScores;

    if (scores.technical < 60) areas.push('Technical knowledge needs strengthening');
    if (scores.communication < 60) areas.push('Communication skills need improvement');
    if (scores.problemSolving < 60) areas.push('Problem-solving approach needs work');
    if (scores.codeQuality < 60) areas.push('Code quality and best practices');

    // Analyze incorrect answers for specific areas
    const incorrectQuestions = this.questionResults.filter(r => !r.validation.isCorrect);
    
    const behavioralIssues = incorrectQuestions.filter(r => 
      r.question.includes('team') || r.question.includes('challenge')
    ).length;
    
    if (behavioralIssues > 0) areas.push('Behavioral interview techniques (STAR method)');

    const codingIssues = incorrectQuestions.filter(r => r.userCode).length;
    if (codingIssues > 0) areas.push('Algorithm implementation and testing');

    const technicalIssues = incorrectQuestions.filter(r => 
      r.question.includes('database') || r.question.includes('API') || r.question.includes('system')
    ).length;
    
    if (technicalIssues > 0) areas.push('System design and architecture concepts');

    // Add real-time weaknesses
    areas.push(...this.realTimeWeaknesses);

    return [...new Set(areas)]; // Remove duplicates
  }

  private generateOverallFeedback(averageScore: number, correct: number, total: number): string {
    let feedback = '';
    
    if (averageScore >= 80) {
      feedback = `Excellent performance! You answered ${correct}/${total} questions correctly with an average score of ${averageScore}%. `;
    } else if (averageScore >= 60) {
      feedback = `Good performance with room for improvement. You got ${correct}/${total} questions right (${averageScore}% average). `;
    } else {
      feedback = `There's significant room for improvement. You answered ${correct}/${total} questions correctly (${averageScore}% average). `;
    }

    if (total > 0) {
      const accuracy = Math.round((correct / total) * 100);
      feedback += `Your accuracy rate was ${accuracy}%. `;
    }

    feedback += 'Focus on the improvement areas identified below and practice regularly to enhance your interview skills.';

    return feedback;
  }

  getIncorrectQuestions(): QuestionResult[] {
    return this.questionResults.filter(result => !result.validation.isCorrect);
  }

  getCorrectQuestions(): QuestionResult[] {
    return this.questionResults.filter(result => result.validation.isCorrect);
  }

  private analyzeCommunication(response: string): number {
    let score = 50; // Base score

    // Check clarity
    if (response.length > 50) score += 10;
    if (response.includes('because') || response.includes('therefore') || response.includes('however')) score += 15;
    
    // Check structure
    const sentences = response.split(/[.!?]+/).filter(s => s.trim().length > 0);
    if (sentences.length > 2) score += 10;
    
    // Check technical vocabulary
    const techWords = ['function', 'variable', 'algorithm', 'optimization', 'performance', 'scalability'];
    const techWordCount = techWords.filter(word => response.toLowerCase().includes(word)).length;
    score += techWordCount * 5;

    return Math.min(100, Math.max(0, score));
  }

  private analyzeTechnicalContent(response: string): number {
    let score = 40;

    // Check for technical concepts
    const concepts = ['api', 'database', 'framework', 'library', 'design pattern', 'architecture'];
    const conceptCount = concepts.filter(concept => response.toLowerCase().includes(concept)).length;
    score += conceptCount * 10;

    // Check for specific technologies
    const technologies = ['react', 'node', 'python', 'java', 'javascript', 'typescript', 'sql'];
    const techCount = technologies.filter(tech => response.toLowerCase().includes(tech)).length;
    score += techCount * 8;

    // Check for best practices mention
    if (response.toLowerCase().includes('best practice')) score += 15;
    if (response.toLowerCase().includes('testing')) score += 10;
    if (response.toLowerCase().includes('security')) score += 10;

    return Math.min(100, Math.max(0, score));
  }

  private analyzeCodeQuality(code: string): number {
    let score = 30;

    // Check code length (not too short, not too long)
    if (code.length > 100 && code.length < 1000) score += 15;

    // Check for comments
    if (code.includes('//') || code.includes('/*')) score += 10;

    // Check for proper naming
    const variablePattern = /\b[a-z][a-zA-Z0-9]*\b/g;
    const variables = code.match(variablePattern) || [];
    if (variables.length > 0) score += 10;

    // Check for functions
    if (code.includes('function') || code.includes('def ') || code.includes('public ')) score += 15;

    // Check for error handling
    if (code.includes('try') || code.includes('except') || code.includes('catch')) score += 20;

    return Math.min(100, Math.max(0, score));
  }

  private analyzeProblemSolving(response: string, code?: string): number {
    let score = 40;

    // Check for systematic approach
    if (response.toLowerCase().includes('first') || response.toLowerCase().includes('step')) score += 15;
    
    // Check for consideration of edge cases
    if (response.toLowerCase().includes('edge case') || response.toLowerCase().includes('corner case')) score += 20;

    // Check for optimization thinking
    if (response.toLowerCase().includes('optimize') || response.toLowerCase().includes('efficient')) score += 15;

    // Check code implementation if provided
    if (code) {
      if (code.includes('if') || code.includes('else')) score += 10;
      if (code.includes('for') || code.includes('while')) score += 10;
    }

    return Math.min(100, Math.max(0, score));
  }

  private updateCurrentScores(feedback: RealTimeFeedback[]) {
    feedback.forEach(fb => {
      this.currentScores[fb.category] = fb.score;
    });

    this.updateOverallScore();
  }

  getCurrentScores(): FeedbackScore {
    return { ...this.currentScores };
  }

  getFeedbackHistory(): RealTimeFeedback[] {
    return [...this.feedbackHistory];
  }

  getQuestionResults(): QuestionResult[] {
    return [...this.questionResults];
  }

  resetSession(): void {
    this.feedbackHistory = [];
    this.questionResults = [];
    this.realTimeStrengths = [];
    this.realTimeWeaknesses = [];
    this.currentScores = {
      technical: 0,
      communication: 0,
      problemSolving: 0,
      codeQuality: 0,
      overall: 0
    };
    if (this.liveInterviewData) {
      this.liveInterviewData.isActive = false;
    }
    this.liveInterviewData = null;
  }

  private getCommunicationComment(score: number): string {
    if (score >= 80) return "Excellent communication skills demonstrated";
    if (score >= 60) return "Good communication with room for improvement";
    if (score >= 40) return "Fair communication, consider being more detailed";
    return "Communication needs improvement";
  }

  private getCommunicationSuggestion(score: number): string {
    if (score >= 80) return "Keep up the clear and structured explanations";
    if (score >= 60) return "Try to provide more specific examples";
    if (score >= 40) return "Structure your answers with clear beginning, middle, and end";
    return "Speak more clearly and provide detailed explanations";
  }

  private getTechnicalComment(score: number): string {
    if (score >= 80) return "Strong technical knowledge displayed";
    if (score >= 60) return "Good technical understanding";
    if (score >= 40) return "Basic technical knowledge shown";
    return "Technical knowledge needs strengthening";
  }

  private getTechnicalSuggestion(score: number): string {
    if (score >= 80) return "Continue demonstrating deep technical insights";
    if (score >= 60) return "Include more technical details and best practices";
    if (score >= 40) return "Reference specific technologies and frameworks";
    return "Study fundamental technical concepts more thoroughly";
  }

  private getCodeQualityComment(score: number): string {
    if (score >= 80) return "Excellent code structure and quality";
    if (score >= 60) return "Good code with minor improvements needed";
    if (score >= 40) return "Code works but needs better practices";
    return "Code quality requires significant improvement";
  }

  private getCodeQualitySuggestion(score: number): string {
    if (score >= 80) return "Maintain your high coding standards";
    if (score >= 60) return "Add more comments and error handling";
    if (score >= 40) return "Focus on naming conventions and code structure";
    return "Study coding best practices and clean code principles";
  }

  private getProblemSolvingComment(score: number): string {
    if (score >= 80) return "Excellent problem-solving approach";
    if (score >= 60) return "Good analytical thinking";
    if (score >= 40) return "Shows problem-solving potential";
    return "Problem-solving skills need development";
  }

  private getProblemSolvingSuggestion(score: number): string {
    if (score >= 80) return "Continue your systematic problem-solving approach";
    if (score >= 60) return "Consider more edge cases and optimizations";
    if (score >= 40) return "Break down problems into smaller steps";
    return "Practice systematic problem decomposition";
  }
}

export const feedbackEngine = FeedbackEngine.getInstance();

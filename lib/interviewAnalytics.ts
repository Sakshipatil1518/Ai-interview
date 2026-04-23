
export interface DetailedFeedback {
  sessionId: string;
  userId: string;
  role: string;
  industry: string;
  overallScore: number;
  categoryScores: {
    technical: number;
    communication: number;
    problemSolving: number;
    codeQuality: number;
    behavioral: number;
  };
  strengths: string[];
  improvements: string[];
  detailedAnalysis: {
    questionId: string;
    question: string;
    response: string;
    score: number;
    feedback: string;
    category: string;
    timeSpent: number;
  }[];
  recommendations: string[];
  timestamp: Date;
  duration: number;
}

export interface InterviewMetrics {
  responseTime: number;
  responseLength: number;
  technicalTermsUsed: number;
  clarityScore: number;
  confidenceLevel: number;
}

class InterviewAnalytics {
  private technicalTerms = [
    'algorithm', 'data structure', 'api', 'database', 'framework', 'library',
    'microservices', 'architecture', 'scalability', 'performance', 'optimization',
    'security', 'authentication', 'authorization', 'encryption', 'deployment',
    'testing', 'debugging', 'refactoring', 'version control', 'git', 'docker',
    'kubernetes', 'cloud', 'aws', 'azure', 'gcp', 'devops', 'ci/cd', 'agile',
    'scrum', 'mvc', 'rest', 'graphql', 'json', 'xml', 'http', 'https', 'ssl',
    'async', 'sync', 'promise', 'callback', 'closure', 'prototype', 'inheritance',
    'polymorphism', 'encapsulation', 'abstraction', 'solid', 'dry', 'kiss'
  ];

  analyzeResponse(response: string, question: any, timeSpent: number): InterviewMetrics {
    const words = response.toLowerCase().split(/\s+/);
    const sentences = response.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    return {
      responseTime: timeSpent,
      responseLength: words.length,
      technicalTermsUsed: this.countTechnicalTerms(response),
      clarityScore: this.calculateClarityScore(response, sentences),
      confidenceLevel: this.assessConfidenceLevel(response)
    };
  }

  private countTechnicalTerms(response: string): number {
    const words = response.toLowerCase().split(/\s+/);
    return words.filter(word => this.technicalTerms.includes(word)).length;
  }

  private calculateClarityScore(response: string, sentences: string[]): number {
    if (sentences.length === 0) return 0;
    
    const avgSentenceLength = response.length / sentences.length;
    const complexityPenalty = avgSentenceLength > 150 ? 0.8 : 1;
    
    // Base score on structure and coherence
    let score = 70;
    
    // Bonus for good structure
    if (response.includes('first') || response.includes('second') || response.includes('then')) {
      score += 10;
    }
    
    // Bonus for examples
    if (response.includes('example') || response.includes('for instance')) {
      score += 10;
    }
    
    // Penalty for very short responses
    if (response.length < 50) {
      score -= 20;
    }
    
    return Math.min(100, Math.max(0, score * complexityPenalty));
  }

  private assessConfidenceLevel(response: string): number {
    const uncertainWords = ['maybe', 'perhaps', 'might', 'possibly', 'i think', 'not sure', 'probably'];
    const confidentWords = ['definitely', 'certainly', 'absolutely', 'clearly', 'obviously', 'exactly'];
    
    const uncertainCount = uncertainWords.filter(word => 
      response.toLowerCase().includes(word)
    ).length;
    
    const confidentCount = confidentWords.filter(word => 
      response.toLowerCase().includes(word)
    ).length;
    
    const baseScore = 70;
    const confidenceAdjustment = (confidentCount - uncertainCount) * 10;
    
    return Math.min(100, Math.max(20, baseScore + confidenceAdjustment));
  }

  generateDetailedFeedback(
    sessionId: string,
    userId: string,
    role: string,
    industry: string,
    responses: Array<{
      questionId: string;
      question: string;
      response: string;
      category: string;
      timeSpent: number;
    }>,
    duration: number
  ): DetailedFeedback {
    const detailedAnalysis = responses.map(r => {
      const metrics = this.analyzeResponse(r.response, r.question, r.timeSpent);
      const score = this.calculateQuestionScore(r, metrics);
      const feedback = this.generateQuestionFeedback(r, metrics, score);
      
      return {
        questionId: r.questionId,
        question: r.question,
        response: r.response,
        score,
        feedback,
        category: r.category,
        timeSpent: r.timeSpent
      };
    });

    const categoryScores = this.calculateCategoryScores(detailedAnalysis);
    const overallScore = this.calculateOverallScore(categoryScores);
    const strengths = this.identifyStrengths(categoryScores, detailedAnalysis);
    const improvements = this.identifyImprovements(categoryScores, detailedAnalysis);
    const recommendations = this.generateRecommendations(role, industry, categoryScores);

    return {
      sessionId,
      userId,
      role,
      industry,
      overallScore,
      categoryScores,
      strengths,
      improvements,
      detailedAnalysis,
      recommendations,
      timestamp: new Date(),
      duration
    };
  }

  private calculateQuestionScore(
    response: any,
    metrics: InterviewMetrics
  ): number {
    let score = 0;
    
    // Base scoring factors
    const lengthScore = Math.min(30, metrics.responseLength * 0.5);
    const clarityScore = metrics.clarityScore * 0.25;
    const confidenceScore = metrics.confidenceLevel * 0.2;
    const technicalScore = Math.min(25, metrics.technicalTermsUsed * 5);
    
    score = lengthScore + clarityScore + confidenceScore + technicalScore;
    
    // Category-specific adjustments
    if (response.category === 'technical' || response.category === 'coding') {
      score += metrics.technicalTermsUsed * 2;
    }
    
    // Time spent consideration
    const idealTime = response.category === 'coding' ? 15 : 4;
    const timeRatio = metrics.responseTime / (idealTime * 60); // Convert to seconds
    
    if (timeRatio < 0.3) {
      score *= 0.8; // Penalty for rushing
    } else if (timeRatio > 2) {
      score *= 0.9; // Small penalty for taking too long
    }
    
    return Math.min(100, Math.max(0, score));
  }

  private generateQuestionFeedback(
    response: any,
    metrics: InterviewMetrics,
    score: number
  ): string {
    const feedback = [];
    
    if (score >= 80) {
      feedback.push("Excellent response with clear structure and good technical depth.");
    } else if (score >= 60) {
      feedback.push("Good response, but could be improved in some areas.");
    } else {
      feedback.push("Response needs improvement in clarity and depth.");
    }
    
    if (metrics.responseLength < 20) {
      feedback.push("Consider providing more detailed explanations.");
    }
    
    if (metrics.technicalTermsUsed === 0 && (response.category === 'technical' || response.category === 'coding')) {
      feedback.push("Try to use more technical terminology to demonstrate your expertise.");
    }
    
    if (metrics.confidenceLevel < 50) {
      feedback.push("Show more confidence in your answers. Use definitive statements.");
    }
    
    return feedback.join(' ');
  }

  private calculateCategoryScores(detailedAnalysis: any[]): any {
    const categories = ['technical', 'communication', 'problemSolving', 'codeQuality', 'behavioral'];
    const scores: any = {};
    
    categories.forEach(category => {
      const categoryQuestions = detailedAnalysis.filter(q => 
        this.mapQuestionCategoryToScore(q.category) === category
      );
      
      if (categoryQuestions.length > 0) {
        scores[category] = Math.round(
          categoryQuestions.reduce((sum, q) => sum + q.score, 0) / categoryQuestions.length
        );
      } else {
        scores[category] = 75; // Default score if no questions in category
      }
    });
    
    return scores;
  }

  private mapQuestionCategoryToScore(questionCategory: string): string {
    const mapping: Record<string, string> = {
      'technical': 'technical',
      'coding': 'codeQuality',
      'behavioral': 'behavioral',
      'situational': 'problemSolving'
    };
    
    return mapping[questionCategory] || 'communication';
  }

  private calculateOverallScore(categoryScores: any): number {
    const weights = {
      technical: 0.25,
      communication: 0.2,
      problemSolving: 0.2,
      codeQuality: 0.2,
      behavioral: 0.15
    };
    
    return Math.round(
      Object.keys(weights).reduce((sum, category) => {
        return sum + (categoryScores[category] * weights[category as keyof typeof weights]);
      }, 0)
    );
  }

  private identifyStrengths(categoryScores: any, detailedAnalysis: any[]): string[] {
    const strengths = [];
    
    Object.keys(categoryScores).forEach(category => {
      if (categoryScores[category] >= 80) {
        strengths.push(`Strong ${category} skills demonstrated`);
      }
    });
    
    // Add specific strengths based on detailed analysis
    const avgTechnicalTerms = detailedAnalysis.reduce((sum, q) => 
      sum + (q.response.match(/\b(algorithm|api|database|framework)\b/gi)?.length || 0), 0
    ) / detailedAnalysis.length;
    
    if (avgTechnicalTerms > 2) {
      strengths.push("Excellent technical vocabulary");
    }
    
    const avgResponseLength = detailedAnalysis.reduce((sum, q) => 
      sum + q.response.split(' ').length, 0
    ) / detailedAnalysis.length;
    
    if (avgResponseLength > 50) {
      strengths.push("Provides detailed and comprehensive answers");
    }
    
    return strengths.length > 0 ? strengths : ["Shows good potential for growth"];
  }

  private identifyImprovements(categoryScores: any, detailedAnalysis: any[]): string[] {
    const improvements = [];
    
    Object.keys(categoryScores).forEach(category => {
      if (categoryScores[category] < 60) {
        improvements.push(`Needs improvement in ${category} skills`);
      }
    });
    
    // Add specific improvement areas
    const shortResponses = detailedAnalysis.filter(q => q.response.split(' ').length < 20);
    if (shortResponses.length > detailedAnalysis.length / 2) {
      improvements.push("Provide more detailed explanations in your responses");
    }
    
    const lowConfidence = detailedAnalysis.filter(q => 
      q.response.toLowerCase().includes('maybe') || 
      q.response.toLowerCase().includes('not sure')
    );
    if (lowConfidence.length > 0) {
      improvements.push("Show more confidence in your technical knowledge");
    }
    
    return improvements.length > 0 ? improvements : ["Continue building on your current skills"];
  }

  private generateRecommendations(role: string, industry: string, categoryScores: any): string[] {
    const recommendations = [];
    
    // Role-specific recommendations
    if (role.includes('Frontend') && categoryScores.technical < 70) {
      recommendations.push("Focus on learning modern frontend frameworks and UI/UX principles");
    }
    
    if (role.includes('Backend') && categoryScores.codeQuality < 70) {
      recommendations.push("Practice system design and database optimization techniques");
    }
    
    if (categoryScores.communication < 70) {
      recommendations.push("Practice explaining technical concepts in simple terms");
    }
    
    if (categoryScores.problemSolving < 70) {
      recommendations.push("Solve more algorithmic problems and practice breaking down complex issues");
    }
    
    // Industry-specific recommendations
    if (industry === 'FinTech' && categoryScores.technical < 80) {
      recommendations.push("Study financial domain knowledge and security best practices");
    }
    
    if (industry === 'HealthTech' && categoryScores.behavioral < 75) {
      recommendations.push("Focus on patient-centric thinking and regulatory compliance awareness");
    }
    
    // General recommendations
    recommendations.push("Continue practicing mock interviews to improve confidence");
    recommendations.push("Build more personal projects to demonstrate practical skills");
    
    return recommendations;
  }
}

export const interviewAnalytics = new InterviewAnalytics();

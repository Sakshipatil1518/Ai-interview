'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import VideoCall from './VideoCall';
import CodeEditor from './CodeEditor';
import AntiCheatMonitor from './AntiCheatMonitor';
import AIInterviewer from './AIInterviewer';
import LanguageSelector from '../../../components/LanguageSelector';
import { useLanguage } from '../../../lib/languageContext';
import { questionEngine, Question } from '../../../lib/questionEngine';
import { feedbackEngine, QuestionResult, InterviewSummary } from '../../../lib/feedbackEngine';
import { saveInterviewResult } from '../../../lib/statsTracker';

function InterviewRoomContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentQuestionObj, setCurrentQuestionObj] = useState<Question | null>(null);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(45 * 60);
  const [showCode, setShowCode] = useState(false);
  const [violations, setViolations] = useState<string[]>([]);
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [questionDifficulty, setQuestionDifficulty] = useState<'basic' | 'intermediate' | 'advanced' | 'expert'>('basic');
  const [questionType, setQuestionType] = useState<'behavioral' | 'technical' | 'coding' | 'system-design'>('behavioral');
  const [showSummary, setShowSummary] = useState(false);
  const [interviewSummary, setInterviewSummary] = useState<InterviewSummary | null>(null);
  const [activeTab, setActiveTab] = useState<'interview' | 'code'>('interview');
  const [realTimeStrengths, setRealTimeStrengths] = useState<string[]>([]);
  const [realTimeWeaknesses, setRealTimeWeaknesses] = useState<string[]>([]);
  const [answeredQuestions, setAnsweredQuestions] = useState<QuestionResult[]>([]);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [lastAnswerResult, setLastAnswerResult] = useState<QuestionResult | null>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  const role = searchParams.get('role') || 'Developer';
  const industry = searchParams.get('industry') || 'Tech';
  const experience = searchParams.get('experience') || 'mid';
  const interviewType = searchParams.get('type') || 'ai-only';
  const duration = parseInt(searchParams.get('duration') || '45');
  const languages = searchParams.get('languages')?.split(',') || ['JavaScript'];

  useEffect(() => {
    setTimeRemaining(duration * 60);
  }, [duration]);

  // Real-time feedback listener
  useEffect(() => {
    const updateRealTimeFeedback = () => {
      const strengths = feedbackEngine.getRealTimeStrengths();
      const weaknesses = feedbackEngine.getRealTimeWeaknesses();
      setRealTimeStrengths(strengths);
      setRealTimeWeaknesses(weaknesses);
    };

    const interval = setInterval(updateRealTimeFeedback, 2000);
    return () => clearInterval(interval);
  }, []);

  const startInterview = async () => {
    try {
      await document.documentElement.requestFullscreen();
      setIsFullscreen(true);
      setInterviewStarted(true);
      
      // Reset feedback engine for new session
      feedbackEngine.resetSession();
      // Start live interview tracking
      feedbackEngine.startLiveInterview(`interview_${Date.now()}`);
      // Reset question engine to prevent repetition
      questionEngine.resetUsedQuestions();
      
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            endInterview();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      generateQuestion();
    } catch (error) {
      console.error('Failed to start interview:', error);
    }
  };

  const endInterview = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setInterviewStarted(false);
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setIsFullscreen(false);
    
    // End live interview tracking
    feedbackEngine.endLiveInterview();
    
    // Generate interview summary
    const summary = feedbackEngine.generateInterviewSummary();
    setInterviewSummary(summary);
    setShowSummary(true);

    saveInterviewResult(
      summary.totalQuestions,
      summary.correctAnswers,
      summary.averageScore
    );
  };

  const generateQuestionWithParams = async (
    difficulty: 'basic' | 'intermediate' | 'advanced' | 'expert',
    type: 'behavioral' | 'technical' | 'coding' | 'system-design'
  ) => {
    setIsLoading(true);
    setShowAnswerFeedback(false);
    setLastAnswerResult(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const question = questionEngine.generateQuestion(role, industry, experience, difficulty, type);
      setCurrentQuestionObj(question);
      setCurrentQuestion(question.question);

      let responseMessage = '';
      if (question.type === 'coding') {
        responseMessage = `Here's a ${question.difficulty} level coding challenge. Take your time and think through the approach before coding.`;
        setShowCode(true);
        setActiveTab('code');
      } else if (question.type === 'system-design') {
        responseMessage = `Let's work on a system design problem. Consider scalability, reliability, and trade-offs in your answer.`;
        if (question.hints) {
          responseMessage += ` Key aspects to consider: ${question.hints.join(', ')}`;
        }
      } else if (question.type === 'behavioral') {
        responseMessage = `Please share a specific experience using the STAR method (Situation, Task, Action, Result).`;
      } else {
        responseMessage = `Take your time to think through this technical question. Provide a clear, structured answer.`;
      }

      setAiResponse(responseMessage);
    } catch (error) {
      console.error('Error generating question:', error);
      setAiResponse('Let me think of a good question for you...');
    } finally {
      setIsLoading(false);
    }
  };

  const generateQuestion = async () => {
    setIsLoading(true);
    setShowAnswerFeedback(false);
    setLastAnswerResult(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const question = questionEngine.generateQuestion(role, industry, experience, questionDifficulty, questionType);
      setCurrentQuestionObj(question);
      setCurrentQuestion(question.question);
      
      let responseMessage = '';
      
      if (question.type === 'coding') {
        responseMessage = `Here's a ${question.difficulty} level coding challenge. Take your time and think through the approach before coding.`;
        setShowCode(true);
        setActiveTab('code');
      } else if (question.type === 'system-design') {
        responseMessage = `Let's work on a system design problem. Consider scalability, reliability, and trade-offs in your answer.`;
        if (question.hints) {
          responseMessage += ` Key aspects to consider: ${question.hints.join(', ')}`;
        }
      } else if (question.type === 'behavioral') {
        responseMessage = `Please share a specific experience using the STAR method (Situation, Task, Action, Result).`;
      } else {
        responseMessage = `Take your time to think through this technical question. Provide a clear, structured answer.`;
      }
      
      setAiResponse(responseMessage);
    } catch (error) {
      console.error('Error generating question:', error);
      setAiResponse('Let me think of a good question for you...');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionAnswered = (result: QuestionResult) => {
    setAnsweredQuestions(prev => [...prev, result]);
    setLastAnswerResult(result);
    setShowAnswerFeedback(true);
    
    // Update real-time feedback
    const strengths = feedbackEngine.getRealTimeStrengths();
    const weaknesses = feedbackEngine.getRealTimeWeaknesses();
    setRealTimeStrengths(strengths);
    setRealTimeWeaknesses(weaknesses);
  };

  const handleNextQuestion = () => {
    setShowAnswerFeedback(false);
    setLastAnswerResult(null);
    generateQuestion();
  };

  const handleViolation = (violation: string) => {
    setViolations(prev => [...prev, violation]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const changeDifficulty = (newDifficulty: 'basic' | 'intermediate' | 'advanced' | 'expert') => {
    setQuestionDifficulty(newDifficulty);
    generateQuestionWithParams(newDifficulty, questionType);
  };

  const changeQuestionType = (newType: 'behavioral' | 'technical' | 'coding' | 'system-design') => {
    setQuestionType(newType);
    if (newType === 'coding') {
      setShowCode(true);
      setActiveTab('code');
    } else {
      setShowCode(false);
      setActiveTab('interview');
    }
    generateQuestionWithParams(questionDifficulty, newType);
  };

  const restartInterview = () => {
    setShowSummary(false);
    setInterviewSummary(null);
    setAnsweredQuestions([]);
    feedbackEngine.resetSession();
    questionEngine.resetUsedQuestions();
    setTimeRemaining(duration * 60);
    setActiveTab('interview');
    setRealTimeStrengths([]);
    setRealTimeWeaknesses([]);
    setShowAnswerFeedback(false);
    setLastAnswerResult(null);
    startInterview();
  };

  // Answer Feedback Modal
  if (showAnswerFeedback && lastAnswerResult) {
    const isCorrect = lastAnswerResult.validation.isCorrect;
    const score = lastAnswerResult.validation.score;
    
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-3xl w-full bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className={`p-6 ${isCorrect ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gradient-to-r from-orange-600 to-red-600'}`}>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <i className={`ri-${isCorrect ? 'check' : 'close'}-line text-white text-2xl`}></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {isCorrect ? 'Great Answer!' : 'Answer Needs Improvement'}
                </h2>
                <p className="text-white/80">Score: {score}/100</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Question Review */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-gray-400 text-sm font-medium mb-2">Question</h3>
              <p className="text-white">{lastAnswerResult.question}</p>
            </div>
            
            {/* Your Answer */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-gray-400 text-sm font-medium mb-2">Your Answer</h3>
              <p className="text-gray-300 text-sm">{lastAnswerResult.userAnswer}</p>
            </div>
            
            {/* Correct Answer */}
            <div className="bg-green-900/20 border border-green-600 rounded-lg p-4">
              <h3 className="text-green-400 font-semibold mb-2">
                <i className="ri-lightbulb-line mr-2"></i>
                Correct Answer & Explanation
              </h3>
              <p className="text-gray-300 text-sm mb-3">{lastAnswerResult.validation.correctAnswer}</p>
              
              {/* How to Answer Better */}
              {!isCorrect && (
                <div className="mt-3 pt-3 border-t border-green-600/30">
                  <h4 className="text-green-400 text-sm font-medium mb-2">How to Answer This Better:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    {lastAnswerResult.validation.missedPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start">
                        <i className="ri-arrow-right-line text-green-400 mr-2 mt-0.5"></i>
                        Include: {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Key Points Covered */}
            {lastAnswerResult.validation.keyPointsCovered.length > 0 && (
              <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-4">
                <h3 className="text-blue-400 font-semibold mb-2">
                  <i className="ri-check-line mr-2"></i>
                  Key Points You Covered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {lastAnswerResult.validation.keyPointsCovered.map((point, idx) => (
                    <span key={idx} className="bg-blue-600/30 text-blue-200 px-3 py-1 rounded-full text-sm">
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Feedback */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-gray-400 text-sm font-medium mb-2">Feedback</h3>
              <p className="text-gray-300">{lastAnswerResult.validation.feedback}</p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                onClick={handleNextQuestion}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors whitespace-nowrap font-medium"
              >
                <i className="ri-arrow-right-line mr-2"></i>
                Next Question
              </button>
              <button
                onClick={endInterview}
                className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap"
              >
                End Interview
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Interview Summary Modal
  if (showSummary && interviewSummary) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
            <h1 className="text-3xl font-bold text-white mb-2">Interview Complete!</h1>
            <p className="text-indigo-100">Here's your comprehensive performance summary</p>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">{interviewSummary.totalQuestions}</div>
                <div className="text-gray-400 text-sm">Total Questions</div>
              </div>
              <div className="bg-green-900/30 rounded-lg p-4 text-center border border-green-600">
                <div className="text-2xl font-bold text-green-400">{interviewSummary.correctAnswers}</div>
                <div className="text-gray-400 text-sm">Correct Answers</div>
              </div>
              <div className="bg-red-900/30 rounded-lg p-4 text-center border border-red-600">
                <div className="text-2xl font-bold text-red-400">{interviewSummary.incorrectAnswers}</div>
                <div className="text-gray-400 text-sm">Incorrect Answers</div>
              </div>
              <div className="bg-blue-900/30 rounded-lg p-4 text-center border border-blue-600">
                <div className="text-2xl font-bold text-blue-400">{interviewSummary.averageScore}%</div>
                <div className="text-gray-400 text-sm">Average Score</div>
              </div>
            </div>

            {/* Real-time Strengths and Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-900/20 rounded-lg p-4 border border-green-600">
                <h3 className="text-lg font-semibold text-green-400 mb-3">
                  <i className="ri-trophy-line mr-2"></i>
                  Strengths Identified
                </h3>
                <ul className="space-y-2">
                  {interviewSummary.realTimeStrengths.map((strength, index) => (
                    <li key={index} className="text-gray-300 flex items-start">
                      <i className="ri-check-line text-green-400 mr-2 mt-1"></i>
                      {strength}
                    </li>
                  ))}
                  {interviewSummary.realTimeStrengths.length === 0 && (
                    <li className="text-gray-400 italic">Continue practicing to identify strengths</li>
                  )}
                </ul>
              </div>
              
              <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-600">
                <h3 className="text-lg font-semibold text-orange-400 mb-3">
                  <i className="ri-focus-line mr-2"></i>
                  Areas Needing Attention
                </h3>
                <ul className="space-y-2">
                  {interviewSummary.realTimeWeaknesses.map((weakness, index) => (
                    <li key={index} className="text-gray-300 flex items-start">
                      <i className="ri-arrow-right-line text-orange-400 mr-2 mt-1"></i>
                      {weakness}
                    </li>
                  ))}
                  {interviewSummary.realTimeWeaknesses.length === 0 && (
                    <li className="text-gray-400 italic">Great job! No major weaknesses identified</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Category Performance Breakdown */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-white mb-4">
                <i className="ri-bar-chart-line mr-2"></i>
                Performance by Category
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(interviewSummary.categoryBreakdown).map(([category, data]) => (
                  <div key={category} className="bg-gray-600 rounded-lg p-3">
                    <h4 className="text-white font-semibold capitalize mb-2">{category}</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Correct:</span>
                        <span className="text-green-400">{data.correct}/{data.total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Avg Score:</span>
                        <span className={`${data.avgScore >= 70 ? 'text-green-400' : data.avgScore >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                          {data.avgScore}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Overall Feedback */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-white mb-3">Overall Feedback</h3>
              <p className="text-gray-300">{interviewSummary.overallFeedback}</p>
            </div>

            {/* Incorrect Questions Review */}
            {interviewSummary.questionResults.filter(r => !r.validation.isCorrect).length > 0 && (
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-white mb-4">Questions to Review</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {interviewSummary.questionResults
                    .filter(result => !result.validation.isCorrect)
                    .map((result, index) => (
                      <div key={index} className="bg-red-900/20 rounded-lg p-4 border border-red-600">
                        <div className="mb-2">
                          <h4 className="text-red-400 font-semibold">Question {index + 1}</h4>
                          <p className="text-gray-300 text-sm mt-1">{result.question}</p>
                        </div>
                        
                        <div className="mb-3">
                          <h5 className="text-gray-400 font-semibold text-sm">Your Answer:</h5>
                          <p className="text-gray-300 text-sm bg-gray-800 rounded p-2 mt-1">
                            {result.userAnswer}
                          </p>
                        </div>
                        
                        <div className="mb-3">
                          <h5 className="text-green-400 font-semibold text-sm">Correct Answer:</h5>
                          <p className="text-gray-300 text-sm bg-green-900/20 rounded p-2 mt-1">
                            {result.validation.correctAnswer}
                          </p>
                        </div>
                        
                        <div className="text-xs text-gray-400">
                          <span>Score: {result.validation.score}/100</span>
                          <span className="mx-2">•</span>
                          <span>Time: {result.timeSpent}s</span>
                        </div>
                        
                        {result.validation.missedPoints.length > 0 && (
                          <div className="mt-2">
                            <h5 className="text-orange-400 font-semibold text-sm">Key Points Missed:</h5>
                            <ul className="text-xs text-gray-400 mt-1">
                              {result.validation.missedPoints.map((point, pointIndex) => (
                                <li key={pointIndex}>• {point}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4 border-t border-gray-600">
              <button
                onClick={restartInterview}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
              >
                <i className="ri-refresh-line mr-2"></i>
                Try Again
              </button>
              <Link
                href="/dashboard"
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors text-center whitespace-nowrap"
              >
                <i className="ri-dashboard-line mr-2"></i>
                Back to Dashboard
              </Link>
              <Link
                href="/practice"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors text-center whitespace-nowrap"
              >
                <i className="ri-book-line mr-2"></i>
                Practice More
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!interviewStarted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg text-center">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{t('readyToStart')}</h1>
            <LanguageSelector />
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-medium">Role:</span>
              <span>{role}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-medium">Industry:</span>
              <span>{industry}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-medium">Duration:</span>
              <span>{duration} minutes</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-medium">Languages:</span>
              <span>{languages.join(', ')}</span>
            </div>
          </div>
          
          <div className="mb-8 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">Important Notes:</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• The interview will enter fullscreen mode</li>
              <li>• Tab switching will be monitored</li>
              <li>• Face tracking will be active</li>
              <li>• Screen recording will begin</li>
              <li>• Real-time feedback will be provided</li>
              <li>• Speech-to-text is available for voice responses</li>
              <li>• Answers will be validated with correct solutions</li>
              <li>• Questions will not repeat during the session</li>
              <li>• Strengths and weaknesses will be tracked in real-time</li>
            </ul>
          </div>

          <div className="flex gap-4 justify-center">
            <Link
              href="/interview/setup"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              {t('back')} to Setup
            </Link>
            <button
              onClick={startInterview}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap"
            >
              {t('startInterview')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="font-semibold">InterviewAI</span>
          <span className="text-sm text-gray-300">|</span>
          <span className="text-sm text-gray-300">{role} - {industry}</span>
          <LanguageSelector />
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-300">{t('timeRemaining')}:</span>
          <span className={`font-mono text-lg ${timeRemaining < 300 ? 'text-red-400' : 'text-green-400'}`}>
            {formatTime(timeRemaining)}
          </span>
          <button
            onClick={endInterview}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm whitespace-nowrap"
          >
            {t('endInterview')}
          </button>
        </div>
      </div>

      <AntiCheatMonitor onViolation={handleViolation} />

      {/* Progress Bar */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-gray-300 text-sm">
              Question {answeredQuestions.length + 1} • {questionType.charAt(0).toUpperCase() + questionType.slice(1)}
            </span>
            <span className={`px-2 py-0.5 rounded text-xs ${
              questionDifficulty === 'basic' ? 'bg-green-600 text-white' :
              questionDifficulty === 'intermediate' ? 'bg-yellow-600 text-white' :
              questionDifficulty === 'advanced' ? 'bg-orange-600 text-white' :
              'bg-red-600 text-white'
            }`}>
              {questionDifficulty}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm">Answered: {answeredQuestions.length}</span>
            {answeredQuestions.length > 0 && (
              <span className="text-gray-400 text-sm">
                Avg: {Math.round(answeredQuestions.reduce((acc, q) => acc + q.validation.score, 0) / answeredQuestions.length)}%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Real-time Feedback Panel */}
      <div className="bg-gray-800 border-b border-gray-700 p-3">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h3 className="text-white font-semibold text-sm mb-2">Real-time Performance Analysis</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-green-400 text-xs font-semibold mb-1">
                  <i className="ri-trophy-line mr-1"></i>
                  Current Strengths ({realTimeStrengths.length})
                </h4>
                <div className="space-y-1 max-h-16 overflow-y-auto">
                  {realTimeStrengths.slice(-3).map((strength, index) => (
                    <div key={index} className="text-xs text-green-300 flex items-start">
                      <i className="ri-check-line mr-1 mt-0.5 text-green-400"></i>
                      {strength}
                    </div>
                  ))}
                  {realTimeStrengths.length === 0 && (
                    <div className="text-xs text-gray-400 italic">Strengths will appear as you answer questions</div>
                  )}
                </div>
              </div>
              <div>
                <h4 className="text-orange-400 text-xs font-semibold mb-1">
                  <i className="ri-focus-line mr-1"></i>
                  Areas to Improve ({realTimeWeaknesses.length})
                </h4>
                <div className="space-y-1 max-h-16 overflow-y-auto">
                  {realTimeWeaknesses.slice(-3).map((weakness, index) => (
                    <div key={index} className="text-xs text-orange-300 flex items-start">
                      <i className="ri-arrow-right-line mr-1 mt-0.5 text-orange-400"></i>
                      {weakness}
                    </div>
                  ))}
                  {realTimeWeaknesses.length === 0 && (
                    <div className="text-xs text-gray-400 italic">Keep up the good work!</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="flex">
          <button
            onClick={() => setActiveTab('interview')}
            className={`px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'interview'
                ? 'bg-indigo-600 text-white border-b-2 border-indigo-400'
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            <i className="ri-chat-3-line mr-2"></i>
            Interview Chat
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'code'
                ? 'bg-indigo-600 text-white border-b-2 border-indigo-400'
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
            disabled={!showCode}
          >
            <i className="ri-code-line mr-2"></i>
            Code Editor
            {!showCode && <span className="ml-1 text-xs">(Select coding question)</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {activeTab === 'interview' ? (
          <>
            {/* Left Side - Video & Controls */}
            <div className="w-1/3 bg-gray-800 flex flex-col border-r border-gray-700">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-white font-semibold mb-3">{t('aiInterviewer')}</h2>
                
                {/* Question Type Selector */}
                <div className="flex space-x-1 mb-3">
                  <button
                    onClick={() => changeQuestionType('behavioral')}
                    className={`px-2 py-1 rounded text-xs whitespace-nowrap transition-colors ${
                      questionType === 'behavioral' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    Behavioral
                  </button>
                  <button
                    onClick={() => changeQuestionType('technical')}
                    className={`px-2 py-1 rounded text-xs whitespace-nowrap transition-colors ${
                      questionType === 'technical' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    Technical
                  </button>
                  <button
                    onClick={() => changeQuestionType('coding')}
                    className={`px-2 py-1 rounded text-xs whitespace-nowrap transition-colors ${
                      questionType === 'coding' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    Coding
                  </button>
                  <button
                    onClick={() => changeQuestionType('system-design')}
                    className={`px-2 py-1 rounded text-xs whitespace-nowrap transition-colors ${
                      questionType === 'system-design' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    System Design
                  </button>
                </div>

                {/* Difficulty Selector */}
                <div className="flex space-x-1 mb-2">
                  <button
                    onClick={() => changeDifficulty('basic')}
                    className={`px-2 py-1 rounded text-xs whitespace-nowrap transition-colors ${
                      questionDifficulty === 'basic' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    Basic
                  </button>
                  <button
                    onClick={() => changeDifficulty('intermediate')}
                    className={`px-2 py-1 rounded text-xs whitespace-nowrap transition-colors ${
                      questionDifficulty === 'intermediate' ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    Intermediate
                  </button>
                  <button
                    onClick={() => changeDifficulty('advanced')}
                    className={`px-2 py-1 rounded text-xs whitespace-nowrap transition-colors ${
                      questionDifficulty === 'advanced' ? 'bg-orange-600 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    Advanced
                  </button>
                  <button
                    onClick={() => changeDifficulty('expert')}
                    className={`px-2 py-1 rounded text-xs whitespace-nowrap transition-colors ${
                      questionDifficulty === 'expert' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    Expert
                  </button>
                </div>
              </div>
              
              <VideoCall />
            </div>

            {/* Right Side - Chat */}
            <div className="flex-1 bg-gray-900">
              <AIInterviewer
                question={currentQuestion}
                response={aiResponse}
                isLoading={isLoading}
                onNewQuestion={generateQuestion}
                role={role}
                industry={industry}
                experience={experience}
                currentQuestionObj={currentQuestionObj}
                onQuestionAnswered={handleQuestionAnswered}
              />
            </div>
          </>
        ) : (
          // Code Editor Tab
          <div className="flex-1 bg-gray-900">
            {showCode && currentQuestionObj?.type === 'coding' ? (
              <div className="h-full flex flex-col">
                {/* Question Details */}
                <div className="bg-gray-800 p-4 border-b border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-semibold">{currentQuestionObj.question}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        currentQuestionObj.difficulty === 'basic' ? 'bg-green-600 text-white' :
                        currentQuestionObj.difficulty === 'intermediate' ? 'bg-yellow-600 text-white' :
                        currentQuestionObj.difficulty === 'advanced' ? 'bg-orange-600 text-white' :
                        'bg-red-600 text-white'
                      }`}>
                        {currentQuestionObj.difficulty}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {currentQuestionObj.timeLimit}min
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{currentQuestionObj.category}</p>
                  
                  {/* Test Cases Preview */}
                  {currentQuestionObj.testCases && (
                    <div className="mt-3">
                      <h4 className="text-gray-300 text-xs font-semibold mb-1">Test Cases:</h4>
                      <div className="space-y-1">
                        {currentQuestionObj.testCases.slice(0, 2).map((testCase, index) => (
                          <div key={index} className="text-xs text-gray-400">
                            <span className="text-gray-300">Input:</span> {JSON.stringify(testCase.input)} 
                            <span className="text-gray-300 ml-2">Expected:</span> {JSON.stringify(testCase.expected)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <CodeEditor
                  languages={languages}
                  onCodeChange={(code) => console.log('Code changed:', code)}
                  initialCode={currentQuestionObj.codeTemplate}
                />
              </div>
            ) : (
              <div className="h-full flex flex-col justify-center items-center text-gray-400">
                <i className="ri-code-line text-6xl mb-4"></i>
                <p className="text-lg">Select a coding question to activate the code editor</p>
                <p className="text-sm mt-2">Click "Coding" in the question type selector to get coding challenges</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Violations Alert */}
      {violations.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg max-w-sm">
          <h3 className="font-semibold mb-2">Security Violations Detected</h3>
          <ul className="text-sm space-y-1">
            {violations.slice(-3).map((violation, index) => (
              <li key={index}>• {violation}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function InterviewRoom() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">Loading interview room...</div>}>
      <InterviewRoomContent />
    </Suspense>
  );
}

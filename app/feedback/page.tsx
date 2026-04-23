
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Mock detailed feedback data - in real app this would come from database
const mockDetailedFeedback = [
  {
    sessionId: 'session_1',
    role: 'Frontend Developer',
    company: 'TechCorp',
    date: '2024-01-15',
    duration: '45 min',
    overallScore: 85,
    categoryScores: {
      technical: 88,
      communication: 82,
      problemSolving: 85,
      codeQuality: 87,
      behavioral: 84
    },
    strengths: [
      'Strong React and JavaScript knowledge',
      'Clear explanation of technical concepts',
      'Good problem-solving approach',
      'Well-structured code solutions'
    ],
    improvements: [
      'Could improve algorithm complexity analysis',
      'Practice system design concepts',
      'Work on explaining trade-offs between solutions'
    ],
    detailedAnalysis: [
      {
        questionId: 'q1',
        question: 'Explain the difference between let, const, and var in JavaScript',
        response: 'Let and const are block-scoped while var is function-scoped. Const cannot be reassigned after declaration, let can be reassigned but not redeclared in the same scope...',
        score: 92,
        feedback: 'Excellent understanding of JavaScript scope and variable declarations. Clear explanation with good examples.',
        category: 'technical',
        timeSpent: 180
      },
      {
        questionId: 'q2',
        question: 'How would you optimize a React component that re-renders frequently?',
        response: 'I would use React.memo to prevent unnecessary re-renders, optimize props passing, use useCallback for functions...',
        score: 85,
        feedback: 'Good knowledge of React optimization techniques. Consider mentioning useMemo for expensive calculations.',
        category: 'technical',
        timeSpent: 240
      },
      {
        questionId: 'q3',
        question: 'Tell me about a challenging project you worked on',
        response: 'I worked on a real-time chat application that needed to handle thousands of concurrent users...',
        score: 88,
        feedback: 'Great example with clear problem statement and solution approach. Good communication skills.',
        category: 'behavioral',
        timeSpent: 300
      }
    ],
    recommendations: [
      'Continue practicing algorithmic problems on LeetCode',
      'Study system design patterns for scalable applications',
      'Build more projects showcasing full-stack capabilities',
      'Practice explaining technical decisions and trade-offs'
    ]
  },
  {
    sessionId: 'session_2',
    role: 'Full Stack Developer',
    company: 'StartupXYZ',
    date: '2024-01-12',
    duration: '60 min',
    overallScore: 78,
    categoryScores: {
      technical: 75,
      communication: 80,
      problemSolving: 78,
      codeQuality: 79,
      behavioral: 82
    },
    strengths: [
      'Versatile technology stack knowledge',
      'Clear communication style',
      'Good understanding of web development principles',
      'Collaborative mindset'
    ],
    improvements: [
      'Deepen backend architecture knowledge',
      'Practice database optimization techniques',
      'Improve code documentation habits',
      'Study microservices patterns'
    ],
    detailedAnalysis: [
      {
        questionId: 'q1',
        question: 'How would you design a RESTful API for a blog platform?',
        response: 'I would start with identifying the main resources like posts, users, comments. Then define endpoints like GET /posts, POST /posts...',
        score: 82,
        feedback: 'Good understanding of REST principles. Consider discussing authentication and pagination.',
        category: 'technical',
        timeSpent: 420
      },
      {
        questionId: 'q2',
        question: 'Explain database indexing and when to use it',
        response: 'Database indexes speed up query performance by creating a data structure that points to the actual data...',
        score: 74,
        feedback: 'Basic understanding shown. Could elaborate on different types of indexes and their trade-offs.',
        category: 'technical',
        timeSpent: 280
      }
    ],
    recommendations: [
      'Focus on backend system design concepts',
      'Practice database design and optimization',
      'Study cloud architecture patterns',
      'Build end-to-end projects with proper deployment'
    ]
  }
];

export default function FeedbackPage() {
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [filter, setFilter] = useState('all');

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const filteredFeedback = mockDetailedFeedback.filter(feedback => {
    if (filter === 'all') return true;
    if (filter === 'passed') return feedback.overallScore >= 70;
    if (filter === 'failed') return feedback.overallScore < 70;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <Link href="/" className="text-2xl font-bold font-['Pacifico']">
              InterviewAI
            </Link>
            <nav className="flex items-center space-x-8">
              <Link href="/dashboard" className="text-blue-100 hover:text-white transition-colors text-xl font-medium">Dashboard</Link>
              <Link href="/practice" className="text-blue-100 hover:text-white transition-colors text-xl font-medium">Practice</Link>
              <Link href="/leaderboard" className="text-blue-100 hover:text-white transition-colors text-xl font-medium">Leaderboard</Link>
              <Link href="/profile" className="text-blue-100 hover:text-white transition-colors text-xl font-medium">Profile</Link>
              <Link href="/auth/login" className="text-blue-100 hover:text-white transition-colors text-xl font-medium">Login</Link>
              <Link href="/auth/signup" className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors whitespace-nowrap text-xl">Sign Up</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-bold text-gray-900">Interview Feedback</h1>
            <p className="text-2xl text-gray-600 mt-2">Detailed analysis of your interview performance</p>
          </div>
          <div className="flex space-x-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg pr-8"
            >
              <option value="all">All Interviews</option>
              <option value="passed">Passed Only</option>
              <option value="failed">Needs Improvement</option>
            </select>
          </div>
        </div>

        {!selectedFeedback ? (
          /* Feedback List */
          <div className="space-y-6">
            {filteredFeedback.map((feedback, index) => (
              <motion.div
                key={feedback.sessionId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{feedback.role}</h3>
                    <p className="text-lg text-gray-600">{feedback.company} • {feedback.date} • {feedback.duration}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-4xl font-bold ${getScoreColor(feedback.overallScore)}`}>
                      {feedback.overallScore}%
                    </div>
                    <div className="text-sm text-gray-500">Overall Score</div>
                  </div>
                </div>

                {/* Category Scores Preview */}
                <div className="grid grid-cols-5 gap-4 mb-6">
                  {Object.entries(feedback.categoryScores).map(([category, score]) => (
                    <div key={category} className="text-center">
                      <div className={`text-xl font-bold ${getScoreColor(score as number)}`}>
                        {score}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {category.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Top Strengths:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {feedback.strengths.slice(0, 2).map((strength, idx) => (
                        <li key={idx}>• {strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-700 mb-2">Key Improvements:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {feedback.improvements.slice(0, 2).map((improvement, idx) => (
                        <li key={idx}>• {improvement}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedFeedback(feedback)}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors text-lg"
                >
                  View Detailed Analysis
                </button>
              </motion.div>
            ))}

            {filteredFeedback.length === 0 && (
              <div className="text-center py-12">
                <i className="ri-file-list-line text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-2xl font-medium text-gray-600 mb-2">No feedback found</h3>
                <p className="text-lg text-gray-500">Complete some interviews to see detailed feedback here.</p>
                <Link
                  href="/interview/setup"
                  className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Start Your First Interview
                </Link>
              </div>
            )}
          </div>
        ) : (
          /* Detailed Feedback View */
          <div className="bg-white rounded-xl shadow-sm border border-blue-100">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{selectedFeedback.role}</h2>
                  <p className="text-lg text-gray-600">{selectedFeedback.company} • {selectedFeedback.date}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className={`text-5xl font-bold ${getScoreColor(selectedFeedback.overallScore)}`}>
                      {selectedFeedback.overallScore}%
                    </div>
                    <div className="text-sm text-gray-500">Overall Score</div>
                  </div>
                  <button
                    onClick={() => setSelectedFeedback(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <i className="ri-close-line text-3xl"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'overview', name: 'Overview', icon: 'ri-dashboard-line' },
                  { id: 'questions', name: 'Question Analysis', icon: 'ri-question-line' },
                  { id: 'recommendations', name: 'Recommendations', icon: 'ri-lightbulb-line' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-4 px-1 border-b-2 font-medium text-lg ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <i className={`${tab.icon} mr-2`}></i>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Category Scores */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Performance Breakdown</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                      {Object.entries(selectedFeedback.categoryScores).map(([category, score]) => (
                        <div key={category} className="text-center">
                          <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-2xl font-bold ${getScoreBgColor(score as number)} ${getScoreColor(score as number)}`}>
                            {score}
                          </div>
                          <h4 className="mt-3 font-medium text-gray-900 capitalize">
                            {category.replace(/([A-Z])/g, ' $1').trim()}
                          </h4>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strengths and Improvements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-green-700 mb-4">Strengths</h3>
                      <ul className="space-y-3">
                        {selectedFeedback.strengths.map((strength: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <i className="ri-check-circle-fill text-green-500 mr-3 mt-1"></i>
                            <span className="text-gray-700">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-orange-700 mb-4">Areas for Improvement</h3>
                      <ul className="space-y-3">
                        {selectedFeedback.improvements.map((improvement: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <i className="ri-arrow-up-circle-fill text-orange-500 mr-3 mt-1"></i>
                            <span className="text-gray-700">{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'questions' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">Question-by-Question Analysis</h3>
                  {selectedFeedback.detailedAnalysis.map((analysis: any, index: number) => (
                    <div key={analysis.questionId} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900">Question {index + 1}</h4>
                          <p className="text-gray-700 mt-1">{analysis.question}</p>
                        </div>
                        <div className="text-right ml-4">
                          <div className={`text-2xl font-bold ${getScoreColor(analysis.score)}`}>
                            {analysis.score}%
                          </div>
                          <div className="text-sm text-gray-500">{Math.floor(analysis.timeSpent / 60)}m {analysis.timeSpent % 60}s</div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h5 className="font-medium text-gray-900 mb-2">Your Response:</h5>
                        <p className="text-gray-600 italic bg-gray-50 p-3 rounded">
                          "{analysis.response}"
                        </p>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Feedback:</h5>
                        <p className="text-gray-700">{analysis.feedback}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'recommendations' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Personalized Recommendations</h3>
                  <div className="space-y-4">
                    {selectedFeedback.recommendations.map((recommendation: string, index: number) => (
                      <div key={index} className="flex items-start p-4 bg-blue-50 rounded-lg">
                        <i className="ri-lightbulb-line text-blue-500 mr-3 mt-1"></i>
                        <span className="text-gray-700">{recommendation}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Next Steps</h4>
                    <div className="space-y-3">
                      <Link
                        href="/practice"
                        className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
                      >
                        Practice More Questions
                      </Link>
                      <Link
                        href="/interview/setup"
                        className="block w-full bg-white text-blue-600 border border-blue-600 py-3 px-6 rounded-lg font-medium hover:bg-blue-50 transition-colors text-center"
                      >
                        Schedule Another Interview
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

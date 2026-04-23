'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { feedbackEngine, LiveInterviewData } from '../../lib/feedbackEngine';
import { getStats } from '../../lib/statsTracker';
import { useAuth } from '../../lib/authContext';

// Enhanced mock data with real-time features
const mockInterviewHistory = [
  {
    id: 1,
    role: 'Frontend Developer',
    company: 'TechCorp',
    date: '2024-01-15',
    score: 85,
    status: 'Passed',
    duration: '45 min',
    questionsAnswered: 12,
    correctAnswers: 10,
    realTimeStrengths: ['Strong React knowledge', 'Excellent problem-solving approach', 'Good communication skills'],
    realTimeWeaknesses: ['Could improve algorithm complexity analysis'],
    categoryBreakdown: {
      behavioral: { correct: 3, total: 4, avgScore: 82 },
      technical: { correct: 4, total: 4, avgScore: 88 },
      coding: { correct: 2, total: 3, avgScore: 85 },
      systemDesign: { correct: 1, total: 1, avgScore: 90 }
    },
    feedback: {
      technical: 88,
      communication: 82,
      problemSolving: 85,
      codeQuality: 87,
      strengths: ['Strong React knowledge', 'Good problem-solving approach'],
      improvements: ['Could improve algorithm complexity analysis', 'Practice system design']
    }
  },
  {
    id: 2,
    role: 'Full Stack Developer',
    company: 'StartupXYZ',
    date: '2024-01-12',
    score: 78,
    status: 'Passed',
    duration: '60 min',
    questionsAnswered: 15,
    correctAnswers: 11,
    realTimeStrengths: ['Versatile technology stack', 'Clear communication', 'Quick learning ability'],
    realTimeWeaknesses: ['Backend architecture knowledge', 'Database optimization'],
    categoryBreakdown: {
      behavioral: { correct: 3, total: 4, avgScore: 75 },
      technical: { correct: 3, total: 5, avgScore: 72 },
      coding: { correct: 4, total: 5, avgScore: 80 },
      systemDesign: { correct: 1, total: 1, avgScore: 85 }
    },
    feedback: {
      technical: 75,
      communication: 80,
      problemSolving: 78,
      codeQuality: 79,
      strengths: ['Versatile technology stack', 'Clear communication'],
      improvements: ['Deepen backend architecture knowledge', 'Practice database optimization']
    }
  },
  {
    id: 3,
    role: 'Backend Developer',
    company: 'Enterprise Inc',
    date: '2024-01-10',
    score: 92,
    status: 'Passed',
    duration: '50 min',
    questionsAnswered: 10,
    correctAnswers: 9,
    realTimeStrengths: ['Excellent system design skills', 'Strong database knowledge', 'Great code quality', 'Leadership potential'],
    realTimeWeaknesses: [],
    categoryBreakdown: {
      behavioral: { correct: 2, total: 2, avgScore: 90 },
      technical: { correct: 4, total: 4, avgScore: 95 },
      coding: { correct: 2, total: 3, avgScore: 88 },
      systemDesign: { correct: 1, total: 1, avgScore: 98 }
    },
    feedback: {
      technical: 95,
      communication: 88,
      problemSolving: 92,
      codeQuality: 94,
      strengths: ['Excellent system design skills', 'Strong database knowledge', 'Great code quality'],
      improvements: ['Continue building leadership skills']
    }
  }
];

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);
  const [liveInterviewData, setLiveInterviewData] = useState<LiveInterviewData | null>(null);
  const [stats, setStats] = useState({
    totalInterviews: 0,
    passRate: 85,
    avgScore: 0,
    streak: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    avgTimePerQuestion: 3.2,
    strongestCategory: 'Technical',
    weakestCategory: 'System Design'
  });

  const [achievements, setAchievements] = useState([
    { id: 1, name: 'First Interview', icon: '🏆', earned: true },
    { id: 2, name: 'Code Master', icon: '💻', earned: true },
    { id: 3, name: 'Perfect Score', icon: '⭐', earned: false },
    { id: 4, name: 'Speed Demon', icon: '⚡', earned: true },
    { id: 5, name: 'Communication Pro', icon: '🗣️', earned: true },
    { id: 6, name: 'Problem Solver', icon: '🧩', earned: false }
  ]);

  const [recentActivity, setRecentActivity] = useState([
    { type: 'interview', message: 'Completed Frontend Developer interview', time: '2 hours ago', score: 85 },
    { type: 'practice', message: 'Practiced coding challenges', time: '1 day ago', score: null },
    { type: 'achievement', message: 'Earned "Communication Pro" badge', time: '2 days ago', score: null },
    { type: 'interview', message: 'Completed Full Stack Developer interview', time: '3 days ago', score: 78 }
  ]);

  // Real-time interview data listener
  useEffect(() => {
    const handleLiveData = (data: LiveInterviewData) => {
      setLiveInterviewData(data);
    };

    feedbackEngine.addLiveDataListener(handleLiveData);

    return () => {
      feedbackEngine.removeLiveDataListener(handleLiveData);
    };
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    const loadStats = () => {
      const saved = getStats();
      setStats(prev => ({
        ...prev,
        totalInterviews: saved.totalInterviews,
        totalQuestions: saved.totalQuestionsAttempted,
        correctAnswers: saved.totalCorrectAnswers,
        avgScore: saved.avgScore,
        streak: saved.streak,
        passRate: saved.totalQuestionsAttempted > 0
          ? Math.round((saved.totalCorrectAnswers / saved.totalQuestionsAttempted) * 100)
          : 0
      }));
    };

    loadStats();

    const handleStorage = () => loadStats();
    window.addEventListener('storage', handleStorage);

    const interval = setInterval(loadStats, 3000);

    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);

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

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

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
              <Link href="/dashboard" className="text-white text-xl font-medium">Dashboard</Link>
              <Link href="/practice" className="text-blue-100 hover:text-white transition-colors text-xl font-medium">Practice</Link>
              <Link href="/leaderboard" className="text-blue-100 hover:text-white transition-colors text-xl font-medium">Leaderboard</Link>
              {isAuthenticated ? (
                <>
                  <Link href="/profile" className="text-blue-100 hover:text-white transition-colors text-xl font-medium">
                    {user?.name || 'Profile'}
                  </Link>
                  <button
                    onClick={logout}
                    className="text-blue-100 hover:text-white transition-colors text-xl font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="text-blue-100 hover:text-white transition-colors text-xl font-medium">Login</Link>
                  <Link href="/auth/signup" className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors whitespace-nowrap text-xl">Sign Up</Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'Guest'}!
          </h1>
          <p className="text-2xl text-gray-600">Ready to ace your next interview?</p>
        </div>

        {/* Live Interview Status */}
        {liveInterviewData && liveInterviewData.isActive && (
          <div className="mb-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  <i className="ri-live-line mr-2"></i>
                  Live Interview in Progress
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="opacity-80">Questions:</span>
                    <div className="font-semibold">{liveInterviewData.currentQuestion}/{liveInterviewData.totalQuestions}</div>
                  </div>
                  <div>
                    <span className="opacity-80">Current Score:</span>
                    <div className="font-semibold">{liveInterviewData.currentScore}%</div>
                  </div>
                  <div>
                    <span className="opacity-80">Time Elapsed:</span>
                    <div className="font-semibold">{formatTime(liveInterviewData.timeElapsed)}</div>
                  </div>
                  <div>
                    <span className="opacity-80">Strengths Found:</span>
                    <div className="font-semibold">{liveInterviewData.strengths.length}</div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse mb-2"></div>
                <span className="text-sm opacity-80">LIVE</span>
              </div>
            </div>
            
            {/* Live Strengths and Weaknesses */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">
                  <i className="ri-trophy-line mr-1"></i>
                  Current Strengths
                </h4>
                <div className="space-y-1">
                  {liveInterviewData.strengths.slice(-3).map((strength, index) => (
                    <div key={index} className="text-sm bg-white/20 rounded px-2 py-1">
                      {strength}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">
                  <i className="ri-focus-line mr-1"></i>
                  Areas to Improve
                </h4>
                <div className="space-y-1">
                  {liveInterviewData.weaknesses.slice(-3).map((weakness, index) => (
                    <div key={index} className="text-sm bg-white/20 rounded px-2 py-1">
                      {weakness}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg text-gray-600 mb-1">Total Interviews</p>
                <p className="text-4xl font-bold text-blue-600">{stats.totalInterviews}</p>
                <p className="text-sm text-gray-500 mt-1">{stats.totalQuestions} questions total</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-file-list-line text-blue-600 text-2xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg text-gray-600 mb-1">Success Rate</p>
                <p className="text-4xl font-bold text-green-600">{stats.passRate}%</p>
                <p className="text-sm text-gray-500 mt-1">{stats.correctAnswers}/{stats.totalQuestions} correct</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-check-line text-green-600 text-2xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg text-gray-600 mb-1">Average Score</p>
                <p className="text-4xl font-bold text-orange-600">{stats.avgScore.toFixed(1)}</p>
                <p className="text-sm text-gray-500 mt-1">{stats.avgTimePerQuestion}min avg/question</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <i className="ri-bar-chart-line text-orange-600 text-2xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg text-gray-600 mb-1">Current Streak</p>
                <p className="text-4xl font-bold text-purple-600">{stats.streak}</p>
                <p className="text-sm text-gray-500 mt-1">Strongest: {stats.strongestCategory}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="ri-fire-line text-purple-600 text-2xl"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Interviews with Real-time Data */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-blue-100">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-900">Recent Interviews</h2>
                <Link 
                  href="/feedback" 
                  className="text-blue-600 hover:text-blue-700 font-medium text-lg"
                >
                  View All Feedback
                </Link>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {mockInterviewHistory.map((interview) => (
                    <div key={interview.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${interview.status === 'Passed' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <div>
                            <h3 className="font-medium text-gray-900 text-lg">{interview.role}</h3>
                            <p className="text-lg text-gray-600">{interview.company} • {interview.duration}</p>
                          </div>
                        </div>
                        <div className="text-right flex items-center space-x-4">
                          <div>
                            <p className="font-semibold text-gray-900 text-lg">{interview.score}%</p>
                            <p className="text-sm text-gray-600">{interview.questionsAnswered} questions</p>
                          </div>
                          <button
                            onClick={() => setSelectedFeedback(interview)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                          >
                            View Details
                          </button>
                        </div>
                      </div>

                      {/* Real-time Performance Indicators */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 pt-3 border-t border-gray-200">
                        <div>
                          <h4 className="text-sm font-semibold text-green-700 mb-1">
                            <i className="ri-trophy-line mr-1"></i>
                            Strengths Identified ({interview.realTimeStrengths.length})
                          </h4>
                          <div className="space-y-1">
                            {interview.realTimeStrengths.slice(0, 2).map((strength, index) => (
                              <div key={index} className="text-xs text-green-600 bg-green-50 rounded px-2 py-1">
                                {strength}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-orange-700 mb-1">
                            <i className="ri-focus-line mr-1"></i>
                            Improvement Areas ({interview.realTimeWeaknesses.length})
                          </h4>
                          <div className="space-y-1">
                            {interview.realTimeWeaknesses.slice(0, 2).map((weakness, index) => (
                              <div key={index} className="text-xs text-orange-600 bg-orange-50 rounded px-2 py-1">
                                {weakness}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Category Performance */}
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Category Performance</h4>
                        <div className="grid grid-cols-4 gap-2">
                          {Object.entries(interview.categoryBreakdown).map(([category, data]) => (
                            <div key={category} className="text-center">
                              <div className="text-xs text-gray-600 capitalize">{category}</div>
                              <div className={`text-sm font-semibold ${getScoreColor(data.avgScore)}`}>
                                {data.correct}/{data.total}
                              </div>
                              <div className="text-xs text-gray-500">{data.avgScore}%</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link href="/interview/setup" className="w-full bg-blue-600 text-white py-4 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center whitespace-nowrap text-xl">
                    <i className="ri-add-line mr-2"></i>
                    Start New Interview
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar with Enhanced Features */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'interview' ? 'bg-blue-100' :
                        activity.type === 'practice' ? 'bg-green-100' :
                        'bg-yellow-100'
                      }`}>
                        <i className={`ri-${
                          activity.type === 'interview' ? 'chat-3' :
                          activity.type === 'practice' ? 'code' :
                          'trophy'
                        }-line text-${
                          activity.type === 'interview' ? 'blue' :
                          activity.type === 'practice' ? 'green' :
                          'yellow'
                        }-600`}></i>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">{activity.time}</p>
                          {activity.score && (
                            <span className={`text-xs font-semibold ${getScoreColor(activity.score)}`}>
                              {activity.score}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900">Achievements</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className={`p-4 rounded-lg border-2 ${achievement.earned ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200 bg-gray-50'}`}>
                      <div className={`text-3xl mb-2 ${achievement.earned ? '' : 'grayscale'}`}>
                        {achievement.icon}
                      </div>
                      <h3 className={`font-medium text-sm ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>{achievement.name}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-3">
                <Link href="/practice" className="w-full bg-blue-50 text-blue-600 py-4 px-4 rounded-lg font-medium hover:bg-blue-100 transition-colors flex items-center whitespace-nowrap text-xl">
                  <i className="ri-code-line mr-3"></i>
                  Practice Coding
                </Link>
                <Link href="/resume-builder" className="w-full bg-green-50 text-green-600 py-4 px-4 rounded-lg font-medium hover:bg-green-100 transition-colors flex items-center whitespace-nowrap text-xl">
                  <i className="ri-file-text-line mr-3"></i>
                  Build Resume
                </Link>
                <Link href="/feedback" className="w-full bg-purple-50 text-purple-600 py-4 px-4 rounded-lg font-medium hover:bg-purple-100 transition-colors flex items-center whitespace-nowrap text-xl">
                  <i className="ri-feedback-line mr-3"></i>
                  View All Feedback
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Feedback Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedFeedback.role} Interview Feedback
                </h3>
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              {/* Interview Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{selectedFeedback.questionsAnswered}</div>
                  <div className="text-sm text-gray-600">Questions Asked</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{selectedFeedback.correctAnswers}</div>
                  <div className="text-sm text-gray-600">Correct Answers</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{selectedFeedback.score}%</div>
                  <div className="text-sm text-gray-600">Overall Score</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{selectedFeedback.duration}</div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
              </div>

              {/* Category Performance */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Performance by Category</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(selectedFeedback.categoryBreakdown).map(([category, data]) => (
                    <div key={category} className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 capitalize mb-2">{category}</h5>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Correct:</span>
                          <span className="font-semibold">{data.correct}/{data.total}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Avg Score:</span>
                          <span className={`font-semibold ${getScoreColor(data.avgScore)}`}>
                            {data.avgScore}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-time Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h4 className="font-semibold text-green-700 mb-3">
                    <i className="ri-trophy-line mr-2"></i>
                    Real-time Strengths Identified
                  </h4>
                  <ul className="space-y-2">
                    {selectedFeedback.realTimeStrengths.map((strength: string, index: number) => (
                      <li key={index} className="text-green-700 flex items-start">
                        <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <h4 className="font-semibold text-orange-700 mb-3">
                    <i className="ri-focus-line mr-2"></i>
                    Areas for Improvement
                  </h4>
                  <ul className="space-y-2">
                    {selectedFeedback.realTimeWeaknesses.map((weakness: string, index: number) => (
                      <li key={index} className="text-orange-700 flex items-start">
                        <i className="ri-arrow-right-line text-orange-500 mr-2 mt-1"></i>
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Traditional Category Scores */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(selectedFeedback.feedback.technical)}`}>
                    {selectedFeedback.feedback.technical}
                  </div>
                  <div className="text-sm text-gray-600">Technical Skills</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(selectedFeedback.feedback.communication)}`}>
                    {selectedFeedback.feedback.communication}
                  </div>
                  <div className="text-sm text-gray-600">Communication</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(selectedFeedback.feedback.problemSolving)}`}>
                    {selectedFeedback.feedback.problemSolving}
                  </div>
                  <div className="text-sm text-gray-600">Problem Solving</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(selectedFeedback.feedback.codeQuality)}`}>
                    {selectedFeedback.feedback.codeQuality}
                  </div>
                  <div className="text-sm text-gray-600">Code Quality</div>
                </div>
              </div>

              {/* Traditional Strengths and Improvements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">Overall Strengths:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedFeedback.feedback.strengths.map((strength: string, index: number) => (
                      <li key={index} className="text-gray-700">{strength}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-orange-700 mb-2">Areas for Improvement:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedFeedback.feedback.improvements.map((improvement: string, index: number) => (
                      <li key={index} className="text-gray-700">{improvement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

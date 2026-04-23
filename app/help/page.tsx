'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HelpCenter() {
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: 'ri-rocket-line' },
    { id: 'interviews', name: 'Interviews', icon: 'ri-video-line' },
    { id: 'practice', name: 'Practice Mode', icon: 'ri-code-line' },
    { id: 'technical', name: 'Technical Issues', icon: 'ri-tools-line' },
    { id: 'account', name: 'Account & Billing', icon: 'ri-user-line' },
    { id: 'feedback', name: 'Feedback & Reports', icon: 'ri-feedback-line' }
  ];

  const faqs = {
    'getting-started': [
      {
        question: 'How do I start my first interview?',
        answer: 'Navigate to the Interview Setup page, select your role and industry, configure your preferences, and click "Start Interview". Make sure to grant camera and microphone permissions.'
      },
      {
        question: 'What do I need to prepare before an interview?',
        answer: 'Ensure you have a stable internet connection, working camera and microphone, and a quiet environment. Upload your resume for personalized questions.'
      },
      {
        question: 'How does the AI interviewer work?',
        answer: 'Our AI uses advanced language models to generate dynamic questions based on your experience level, role, and industry. It provides real-time feedback and adapts to your responses.'
      }
    ],
    'interviews': [
      {
        question: 'Can I pause or restart an interview?',
        answer: 'Interviews cannot be paused once started to maintain integrity. However, you can end an interview early and start a new one anytime.'
      },
      {
        question: 'What types of questions will I be asked?',
        answer: 'Questions include technical knowledge, coding challenges, behavioral scenarios, and system design problems based on your selected role and experience level.'
      },
      {
        question: 'How is my interview performance scored?',
        answer: 'We evaluate technical skills, communication, problem-solving approach, and code quality. Each category is scored separately with detailed feedback.'
      }
    ],
    'practice': [
      {
        question: 'How do I access practice problems?',
        answer: 'Visit the Practice Center from the main navigation. Filter problems by difficulty, category, or search for specific topics.'
      },
      {
        question: 'Can I see solutions to practice problems?',
        answer: 'Solutions are provided after you submit your answer. We encourage trying the problem first to maximize learning.'
      },
      {
        question: 'How do I track my practice progress?',
        answer: 'Your dashboard shows completed problems, accuracy rate, and areas for improvement. Progress is automatically saved.'
      }
    ],
    'technical': [
      {
        question: 'My camera or microphone is not working',
        answer: 'Check browser permissions, ensure no other applications are using your camera/microphone, and try refreshing the page. Chrome and Firefox work best.'
      },
      {
        question: 'The code editor is not responding',
        answer: 'Try refreshing the page or switching browsers. Clear your browser cache if the issue persists. Contact support if problems continue.'
      },
      {
        question: 'I\'m experiencing connection issues',
        answer: 'Check your internet connection stability. We recommend a minimum of 5 Mbps for optimal performance. Try using a wired connection if possible.'
      }
    ],
    'account': [
      {
        question: 'How do I update my profile information?',
        answer: 'Go to your Profile page and click "Edit Profile". You can update personal information, skills, and experience level.'
      },
      {
        question: 'Can I delete my account?',
        answer: 'Yes, you can delete your account from the Profile settings. Note that this action is irreversible and all data will be permanently removed.'
      },
      {
        question: 'How do I change my password?',
        answer: 'Visit your Profile settings and select "Change Password". You\'ll need to enter your current password and confirm the new one.'
      }
    ],
    'feedback': [
      {
        question: 'How detailed is the interview feedback?',
        answer: 'Feedback includes overall scores, category breakdowns, specific question analysis, strengths, improvement areas, and personalized recommendations.'
      },
      {
        question: 'Can I download my feedback reports?',
        answer: 'Yes, you can download PDF reports of your interview feedback from the Feedback page for your records.'
      },
      {
        question: 'How long is feedback available?',
        answer: 'All feedback is permanently stored in your account and accessible anytime through the Feedback section.'
      }
    ]
  };

  const filteredFaqs = faqs[activeCategory as keyof typeof faqs]?.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <Link href="/" className="text-2xl font-bold font-['Pacifico']">
              InterviewAI
            </Link>
            <nav className="flex space-x-8">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-2xl text-gray-600 mb-8">Find answers to common questions and get support</p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help articles..."
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-14"
            />
            <i className="ri-search-line absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Categories</h2>
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors cursor-pointer ${
                      activeCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <i className={`${category.icon} mr-3 text-lg`}></i>
                    <span className="font-medium">{category.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-blue-100">
              <div className="px-8 py-6 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {categories.find(c => c.id === activeCategory)?.name} FAQ
                </h2>
              </div>
              
              <div className="p-8">
                {filteredFaqs.length === 0 ? (
                  <div className="text-center py-12">
                    <i className="ri-question-line text-6xl text-gray-300 mb-4"></i>
                    <h3 className="text-xl font-medium text-gray-600 mb-2">No results found</h3>
                    <p className="text-gray-500">Try adjusting your search or browse different categories</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredFaqs.map((faq, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-start">
                          <i className="ri-question-line text-blue-600 mr-2 mt-1"></i>
                          {faq.question}
                        </h3>
                        <p className="text-gray-700 leading-relaxed pl-6">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Contact Support */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Still need help?</h3>
                <p className="text-lg text-gray-600 mb-6">Can't find what you're looking for? Our support team is here to help.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap text-lg"
                  >
                    <i className="ri-mail-line mr-2"></i>
                    Contact Support
                  </Link>
                  <Link
                    href="/feedback"
                    className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap text-lg"
                  >
                    <i className="ri-feedback-line mr-2"></i>
                    Send Feedback
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
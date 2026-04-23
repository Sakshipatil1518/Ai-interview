
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '../lib/authContext';

export default function Home() {
  const { isAuthenticated, user, logout } = useAuth();
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');

  const jobRoles = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Data Scientist',
    'DevOps Engineer',
    'Mobile Developer',
    'Machine Learning Engineer',
    'Product Manager'
  ];

  const industries = [
    'EdTech',
    'FinTech',
    'HealthTech',
    'E-commerce',
    'Gaming',
    'SaaS',
    'AI/ML',
    'Blockchain'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold font-['Pacifico']">
                InterviewAI
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8 items-center">
              <Link href="/dashboard" className="text-blue-100 hover:text-white transition-colors text-xl font-medium">
                Dashboard
              </Link>
              <Link href="/practice" className="text-blue-100 hover:text-white transition-colors text-xl font-medium">
                Practice
              </Link>
              <Link href="/leaderboard" className="text-blue-100 hover:text-white transition-colors text-xl font-medium">
                Leaderboard
              </Link>
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
                  <Link href="/auth/login" className="text-blue-100 hover:text-white transition-colors text-xl font-medium">
                    Login
                  </Link>
                  <Link href="/auth/signup" className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors whitespace-nowrap text-xl">
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Professional%20modern%20tech%20interview%20room%20with%20AI%20hologram%2C%20futuristic%20workspace%2C%20clean%20minimal%20design%2C%20soft%20blue%20lighting%2C%20glass%20tables%2C%20digital%20screens%20showing%20code%2C%20high-tech%20atmosphere%2C%20professional%20corporate%20environment%2C%20blue%20color%20scheme%2C%20modern%20blue%20office%20interior&width=1920&height=1080&seq=hero-bg&orientation=landscape')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/70"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-4xl">
            <motion.h1 
              className="text-7xl font-bold text-white mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Next-Gen AI Interview Platform
            </motion.h1>
            <motion.p 
              className="text-3xl text-white/95 mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Experience the future of technical interviews with AI-powered assessments, real-time code evaluation, and advanced anti-cheat protection. Get personalized feedback and career insights.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href="/interview/setup" className="bg-blue-600 text-white px-12 py-5 rounded-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap text-xl">
                Start Interview
              </Link>
              <Link href="/demo" className="bg-white/20 text-white px-12 py-5 rounded-lg font-semibold hover:bg-white/30 transition-colors backdrop-blur-sm whitespace-nowrap text-xl">
                Watch Demo
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Start Your AI Interview</h2>
            <p className="text-3xl text-gray-600">Select your role and industry to begin</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <label className="block text-2xl font-medium text-gray-700 mb-4">Job Role</label>
              <div className="grid grid-cols-2 gap-4">
                {jobRoles.map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`p-5 rounded-lg border-2 transition-all whitespace-nowrap cursor-pointer text-lg font-medium ${
                      selectedRole === role
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-2xl font-medium text-gray-700 mb-4">Industry</label>
              <div className="grid grid-cols-2 gap-4">
                {industries.map((industry) => (
                  <button
                    key={industry}
                    onClick={() => setSelectedIndustry(industry)}
                    className={`p-5 rounded-lg border-2 transition-all whitespace-nowrap cursor-pointer text-lg font-medium ${
                      selectedIndustry === industry
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href={selectedRole && selectedIndustry ? `/interview/setup?role=${encodeURIComponent(selectedRole)}&industry=${encodeURIComponent(selectedIndustry)}` : '#'}
              className={`inline-block px-12 py-5 rounded-lg font-semibold transition-all whitespace-nowrap text-xl ${
                selectedRole && selectedIndustry
                  ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue to Setup
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Advanced Features</h2>
            <p className="text-3xl text-gray-600">Everything you need for a comprehensive interview experience</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white rounded-xl p-10 shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-8">
                <i className="ri-robot-line text-blue-600 text-3xl"></i>
              </div>
              <h3 className="text-3xl font-semibold text-gray-900 mb-6">AI-Powered Interviews</h3>
              <p className="text-gray-600 text-xl">Dynamic questions powered by OpenAI/Gemini based on your resume and experience level</p>
            </div>

            <div className="bg-white rounded-xl p-10 shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-8">
                <i className="ri-code-line text-blue-600 text-3xl"></i>
              </div>
              <h3 className="text-3xl font-semibold text-gray-900 mb-6">Real-time Code Editor</h3>
              <p className="text-gray-600 text-xl">Monaco editor with syntax highlighting, auto-completion, and instant code execution</p>
            </div>

            <div className="bg-white rounded-xl p-10 shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-8">
                <i className="ri-shield-check-line text-blue-600 text-3xl"></i>
              </div>
              <h3 className="text-3xl font-semibold text-gray-900 mb-6">Anti-Cheat Protection</h3>
              <p className="text-gray-600 text-xl">Advanced security with face tracking, tab detection, and screen monitoring</p>
            </div>

            <div className="bg-white rounded-xl p-10 shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-8">
                <i className="ri-video-line text-blue-600 text-3xl"></i>
              </div>
              <h3 className="text-3xl font-semibold text-gray-900 mb-6">WebRTC Video Calls</h3>
              <p className="text-gray-600 text-xl">Seamless video interviews with AI or human co-pilot support</p>
            </div>

            <div className="bg-white rounded-xl p-10 shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-8">
                <i className="ri-trophy-line text-blue-600 text-3xl"></i>
              </div>
              <h3 className="text-3xl font-semibold text-gray-900 mb-6">Gamified Scoring</h3>
              <p className="text-gray-600 text-xl">Earn badges, level up, and compete on leaderboards while improving your skills</p>
            </div>

            <div className="bg-white rounded-xl p-10 shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-8">
                <i className="ri-bar-chart-line text-blue-600 text-3xl"></i>
              </div>
              <h3 className="text-3xl font-semibold text-gray-900 mb-6">AI Feedback Reports</h3>
              <p className="text-gray-600 text-xl">Detailed insights on coding skills, communication, and areas for improvement</p>
            </div>

            <div className="bg-white rounded-xl p-10 shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-8">
                <i className="ri-global-line text-blue-600 text-3xl"></i>
              </div>
              <h3 className="text-3xl font-semibold text-gray-900 mb-6">Multilingual Interview Capability</h3>
              <p className="text-gray-600 text-xl">Interview in your local or preferred language with real-time translation and native AI support</p>
            </div>

            <div className="bg-white rounded-xl p-10 shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-8">
                <i className="ri-chat-3-line text-blue-600 text-3xl"></i>
              </div>
              <h3 className="text-3xl font-semibold text-gray-900 mb-6">Live Feedback Overlay</h3>
              <p className="text-gray-600 text-xl">Real-time performance indicators, hints, and suggestions displayed during your interview</p>
            </div>

            <div className="bg-white rounded-xl p-10 shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-8">
                <i className="ri-user-follow-line text-blue-600 text-3xl"></i>
              </div>
              <h3 className="text-3xl font-semibold text-gray-900 mb-6">Follow & Connect</h3>
              <p className="text-gray-600 text-xl">Connect with other developers, follow their progress, and build your professional network</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-6xl font-bold text-white mb-3">50K+</div>
              <div className="text-blue-200 text-xl">Interviews Completed</div>
            </div>
            <div>
              <div className="text-6xl font-bold text-white mb-3">98%</div>
              <div className="text-blue-200 text-xl">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-6xl font-bold text-white mb-3">500+</div>
              <div className="text-blue-200 text-xl">Partner Companies</div>
            </div>
            <div>
              <div className="text-6xl font-bold text-white mb-3">24/7</div>
              <div className="text-blue-200 text-xl">AI Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Ready to Transform Your Interview Process?</h2>
          <p className="text-3xl text-gray-600 mb-12">Join thousands of developers who have improved their skills with our AI-powered platform</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/interview/setup" className="bg-blue-600 text-white px-12 py-5 rounded-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap text-xl">
              Start Free Interview
            </Link>
            <Link href="/pricing" className="border-2 border-blue-600 text-blue-600 px-12 py-5 rounded-lg font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap text-xl">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-3xl font-bold mb-6 font-['Pacifico']">InterviewAI</h3>
              <p className="text-blue-200 text-xl">The future of technical interviews powered by AI</p>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-xl">Platform</h4>
              <div className="space-y-3">
                <Link href="/interview/setup" className="block text-blue-200 hover:text-white transition-colors text-lg">Start Interview</Link>
                <Link href="/practice" className="block text-blue-200 hover:text-white transition-colors text-lg">Practice Mode</Link>
                <Link href="/dashboard" className="block text-blue-200 hover:text-white transition-colors text-lg">Dashboard</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-xl">Resources</h4>
              <div className="space-y-3">
                <Link href="/blog" className="block text-blue-200 hover:text-white transition-colors text-lg">Blog</Link>
                <Link href="/docs" className="block text-blue-200 hover:text-white transition-colors text-lg">Documentation</Link>
                <Link href="/api" className="block text-blue-200 hover:text-white transition-colors text-lg">API</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-xl">Support</h4>
              <div className="space-y-3">
                <Link href="/help" className="block text-blue-200 hover:text-white transition-colors text-lg">Help Center</Link>
                <Link href="/contact" className="block text-blue-200 hover:text-white transition-colors text-lg">Contact Us</Link>
                <Link href="/privacy" className="block text-blue-200 hover:text-white transition-colors text-lg">Privacy Policy</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-12 pt-8 text-center text-blue-200">
            <p className="text-lg">&copy; 2024 InterviewAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

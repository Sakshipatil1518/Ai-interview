'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: '',
    priority: 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
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

        <div className="flex items-center justify-center min-h-[80vh] px-4">
          <div className="max-w-md w-full text-center">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-check-line text-green-600 text-3xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Message Sent!</h2>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for contacting us. We'll get back to you within 24 hours.
              </p>
              <div className="space-y-3">
                <Link
                  href="/dashboard"
                  className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Go to Dashboard
                </Link>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      subject: '',
                      category: 'general',
                      message: '',
                      priority: 'medium'
                    });
                  }}
                  className="block w-full text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
            Have questions, feedback, or need support? We're here to help you succeed in your interview journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-mail-line text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email Support</h3>
                    <p className="text-gray-600">support@interviewai.com</p>
                    <p className="text-sm text-gray-500 mt-1">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-chat-3-line text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Live Chat</h3>
                    <p className="text-gray-600">Available 9 AM - 6 PM PST</p>
                    <p className="text-sm text-gray-500 mt-1">Monday to Friday</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-question-line text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Help Center</h3>
                    <p className="text-gray-600">Find instant answers</p>
                    <Link href="/help" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Browse FAQ →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Response Times</h4>
                <div className="space-y-1 text-sm text-blue-800">
                  <div className="flex justify-between">
                    <span>General Inquiries:</span>
                    <span>24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Technical Issues:</span>
                    <span>12 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Urgent/Critical:</span>
                    <span>4 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="billing">Billing & Account</option>
                      <option value="feedback">Feedback & Suggestions</option>
                      <option value="partnership">Partnership</option>
                      <option value="bug">Bug Report</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="priority" className="block text-sm font-semibold text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    maxLength={500}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Please provide detailed information about your inquiry..."
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-500">
                      {formData.message.length}/500 characters
                    </p>
                    <span className={`px-2 py-1 rounded text-xs ${
                      formData.message.length > 400 ? 'bg-red-100 text-red-600' : 
                      formData.message.length > 200 ? 'bg-yellow-100 text-yellow-600' : 
                      'bg-green-100 text-green-600'
                    }`}>
                      {formData.message.length > 400 ? 'Almost at limit' : 
                       formData.message.length > 200 ? 'Good length' : 
                       'Add more detail'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="agree-contact"
                    name="agree-contact"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="agree-contact" className="ml-2 block text-sm text-gray-900">
                    I agree to be contacted regarding my inquiry and understand the{' '}
                    <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex justify-center py-4 px-6 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white transition-colors ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="ri-loader-4-line animate-spin mr-2"></i>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <i className="ri-send-plane-line mr-2"></i>
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Other Ways to Get Help</h3>
            <p className="text-lg text-gray-600">Explore these resources for quick answers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/help"
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-book-open-line text-blue-600 text-xl"></i>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Help Center</h4>
              <p className="text-gray-600 text-sm">Browse our comprehensive FAQ and guides</p>
            </Link>

            <Link
              href="/feedback"
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-feedback-line text-green-600 text-xl"></i>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Community Forum</h4>
              <p className="text-gray-600 text-sm">Connect with other users and share experiences</p>
            </Link>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-video-line text-purple-600 text-xl"></i>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Video Tutorials</h4>
              <p className="text-gray-600 text-sm">Watch step-by-step guides and tutorials</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
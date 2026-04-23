import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <Link href="/" className="text-4xl font-bold text-white" style={{ fontFamily: 'Pacifico, serif' }}>
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

      {/* 404 Content */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <div className="max-w-2xl mx-auto">
          {/* 404 Illustration */}
          <div className="mb-8">
            <img
              src="https://readdy.ai/api/search-image?query=404%20error%20page%20illustration%20with%20friendly%20robot%20character%2C%20modern%20tech%20style%2C%20blue%20color%20scheme%2C%20professional%20design%2C%20clean%20minimal%20background%2C%20user-friendly%20error%20page&width=400&height=300&seq=404-illustration&orientation=landscape"
              alt="404 Error"
              className="w-96 h-72 mx-auto object-cover rounded-lg"
            />
          </div>

          <h1 className="text-8xl font-bold text-blue-600 mb-4">404</h1>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap text-xl"
            >
              <i className="ri-home-line mr-2"></i>
              Go Home
            </Link>
            <Link
              href="/dashboard"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap text-xl"
            >
              <i className="ri-dashboard-line mr-2"></i>
              Dashboard
            </Link>
            <Link
              href="/interview/setup"
              className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors whitespace-nowrap text-xl"
            >
              <i className="ri-video-line mr-2"></i>
              Start Interview
            </Link>
          </div>

          {/* Popular Pages */}
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Popular Pages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/practice"
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <i className="ri-code-line text-blue-600 text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">Practice Center</h4>
                  <p className="text-gray-600">Sharpen your coding skills</p>
                </div>
              </Link>

              <Link
                href="/leaderboard"
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                  <i className="ri-trophy-line text-yellow-600 text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">Leaderboard</h4>
                  <p className="text-gray-600">See your ranking</p>
                </div>
              </Link>

              <Link
                href="/resume-builder"
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <i className="ri-file-text-line text-green-600 text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">Resume Builder</h4>
                  <p className="text-gray-600">Create professional resume</p>
                </div>
              </Link>

              <Link
                href="/feedback"
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <i className="ri-feedback-line text-purple-600 text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">Interview Feedback</h4>
                  <p className="text-gray-600">View detailed analysis</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Pacifico, serif' }}>InterviewAI</h3>
            <p className="text-blue-200 text-lg mb-6">The future of technical interviews powered by AI</p>
            <div className="flex justify-center space-x-6">
              <Link href="/help" className="text-blue-200 hover:text-white transition-colors text-lg">Help Center</Link>
              <Link href="/contact" className="text-blue-200 hover:text-white transition-colors text-lg">Contact Us</Link>
              <Link href="/privacy" className="text-blue-200 hover:text-white transition-colors text-lg">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

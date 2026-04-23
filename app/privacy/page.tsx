'use client';

import Link from 'next/link';

export default function Privacy() {
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600">
            Last updated: January 15, 2024
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-8">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Quick Summary</h3>
              <p className="text-blue-800 mb-0">
                We collect minimal data necessary to provide our AI interview services. Your interview recordings and personal data are encrypted and never shared with third parties without your consent. You have full control over your data and can delete it anytime.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Name, email address, and contact information</li>
                <li>Professional information (job title, experience level, skills)</li>
                <li>Resume and portfolio information (when uploaded)</li>
                <li>Account preferences and settings</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Interview Data</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Video and audio recordings during interviews</li>
                <li>Code submissions and solutions</li>
                <li>Response times and interaction patterns</li>
                <li>Performance scores and feedback</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Information</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Device information and browser type</li>
                <li>IP address and location data</li>
                <li>Usage analytics and platform interactions</li>
                <li>Error logs and performance metrics</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Provision</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Conduct AI-powered interviews and assessments</li>
                <li>Generate personalized feedback and recommendations</li>
                <li>Track your progress and performance over time</li>
                <li>Provide technical support and customer service</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Platform Improvement</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Analyze usage patterns to improve our AI models</li>
                <li>Enhance user experience and platform features</li>
                <li>Develop new interview formats and question types</li>
                <li>Ensure platform security and prevent fraud</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Communication</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Send important account and service updates</li>
                <li>Provide interview results and feedback reports</li>
                <li>Share relevant tips and career guidance (optional)</li>
                <li>Respond to support requests and inquiries</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Security & Protection</h2>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
                <h3 className="text-xl font-semibold text-green-900 mb-3">🔒 Security Measures</h3>
                <ul className="list-disc pl-6 space-y-2 text-green-800">
                  <li>End-to-end encryption for all interview recordings</li>
                  <li>SOC 2 Type II compliant data centers</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Multi-factor authentication for account access</li>
                  <li>Automated backup and disaster recovery systems</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Storage</h3>
              <p className="mb-4">
                Your data is stored on secure servers in the United States with enterprise-grade security measures. Interview recordings are automatically deleted after 90 days unless you choose to keep them longer. Personal information is retained only as long as necessary to provide our services.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Access Controls</h3>
              <p className="mb-4">
                Access to your personal data is strictly limited to authorized personnel who need it to provide support or improve our services. All employees undergo background checks and sign confidentiality agreements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Sharing & Third Parties</h2>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
                <h3 className="text-xl font-semibold text-red-900 mb-3">❌ We Never Share</h3>
                <ul className="list-disc pl-6 space-y-2 text-red-800">
                  <li>Your interview recordings with employers without explicit consent</li>
                  <li>Personal information with marketing companies</li>
                  <li>Individual performance data with third parties</li>
                  <li>Your data for advertising or commercial purposes</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Limited Sharing</h3>
              <p className="mb-4">
                We may share aggregated, anonymized data for research purposes or with service providers who help us operate our platform (cloud hosting, analytics, customer support). These partners are bound by strict confidentiality agreements.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Legal Requirements</h3>
              <p className="mb-4">
                We may disclose information if required by law, court order, or to protect the rights, property, or safety of InterviewAI, our users, or others.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights & Controls</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">✅ Your Rights</h3>
                <ul className="list-disc pl-6 space-y-2 text-blue-800">
                  <li><strong>Access:</strong> Request a copy of all data we have about you</li>
                  <li><strong>Correction:</strong> Update or correct your personal information</li>
                  <li><strong>Deletion:</strong> Delete your account and all associated data</li>
                  <li><strong>Portability:</strong> Export your data in a machine-readable format</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">How to Exercise Your Rights</h3>
              <p className="mb-4">
                You can manage most of your data through your account settings. For other requests, contact us at{' '}
                <a href="mailto:privacy@interviewai.com" className="text-blue-600 hover:text-blue-700">
                  privacy@interviewai.com
                </a>
                . We'll respond within 30 days.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies & Tracking</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Essential Cookies</h3>
              <p className="mb-4">
                We use necessary cookies to maintain your session, remember your preferences, and ensure platform security. These cannot be disabled.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics Cookies</h3>
              <p className="mb-4">
                We use analytics tools to understand how users interact with our platform. You can opt out of analytics tracking in your account settings.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Third-Party Services</h3>
              <p className="mb-4">
                We integrate with services like Google Analytics and customer support tools. These have their own privacy policies and cookie practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. International Users</h2>
              
              <p className="mb-4">
                InterviewAI is based in the United States. If you're accessing our services from outside the US, your information will be transferred to and processed in the United States. We ensure appropriate safeguards are in place for international data transfers.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">GDPR Compliance</h3>
              <p className="mb-4">
                For users in the European Union, we comply with GDPR requirements. You have additional rights under GDPR, including the right to object to processing and file complaints with supervisory authorities.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
              
              <p className="mb-4">
                InterviewAI is not intended for users under 16 years of age. We do not knowingly collect personal information from children under 16. If we become aware that we have collected such information, we will delete it immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Policy</h2>
              
              <p className="mb-4">
                We may update this privacy policy from time to time. We'll notify you of significant changes via email or through our platform. The "Last updated" date at the top indicates when the policy was last revised.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
              
              <p className="mb-4">
                If you have questions about this privacy policy or our data practices, please contact us:
              </p>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="space-y-2">
                  <p><strong>Email:</strong> privacy@interviewai.com</p>
                  <p><strong>Address:</strong> InterviewAI Inc., 123 Tech Street, San Francisco, CA 94105</p>
                  <p><strong>Data Protection Officer:</strong> dpo@interviewai.com</p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Questions About Your Privacy?</h3>
            <p className="text-lg text-gray-600 mb-6">We're here to help you understand how we protect your data.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                Contact Privacy Team
              </Link>
              <Link
                href="/profile"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap"
              >
                Manage Your Data
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
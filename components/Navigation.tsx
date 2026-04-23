'use client';

import Link from 'next/link';
import { useAuth } from '../lib/authContext';

export default function Navigation() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-5">
          <Link href="/" className="text-2xl font-bold font-['Pacifico'] text-white">
            InterviewAI
          </Link>
          <nav className="flex items-center space-x-8">
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
                  className="text-blue-100 hover:text-white transition-colors text-xl font-medium cursor-pointer"
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
  );
}
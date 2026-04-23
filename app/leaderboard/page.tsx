
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '../../components/Navigation';

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState('global');
  const [timeFilter, setTimeFilter] = useState('all');
  const [leaderboardData, setLeaderboardData] = useState([]);

  const globalLeaderboard = [
    {
      id: 1,
      rank: 1,
      name: 'Sarah Chen',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20asian%20woman%20developer%20portrait%2C%20confident%20smile%2C%20modern%20office%20background%2C%20business%20attire%2C%20clean%20minimal%20style%2C%20high%20quality%20headshot&width=100&height=100&seq=avatar-1&orientation=squarish',
      score: 2450,
      interviews: 45,
      streak: 12,
      badges: ['🏆', '💎', '🔥']
    },
    {
      id: 2,
      rank: 2,
      name: 'Alex Rodriguez',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20hispanic%20male%20developer%20portrait%2C%20friendly%20expression%2C%20tech%20office%20background%2C%20casual%20business%20attire%2C%20clean%20minimal%20style%2C%20high%20quality%20headshot&width=100&height=100&seq=avatar-2&orientation=squarish',
      score: 2380,
      interviews: 42,
      streak: 8,
      badges: ['🏆', '💎']
    },
    {
      id: 3,
      rank: 3,
      name: 'Emily Johnson',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20caucasian%20woman%20developer%20portrait%2C%20professional%20smile%2C%20modern%20workspace%20background%2C%20business%20casual%20attire%2C%20clean%20minimal%20style%2C%20high%20quality%20headshot&width=100&height=100&seq=avatar-3&orientation=squarish',
      score: 2320,
      interviews: 38,
      streak: 15,
      badges: ['🏆', '🔥']
    },
    {
      id: 4,
      rank: 4,
      name: 'David Kim',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20korean%20male%20developer%20portrait%2C%20confident%20expression%2C%20tech%20startup%20background%2C%20modern%20attire%2C%20clean%20minimal%20style%2C%20high%20quality%20headshot&width=100&height=100&seq=avatar-4&orientation=squarish',
      score: 2250,
      interviews: 35,
      streak: 6,
      badges: ['🏆']
    },
    {
      id: 5,
      rank: 5,
      name: 'You',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20developer%20portrait%2C%20neutral%20expression%2C%20modern%20office%20background%2C%20business%20casual%20attire%2C%20clean%20minimal%20style%2C%20high%20quality%20headshot&width=100&height=100&seq=avatar-user&orientation=squarish',
      score: 2180,
      interviews: 32,
      streak: 4,
      badges: ['🏆'],
      isCurrentUser: true
    }
  ];

  const weeklyLeaderboard = [
    {
      id: 1,
      rank: 1,
      name: 'Mike Wilson',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20african%20american%20male%20developer%20portrait%2C%20enthusiastic%20smile%2C%20tech%20office%20background%2C%20casual%20attire%2C%20clean%20minimal%20style%2C%20high%20quality%20headshot&width=100&height=100&seq=avatar-5&orientation=squarish',
      score: 450,
      interviews: 8,
      streak: 8,
      badges: ['🔥', '⚡']
    },
    {
      id: 2,
      rank: 2,
      name: 'You',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20developer%20portrait%2C%20neutral%20expression%2C%20modern%20office%20background%2C%20business%20casual%20attire%2C%20clean%20minimal%20style%2C%20high%20quality%20headshot&width=100&height=100&seq=avatar-user&orientation=squarish',
      score: 380,
      interviews: 6,
      streak: 4,
      badges: ['🔥'],
      isCurrentUser: true
    },
    {
      id: 3,
      rank: 3,
      name: 'Lisa Zhang',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20chinese%20woman%20developer%20portrait%2C%20professional%20smile%2C%20startup%20office%20background%2C%20modern%20attire%2C%20clean%20minimal%20style%2C%20high%20quality%20headshot&width=100&height=100&seq=avatar-6&orientation=squarish',
      score: 360,
      interviews: 5,
      streak: 5,
      badges: ['🔥']
    }
  ];

  const monthlyLeaderboard = [
    {
      id: 1,
      rank: 1,
      name: 'Sarah Chen',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20asian%20woman%20developer%20portrait%2C%20confident%20smile%2C%20modern%20office%20background%2C%20business%20attire%2C%20clean%20minimal%20style%2C%20high%20quality%20headshot&width=100&height=100&seq=avatar-1&orientation=squarish',
      score: 1200,
      interviews: 18,
      streak: 12,
      badges: ['🏆', '💎', '🔥']
    },
    {
      id: 2,
      rank: 2,
      name: 'Alex Rodriguez',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20hispanic%20male%20developer%20portrait%2C%20friendly%20expression%2C%20tech%20office%20background%2C%20casual%20business%20attire%2C%20clean%20minimal%20style%2C%20high%20quality%20headshot&width=100&height=100&seq=avatar-2&orientation=squarish',
      score: 1150,
      interviews: 16,
      streak: 8,
      badges: ['🏆', '💎']
    },
    {
      id: 3,
      rank: 3,
      name: 'You',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20developer%20portrait%2C%20neutral%20expression%2C%20modern%20office%20background%2C%20business%20casual%20attire%2C%20clean%20minimal%20style%2C%20high%20quality%20headshot&width=100&height=100&seq=avatar-user&orientation=squarish',
      score: 1080,
      interviews: 15,
      streak: 4,
      badges: ['🏆'],
      isCurrentUser: true
    }
  ];

  useEffect(() => {
    // Real-time updates simulation
    const interval = setInterval(() => {
      const currentData = activeTab === 'global' ? globalLeaderboard : 
                          activeTab === 'weekly' ? weeklyLeaderboard : monthlyLeaderboard;
      
      setLeaderboardData(currentData.map(user => ({ 
        ...user, 
        score: user.score + Math.floor(Math.random() * 5)
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, [activeTab]);

  const getCurrentLeaderboard = () => {
    switch(activeTab) {
      case 'weekly': return weeklyLeaderboard;
      case 'monthly': return monthlyLeaderboard;
      default: return globalLeaderboard;
    }
  };

  const getRankColor = (rank) => {
    switch(rank) {
      case 1: return 'text-yellow-600 bg-yellow-100';
      case 2: return 'text-gray-600 bg-gray-100';
      case 3: return 'text-orange-600 bg-orange-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">Leaderboard</h1>
          <p className="text-2xl text-gray-600">See how you rank against other developers</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            {['global', 'weekly', 'monthly'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-lg font-medium transition-colors whitespace-nowrap text-xl ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="mb-12">
          <div className="flex justify-center items-end space-x-8">
            {getCurrentLeaderboard().slice(0, 3).map((user, index) => (
              <div key={user.id} className={`text-center ${index === 0 ? 'order-2' : index === 1 ? 'order-1' : 'order-3'}`}>
                <div className={`relative mb-4 ${index === 0 ? 'transform scale-110' : ''}`}>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg"
                  />
                  <div className={`absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${getRankColor(user.rank)}`}>
                    {user.rank}
                  </div>
                </div>
                <div className={`bg-white rounded-lg p-6 shadow-sm border ${user.isCurrentUser ? 'border-blue-300 bg-blue-50' : 'border-gray-200'} ${index === 0 ? 'min-h-[200px]' : 'min-h-[180px]'}`}>
                  <h3 className="font-semibold text-gray-900 mb-1 text-xl">{user.name}</h3>
                  <p className="text-3xl font-bold text-blue-600 mb-2">{user.score}</p>
                  <div className="text-lg text-gray-600 space-y-1">
                    <p>{user.interviews} interviews</p>
                    <p>{user.streak} day streak</p>
                  </div>
                  <div className="flex justify-center mt-3 space-x-1">
                    {user.badges.map((badge, i) => (
                      <span key={i} className="text-2xl">{badge}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full Leaderboard Table */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Full Rankings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Interviews</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Streak</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Badges</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getCurrentLeaderboard().map((user) => (
                  <tr key={user.id} className={`hover:bg-gray-50 ${user.isCurrentUser ? 'bg-blue-50' : ''}`}>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${getRankColor(user.rank)}`}>
                        {user.rank}
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-12 h-12 rounded-full mr-3"
                        />
                        <div>
                          <div className="font-medium text-gray-900 text-lg">
                            {user.name}
                            {user.isCurrentUser && (
                              <span className="ml-2 text-blue-600 text-lg">(You)</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-lg text-gray-900 font-semibold">
                      {user.score}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-lg text-gray-900">
                      {user.interviews}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-lg text-gray-900">
                      <div className="flex items-center">
                        <i className="ri-fire-line text-orange-500 mr-1"></i>
                        {user.streak}
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-lg text-gray-900">
                      <div className="flex space-x-1">
                        {user.badges.map((badge, i) => (
                          <span key={i} className="text-2xl">{badge}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

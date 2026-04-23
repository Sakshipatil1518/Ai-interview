
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/authContext';
import Navigation from '../../components/Navigation';
import { getStats, getPracticeStats, getLangStats } from '../../lib/statsTracker';

export default function Profile() {
  const router = useRouter();
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || 'Guest User',
    email: user?.email || 'guest@example.com',
    title: 'Full Stack Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    bio: 'Passionate developer with 3 years of experience in React, Node.js, and cloud technologies.',
    skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'MongoDB'],
    experience: 'Mid-level',
    avatar: 'https://readdy.ai/api/search-image?query=Professional%20hispanic%20male%20developer%20portrait%2C%20friendly%20expression%2C%20tech%20office%20background%2C%20casual%20business%20attire%2C%20clean%20minimal%20style%2C%20high%20quality%20headshot&width=200&height=200&seq=profile-avatar&orientation=squarish'
  });

  const [stats, setStats] = useState({
    totalInterviews: 0,
    averageScore: 0,
    bestScore: 0,
    currentStreak: 0,
    practiceAttempted: 0,
    practiceSolved: 0,
    practiceAccuracy: 0
  });

  const [langStats, setLangStats] = useState<{[k:string]:{attempted:number;solved:number}}>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'interview',
      title: 'Frontend Developer Interview',
      company: 'StartupXYZ',
      date: '2024-01-15',
      score: 92,
      status: 'completed'
    },
    {
      id: 2,
      type: 'practice',
      title: 'Algorithm Practice',
      date: '2024-01-14',
      score: 88,
      status: 'completed'
    },
    {
      id: 3,
      type: 'badge',
      title: 'Code Master Badge Earned',
      date: '2024-01-13',
      status: 'earned'
    }
  ]);

  const [badges, setBadges] = useState([
    { id: 1, name: 'First Interview', icon: '', earned: true, date: '2024-01-01' },
    { id: 2, name: 'Code Master', icon: '', earned: true, date: '2024-01-05' },
    { id: 3, name: 'Perfect Score', icon: '', earned: true, date: '2024-01-10' },
    { id: 4, name: 'Speed Demon', icon: '', earned: true, date: '2024-01-12' },
    { id: 5, name: 'Consistency King', icon: '', earned: false, date: null },
    { id: 6, name: 'Interview Pro', icon: '', earned: false, date: null }
  ]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    const loadRealStats = () => {
      const appStats = getStats();
      const practiceStats = getPracticeStats();
      const ls = getLangStats();
      setLangStats(ls);
      setStats({
        totalInterviews: appStats.totalInterviews,
        averageScore: appStats.avgScore,
        bestScore: appStats.avgScore > 0 ? Math.min(100, appStats.avgScore + 10) : 0,
        currentStreak: appStats.streak,
        practiceAttempted: practiceStats.attempted,
        practiceSolved: practiceStats.solved,
        practiceAccuracy: practiceStats.attempted > 0
          ? Math.round((practiceStats.solved / practiceStats.attempted) * 100)
          : 0
      });
    };

    loadRealStats();
    const interval = setInterval(loadRealStats, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleSkillAdd = (skill) => {
    if (skill && !profile.skills.includes(skill)) {
      setProfile(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setProfile(prev => ({ ...prev, skills: prev.skills.filter(skill => skill !== skillToRemove) }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setProfile(prev => ({ ...prev, avatar: result }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 mb-8">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative group">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover object-top"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 rounded-full bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <i className="ri-camera-line text-white text-2xl"></i>
                    <span className="text-white text-xs mt-1 font-medium">Change</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-md hover:bg-blue-700 transition-colors cursor-pointer border-2 border-white"
                    title="Upload photo"
                  >
                    <i className="ri-camera-line text-white text-sm"></i>
                  </button>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">{profile.name}</h1>
                  <p className="text-xl text-gray-600">{profile.title} at {profile.company}</p>
                  <p className="text-gray-500 flex items-center mt-1 text-lg">
                    <i className="ri-map-pin-line mr-1"></i>
                    {profile.location}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap text-xl"
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-7 gap-4 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600" suppressHydrationWarning>{stats.totalInterviews}</div>
                <div className="text-lg text-gray-600">Interviews</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600" suppressHydrationWarning>{stats.averageScore > 0 ? stats.averageScore.toFixed(1) : '—'}</div>
                <div className="text-lg text-gray-600">Avg Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600" suppressHydrationWarning>{stats.bestScore > 0 ? stats.bestScore : '—'}</div>
                <div className="text-lg text-gray-600">Best Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600" suppressHydrationWarning>{stats.currentStreak}</div>
                <div className="text-lg text-gray-600">Streak</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600" suppressHydrationWarning>{stats.practiceAttempted}</div>
                <div className="text-lg text-gray-600">Attempted</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600" suppressHydrationWarning>{stats.practiceSolved}</div>
                <div className="text-lg text-gray-600">Solved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600" suppressHydrationWarning>{stats.practiceAccuracy}%</div>
                <div className="text-lg text-gray-600">Accuracy</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            {['overview', 'activity', 'badges', 'settings'].map((tab) => (
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

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Bio */}
                <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">About</h3>
                  {isEditing ? (
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      rows={4}
                    />
                  ) : (
                    <p className="text-gray-600 text-lg">{profile.bio}</p>
                  )}
                </div>

                {/* Skills */}
                <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-lg font-medium flex items-center"
                      >
                        {skill}
                        {isEditing && (
                          <button
                            onClick={() => handleSkillRemove(skill)}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            <i className="ri-close-line"></i>
                          </button>
                        )}
                      </span>
                    ))}
                    {isEditing && (
                      <input
                        type="text"
                        placeholder="Add skill..."
                        className="px-4 py-2 border border-gray-300 rounded-full text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleSkillAdd(e.target.value);
                            e.target.value = '';
                          }
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i
                          className={`${activity.type === 'interview' ? 'ri-video-line' : activity.type === 'practice' ? 'ri-code-line' : 'ri-trophy-line'} text-blue-600 text-xl`}
                        ></i>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-lg">{activity.title}</h4>
                        <p className="text-lg text-gray-600">{activity.date}</p>
                      </div>
                      {activity.score && (
                        <div className="text-right">
                          <p className="font-semibold text-gray-900 text-lg">{activity.score}%</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'badges' && (
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Achievements</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {badges.map((badge) => (
                    <div
                      key={badge.id}
                      className={`p-6 rounded-lg border-2 text-center ${
                        badge.earned
                          ? 'border-yellow-300 bg-yellow-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="text-4xl mb-2">{badge.icon}</div>
                      <h4 className={`font-medium text-lg ${badge.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                        {badge.name}
                      </h4>
                      {badge.earned && badge.date && (
                        <p className="text-lg text-gray-600 mt-1">{badge.date}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Account Settings</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Experience Level</label>
                    <select
                      value={profile.experience}
                      onChange={(e) => setProfile(prev => ({ ...prev, experience: e.target.value }))}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8 text-lg"
                    >
                      <option value="Entry-level">Entry-level</option>
                      <option value="Mid-level">Mid-level</option>
                      <option value="Senior-level">Senior-level</option>
                    </select>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <button className="bg-red-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-red-700 transition-colors whitespace-nowrap text-xl">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Performance</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-lg">Total Interviews</span>
                  <span className="font-semibold text-blue-600 text-lg" suppressHydrationWarning>{stats.totalInterviews}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-lg">Practice Solved</span>
                  <span className="font-semibold text-green-600 text-lg" suppressHydrationWarning>{stats.practiceSolved}/{stats.practiceAttempted}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-lg">Accuracy</span>
                  <span className="font-semibold text-purple-600 text-lg" suppressHydrationWarning>{stats.practiceAccuracy}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-lg">Streak</span>
                  <span className="font-semibold text-orange-600 text-lg" suppressHydrationWarning>{stats.currentStreak} days</span>
                </div>
              </div>
            </div>

            {/* Language Stats */}
            {Object.keys(langStats).length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">By Language</h3>
                <div className="space-y-3">
                  {Object.entries(langStats).map(([lang, s]) => (
                    <div key={lang}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-700 font-medium text-lg">{lang}</span>
                        <span className="text-sm text-gray-500" suppressHydrationWarning>{s.solved}/{s.attempted}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: s.attempted > 0 ? `${Math.round((s.solved/s.attempted)*100)}%` : '0%' }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/interview/setup" className="w-full bg-blue-600 text-white py-4 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center whitespace-nowrap text-xl">
                  <i className="ri-video-line mr-2"></i>
                  Start Interview
                </Link>
                <Link href="/practice" className="w-full bg-green-50 text-green-600 py-4 px-4 rounded-lg font-medium hover:bg-green-100 transition-colors flex items-center justify-center whitespace-nowrap text-xl">
                  <i className="ri-code-line mr-2"></i>
                  Practice Code
                </Link>
                <Link href="/resume-builder" className="w-full bg-purple-50 text-purple-600 py-4 px-4 rounded-lg font-medium hover:bg-purple-100 transition-colors flex items-center justify-center whitespace-nowrap text-xl">
                  <i className="ri-file-text-line mr-2"></i>
                  Edit Resume
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

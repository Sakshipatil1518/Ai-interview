'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getPracticeStats, recordPracticeAttempt, getLangStats } from '../../lib/statsTracker';
import { useAuth } from '../../lib/authContext';
import Navigation from '../../components/Navigation';
import { ALL_PROBLEMS, STARTER_CODE_BY_LANG, Problem } from '../../lib/problemsData';

export default function Practice() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [userCode, setUserCode] = useState('');
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedLang, setSelectedLang] = useState('JavaScript');
  const [realTimeStats, setRealTimeStats] = useState({ attempted: 0, solved: 0, accuracy: 0 });
  const [langStats, setLangStats] = useState<{[k:string]:{attempted:number;solved:number}}>({});
  const [solvedIds, setSolvedIds] = useState<Set<number>>(new Set());
  const [mounted, setMounted] = useState(false);

  const LANGUAGES = [
    { id: 'JavaScript', label: 'JavaScript', icon: 'ri-javascript-line' },
    { id: 'Python', label: 'Python', icon: 'ri-code-s-slash-line' },
    { id: 'Java', label: 'Java', icon: 'ri-cup-line' },
    { id: 'C++', label: 'C++', icon: 'ri-terminal-line' },
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: 'ri-apps-line' },
    { id: 'algorithms', name: 'Algorithms', icon: 'ri-flow-chart' },
    { id: 'data-structures', name: 'Data Structures', icon: 'ri-database-line' },
    { id: 'system-design', name: 'System Design', icon: 'ri-settings-line' },
    { id: 'frontend', name: 'Frontend', icon: 'ri-layout-line' },
    { id: 'backend', name: 'Backend', icon: 'ri-server-line' },
  ];

  const filteredProblems = ALL_PROBLEMS.filter(problem => {
    const matchesCategory = selectedCategory === 'all' || problem.category === selectedCategory;
    const matchesDifficulty = difficulty === 'all' || problem.difficulty.toLowerCase() === difficulty;
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push('/auth/login');
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    const loadStats = () => {
      const saved = getPracticeStats();
      const ls = getLangStats();
      setRealTimeStats({
        attempted: saved.attempted,
        solved: saved.solved,
        accuracy: saved.attempted > 0 ? Math.round((saved.solved / saved.attempted) * 100) : 0
      });
      setLangStats(ls);
    };
    loadStats();
    const interval = setInterval(loadStats, 2000);
    return () => clearInterval(interval);
  }, []);

  const getDifficultyColor = (d: string) => {
    if (d === 'Easy') return 'text-green-600 bg-green-100';
    if (d === 'Medium') return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const runCode = async () => {
    if (!selectedProblem) return;
    setIsRunning(true);
    setTestResults([]);
    await new Promise(r => setTimeout(r, 1000));
    const results = selectedProblem.testCases.map((tc, i) => {
      const passed = Math.random() > 0.3;
      return {
        id: i + 1,
        input: JSON.stringify(tc.input),
        expected: JSON.stringify(tc.expected),
        actual: passed ? JSON.stringify(tc.expected) : JSON.stringify(null),
        passed,
        runtime: Math.floor(Math.random() * 50) + 'ms'
      };
    });
    setTestResults(results);
    setIsRunning(false);
  };

  const submitSolution = async () => {
    if (!selectedProblem || testResults.length === 0) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    const allPassed = testResults.every(r => r.passed);
    recordPracticeAttempt(allPassed, selectedLang);
    if (allPassed) {
      setSolvedIds(prev => new Set([...prev, selectedProblem.id]));
      const saved = getPracticeStats();
      setRealTimeStats({
        attempted: saved.attempted,
        solved: saved.solved,
        accuracy: saved.attempted > 0 ? Math.round((saved.solved / saved.attempted) * 100) : 0
      });
    }
    setIsSubmitting(false);
    if (allPassed) {
      alert('Congratulations! Solution accepted!');
    } else {
      alert('Some test cases failed. Please review your code.');
    }
  };

  const selectProblem = (problem: Problem) => {
    setSelectedProblem(problem);
    const code = STARTER_CODE_BY_LANG[selectedLang]?.[problem.id] || problem.starterCode;
    setUserCode(code);
    setTestResults([]);
  };

  const handleLangChange = (lang: string) => {
    setSelectedLang(lang);
    if (selectedProblem) {
      const code = STARTER_CODE_BY_LANG[lang]?.[selectedProblem.id] || selectedProblem.starterCode;
      setUserCode(code);
      setTestResults([]);
    }
  };

  if (selectedProblem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            suppressHydrationWarning
            onClick={() => setSelectedProblem(null)}
            className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors text-lg font-medium cursor-pointer"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            Back to Problems
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{selectedProblem.title}</h1>
                <span className={`px-3 py-1 rounded-full text-base font-medium ${getDifficultyColor(selectedProblem.difficulty)}`}>
                  {selectedProblem.difficulty}
                </span>
              </div>
              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Problem Statement</h3>
                  <p className="text-gray-700 text-base leading-relaxed">{selectedProblem.problemStatement}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Examples</h3>
                  <div className="space-y-3">
                    {selectedProblem.examples.map((ex, i) => (
                      <div key={i} className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                        <p><strong>Input:</strong> {ex.input}</p>
                        <p><strong>Output:</strong> {ex.output}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 pt-2 border-t border-gray-100">
                  <span><i className="ri-time-line mr-1"></i>{selectedProblem.timeLimit}</span>
                  <span><i className="ri-folder-line mr-1"></i>{selectedProblem.category}</span>
                  {solvedIds.has(selectedProblem.id) && (
                    <span className="text-green-600 font-medium"><i className="ri-check-double-line mr-1"></i>Solved</span>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-blue-100 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                      {LANGUAGES.map(lang => (
                        <button
                          suppressHydrationWarning
                          key={lang.id}
                          onClick={() => handleLangChange(lang.id)}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                            selectedLang === lang.id ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      suppressHydrationWarning
                      onClick={runCode}
                      disabled={isRunning}
                      className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap text-base cursor-pointer ${
                        isRunning ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {isRunning ? <><i className="ri-loader-4-line animate-spin mr-1"></i>Running...</> : <><i className="ri-play-line mr-1"></i>Run</>}
                    </button>
                    <button
                      suppressHydrationWarning
                      onClick={submitSolution}
                      disabled={isSubmitting || testResults.length === 0}
                      className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap text-base cursor-pointer ${
                        isSubmitting || testResults.length === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isSubmitting ? <><i className="ri-loader-4-line animate-spin mr-1"></i>Submitting...</> : <><i className="ri-check-line mr-1"></i>Submit</>}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-4">
                <textarea
                  suppressHydrationWarning
                  value={userCode}
                  onChange={e => setUserCode(e.target.value)}
                  className="w-full h-80 p-4 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-gray-950 text-green-400"
                  placeholder="Write your code here..."
                  style={{ fontFamily: 'Monaco, Consolas, monospace' }}
                />
              </div>

              {testResults.length > 0 && (
                <div className="border-t border-gray-200 p-4 max-h-64 overflow-y-auto">
                  <h4 className="text-base font-semibold text-gray-900 mb-3">Test Results</h4>
                  <div className="space-y-2">
                    {testResults.map(result => (
                      <div key={result.id} className={`p-3 rounded-lg border text-sm ${result.passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">
                            Test {result.id}
                            {result.passed
                              ? <i className="ri-check-line text-green-600 ml-2"></i>
                              : <i className="ri-close-line text-red-600 ml-2"></i>}
                          </span>
                          <span className="text-gray-500">{result.runtime}</span>
                        </div>
                        <div className="mt-1 text-xs text-gray-600 space-y-0.5">
                          <p><strong>Expected:</strong> {result.expected}</p>
                          <p><strong>Got:</strong> {result.actual}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const categoryCounts = categories.reduce((acc, cat) => {
    acc[cat.id] = cat.id === 'all' ? ALL_PROBLEMS.length : ALL_PROBLEMS.filter(p => p.category === cat.id).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">Practice Center</h1>
          <p className="text-xl text-gray-600">100 problems across Algorithms, Data Structures, System Design, Frontend & Backend</p>
        </div>

        {/* Real-time Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base text-gray-600 mb-1">Problems Attempted</p>
                <p className="text-4xl font-bold text-blue-600" suppressHydrationWarning>{realTimeStats.attempted}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-file-list-line text-blue-600 text-2xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base text-gray-600 mb-1">Problems Solved</p>
                <p className="text-4xl font-bold text-green-600" suppressHydrationWarning>{realTimeStats.solved}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-check-line text-green-600 text-2xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base text-gray-600 mb-1">Accuracy Rate</p>
                <p className="text-4xl font-bold text-purple-600" suppressHydrationWarning>{realTimeStats.accuracy.toFixed(1)}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="ri-focus-3-line text-purple-600 text-2xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Language Stats - only render after mount to avoid hydration mismatch */}
        {mounted && Object.keys(langStats).length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
            {LANGUAGES.map(lang => {
              const ls = langStats[lang.id] || { attempted: 0, solved: 0 };
              return (
                <div key={lang.id} className={`bg-white rounded-xl p-4 shadow-sm border ${ls.attempted > 0 ? 'border-blue-200' : 'border-gray-100'}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <i className={`${lang.icon} text-lg ${ls.attempted > 0 ? 'text-blue-600' : 'text-gray-400'}`}></i>
                    <span className="font-semibold text-gray-800 text-sm">{lang.label}</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {ls.solved}<span className="text-sm font-normal text-gray-500">/{ls.attempted}</span>
                  </p>
                  <p className="text-xs text-gray-500">solved / attempted</p>
                </div>
              );
            })}
          </div>
        )}

        {/* Language Selector */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-4 mb-6 flex items-center flex-wrap gap-3">
          <span className="text-base font-semibold text-gray-700 whitespace-nowrap">Practice in:</span>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map(lang => (
              <button
                suppressHydrationWarning
                key={lang.id}
                onClick={() => setSelectedLang(lang.id)}
                className={`flex items-center px-4 py-2 rounded-lg border font-medium text-base transition-all whitespace-nowrap cursor-pointer ${
                  selectedLang === lang.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow'
                    : 'text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                <i className={`${lang.icon} mr-2`}></i>
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-5 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <input
                    suppressHydrationWarning
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search problems..."
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="space-y-1">
                  {categories.map(cat => (
                    <button
                      suppressHydrationWarning
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors cursor-pointer ${
                        selectedCategory === cat.id ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className="flex items-center">
                        <i className={`${cat.icon} mr-2`}></i>
                        {cat.name}
                      </span>
                      <span className="text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full">{categoryCounts[cat.id]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                <div className="space-y-1">
                  {[{v:'all',l:'All Levels'},{v:'easy',l:'Easy'},{v:'medium',l:'Medium'},{v:'hard',l:'Hard'}].map(d => (
                    <button
                      suppressHydrationWarning
                      key={d.v}
                      onClick={() => setDifficulty(d.v)}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer ${
                        difficulty === d.v ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {d.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Problems List */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-blue-100">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Problems <span className="text-gray-400 font-normal">({filteredProblems.length})</span>
                </h2>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                  <i className="ri-code-s-slash-line mr-1"></i>{selectedLang}
                </span>
              </div>
              <div className="p-5">
                {filteredProblems.length === 0 ? (
                  <div className="text-center py-16">
                    <i className="ri-search-line text-5xl text-gray-300 mb-3"></i>
                    <h3 className="text-xl font-semibold text-gray-700 mb-1">No problems found</h3>
                    <p className="text-gray-500">Try adjusting your filters</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredProblems.map(problem => (
                      <div key={problem.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md hover:border-blue-200 transition-all">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1.5 flex-wrap gap-1">
                              <span className="text-xs text-gray-400 font-mono">#{problem.id}</span>
                              <h3 className="text-lg font-semibold text-gray-900">{problem.title}</h3>
                              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                                {problem.difficulty}
                              </span>
                              {mounted && solvedIds.has(problem.id) && (
                                <span className="text-green-600 text-sm"><i className="ri-check-double-line"></i> Solved</span>
                              )}
                            </div>
                            <p className="text-gray-500 mb-2 text-sm">{problem.description}</p>
                            <div className="flex items-center space-x-3 text-xs text-gray-400">
                              <span><i className="ri-time-line mr-1"></i>{problem.timeLimit}</span>
                              <span className="capitalize"><i className="ri-folder-line mr-1"></i>{problem.category.replace('-', ' ')}</span>
                            </div>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <button
                              suppressHydrationWarning
                              onClick={() => selectProblem(problem)}
                              className={`px-5 py-2.5 rounded-lg font-medium transition-colors whitespace-nowrap text-base cursor-pointer ${
                                mounted && solvedIds.has(problem.id)
                                  ? 'bg-green-50 text-green-700 hover:bg-green-100'
                                  : 'bg-blue-600 text-white hover:bg-blue-700'
                              }`}
                            >
                              {mounted && solvedIds.has(problem.id) ? 'Review' : 'Solve'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

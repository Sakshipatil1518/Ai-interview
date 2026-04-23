
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

function InterviewSetupContent() {
  const searchParams = useSearchParams();
  const [role, setRole] = useState('');
  const [industry, setIndustry] = useState('');
  const [experience, setExperience] = useState('');
  const [interviewType, setInterviewType] = useState('ai-only');
  const [duration, setDuration] = useState('45');
  const [languages, setLanguages] = useState<string[]>([]);
  const [resume, setResume] = useState<File | null>(null);
  const [permissions, setPermissions] = useState({
    camera: false,
    microphone: false,
    screen: false
  });
  const [isCheckingPermissions, setIsCheckingPermissions] = useState(false);
  const [permissionErrors, setPermissionErrors] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const roleParam = searchParams.get('role');
    const industryParam = searchParams.get('industry');
    if (roleParam) setRole(roleParam);
    if (industryParam) setIndustry(industryParam);
  }, [searchParams]);

  const experienceLevels = [
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (2-5 years)' },
    { value: 'senior', label: 'Senior Level (5+ years)' },
    { value: 'lead', label: 'Lead/Principal (8+ years)' }
  ];

  const programmingLanguages = [
    'JavaScript', 'Python', 'Java', 'C++', 'TypeScript', 'Go', 'Rust', 'Swift', 'Kotlin'
  ];

  const checkPermissions = async () => {
    setIsCheckingPermissions(true);
    setPermissionErrors([]);
    
    try {
      // Check camera permission
      try {
        const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setPermissions(prev => ({ ...prev, camera: true }));
        cameraStream.getTracks().forEach(track => track.stop());
      } catch (error) {
        setPermissions(prev => ({ ...prev, camera: false }));
        setPermissionErrors(prev => [...prev, 'Camera access denied or not available']);
      }

      // Check microphone permission
      try {
        const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setPermissions(prev => ({ ...prev, microphone: true }));
        micStream.getTracks().forEach(track => track.stop());
      } catch (error) {
        setPermissions(prev => ({ ...prev, microphone: false }));
        setPermissionErrors(prev => [...prev, 'Microphone access denied or not available']);
      }

      // Check screen sharing capability
      try {
        if (navigator.mediaDevices.getDisplayMedia) {
          setPermissions(prev => ({ ...prev, screen: true }));
        } else {
          setPermissions(prev => ({ ...prev, screen: false }));
          setPermissionErrors(prev => [...prev, 'Screen sharing not supported in this browser']);
        }
      } catch (error) {
        setPermissions(prev => ({ ...prev, screen: false }));
        setPermissionErrors(prev => [...prev, 'Screen sharing permission check failed']);
      }

      // Additional system checks
      if (!navigator.getUserMedia && !navigator.mediaDevices) {
        setPermissionErrors(prev => [...prev, 'Media devices not supported in this browser']);
      }

      if (!window.speechSynthesis) {
        setPermissionErrors(prev => [...prev, 'Speech synthesis not supported']);
      }

    } catch (error) {
      console.error('Permission check failed:', error);
      setPermissionErrors(prev => [...prev, 'System permission check failed']);
    } finally {
      setIsCheckingPermissions(false);
    }
  };

  const handleLanguageToggle = (lang: string) => {
    setLanguages(prev => 
      prev.includes(lang) 
        ? prev.filter(l => l !== lang)
        : [...prev, lang]
    );
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setResume(file);
    }
  };

  const isFormValid = role && industry && experience && languages.length > 0 && permissions.camera && permissions.microphone;

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" suppressHydrationWarning={true}>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold font-['Pacifico']">
              InterviewAI
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Step 1 of 2</span>
              <div className="w-32 h-2 bg-gray-200 rounded-full">
                <div className="w-1/2 h-full bg-indigo-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Interview Setup</h1>
            <p className="text-lg text-gray-600">Configure your AI interview experience</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Role</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., Frontend Developer"
                    suppressHydrationWarning={true}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., EdTech"
                    suppressHydrationWarning={true}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                  <div className="space-y-2">
                    {experienceLevels.map((level) => (
                      <label key={level.value} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="experience"
                          value={level.value}
                          checked={experience === level.value}
                          onChange={(e) => setExperience(e.target.value)}
                          className="mr-3"
                          suppressHydrationWarning={true}
                        />
                        <span className="text-sm text-gray-700">{level.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Interview Type</label>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="interviewType"
                        value="ai-only"
                        checked={interviewType === 'ai-only'}
                        onChange={(e) => setInterviewType(e.target.value)}
                        className="mr-3"
                        suppressHydrationWarning={true}
                      />
                      <span className="text-sm text-gray-700">AI-Only Interview</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="interviewType"
                        value="human-copilot"
                        checked={interviewType === 'human-copilot'}
                        onChange={(e) => setInterviewType(e.target.value)}
                        className="mr-3"
                        suppressHydrationWarning={true}
                      />
                      <span className="text-sm text-gray-700">Human Co-pilot Mode</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Advanced Settings */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Interview Duration</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-8"
                    suppressHydrationWarning={true}
                  >
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Programming Languages</label>
                  <div className="grid grid-cols-3 gap-2">
                    {programmingLanguages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => handleLanguageToggle(lang)}
                        className={`p-2 text-sm rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                          languages.includes(lang)
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-indigo-300'
                        }`}
                        suppressHydrationWarning={true}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Resume (Optional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleResumeUpload}
                      className="hidden"
                      id="resume-upload"
                      suppressHydrationWarning={true}
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <i className="ri-upload-line text-2xl text-gray-400 mb-2"></i>
                      <p className="text-sm text-gray-600">
                        {resume ? resume.name : 'Click to upload PDF resume'}
                      </p>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Permission Checks */}
            <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Requirements</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Camera Access</span>
                  <div className="flex items-center">
                    <span className={`text-sm mr-2 ${permissions.camera ? 'text-green-600' : 'text-red-600'}`}>
                      {permissions.camera ? 'Granted' : 'Required'}
                    </span>
                    <i className={`ri-${permissions.camera ? 'check' : 'close'}-line text-lg ${permissions.camera ? 'text-green-600' : 'text-red-600'}`}></i>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Microphone Access</span>
                  <div className="flex items-center">
                    <span className={`text-sm mr-2 ${permissions.microphone ? 'text-green-600' : 'text-red-600'}`}>
                      {permissions.microphone ? 'Granted' : 'Required'}
                    </span>
                    <i className={`ri-${permissions.microphone ? 'check' : 'close'}-line text-lg ${permissions.microphone ? 'text-green-600' : 'text-red-600'}`}></i>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Screen Recording</span>
                  <div className="flex items-center">
                    <span className={`text-sm mr-2 ${permissions.screen ? 'text-green-600' : 'text-orange-600'}`}>
                      {permissions.screen ? 'Ready' : 'Will be requested'}
                    </span>
                    <i className={`ri-${permissions.screen ? 'check' : 'information'}-line text-lg ${permissions.screen ? 'text-green-600' : 'text-orange-600'}`}></i>
                  </div>
                </div>
              </div>
              
              {/* Permission Errors */}
              {permissionErrors.length > 0 && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="text-sm font-medium text-red-800 mb-2">Permission Issues:</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    {permissionErrors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <button
                onClick={checkPermissions}
                disabled={isCheckingPermissions}
                className={`mt-4 px-4 py-2 rounded-lg text-sm transition-colors whitespace-nowrap ${
                  isCheckingPermissions 
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
                suppressHydrationWarning={true}
              >
                {isCheckingPermissions ? (
                  <>
                    <i className="ri-loader-4-line animate-spin mr-1"></i>
                    Checking...
                  </>
                ) : (
                  <>
                    <i className="ri-shield-check-line mr-1"></i>
                    Check Permissions
                  </>
                )}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-between">
              <Link
                href="/"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Back to Home
              </Link>
              <Link
                href={isFormValid ? `/interview/room?role=${encodeURIComponent(role)}&industry=${encodeURIComponent(industry)}&experience=${experience}&type=${interviewType}&duration=${duration}&languages=${languages.join(',')}` : '#'}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                  isFormValid
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Start Interview
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function InterviewSetup() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <InterviewSetupContent />
    </Suspense>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { generateResumePDF, ResumeData } from '../../lib/pdfGenerator';

export default function ResumeBuilder() {
  const [activeSection, setActiveSection] = useState('template');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [showPreview, setShowPreview] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  const [resumeData, setResumeData] = useState<ResumeData>({
    personal: {
      fullName: 'Alex Rodriguez',
      email: 'alex.rodriguez@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      portfolio: 'https://alexrodriguez.dev',
      linkedin: 'https://linkedin.com/in/alexrodriguez',
      github: 'https://github.com/alexrodriguez'
    },
    summary: {
      text: 'Passionate full-stack developer with 3+ years of experience building scalable web applications using React, Node.js, and cloud technologies. Strong problem-solving skills and commitment to writing clean, maintainable code.'
    },
    experience: [
      {
        company: 'TechCorp',
        position: 'Senior Full Stack Developer',
        location: 'San Francisco, CA',
        startDate: '2022-01',
        endDate: 'Present',
        description: 'Led development of microservices architecture serving 100K+ users. Improved application performance by 40% through code optimization and database query improvements.'
      },
      {
        company: 'StartupXYZ',
        position: 'Frontend Developer',
        location: 'San Francisco, CA',
        startDate: '2021-06',
        endDate: '2021-12',
        description: 'Developed responsive web applications using React and TypeScript. Collaborated with design team to implement pixel-perfect UI components.'
      }
    ],
    education: [
      {
        school: 'University of California, Berkeley',
        degree: 'Bachelor of Science in Computer Science',
        location: 'Berkeley, CA',
        startDate: '2017-09',
        endDate: '2021-05',
        gpa: '3.8'
      }
    ],
    skills: [
      'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'MongoDB', 'PostgreSQL', 'Docker', 'Kubernetes'
    ],
    projects: [
      {
        name: 'E-commerce Platform',
        description: 'Full-stack e-commerce application with payment processing and inventory management',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        link: 'https://github.com/alexrodriguez/ecommerce'
      },
      {
        name: 'Task Management App',
        description: 'Real-time collaborative task management application with team features',
        technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
        link: 'https://github.com/alexrodriguez/taskmanager'
      }
    ]
  });

  // Real-time auto-save simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setSaveStatus('Saving...');
      setTimeout(() => {
        setSaveStatus('Saved');
        setTimeout(() => setSaveStatus(''), 2000);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handlePersonalInfoChange = (field: keyof ResumeData['personal'], value: string) => {
    setResumeData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value
      }
    }));
  };

  const handleSummaryChange = (value: string) => {
    setResumeData(prev => ({
      ...prev,
      summary: {
        text: value
      }
    }));
  };

  const addExperience = () => {
    const newExperience = {
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience]
    }));
  };

  const updateExperience = (index: number, field: keyof ResumeData['experience'][0], value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    const newEducation = {
      school: '',
      degree: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: ''
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };

  const updateEducation = (index: number, field: keyof ResumeData['education'][0], value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addProject = () => {
    const newProject = {
      name: '',
      description: '',
      technologies: [],
      link: ''
    };
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const updateProject = (index: number, field: keyof ResumeData['projects'][0], value: string | string[]) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) =>
        i === index ? { ...proj, [field]: value } : proj
      )
    }));
  };

  const removeProject = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const addSkill = (skill: string) => {
    if (skill && !resumeData.skills.includes(skill)) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const filename = `${resumeData.personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
      const validTemplates = ['modern', 'classic', 'creative', 'minimal', 'tech', 'corporate'] as const;
      const templateToUse = validTemplates.includes(selectedTemplate as any) 
        ? selectedTemplate as 'modern' | 'classic' | 'creative' | 'minimal' | 'tech' | 'corporate'
        : 'modern';
      generateResumePDF(resumeData, filename, templateToUse);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const templates = [
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Clean, contemporary design with subtle colors',
      preview: 'https://readdy.ai/api/search-image?query=modern%20professional%20resume%20template%20with%20clean%20typography%2C%20minimal%20design%2C%20subtle%20blue%20accents%2C%20organized%20sections%2C%20contemporary%20layout%2C%20business%20professional%20style&width=300&height=400&seq=modern-template&orientation=portrait',
      features: ['Clean typography', 'Subtle color accents', 'ATS-friendly', 'Modern layout']
    },
    {
      id: 'classic',
      name: 'Classic Executive',
      description: 'Traditional, formal design for executive roles',
      preview: 'https://readdy.ai/api/search-image?query=classic%20executive%20resume%20template%20with%20traditional%20formal%20design%2C%20professional%20black%20and%20white%20layout%2C%20elegant%20typography%2C%20structured%20sections%2C%20corporate%20style&width=300&height=400&seq=classic-template&orientation=portrait',
      features: ['Traditional layout', 'Formal styling', 'Executive focus', 'Timeless design']
    },
    {
      id: 'creative',
      name: 'Creative Designer',
      description: 'Stylish design for creative professionals',
      preview: 'https://readdy.ai/api/search-image?query=creative%20designer%20resume%20template%20with%20stylish%20modern%20design%2C%20colorful%20accents%2C%20artistic%20layout%2C%20creative%20typography%2C%20portfolio%20style%2C%20designer%20focused&width=300&height=400&seq=creative-template&orientation=portrait',
      features: ['Creative layout', 'Color highlights', 'Visual appeal', 'Designer-friendly']
    },
    {
      id: 'minimal',
      name: 'Minimal Clean',
      description: 'Ultra-clean design with maximum readability',
      preview: 'https://readdy.ai/api/search-image?query=minimal%20clean%20resume%20template%20with%20ultra%20simple%20design%2C%20maximum%20white%20space%2C%20clean%20lines%2C%20minimal%20typography%2C%20professional%20simplicity%2C%20easy%20to%20read&width=300&height=400&seq=minimal-template&orientation=portrait',
      features: ['Ultra-clean', 'Maximum readability', 'Minimal design', 'Focus on content']
    },
    {
      id: 'tech',
      name: 'Tech Professional',
      description: 'Modern tech-focused design with code elements',
      preview: 'https://readdy.ai/api/search-image?query=tech%20professional%20resume%20template%20with%20modern%20technology%20design%2C%20code%20elements%2C%20developer%20focused%20layout%2C%20technical%20styling%2C%20programming%20theme%2C%20software%20engineer%20style&width=300&height=400&seq=tech-template&orientation=portrait',
      features: ['Tech-focused', 'Code elements', 'Developer-friendly', 'Modern tech style']
    },
    {
      id: 'corporate',
      name: 'Corporate Standard',
      description: 'Professional corporate design for business roles',
      preview: 'https://readdy.ai/api/search-image?query=corporate%20standard%20resume%20template%20with%20professional%20business%20design%2C%20formal%20corporate%20layout%2C%20structured%20sections%2C%20business%20professional%20style%2C%20office%20appropriate&width=300&height=400&seq=corporate-template&orientation=portrait',
      features: ['Corporate styling', 'Business-focused', 'Professional layout', 'Industry standard']
    }
  ];

  const handlePreview = () => {
    setShowPreview(true);
  };

  const sections = [
    { id: 'template', name: 'Choose Template', icon: 'ri-layout-line' },
    { id: 'personal', name: 'Personal Info', icon: 'ri-user-3-line' },
    { id: 'summary', name: 'Summary', icon: 'ri-file-text-line' },
    { id: 'experience', name: 'Experience', icon: 'ri-briefcase-4-line' },
    { id: 'education', name: 'Education', icon: 'ri-graduation-cap-line' },
    { id: 'skills', name: 'Skills', icon: 'ri-tools-line' },
    { id: 'projects', name: 'Projects', icon: 'ri-code-s-slash-line' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-3xl font-bold text-slate-800" style={{ fontFamily: 'Pacifico, serif' }}>
              InterviewAI
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-slate-600 hover:text-slate-900 transition-colors text-lg font-medium">Dashboard</Link>
              <Link href="/practice" className="text-slate-600 hover:text-slate-900 transition-colors text-lg font-medium">Practice</Link>
              <Link href="/leaderboard" className="text-slate-600 hover:text-slate-900 transition-colors text-lg font-medium">Leaderboard</Link>
              <Link href="/profile" className="text-slate-600 hover:text-slate-900 transition-colors text-lg font-medium">Profile</Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <Link href="/auth/login" className="text-slate-600 hover:text-slate-900 transition-colors text-lg font-medium">Login</Link>
              <Link href="/auth/signup" className="bg-slate-900 text-white px-5 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors whitespace-nowrap text-lg">Sign Up</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <i className="ri-star-line mr-2"></i>
            Professional Resume Builder
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Build Your Perfect Resume
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Create a professional, ATS-friendly resume that gets you noticed by top employers
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-8 bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-4">
          <div className="flex items-center space-x-4">
            {saveStatus && (
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${saveStatus === 'Saved' ? 'bg-green-500' : 'bg-blue-500 animate-pulse'}`}></div>
                <span className={`text-sm font-medium ${saveStatus === 'Saved' ? 'text-green-600' : 'text-blue-600'}`}>
                  {saveStatus}
                </span>
              </div>
            )}
            <div className="text-sm text-slate-500">
              Template: {templates.find(t => t.id === selectedTemplate)?.name}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={handlePreview}
              className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors whitespace-nowrap"
            >
              <i className="ri-eye-line mr-2"></i>
              Preview
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap shadow-sm ${
                isGeneratingPDF
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-md'
              }`}
            >
              {isGeneratingPDF ? (
                <>
                  <i className="ri-loader-4-line animate-spin mr-2"></i>
                  Generating PDF...
                </>
              ) : (
                <>
                  <i className="ri-download-cloud-line mr-2"></i>
                  Download PDF
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Resume Sections</h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 cursor-pointer ${
                      activeSection === section.id
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <i className={`${section.icon} mr-3 text-lg`}></i>
                    <span className="font-medium">{section.name}</span>
                  </button>
                ))}
              </nav>
              
              {/* Progress Indicator */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700">Completion</span>
                  <span className="text-sm text-slate-500">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-slate-900 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              {/* Template Selection Section */}
              {activeSection === 'template' && (
                <div>
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mr-4">
                      <i className="ri-layout-line text-slate-600 text-xl"></i>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Choose Your Template</h2>
                      <p className="text-slate-600">Select a professional design that matches your industry</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`relative cursor-pointer rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                          selectedTemplate === template.id
                            ? 'border-slate-900 shadow-lg'
                            : 'border-gray-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="p-4">
                          <div className="aspect-[3/4] mb-4 rounded-lg overflow-hidden bg-gray-100">
                            <img
                              src={template.preview}
                              alt={template.name}
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-slate-900">{template.name}</h3>
                              {selectedTemplate === template.id && (
                                <div className="w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center">
                                  <i className="ri-check-line text-white text-sm"></i>
                                </div>
                              )}
                            </div>
                            
                            <p className="text-sm text-slate-600">{template.description}</p>
                            
                            <div className="flex flex-wrap gap-1">
                              {template.features.map((feature, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {selectedTemplate === template.id && (
                          <div className="absolute inset-0 bg-slate-900/5 rounded-xl pointer-events-none"></div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">💡 Template Selection Tips</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• <strong>Modern Professional:</strong> Great for tech, startups, and creative industries</li>
                      <li>• <strong>Classic Executive:</strong> Perfect for senior roles and traditional industries</li>
                      <li>• <strong>Creative Designer:</strong> Ideal for design, marketing, and creative positions</li>
                      <li>• <strong>Minimal Clean:</strong> Works well for any industry, maximum ATS compatibility</li>
                      <li>• <strong>Tech Professional:</strong> Designed specifically for developers and engineers</li>
                      <li>• <strong>Corporate Standard:</strong> Best for finance, consulting, and corporate roles</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Personal Info Section */}
              {activeSection === 'personal' && (
                <div>
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mr-4">
                      <i className="ri-user-3-line text-slate-600 text-xl"></i>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Personal Information</h2>
                      <p className="text-slate-600">Your contact details and professional links</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={resumeData.personal.fullName}
                        onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        value={resumeData.personal.email}
                        onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        value={resumeData.personal.phone}
                        onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Location *</label>
                      <input
                        type="text"
                        value={resumeData.personal.location}
                        onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                        placeholder="City, State"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Portfolio Website</label>
                      <input
                        type="url"
                        value={resumeData.personal.portfolio}
                        onChange={(e) => handlePersonalInfoChange('portfolio', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                        placeholder="https://yourportfolio.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">LinkedIn Profile</label>
                      <input
                        type="url"
                        value={resumeData.personal.linkedin}
                        onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">GitHub Profile</label>
                      <input
                        type="url"
                        value={resumeData.personal.github}
                        onChange={(e) => handlePersonalInfoChange('github', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                        placeholder="https://github.com/yourusername"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Summary Section */}
              {activeSection === 'summary' && (
                <div>
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mr-4">
                      <i className="ri-file-text-line text-slate-600 text-xl"></i>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Professional Summary</h2>
                      <p className="text-slate-600">A compelling overview of your professional background</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Summary Statement</label>
                      <textarea
                        value={resumeData.summary.text}
                        onChange={(e) => handleSummaryChange(e.target.value)}
                        rows={6}
                        maxLength={500}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors resize-none"
                        placeholder="Write a compelling summary that highlights your key achievements, skills, and career objectives. Keep it concise and impactful."
                      />
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-sm text-slate-500">
                          {resumeData.summary.text.length}/500 characters
                        </p>
                        <div className="flex space-x-2">
                          <span className={`px-2 py-1 rounded text-xs ${resumeData.summary.text.length > 400 ? 'bg-red-100 text-red-600' : resumeData.summary.text.length > 300 ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                            {resumeData.summary.text.length > 400 ? 'Too long' : resumeData.summary.text.length > 300 ? 'Good length' : 'Add more detail'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tips</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Start with your years of experience and key expertise</li>
                        <li>• Include 2-3 major achievements with quantifiable results</li>
                        <li>• Mention relevant technologies and skills</li>
                        <li>• End with your career goals or what you bring to employers</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Experience Section */}
              {activeSection === 'experience' && (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mr-4">
                        <i className="ri-briefcase-4-line text-slate-600 text-xl"></i>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">Work Experience</h2>
                        <p className="text-slate-600">Your professional work history and achievements</p>
                      </div>
                    </div>
                    <button
                      onClick={addExperience}
                      className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors whitespace-nowrap flex items-center"
                    >
                      <i className="ri-add-line mr-2"></i>
                      Add Experience
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {resumeData.experience.map((exp, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-sm font-semibold text-slate-600">{index + 1}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900">Experience Entry</h3>
                          </div>
                          <button
                            onClick={() => removeExperience(index)}
                            className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                          >
                            <i className="ri-delete-bin-line text-lg"></i>
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Job Title *</label>
                            <input
                              type="text"
                              value={exp.position}
                              onChange={(e) => updateExperience(index, 'position', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                              placeholder="e.g. Senior Software Engineer"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Company *</label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => updateExperience(index, 'company', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                              placeholder="e.g. Google Inc."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
                            <input
                              type="text"
                              value={exp.location}
                              onChange={(e) => updateExperience(index, 'location', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                              placeholder="e.g. San Francisco, CA"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-sm font-semibold text-slate-700 mb-2">Start Date</label>
                              <input
                                type="month"
                                value={exp.startDate}
                                onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-slate-700 mb-2">End Date</label>
                              <input
                                type="month"
                                value={exp.endDate}
                                onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                                placeholder="Leave blank if current"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Job Description & Achievements</label>
                          <textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(index, 'description', e.target.value)}
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors resize-none"
                            placeholder="Describe your key responsibilities and achievements. Use bullet points and quantify results where possible."
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education Section */}
              {activeSection === 'education' && (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mr-4">
                        <i className="ri-graduation-cap-line text-slate-600 text-xl"></i>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">Education</h2>
                        <p className="text-slate-600">Your academic background and qualifications</p>
                      </div>
                    </div>
                    <button
                      onClick={addEducation}
                      className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors whitespace-nowrap flex items-center"
                    >
                      <i className="ri-add-line mr-2"></i>
                      Add Education
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {resumeData.education.map((edu, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-sm font-semibold text-slate-600">{index + 1}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900">Education Entry</h3>
                          </div>
                          <button
                            onClick={() => removeEducation(index)}
                            className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                          >
                            <i className="ri-delete-bin-line text-lg"></i>
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Institution *</label>
                            <input
                              type="text"
                              value={edu.school}
                              onChange={(e) => updateEducation(index, 'school', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                              placeholder="e.g. Stanford University"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Degree & Major *</label>
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                              placeholder="e.g. Bachelor of Science in Computer Science"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
                            <input
                              type="text"
                              value={edu.location}
                              onChange={(e) => updateEducation(index, 'location', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                              placeholder="e.g. Stanford, CA"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">GPA (Optional)</label>
                            <input
                              type="text"
                              value={edu.gpa}
                              onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                              placeholder="e.g. 3.8/4.0"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Start Date</label>
                            <input
                              type="month"
                              value={edu.startDate}
                              onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">End Date</label>
                            <input
                              type="month"
                              value={edu.endDate}
                              onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Section */}
              {activeSection === 'skills' && (
                <div>
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mr-4">
                      <i className="ri-tools-line text-slate-600 text-xl"></i>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Technical Skills</h2>
                      <p className="text-slate-600">Your technical competencies and expertise</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-4">Skills</label>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {resumeData.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-2 bg-slate-100 text-slate-800 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
                          >
                            {skill}
                            <button
                              onClick={() => removeSkill(skill)}
                              className="ml-2 text-slate-500 hover:text-red-600 transition-colors"
                            >
                              <i className="ri-close-line text-sm"></i>
                            </button>
                          </span>
                        ))}
                      </div>
                      <input
                        type="text"
                        placeholder="Type a skill and press Enter to add..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const target = e.target as HTMLInputElement;
                            addSkill(target.value.trim());
                            target.value = '';
                          }
                        }}
                      />
                    </div>
                    
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <h4 className="font-semibold text-amber-900 mb-2">💡 Skill Categories</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-amber-800">
                        <div>
                          <h5 className="font-medium mb-1">Programming Languages</h5>
                          <p className="text-xs">JavaScript, Python, Java, C++</p>
                        </div>
                        <div>
                          <h5 className="font-medium mb-1">Frameworks & Libraries</h5>
                          <p className="text-xs">React, Node.js, Django, Spring</p>
                        </div>
                        <div>
                          <h5 className="font-medium mb-1">Tools & Technologies</h5>
                          <p className="text-xs">AWS, Docker, Git, MongoDB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Projects Section */}
              {activeSection === 'projects' && (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mr-4">
                        <i className="ri-code-s-slash-line text-slate-600 text-xl"></i>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">Projects</h2>
                        <p className="text-slate-600">Showcase your best work and achievements</p>
                      </div>
                    </div>
                    <button
                      onClick={addProject}
                      className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors whitespace-nowrap flex items-center"
                    >
                      <i className="ri-add-line mr-2"></i>
                      Add Project
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {resumeData.projects.map((project, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-sm font-semibold text-slate-600">{index + 1}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900">Project Entry</h3>
                          </div>
                          <button
                            onClick={() => removeProject(index)}
                            className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                          >
                            <i className="ri-delete-bin-line text-lg"></i>
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Project Name *</label>
                            <input
                              type="text"
                              value={project.name}
                              onChange={(e) => updateProject(index, 'name', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                              placeholder="e.g. E-commerce Platform"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Project Link</label>
                            <input
                              type="url"
                              value={project.link}
                              onChange={(e) => updateProject(index, 'link', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                              placeholder="https://github.com/username/project"
                            />
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Project Description</label>
                          <textarea
                            value={project.description}
                            onChange={(e) => updateProject(index, 'description', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors resize-none"
                            placeholder="Describe what the project does, your role, and key achievements..."
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Technologies Used</label>
                          <input
                            type="text"
                            value={project.technologies.join(', ')}
                            onChange={(e) => updateProject(index, 'technologies', e.target.value.split(', ').filter(tech => tech.trim()))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-colors"
                            placeholder="React, Node.js, MongoDB, AWS (separate with commas)"
                          />
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

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-slate-900">Resume Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-2xl mx-auto">
                <ResumePreview data={resumeData} template={selectedTemplate} />
              </div>
            </div>
            
            <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowPreview(false)}
                className="px-5 py-2.5 text-slate-600 hover:text-slate-900 border border-gray-300 rounded-lg transition-colors font-medium whitespace-nowrap"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowPreview(false);
                  handleDownloadPDF();
                }}
                disabled={isGeneratingPDF}
                className={`flex items-center px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200 whitespace-nowrap shadow-md ${
                  isGeneratingPDF
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-slate-900 text-white hover:bg-slate-700 hover:shadow-lg'
                }`}
              >
                {isGeneratingPDF ? (
                  <>
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <i className="ri-download-cloud-2-fill mr-2 text-xl"></i>
                    Download PDF
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Resume Preview Component
function ResumePreview({ data, template }: { data: ResumeData; template: string }) {
  const templateStyles = {
    modern: 'border-l-4 border-blue-500',
    classic: 'border-b-2 border-gray-800',
    creative: 'border-l-4 border-purple-500',
    minimal: '',
    tech: 'border-l-4 border-green-500',
    corporate: 'border-b-2 border-blue-800'
  };

  return (
    <div className={`space-y-6 ${templateStyles[template as keyof typeof templateStyles]}`}>
      {/* Header */}
      <div className="text-center pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{data.personal.fullName}</h1>
        <div className="text-sm text-gray-600 space-y-1">
          <div>{data.personal.email} | {data.personal.phone}</div>
          <div>{data.personal.location}</div>
          {data.personal.portfolio && <div>{data.personal.portfolio}</div>}
        </div>
      </div>

      {/* Summary */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-300 pb-1">
          PROFESSIONAL SUMMARY
        </h2>
        <p className="text-sm text-gray-700">{data.summary.text}</p>
      </div>

      {/* Experience */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-300 pb-1">
          WORK EXPERIENCE
        </h2>
        <div className="space-y-3">
          {data.experience.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                <span className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</span>
              </div>
              <div className="text-sm text-gray-700 mb-1">{exp.company} | {exp.location}</div>
              <p className="text-sm text-gray-600">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-300 pb-1">
          EDUCATION
        </h2>
        <div className="space-y-2">
          {data.education.map((edu, index) => (
            <div key={index}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.school}</h3>
                  <div className="text-sm text-gray-700">{edu.degree}</div>
                  {edu.gpa && <div className="text-sm text-gray-600">GPA: {edu.gpa}</div>}
                </div>
                <span className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-300 pb-1">
          TECHNICAL SKILLS
        </h2>
        <div className="text-sm text-gray-700">
          {data.skills.join(' • ')}
        </div>
      </div>

      {/* Projects */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-300 pb-1">
          PROJECTS
        </h2>
        <div className="space-y-2">
          {data.projects.map((project, index) => (
            <div key={index}>
              <h3 className="font-semibold text-gray-900">{project.name}</h3>
              <div className="text-sm text-gray-600 mb-1">
                Technologies: {project.technologies.join(', ')}
              </div>
              <p className="text-sm text-gray-700">{project.description}</p>
              {project.link && (
                <div className="text-sm text-gray-600">{project.link}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

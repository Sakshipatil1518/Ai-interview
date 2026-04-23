
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../../lib/languageContext';
import { feedbackEngine, RealTimeFeedback, QuestionResult } from '../../../lib/feedbackEngine';
import { questionEngine, Question, AnswerValidation } from '../../../lib/questionEngine';

interface AIInterviewerProps {
  question: string;
  response: string;
  isLoading: boolean;
  onNewQuestion: () => void;
  role: string;
  industry: string;
  experience: string;
  currentQuestionObj?: Question;
  onQuestionAnswered?: (result: QuestionResult) => void;
}

export default function AIInterviewer({
  question,
  response,
  isLoading,
  onNewQuestion,
  role,
  industry,
  experience,
  currentQuestionObj,
  onQuestionAnswered
}: AIInterviewerProps) {
  const { t } = useLanguage();
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<
    Array<{ type: 'ai' | 'user'; message: string; timestamp: Date; feedback?: RealTimeFeedback[]; validation?: AnswerValidation; questionCard?: Question }>
  >([]);
  const [userInput, setUserInput] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [realTimeFeedback, setRealTimeFeedback] = useState<RealTimeFeedback[]>([]);
  const [currentScores, setCurrentScores] = useState(feedbackEngine.getCurrentScores());
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [showValidation, setShowValidation] = useState(false);
  const [lastValidation, setLastValidation] = useState<AnswerValidation | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if speech recognition is supported
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSpeechSupported(true);
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: any) => {
          let finalTranscript = '';
          let interimTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }

          if (finalTranscript) {
            setUserInput(prev => prev + finalTranscript);
          }
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  useEffect(() => {
    if (currentQuestionObj) {
      showQuestionInChat(currentQuestionObj, response);
      setQuestionStartTime(Date.now());
    }
  }, [currentQuestionObj?.id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationHistory]);

  const showQuestionInChat = async (questionObj: Question, contextMsg: string) => {
    setIsTyping(true);
    setCurrentMessage('');
    await new Promise(resolve => setTimeout(resolve, 600));
    setIsTyping(false);

    setConversationHistory(prev => [...prev, {
      type: 'ai',
      message: contextMsg,
      timestamp: new Date(),
      questionCard: questionObj
    }]);

    speakMessage(questionObj.question);
  };

  const typeMessage = async (message: string) => {
    setIsTyping(true);
    setCurrentMessage('');
    
    for (let i = 0; i <= message.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 30));
      setCurrentMessage(message.slice(0, i));
    }
    
    setIsTyping(false);
    
    setConversationHistory(prev => [...prev, {
      type: 'ai',
      message: message,
      timestamp: new Date()
    }]);

    speakMessage(message);
  };

  const speakMessage = (message: string) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.voice = speechSynthesis.getVoices().find(voice => voice.name.includes('Google') || voice.name.includes('Microsoft')) || speechSynthesis.getVoices()[0];
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      speechSynthesisRef.current = utterance;
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && speechSupported) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleUserResponse = async () => {
    if (userInput.trim() && currentQuestionObj) {
      const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);
      
      // Validate the answer
      const validation = questionEngine.validateAnswer(
        currentQuestionObj.id, 
        userInput, 
        currentQuestionObj.type === 'coding' ? userInput : undefined
      );

      // Analyze response and get real-time feedback
      const feedback = feedbackEngine.analyzeResponse(userInput);
      const scores = feedbackEngine.getCurrentScores();
      
      // Create question result
      const questionResult: QuestionResult = {
        questionId: currentQuestionObj.id,
        question: currentQuestionObj.question,
        userAnswer: userInput,
        userCode: currentQuestionObj.type === 'coding' ? userInput : undefined,
        validation,
        timestamp: Date.now(),
        timeSpent
      };

      // Add to feedback engine
      feedbackEngine.addQuestionResult(questionResult);
      
      // Add to conversation history with validation
      setConversationHistory(prev => [...prev, {
        type: 'user',
        message: userInput,
        timestamp: new Date(),
        feedback: feedback,
        validation: validation
      }]);
      
      setRealTimeFeedback(feedback);
      setCurrentScores(scores);
      setLastValidation(validation);
      setShowValidation(true);
      setUserInput('');

      // Notify parent component
      if (onQuestionAnswered) {
        onQuestionAnswered(questionResult);
      }
      
      // Generate follow-up or next question after showing validation
      setTimeout(() => {
        setShowValidation(false);
        if (validation.isCorrect) {
          typeMessage("Great job! That's correct. Let me ask you another question.");
        } else {
          typeMessage(`Not quite right. The correct approach is: ${validation.correctAnswer}. Let's try another question.`);
        }
        
        setTimeout(() => {
          onNewQuestion();
        }, 2000);
      }, 3000);
    }
  };

  const generateFollowUpQuestion = () => {
    const followUpQuestions = [
      "That's interesting. Can you elaborate on that approach?",
      "Great! Now let me ask you about a different scenario...",
      "I see. How would you handle this in a production environment?",
      "Excellent point. Let's dive deeper into the technical implementation.",
      "That makes sense. What challenges might you face with this solution?"
    ];
    
    const randomFollowUp = followUpQuestions[Math.floor(Math.random() * followUpQuestions.length)];
    typeMessage(randomFollowUp);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return t('excellent');
    if (score >= 60) return t('good');
    if (score >= 40) return t('fair');
    return t('needsImprovement');
  };

  return (
    <div className="h-full bg-gray-800 flex flex-col">
      {/* AI Avatar Section */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <i className="ri-robot-line text-white text-xl"></i>
            </div>
            {(isTyping || isSpeaking) && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold">{t('aiInterviewer')}</h3>
            <p className="text-gray-400 text-sm">
              {isTyping ? t('typing') : isSpeaking ? t('speaking') : t('readyToAssist')}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={stopSpeaking}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isSpeaking ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
              }`}
              title={t('stopSpeaking')}
            >
              <i className="ri-volume-mute-line text-white text-sm"></i>
            </button>
            <button
              onClick={onNewQuestion}
              className="w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center transition-colors"
              title={t('nextQuestion')}
            >
              <i className="ri-arrow-right-line text-white text-sm"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Feedback Panel */}
      <div className="p-3 bg-gray-700 border-b border-gray-600">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-300">{t('technicalSkills')}:</span>
            <span className={getScoreColor(currentScores.technical)}>
              {currentScores.technical}/100
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">{t('communicationSkills')}:</span>
            <span className={getScoreColor(currentScores.communication)}>
              {currentScores.communication}/100
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">{t('problemSolving')}:</span>
            <span className={getScoreColor(currentScores.problemSolving)}>
              {currentScores.problemSolving}/100
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">{t('codeQuality')}:</span>
            <span className={getScoreColor(currentScores.codeQuality)}>
              {currentScores.codeQuality}/100
            </span>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-gray-600 flex justify-between">
          <span className="text-white font-medium text-sm">Overall Score:</span>
          <span className={`${getScoreColor(currentScores.overall)} font-bold`}>
            {currentScores.overall}/100 ({getScoreLabel(currentScores.overall)})
          </span>
        </div>
      </div>

      {/* Answer Validation Modal */}
      {showValidation && lastValidation && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-800 rounded-lg p-6 max-w-md mx-4 border border-gray-600"
          >
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                lastValidation.isCorrect ? 'bg-green-600' : 'bg-red-600'
              }`}>
                <i className={`ri-${lastValidation.isCorrect ? 'check' : 'close'}-line text-white text-2xl`}></i>
              </div>
              
              <h3 className={`text-xl font-bold mb-2 ${
                lastValidation.isCorrect ? 'text-green-400' : 'text-red-400'
              }`}>
                {lastValidation.isCorrect ? 'Correct!' : 'Incorrect'}
              </h3>
              
              <div className="text-gray-300 mb-4">
                <p className="text-sm mb-2">Score: {lastValidation.score}/100</p>
                <p className="text-xs">{lastValidation.feedback}</p>
              </div>

              {!lastValidation.isCorrect && (
                <div className="bg-gray-700 rounded-lg p-3 mb-4">
                  <h4 className="text-green-400 font-semibold text-sm mb-2">Correct Answer:</h4>
                  <p className="text-gray-300 text-xs">{lastValidation.correctAnswer}</p>
                </div>
              )}

              {lastValidation.keyPointsCovered.length > 0 && (
                <div className="bg-green-900/30 rounded-lg p-3 mb-2">
                  <h4 className="text-green-400 font-semibold text-sm mb-1">Points Covered:</h4>
                  <ul className="text-xs text-gray-300">
                    {lastValidation.keyPointsCovered.map((point, index) => (
                      <li key={index}>• {point}</li>
                    ))}
                  </ul>
                </div>
              )}

              {lastValidation.missedPoints.length > 0 && (
                <div className="bg-red-900/30 rounded-lg p-3">
                  <h4 className="text-red-400 font-semibold text-sm mb-1">Missed Points:</h4>
                  <ul className="text-xs text-gray-300">
                    {lastValidation.missedPoints.map((point, index) => (
                      <li key={index}>• {point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Welcome Message */}
        <div className="bg-indigo-900/50 rounded-lg p-3">
          <p className="text-indigo-200 text-sm">
            😊 I'm here to help you showcase your skills. Take your time and think through each question. I'll provide feedback on your answers!
          </p>
        </div>

        {/* Conversation History */}
        {conversationHistory.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] ${msg.type === 'user' ? 'space-y-2' : 'space-y-2'}`}>
              {/* Question Card bubble */}
              {msg.questionCard && (
                <div className="bg-gradient-to-br from-indigo-800 to-purple-900 rounded-xl p-4 border border-indigo-500/40 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="bg-indigo-500/30 text-indigo-200 text-xs px-2 py-0.5 rounded-full font-medium capitalize">
                        {msg.questionCard.type.replace('-', ' ')}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        msg.questionCard.difficulty === 'basic' ? 'bg-green-600/40 text-green-300' :
                        msg.questionCard.difficulty === 'intermediate' ? 'bg-yellow-600/40 text-yellow-300' :
                        msg.questionCard.difficulty === 'advanced' ? 'bg-orange-600/40 text-orange-300' :
                        'bg-red-600/40 text-red-300'
                      }`}>
                        {msg.questionCard.difficulty}
                      </span>
                    </div>
                    {msg.questionCard.timeLimit && (
                      <span className="text-yellow-300 text-xs flex items-center">
                        <i className="ri-time-line mr-1"></i>
                        {msg.questionCard.timeLimit}min
                      </span>
                    )}
                  </div>
                  <p className="text-white font-semibold text-base leading-relaxed">
                    {msg.questionCard.question}
                  </p>
                  {msg.questionCard.hints && msg.questionCard.hints.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {msg.questionCard.hints.map((hint, hIdx) => (
                        <span key={hIdx} className="bg-white/10 text-indigo-200 text-xs px-2 py-1 rounded-full">
                          <i className="ri-lightbulb-line mr-1"></i>{hint}
                        </span>
                      ))}
                    </div>
                  )}
                  {msg.message && (
                    <p className="text-indigo-300 text-xs mt-3 pt-2 border-t border-white/10">{msg.message}</p>
                  )}
                  <p className="text-indigo-400 text-xs mt-1">{msg.timestamp.toLocaleTimeString()}</p>
                </div>
              )}

              {/* Regular AI/User message bubble */}
              {!msg.questionCard && (
              <div className={`p-3 rounded-lg ${
                msg.type === 'user' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-700 text-gray-200'
              }`}>
                <p className="text-sm">{msg.message}</p>
                <p className="text-xs opacity-70 mt-1">
                  {msg.timestamp.toLocaleTimeString()}
                </p>
              </div>
              )}
              
              {/* Answer Validation Results */}
              {msg.type === 'user' && msg.validation && (
                <div className={`rounded-lg p-3 text-xs ${
                  msg.validation.isCorrect ? 'bg-green-900/30 border border-green-600' : 'bg-red-900/30 border border-red-600'
                }`}>
                  <div className={`font-semibold mb-1 ${msg.validation.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    {msg.validation.isCorrect ? '✅ Correct Answer' : '❌ Incorrect Answer'} - Score: {msg.validation.score}/100
                  </div>
                  <div className="text-gray-300 mb-2">{msg.validation.feedback}</div>
                  
                  {!msg.validation.isCorrect && (
                    <div className="bg-gray-700 rounded p-2 mb-2">
                      <div className="text-green-400 font-semibold mb-1">Correct Answer:</div>
                      <div className="text-gray-300">{msg.validation.correctAnswer}</div>
                    </div>
                  )}
                  
                  {msg.validation.keyPointsCovered.length > 0 && (
                    <div className="mb-1">
                      <span className="text-green-400">Covered: </span>
                      <span className="text-gray-300">{msg.validation.keyPointsCovered.join(', ')}</span>
                    </div>
                  )}
                  
                  {msg.validation.missedPoints.length > 0 && (
                    <div>
                      <span className="text-red-400">Missed: </span>
                      <span className="text-gray-300">{msg.validation.missedPoints.join(', ')}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Real-time Feedback for User Messages */}
              {msg.type === 'user' && msg.feedback && (
                <div className="bg-gray-600 rounded-lg p-2 text-xs">
                  <div className="font-semibold text-blue-400 mb-1">Real-time Analysis:</div>
                  {msg.feedback.map((fb, fbIndex) => (
                    <div key={fbIndex} className="mb-1">
                      <span className="text-gray-300 capitalize">{fb.category}:</span>
                      <span className={`ml-1 ${getScoreColor(fb.score)}`}>{fb.score}/100</span>
                      <div className="text-gray-400 text-xs mt-1">{fb.comment}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {/* Current AI Message */}
        {currentMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="max-w-[80%] p-3 rounded-lg bg-gray-700 text-gray-200">
              <p className="text-sm">{currentMessage}</p>
              {isTyping && (
                <div className="flex items-center mt-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-700 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-indigo-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300 text-sm">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Area with Speech-to-Text */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleUserResponse())}
              placeholder="Type your response or use voice input..."
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              rows={3}
            />
            {isListening && (
              <div className="absolute top-2 right-2 flex items-center space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 text-xs">Listening...</span>
              </div>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            {speechSupported && (
              <button
                onClick={isListening ? stopListening : startListening}
                className={`px-3 py-2 rounded-lg text-sm transition-colors whitespace-nowrap ${
                  isListening
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
                title={isListening ? 'Stop listening' : 'Start voice input'}
              >
                <i className={`ri-${isListening ? 'stop' : 'mic'}-line`}></i>
              </button>
            )}
            <button
              onClick={handleUserResponse}
              disabled={!userInput.trim()}
              className={`px-3 py-2 rounded-lg text-sm transition-colors whitespace-nowrap ${
                userInput.trim()
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              <i className="ri-send-plane-line"></i>
            </button>
          </div>
        </div>
        {!speechSupported && (
          <p className="text-xs text-gray-400 mt-1">
            Speech recognition not supported in this browser
          </p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-3 bg-gray-700 border-t border-gray-600">
        <div className="flex space-x-2">
          <button
            onClick={() => setUserInput("I need a moment to think about this question.")}
            className="flex-1 bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded text-xs transition-colors whitespace-nowrap"
          >
            {t('needTime')}
          </button>
          <button
            onClick={() => setUserInput("Could you repeat the question?")}
            className="flex-1 bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded text-xs transition-colors whitespace-nowrap"
          >
            {t('repeat')}
          </button>
          <button
            onClick={generateFollowUpQuestion}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded text-xs transition-colors whitespace-nowrap"
          >
            {t('continue')}
          </button>
        </div>
      </div>
    </div>
  );
}


'use client';

import { useEffect, useRef, useState } from 'react';

interface AntiCheatMonitorProps {
  onViolation: (violation: string) => void;
}

export default function AntiCheatMonitor({ onViolation }: AntiCheatMonitorProps) {
  const [isActive, setIsActive] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [tabSwitches, setTabSwitches] = useState(0);
  const [suspiciousActivity, setSuspiciousActivity] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const faceApiLoadedRef = useRef(false);

  useEffect(() => {
    initializeMonitoring();
    return () => {
      cleanup();
    };
  }, []);

  const initializeMonitoring = async () => {
    try {
      // Initialize face detection
      await loadFaceAPI();
      
      // Start various monitoring systems
      startTabSwitchMonitoring();
      startFaceTracking();
      startClipboardMonitoring();
      startFullscreenMonitoring();
      
      setIsActive(true);
    } catch (error) {
      console.error('Failed to initialize monitoring:', error);
      onViolation('Failed to initialize security monitoring');
    }
  };

  const loadFaceAPI = async () => {
    try {
      // Simulate face-api.js loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      faceApiLoadedRef.current = true;
    } catch (error) {
      console.error('Face API loading failed:', error);
    }
  };

  const startTabSwitchMonitoring = () => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitches(prev => prev + 1);
        onViolation('Tab switched or window lost focus');
      }
    };

    const handleBlur = () => {
      onViolation('Window lost focus');
    };

    const handleFocus = () => {
      // Window regained focus
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  };

  const startFaceTracking = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      // Simulate face detection
      const detectFaces = () => {
        if (faceApiLoadedRef.current && videoRef.current && canvasRef.current) {
          // Mock face detection results
          const faceCount = Math.random() > 0.1 ? 1 : Math.random() > 0.8 ? 0 : 2;
          
          if (faceCount === 0) {
            setFaceDetected(false);
            onViolation('No face detected in frame');
          } else if (faceCount > 1) {
            setFaceDetected(true);
            onViolation('Multiple faces detected');
          } else {
            setFaceDetected(true);
          }

          // Check for suspicious eye movements (mock)
          if (Math.random() > 0.95) {
            setSuspiciousActivity(prev => prev + 1);
            onViolation('Suspicious eye movement detected');
          }
        }
      };

      // Run face detection every 2 seconds
      const interval = setInterval(detectFaces, 2000);
      
      return () => {
        clearInterval(interval);
        stream.getTracks().forEach(track => track.stop());
      };
    } catch (error) {
      console.error('Face tracking failed:', error);
      onViolation('Face tracking initialization failed');
    }
  };

  const startClipboardMonitoring = () => {
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      onViolation('Clipboard copy attempt blocked');
    };

    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      onViolation('Clipboard paste attempt blocked');
    };

    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault();
      onViolation('Clipboard cut attempt blocked');
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Block common copy/paste shortcuts
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'c' || e.key === 'v' || e.key === 'x') {
          e.preventDefault();
          onViolation(`Keyboard shortcut Ctrl+${e.key.toUpperCase()} blocked`);
        }
      }

      // Block F12 (Developer Tools)
      if (e.key === 'F12') {
        e.preventDefault();
        onViolation('Developer tools access attempt blocked');
      }

      // Block Ctrl+Shift+I (Developer Tools)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        onViolation('Developer tools access attempt blocked');
      }
    };

    document.addEventListener('copy', handleCopy);
    document.addEventListener('paste', handlePaste);
    document.addEventListener('cut', handleCut);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('cut', handleCut);
      document.removeEventListener('keydown', handleKeyDown);
    };
  };

  const startFullscreenMonitoring = () => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        onViolation('Fullscreen mode exited');
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  };

  const cleanup = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const takeSnapshot = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        // In real implementation, this would be sent to server
        console.log('Security snapshot taken');
      }
    }
  };

  // Take periodic snapshots
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(takeSnapshot, 30000); // Every 30 seconds
      return () => clearInterval(interval);
    }
  }, [isActive]);

  return (
    <div className="fixed top-0 left-0 w-0 h-0 overflow-hidden pointer-events-none">
      {/* Hidden video element for face tracking */}
      <video
        ref={videoRef}
        width={320}
        height={240}
        autoPlay
        muted
        playsInline
        style={{ display: 'none' }}
      />
      
      {/* Hidden canvas for processing */}
      <canvas
        ref={canvasRef}
        width={320}
        height={240}
        style={{ display: 'none' }}
      />

      {/* Monitoring Status (visible only in dev mode) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 left-4 bg-black/80 text-white p-3 rounded-lg text-xs z-50 pointer-events-auto">
          <div className="font-bold mb-2">Anti-Cheat Monitor</div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span>Status: {isActive ? 'Active' : 'Inactive'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${faceDetected ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
              <span>Face: {faceDetected ? 'Detected' : 'Not Detected'}</span>
            </div>
            <div>Tab Switches: {tabSwitches}</div>
            <div>Suspicious Activity: {suspiciousActivity}</div>
          </div>
        </div>
      )}
    </div>
  );
}

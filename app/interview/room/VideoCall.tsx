
'use client';

import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

interface VideoCallProps {
  onStreamReady?: (stream: MediaStream) => void;
}

export default function VideoCall({ onStreamReady }: VideoCallProps) {
  const webcamRef = useRef<Webcam>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [connectionQuality, setConnectionQuality] = useState<'good' | 'fair' | 'poor'>('good');

  useEffect(() => {
    // Simulate connection establishment
    const timer = setTimeout(() => {
      setIsConnected(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (webcamRef.current?.stream) {
      webcamRef.current.stream.getAudioTracks().forEach(track => {
        track.enabled = isMuted;
      });
    }
  };

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
    if (webcamRef.current?.stream) {
      webcamRef.current.stream.getVideoTracks().forEach(track => {
        track.enabled = isVideoOff;
      });
    }
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user'
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Connection Status */}
      <div className="p-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
            <span className="text-sm text-gray-300">
              {isConnected ? 'Connected' : 'Connecting...'}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-xs text-gray-400">Quality:</span>
            <span className={`text-xs ${
              connectionQuality === 'good' ? 'text-green-400' :
              connectionQuality === 'fair' ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {connectionQuality}
            </span>
          </div>
        </div>
      </div>

      {/* Video Feed */}
      <div className="flex-1 relative bg-gray-800">
        {isConnected && !isVideoOff ? (
          <Webcam
            ref={webcamRef}
            audio={!isMuted}
            className="w-full h-full object-cover"
            videoConstraints={videoConstraints}
            onUserMedia={(stream) => {
              onStreamReady?.(stream);
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-700">
            <div className="text-center">
              <i className="ri-user-line text-6xl text-gray-400 mb-4"></i>
              <p className="text-gray-400 text-sm">
                {isVideoOff ? 'Video is off' : 'Connecting to camera...'}
              </p>
            </div>
          </div>
        )}

        {/* AI Interviewer Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <i className="ri-robot-line text-white text-sm"></i>
              </div>
              <div>
                <p className="text-white text-sm font-medium">AI Interviewer</p>
                <p className="text-gray-300 text-xs">Ready to assist you</p>
              </div>
              <div className="flex-1"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleMute}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
            }`}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            <i className={`ri-${isMuted ? 'mic-off' : 'mic'}-line text-white`}></i>
          </button>
          
          <button
            onClick={toggleVideo}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isVideoOff ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
            }`}
            title={isVideoOff ? 'Turn on video' : 'Turn off video'}
          >
            <i className={`ri-${isVideoOff ? 'video-off' : 'video'}-line text-white`}></i>
          </button>

          <button
            className="w-10 h-10 rounded-full bg-gray-600 hover:bg-gray-700 flex items-center justify-center transition-colors"
            title="Settings"
          >
            <i className="ri-settings-line text-white"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

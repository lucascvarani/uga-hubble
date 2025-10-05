import React from 'react'
import { Volume2 } from 'lucide-react'
import MusicManager from '../utils/MusicManager'

type SoundWarningProps = {
  onProceed: () => void
}

const SoundWarning: React.FC<SoundWarningProps> = ({ onProceed }) => {
  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center text-center">
      {/* Animated volume icon */}
      <div className="mb-8 relative">
        <Volume2
          size={80}
          className="text-white animate-pulse drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
        />
      </div>

      {/* Title and description */}
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
        Audio Experience
      </h1>

      <p className="text-xl text-gray-300 mb-4 max-w-2xl px-4">
        This experience uses sound and music to enhance your journey through
        space
      </p>

      <p className="text-lg text-orange-400 mb-10 font-medium">
        Please turn on your volume for the best experience
      </p>

      {/* Continue button */}
      <button
        onClick={() => {
          const musicManager = MusicManager.getInstance()
          if (!musicManager.isPlaying()) {
            musicManager.playTrack(
              'audio/andromeda-space-adventure-403080.mp3',
              0.5,
              true
            )
          }
          onProceed()
        }}
        className="px-12 py-4 bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 text-white font-semibold rounded-lg text-lg transition-all duration-300 shadow-lg backdrop-blur-sm hover:shadow-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
      >
        Continue
      </button>

      {/* Small note */}
      <p className="text-sm text-gray-500 mt-6 max-w-lg px-4">
        You can adjust or mute the audio at any time during the experience
      </p>
    </div>
  )
}

export default SoundWarning

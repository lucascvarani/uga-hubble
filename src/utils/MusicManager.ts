class MusicManager {
  private static instance: MusicManager
  private audio: HTMLAudioElement | null = null
  private currentTrack: string | null = null
  private activeSoundEffects: Set<HTMLAudioElement> = new Set()

  static getInstance(): MusicManager {
    if (!MusicManager.instance) {
      MusicManager.instance = new MusicManager()
    }
    return MusicManager.instance
  }

  playTrack(src: string, volume: number = 0.3, loop: boolean = true) {
    if (this.currentTrack === src && this.audio && !this.audio.paused) {
      return
    }

    this.audio = new Audio(src)
    this.audio.loop = loop
    this.audio.volume = volume
    this.currentTrack = src

    this.audio.play().catch(console.error)
  }

  stop() {
    if (this.audio) {
      this.audio.pause()
      this.audio.currentTime = 0
      this.audio = null
      this.currentTrack = null
    }
  }

  setVolume(volume: number) {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, volume))
    }
  }

  isPlaying(): boolean {
    return this.audio !== null && !this.audio.paused
  }

  getCurrentTrack(): string | null {
    return this.currentTrack
  }

  async fadeOut(duration: number = 1000): Promise<void> {
    if (!this.audio) return

    const startVolume = this.audio.volume
    const fadeStep = startVolume / (duration / 50)

    return new Promise((resolve) => {
      const fadeInterval = setInterval(() => {
        if (this.audio && this.audio.volume > 0) {
          this.audio.volume = Math.max(0, this.audio.volume - fadeStep)
        } else {
          clearInterval(fadeInterval)
          this.stop()
          resolve()
        }
      }, 50)
    })
  }

  playSoundEffect(
    src: string,
    volume: number = 0.5,
    loop: boolean = false,
    stopOthers: boolean = false,
    advancedStartTime?: number
  ): HTMLAudioElement {
    // Stop any currently playing sound effects
    if (stopOthers) {
      this.stopAllSoundEffects()
    }

    // Create new audio instance for this sound effect
    const soundEffect = new Audio(src)
    soundEffect.volume = Math.max(0, Math.min(1, volume))
    soundEffect.loop = loop
    if (advancedStartTime) {
      soundEffect.currentTime = advancedStartTime
    }

    // Track active sound effects
    this.activeSoundEffects.add(soundEffect)

    // Auto-cleanup when sound finishes (if not looping)
    if (!loop) {
      soundEffect.addEventListener('ended', () => {
        this.activeSoundEffects.delete(soundEffect)
      })
    }

    // Error handling
    soundEffect.addEventListener('error', (e) => {
      console.error('Sound effect failed to load:', src, e)
      this.activeSoundEffects.delete(soundEffect)
    })

    // Play the sound effect
    soundEffect.play().catch((error) => {
      console.error('Failed to play sound effect:', src, error)
      this.activeSoundEffects.delete(soundEffect)
    })

    return soundEffect
  }

  stopAllSoundEffects() {
    this.activeSoundEffects.forEach((soundEffect) => {
      soundEffect.pause()
      soundEffect.currentTime = 0
    })
    this.activeSoundEffects.clear()
  }
}

export default MusicManager

// Usage example:
// const musicManager = MusicManager.getInstance()
// musicManager.playTrack('/audio/space-ambient.mp3', 0.3, true)

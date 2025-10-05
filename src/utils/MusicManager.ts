class MusicManager {
  private static instance: MusicManager
  private audio: HTMLAudioElement | null = null
  private currentTrack: string | null = null

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

    this.stop()

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

  fadeOut(duration: number = 1000) {
    if (!this.audio) return

    const startVolume = this.audio.volume
    const fadeStep = startVolume / (duration / 50)

    const fadeInterval = setInterval(() => {
      if (this.audio && this.audio.volume > 0) {
        this.audio.volume = Math.max(0, this.audio.volume - fadeStep)
      } else {
        clearInterval(fadeInterval)
        this.stop()
      }
    }, 50)
  }
}

export default MusicManager

// Usage example:
// const musicManager = MusicManager.getInstance()
// musicManager.playTrack('/audio/space-ambient.mp3', 0.3, true)

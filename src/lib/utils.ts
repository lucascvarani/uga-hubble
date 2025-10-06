import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const preloadAssets = (imageList: string[], audioList: string[]) => {
  imageList.forEach((url) => {
    const img = new Image()
    img.src = url
  })
  audioList.forEach((url) => {
    const audio = new Audio()
    audio.src = url
  })
}

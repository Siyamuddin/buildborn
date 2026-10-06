"use client"

import { useEffect, useRef, useState } from "react"
import type { Beat } from "@/lib/types"

const LOOP_SECONDS = 11.128

type MotionStoryProps = {
  beats: Beat[]
  audioUrl: string
  narration: string
}

const indexFor = (time: number, count: number) => {
  if (count <= 1) return 0
  const span = LOOP_SECONDS / count
  const index = Math.floor((time % LOOP_SECONDS) / span)
  return Math.min(count - 1, Math.max(0, index))
}

export const MotionStory = ({ beats, audioUrl, narration }: MotionStoryProps) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const originRef = useRef<number | null>(null)
  const [beatIndex, setBeatIndex] = useState(0)
  const [soundOn, setSoundOn] = useState(false)
  const [reduced, setReduced] = useState(false)
  const frames = beats.length > 0 ? beats : [{ kicker: "01", title: "Buildborn", line: narration }]
  const active = frames[Math.min(beatIndex, frames.length - 1)]

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handleChange = () => setReduced(media.matches)
    handleChange()
    media.addEventListener("change", handleChange)
    return () => media.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    if (reduced) return
    let frame = 0
    const tick = (now: number) => {
      const audio = audioRef.current
      let time = 0
      if (audio && soundOn && !audio.paused) {
        time = audio.currentTime || 0
      } else {
        if (originRef.current === null) originRef.current = now
        time = ((now - originRef.current) / 1000) % LOOP_SECONDS
      }
      const next = indexFor(time, frames.length)
      setBeatIndex((current) => (current === next ? current : next))
      if (barRef.current) {
        const progress = Math.min(1, Math.max(0, (time % LOOP_SECONDS) / LOOP_SECONDS))
        barRef.current.style.transform = `scaleX(${progress})`
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [frames.length, reduced, soundOn])

  const handleToggleSound = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (soundOn) {
      audio.pause()
      audio.muted = true
      setSoundOn(false)
      originRef.current = performance.now() - (audio.currentTime % LOOP_SECONDS) * 1000
      return
    }
    audio.muted = false
    audio.currentTime = 0
    originRef.current = performance.now()
    try {
      await audio.play()
      setSoundOn(true)
    } catch {
      audio.muted = true
      setSoundOn(false)
    }
  }

  const handleEnded = () => {
    const audio = audioRef.current
    if (!audio || !soundOn) return
    audio.currentTime = 0
    void audio.play()
  }

  return (
    <figure className="relative w-full">
      <p className="sr-only">{narration}</p>
      <div className="relative flex min-h-[420px] flex-col justify-between overflow-hidden border border-line-dark px-6 py-7 md:min-h-[520px] md:px-8 md:py-9">
        <div aria-hidden="true" className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-mist">
          <span>{reduced ? frames[0]?.kicker : active?.kicker}</span>
          <span>Buildborn</span>
        </div>
        <div className="relative mt-8 min-h-[180px] flex-1" aria-hidden="true">
          {(reduced ? frames.slice(0, 1) : frames).map((beat, index) => (
            <div
              key={`${beat.kicker}-${beat.title}`}
              className={`absolute inset-0 flex flex-col justify-end transition-opacity duration-500 ease-out motion-reduce:transition-none ${
                reduced || index === beatIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="text-[11px] uppercase tracking-[0.22em] text-mist">{beat.title}</p>
              <p className="mt-4 max-w-[16ch] font-serif text-[clamp(1.8rem,3vw,2.6rem)] font-medium leading-[1.12] tracking-[-0.03em] text-paper">
                {beat.line}
              </p>
              <Plate index={index} />
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="h-px flex-1 bg-line-dark" aria-hidden="true">
            <div ref={barRef} className="h-px origin-left bg-paper" style={{ transform: "scaleX(0)" }} />
          </div>
          <button
            type="button"
            onClick={handleToggleSound}
            aria-pressed={soundOn}
            className="inline-flex h-11 shrink-0 items-center border border-mist/40 px-3 text-[11px] uppercase tracking-[0.16em] text-paper"
          >
            {soundOn ? "Mute" : "Unmute"}
          </button>
        </div>
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed text-mist">
        {soundOn ? "Narration playing." : "Narration is muted. Unmute to hear it."}
        {reduced ? " Motion is paused." : ""}
      </figcaption>
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="none"
        muted
        playsInline
        onEnded={handleEnded}
      />
    </figure>
  )
}

const Plate = ({ index }: { index: number }) => {
  if (index === 1) {
    return (
      <div className="mt-8 space-y-2 border border-line-dark p-3">
        <div className="h-8 border border-line-dark" />
        <div className="h-8 border border-line-dark" />
        <div className="h-8 border border-line-dark" />
      </div>
    )
  }
  if (index === 2) {
    return (
      <div className="mt-8 space-y-3">
        <div className="h-px w-16 bg-paper" />
        <div className="h-px w-24 bg-mist" />
        <div className="h-px w-20 bg-mist" />
      </div>
    )
  }
  return (
    <div className="mt-8 border border-line-dark p-4">
      <div className="h-2 w-20 bg-line-dark" />
      <div className="mt-4 h-16 border border-line-dark" />
    </div>
  )
}

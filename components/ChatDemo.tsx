'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { CHAT_MESSAGES, type ChatMessage } from '@/lib/demo-data'

export default function ChatDemo() {
  const [visibleIds, setVisibleIds] = useState<number[]>([])
  const [playing, setPlaying]       = useState(false)
  const sectionRef                  = useRef<HTMLElement>(null)
  const timersRef                   = useRef<ReturnType<typeof setTimeout>[]>([])

  const play = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    setVisibleIds([])
    setPlaying(true)
    CHAT_MESSAGES.forEach((msg) => {
      const t = setTimeout(() => {
        setVisibleIds((prev) => [...prev, msg.id])
      }, msg.delay)
      timersRef.current.push(t)
    })
    const lastDelay = CHAT_MESSAGES[CHAT_MESSAGES.length - 1].delay
    const done = setTimeout(() => setPlaying(false), lastDelay + 600)
    timersRef.current.push(done)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play()
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    const el = sectionRef.current
    if (el) observer.observe(el)
    return () => {
      observer.disconnect()
      timersRef.current.forEach(clearTimeout)
      timersRef.current = []
    }
  }, [play])

  return (
    <section id="demo" ref={sectionRef} className="py-24 px-6 bg-helix-bg2">
      <div className="max-w-6xl mx-auto">
        <p className="text-helix-green text-sm font-semibold uppercase tracking-wider mb-4 text-center">
          Demo en vivo
        </p>
        <h2 className="text-3xl font-bold text-helix-text text-center mb-4">
          Así se ve Helix en acción
        </h2>
        <p className="text-helix-muted text-center mb-12 max-w-xl mx-auto">
          Una conversación real: el dueño registra una factura y consulta su stock, todo desde WhatsApp.
        </p>
        <div className="flex flex-col items-center gap-6">
          <div className="w-[320px] bg-[#0b141a] rounded-[32px] border-4 border-[#1e3a5f] shadow-2xl overflow-hidden">
            <div className="h-7 bg-[#0b141a] flex justify-center items-end pb-1">
              <div className="w-14 h-1 bg-[#1e3a5f] rounded-full" />
            </div>
            <div className="bg-[#202c33] px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-helix-green flex items-center justify-center text-helix-bg font-bold text-sm flex-shrink-0">
                H
              </div>
              <div>
                <div className="text-helix-text text-sm font-semibold">Helix Minimarket 🤖</div>
                <div className="text-helix-green text-xs">● en línea</div>
              </div>
            </div>
            <div className="p-3 flex flex-col gap-2 bg-[#0b141a] min-h-[440px]">
              <div className="text-center text-[#8696a0] text-[10px] py-1">hoy</div>
              {CHAT_MESSAGES.map((msg) =>
                visibleIds.includes(msg.id) ? <Bubble key={msg.id} msg={msg} /> : null
              )}
            </div>
          </div>
          <button
            onClick={play}
            disabled={playing}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-helix-green/30 text-helix-green text-sm font-semibold hover:bg-helix-green/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {playing ? '⏳ Reproduciendo...' : '▶ Reproducir de nuevo'}
          </button>
        </div>
      </div>
    </section>
  )
}

function Bubble({ msg }: { msg: ChatMessage }) {
  if (msg.isImage) {
    return (
      <div className="self-end animate-fade-in-up">
        <div className="bg-[#005c4b] rounded-xl rounded-br-sm p-1.5">
          <div className="w-[180px] h-[90px] bg-[#1a3a2a] rounded-lg flex flex-col items-center justify-center gap-1">
            <span className="text-3xl">🧾</span>
            <span className="text-helix-green text-[10px]">{msg.text}</span>
          </div>
          <div className="text-[10px] text-[#8696a0] text-right px-1 pt-1">{msg.time} ✓✓</div>
        </div>
      </div>
    )
  }
  if (msg.type === 'out') {
    return (
      <div className="self-end animate-fade-in-up max-w-[78%]">
        <div className="bg-[#005c4b] text-helix-text text-xs px-3 py-2 rounded-xl rounded-br-sm whitespace-pre-line">
          {msg.text}
          <div className="text-[10px] text-[#8696a0] text-right mt-1">{msg.time} ✓✓</div>
        </div>
      </div>
    )
  }
  if (msg.type === 'alert') {
    return (
      <div className="self-start animate-fade-in-up max-w-[85%]">
        <div className="bg-[#202c33] border-l-2 border-amber-400 text-helix-text text-xs px-3 py-2 rounded-xl rounded-bl-sm whitespace-pre-line">
          {msg.text}
          <div className="text-[10px] text-[#8696a0] text-right mt-1">{msg.time}</div>
        </div>
      </div>
    )
  }
  return (
    <div className="self-start animate-fade-in-up max-w-[85%]">
      <div className="bg-[#202c33] text-helix-text text-xs px-3 py-2 rounded-xl rounded-bl-sm whitespace-pre-line">
        <span className="text-helix-green text-[10px] font-bold">IA </span>
        {msg.text}
        <div className="text-[10px] text-[#8696a0] text-right mt-1">{msg.time}</div>
      </div>
    </div>
  )
}

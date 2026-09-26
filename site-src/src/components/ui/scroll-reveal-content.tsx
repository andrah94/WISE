// 21st.dev: abui/scroll-reveal-content-a (adapted: N items, letter markers, crossfading images, dark theme)
import React, { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { useMotionValueEvent, useScroll } from 'motion/react'

export interface ItemContent { marker: string; title: string; description: string; image: { url: string; alt: string } }

const getBar = (p: number, s: number, e: number) => (p < s ? 0 : p > e ? 100 : ((p - s) / (e - s)) * 100)

export default function ScrollRevealContent({ items, header, className }: { items: ItemContent[]; header?: React.ReactNode; className?: string }) {
  const [progress, setProgress] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => setProgress(v))
  const n = items.length
  const activeIndex = Math.min(n - 1, Math.floor(progress * n))

  return (
    <div ref={ref} className={cn('relative h-[var(--mh)] lg:h-[var(--dh)]', className)} style={{ '--dh': `${n * 65 + 40}vh`, '--mh': `${n * 42 + 30}vh` } as React.CSSProperties}>
      <div className="sticky top-0 flex h-screen items-center">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 md:px-10 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col">
            {header}
            <div className="mt-8 flex flex-col gap-6 lg:mt-12 lg:gap-8">
              {items.map((it, i) => {
                const s = i / n, e = (i + 1) / n
                const bar = getBar(progress, s, e)
                const on = bar > 0
                return (
                  <div key={it.marker} className="flex gap-5">
                    <div className="relative flex w-12 shrink-0 flex-col items-center">
                      <span className={cn('display text-4xl transition-all duration-500 md:text-5xl', on ? 'gold-text' : 'text-white/20')}>{it.marker}</span>
                      <div className="relative mt-3 w-px flex-1 bg-white/10">
                        <div className="absolute inset-x-0 top-0 bg-gold" style={{ height: `${bar}%` }} />
                      </div>
                    </div>
                    <div className={cn('pb-2 transition-opacity duration-500', on ? 'opacity-100' : 'opacity-35')}>
                      <h3 className="font-serif text-2xl font-normal text-bone md:text-[1.9rem]">{it.title}</h3>
                      <p className={cn('mt-2 max-w-md text-[15px] leading-relaxed text-bone/65 transition-all duration-500 md:text-base', i === activeIndex ? 'max-h-40 opacity-100' : 'max-h-0 overflow-hidden opacity-0 lg:max-h-40 lg:opacity-60')}>{it.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="relative hidden h-[72vh] overflow-hidden rounded-[28px] border border-white/10 lg:block">
            {items.map((it, i) => (
              <img key={it.marker} src={it.image.url} alt={it.image.alt} loading="lazy"
                className={cn('absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ease-out', i === activeIndex ? 'scale-100 opacity-100' : 'scale-110 opacity-0')} />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 font-serif text-[9rem] leading-none text-white/90 mix-blend-overlay">{items[activeIndex].marker}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

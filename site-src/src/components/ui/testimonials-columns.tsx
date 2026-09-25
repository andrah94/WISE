// 21st.dev: efferd/testimonials-columns-1 (adapted: review cards with stars, initials, product tag)
import React from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

export type Review = { text: string; name: string; place: string; product: string; when: string }

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="size-4 fill-gold-2" aria-hidden><path d="M10 1.5l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L1.4 7.8l6-.8z" /></svg>
      ))}
    </div>
  )
}

function ReviewCard({ r }: { r: Review }) {
  const initials = r.name.split(' ').map((w) => w[0]).join('').slice(0, 2)
  return (
    <figure className="w-full max-w-sm rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-7 shadow-[0_30px_60px_-30px_rgba(0,0,0,.8)]">
      <div className="flex items-center justify-between">
        <Stars />
        <span className="text-[11px] text-white/40">{r.when}</span>
      </div>
      <blockquote className="mt-5 text-[15px] leading-relaxed text-white/80">{r.text}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
        <span className="grid size-10 shrink-0 place-items-center rounded-full gold-bg font-serif text-sm text-ink">{initials}</span>
        <div className="min-w-0">
          <p className="text-sm font-medium text-white">{r.name}</p>
          <p className="truncate text-xs text-white/45">{r.place} · <span className="text-gold-2/90">{r.product}</span></p>
        </div>
      </figcaption>
    </figure>
  )
}

export function TestimonialsColumn({ reviews, duration = 15, className }: { reviews: Review[]; duration?: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <div className={cn('group', className)}>
      <motion.div
        animate={reduce ? undefined : { translateY: '-50%' }}
        transition={{ duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        className="flex flex-col gap-5 pb-5"
      >
        {[0, 1].map((k) => (
          <React.Fragment key={k}>
            {reviews.map((r) => <div key={r.name + k} aria-hidden={k === 1 || undefined}><ReviewCard r={r} /></div>)}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}

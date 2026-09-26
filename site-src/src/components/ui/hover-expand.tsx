// 21st.dev: larsen66/expand-on-hover (HoverExpand_001, adapted with titles + descriptions)
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export type ExpandItem = { src: string; title: string; desc: string }

export function HoverExpand({ items, className }: { items: ExpandItem[]; className?: string }) {
  const [active, setActive] = useState<number>(0)
  return (
    <div className={cn('flex h-[34rem] w-full gap-2', className)}>
      {items.map((it, i) => {
        const on = active === i
        return (
          <motion.div key={it.title} className="relative cursor-pointer overflow-hidden rounded-[26px]"
            animate={{ flexGrow: on ? 6 : 1 }} style={{ flexBasis: 0 }} transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
            onHoverStart={() => setActive(i)} onClick={() => setActive(i)} onFocus={() => setActive(i)} tabIndex={0} role="button" aria-expanded={on} aria-label={it.title}>
            <motion.img src={it.src} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" animate={{ scale: on ? 1 : 1.15, filter: on ? 'grayscale(0)' : 'grayscale(0.7)' }} transition={{ duration: 0.8 }} />
            <div className={cn('absolute inset-0 transition-colors duration-500', on ? 'bg-gradient-to-t from-ink/95 via-ink/30 to-transparent' : 'bg-ink/55')} />
            <span className={cn('absolute top-5 left-1/2 -translate-x-1/2 text-xs tracking-[0.2em] transition-colors', on ? 'text-gold-2' : 'text-white/60')}>0{i + 1}</span>
            {!on && <span className="absolute bottom-7 left-1/2 -translate-x-1/2 rotate-180 whitespace-nowrap font-serif text-base text-white/85 [writing-mode:vertical-rl]">{it.title}</span>}
            <AnimatePresence>
              {on && (
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.45, delay: 0.15 }}
                  className="absolute inset-x-0 bottom-0 p-8">
                  <h3 className="font-serif text-3xl leading-tight text-white md:text-[2.4rem]">{it.title}</h3>
                  <p className="mt-3 max-w-md text-[15px] font-light leading-relaxed text-white/75">{it.desc}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}

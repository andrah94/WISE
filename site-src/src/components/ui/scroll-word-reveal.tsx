// 21st.dev: motiondotdev/motion-scroll-word-reveal (adapted to page scroll + WISE styling)
import { Fragment, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'

const REST_OPACITY = 0.12
const REVEAL_SPAN = 0.8
const WORD_WINDOW = 0.2

function getWordRange(index: number, count: number) {
  const start = count <= 1 ? 0 : (index / (count - 1)) * REVEAL_SPAN
  return { start, end: Math.min(1, start + WORD_WINDOW) }
}
function getWordOpacity(progress: number, { start, end }: { start: number; end: number }, rest = REST_OPACITY) {
  if (progress <= start) return rest
  if (progress >= end) return 1
  return rest + (1 - rest) * ((progress - start) / (end - start))
}

function Word({ children, progress, index, count, reducedMotion, gold }: { children: string; progress: MotionValue<number>; index: number; count: number; reducedMotion: boolean; gold?: boolean }) {
  const range = getWordRange(index, count)
  const opacity = useTransform(progress, (v) => getWordOpacity(v, range))
  const blur = useTransform(progress, (v) => `blur(${(1 - getWordOpacity(v, range)) * 6}px)`)
  return (
    <motion.span aria-hidden="true" className={gold ? 'gold-text italic' : undefined} style={reducedMotion ? undefined : { opacity, filter: blur }}>
      {children}
    </motion.span>
  )
}

export function ScrollWordReveal({ text, goldWords = [], kicker }: { text: string; goldWords?: string[]; kicker?: string }) {
  const targetRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start start', 'end end'] })
  const words = text.split(' ')
  return (
    <section ref={targetRef} className="relative h-[180vh]" aria-label={text}>
      <div className="sticky top-0 flex h-screen items-center">
        <div className="mx-auto flex w-full max-w-6xl gap-8 px-6 md:gap-14 md:px-10">
          <div className="relative hidden w-px shrink-0 self-stretch bg-white/10 md:block" aria-hidden="true">
            <motion.span className="absolute inset-x-0 top-0 block h-full origin-top bg-gold" style={{ scaleY: reducedMotion ? 1 : scrollYProgress }} />
          </div>
          <div>
            {kicker && <p className="eyebrow mb-8">{kicker}</p>}
            <h2 className="display text-[clamp(2.2rem,5.6vw,5.4rem)] leading-[1.06] text-bone">
              {words.map((word, i) => (
                <Fragment key={`${word}-${i}`}>
                  <Word progress={scrollYProgress} index={i} count={words.length} reducedMotion={!!reducedMotion} gold={goldWords.includes(word.replace(/[.,]/g, ''))}>{word}</Word>
                  {i < words.length - 1 ? ' ' : null}
                </Fragment>
              ))}
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}

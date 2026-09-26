// 21st.dev: soralabs/text-reveal-mask
import { cn } from '@/lib/utils'
import { motion, type UseInViewOptions, useInView, useReducedMotion } from 'motion/react'
import { type ElementType, isValidElement, type ReactNode, type RefObject, useLayoutEffect, useMemo, useRef, useState } from 'react'

type SplitBy = 'lines' | 'words'
const SPLIT_DEFAULTS: Record<SplitBy, { duration: number; stagger: number }> = {
  lines: { duration: 0.9, stagger: 0.09 },
  words: { duration: 0.7, stagger: 0.05 },
}
const EXPO_OUT = [0.19, 1, 0.22, 1] as const
const WHITESPACE_RE = /\s+/

interface WordToken { emphasized: boolean; text: string }

export interface MaskedTextRevealProps {
  as?: keyof React.JSX.IntrinsicElements
  children?: ReactNode
  className?: string
  delay?: number
  duration?: number
  once?: boolean
  splitBy?: SplitBy
  stagger?: number
  text?: string
  unitClassName?: string
  viewportMargin?: UseInViewOptions['margin']
  yPercent?: number
  /** start immediately instead of waiting for viewport */
  immediate?: boolean
}

function collectWords(node: ReactNode, emphasized = false): WordToken[] {
  if (typeof node === 'string') return node.split(WHITESPACE_RE).filter(Boolean).map((text) => ({ text, emphasized }))
  if (Array.isArray(node)) return node.flatMap((c) => collectWords(c, emphasized))
  if (isValidElement(node)) {
    const next = emphasized || node.type === 'strong' || node.type === 'em' || node.type === 'b'
    return collectWords((node.props as { children?: ReactNode }).children, next)
  }
  return []
}

type LineGroup = number[]
function groupWordsByLine(measureNode: HTMLDivElement): LineGroup[] {
  const nodes = measureNode.querySelectorAll('[data-measure-word]')
  if (nodes.length === 0) return [[0]]
  const groups: LineGroup[] = []
  let cur: LineGroup = []
  let lastTop = -1
  for (const [i, n] of nodes.entries()) {
    const top = (n as HTMLElement).offsetTop
    if (lastTop !== -1 && top > lastTop + 1) { groups.push(cur); cur = [] }
    cur.push(i); lastTop = top
  }
  if (cur.length) groups.push(cur)
  return groups.length ? groups : [[0]]
}

function useLineGroups(words: WordToken[], className: string | undefined, containerRef: RefObject<HTMLDivElement | null>, unitClassName?: string) {
  const measureRef = useRef<HTMLDivElement>(null)
  const [lineGroups, setLineGroups] = useState<LineGroup[] | null>(null)
  const key = `${className ?? ''}:${words.map((w) => `${w.emphasized ? 1 : 0}:${w.text}`).join('\u0000')}`
  useLayoutEffect(() => {
    const container = containerRef.current
    const measure = measureRef.current
    if (!(container && measure)) return
    let cancelled = false
    const run = () => {
      if (cancelled) return
      const w = container.clientWidth || container.parentElement?.clientWidth || 0
      if (w > 0) measure.style.width = `${w}px`
      setLineGroups(groupWordsByLine(measure))
    }
    run()
    document.fonts.ready.then(run)
    const ro = new ResizeObserver(run)
    ro.observe(container)
    return () => { cancelled = true; ro.disconnect() }
  }, [containerRef, key])
  const measureLayer = (
    <div aria-hidden className={cn('pointer-events-none invisible fixed top-0 left-[-9999px] block', className)} ref={measureRef}>
      {words.map((w, i) => (
        <span className={cn('inline-block', i < words.length - 1 && 'me-[0.25em]', w.emphasized && unitClassName)} data-measure-word key={i}>{w.text}</span>
      ))}
    </div>
  )
  return { lineGroups, measureLayer }
}

function RevealTarget({ animate, children, className, delay, display = 'inline-block', duration, yPercent }: { animate: boolean; children: ReactNode; className?: string; delay: number; display?: 'block' | 'inline-block'; duration: number; yPercent: number }) {
  const hiddenY = `${yPercent}%`
  return (
    <motion.span animate={animate ? { y: '0%' } : { y: hiddenY }} className={cn('will-change-transform', display === 'block' ? 'block' : 'inline-block', className)} initial={{ y: hiddenY }} transition={{ duration, delay, ease: EXPO_OUT }}>
      {children}
    </motion.span>
  )
}

export function MaskedTextReveal({ text, children, as: Tag = 'p', splitBy = 'lines', duration, stagger, yPercent = 110, delay = 0, once = true, viewportMargin = '0px 0px -15% 0px', className, unitClassName, immediate = false }: MaskedTextRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const inView = useInView(rootRef, { once, margin: viewportMargin })
  const content = text ?? children
  const words = useMemo(() => collectWords(content), [content])
  const label = useMemo(() => words.map((w) => w.text).join(' '), [words])
  const d = SPLIT_DEFAULTS[splitBy]
  const dur = duration ?? d.duration
  const stg = stagger ?? d.stagger
  const { lineGroups, measureLayer } = useLineGroups(words, className, rootRef, unitClassName)
  const Component = Tag as ElementType
  const ready = lineGroups !== null && lineGroups.length > 0
  const go = (immediate || inView) && ready && !reduce

  if (reduce || !words.length) return <div className="w-full" ref={rootRef}><Component className={className}>{content}</Component></div>

  let wordCounter = 0
  const body = ready && lineGroups.map((group, li) => (
    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]" key={li}>
      {splitBy === 'lines' ? (
        <RevealTarget animate={go} delay={delay + li * stg} display="block" duration={dur} yPercent={yPercent}>
          {group.map((wi) => {
            const w = words[wi]
            return <span key={wi} className={cn('inline-block', wi < words.length - 1 && 'me-[0.25em]', w.emphasized && unitClassName)}>{w.text}</span>
          })}
        </RevealTarget>
      ) : group.map((wi) => {
        const w = words[wi]
        const idx = wordCounter++
        return (
          <RevealTarget key={wi} animate={go} className={cn(wi < words.length - 1 && 'me-[0.25em]', w.emphasized && unitClassName)} delay={delay + idx * stg} duration={dur} yPercent={yPercent}>
            {w.text}
          </RevealTarget>
        )
      })}
    </span>
  ))

  return (
    <div className="relative w-full" ref={rootRef}>
      {measureLayer}
      <Component aria-label={label} className={cn('block', !ready && 'invisible', className)}>{body}</Component>
    </div>
  )
}
export default MaskedTextReveal

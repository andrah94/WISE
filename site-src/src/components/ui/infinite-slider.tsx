// 21st.dev: grootstudio/blurred-marquee (InfiniteSlider + ProgressiveBlur primitives)
import React, { memo, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useMotionValue, animate, motion, type HTMLMotionProps } from 'motion/react'
import useMeasure from 'react-use-measure'

type InfiniteSliderProps = { children: React.ReactNode; gap?: number; duration?: number; durationOnHover?: number; direction?: 'horizontal' | 'vertical'; reverse?: boolean; className?: string }

export const InfiniteSlider = memo(function InfiniteSlider({ children, gap = 16, duration = 25, durationOnHover, direction = 'horizontal', reverse = false, className }: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration)
  const [ref, { width, height }] = useMeasure()
  const translation = useMotionValue(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [key, setKey] = useState(0)

  useEffect(() => {
    const size = direction === 'horizontal' ? width : height
    const contentSize = size + gap
    const from = reverse ? -contentSize / 2 : 0
    const to = reverse ? 0 : -contentSize / 2
    let controls
    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: 'linear', duration: currentDuration * Math.abs((translation.get() - to) / contentSize),
        onComplete: () => { setIsTransitioning(false); setKey((p) => p + 1) },
      })
    } else {
      controls = animate(translation, [from, to], { ease: 'linear', duration: currentDuration, repeat: Infinity, repeatType: 'loop', repeatDelay: 0, onRepeat: () => translation.set(from) })
    }
    return controls?.stop
  }, [key, translation, currentDuration, width, height, gap, isTransitioning, direction, reverse])

  const hoverProps = durationOnHover ? {
    onHoverStart: () => { setIsTransitioning(true); setCurrentDuration(durationOnHover) },
    onHoverEnd: () => { setIsTransitioning(true); setCurrentDuration(duration) },
  } : {}

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div ref={ref} className="flex w-max items-center" style={{ ...(direction === 'horizontal' ? { x: translation } : { y: translation }), gap: `${gap}px`, flexDirection: direction === 'horizontal' ? 'row' : 'column' }} {...hoverProps}>
        {children}
        {children}
      </motion.div>
    </div>
  )
})

const GRADIENT_ANGLES = { top: 0, right: 90, bottom: 180, left: 270 }
type ProgressiveBlurProps = { direction?: keyof typeof GRADIENT_ANGLES; blurLayers?: number; blurIntensity?: number; className?: string } & HTMLMotionProps<'div'>

export const ProgressiveBlur = memo(function ProgressiveBlur({ direction = 'bottom', blurLayers = 8, blurIntensity = 0.25, className, ...props }: ProgressiveBlurProps) {
  const layers = Math.max(blurLayers, 2)
  const segmentSize = 1 / (blurLayers + 1)
  const angle = GRADIENT_ANGLES[direction]
  return (
    <div className={cn('relative', className)}>
      {Array.from({ length: layers }).map((_, index) => {
        const stops = [index * segmentSize, (index + 1) * segmentSize, (index + 2) * segmentSize, (index + 3) * segmentSize]
          .map((pos, pi) => `rgba(255,255,255,${pi === 1 || pi === 2 ? 1 : 0}) ${pos * 100}%`).join(', ')
        const gradient = `linear-gradient(${angle}deg, ${stops})`
        return <motion.div key={index} className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ maskImage: gradient, WebkitMaskImage: gradient, backdropFilter: `blur(${index * blurIntensity}px)` }} {...props} />
      })}
    </div>
  )
})

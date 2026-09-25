// 21st.dev: grootstudio/blurred-marquee (dark / gold adaptation)
import { memo } from 'react'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import { InfiniteSlider, ProgressiveBlur } from './infinite-slider'

export type Logo = { src: string; alt: string }

export const BlurredMarquee = memo(function BlurredMarquee({ logos, className }: { logos: Logo[]; className?: string }) {
  return (
    <div className={cn('relative mx-auto max-w-6xl py-6 md:border-x md:border-white/10', className)}>
      <div className="pointer-events-none absolute -top-px left-1/2 w-screen -translate-x-1/2 border-t border-white/10" />
      <InfiniteSlider gap={24} reverse duration={45} durationOnHover={18}>
        {logos.map((logo) => (
          <img key={logo.alt} alt={logo.alt} src={logo.src} loading="lazy" className="pointer-events-none h-20 w-auto select-none brightness-0 invert opacity-70 md:h-24" />
        ))}
      </InfiniteSlider>
      <ProgressiveBlur blurIntensity={1} className="pointer-events-none absolute top-0 left-0 h-full w-24 md:w-40" direction="left" />
      <ProgressiveBlur blurIntensity={1} className="pointer-events-none absolute top-0 right-0 h-full w-24 md:w-40" direction="right" />
      <div className="pointer-events-none absolute -bottom-px left-1/2 w-screen -translate-x-1/2 border-b border-white/10" />
      <Plus className="absolute -top-[12.5px] -right-[12.5px] z-10 hidden size-6 text-gold/70 md:block" strokeWidth={1} />
      <Plus className="absolute -bottom-[12.5px] -left-[12.5px] z-10 hidden size-6 text-gold/70 md:block" strokeWidth={1} />
    </div>
  )
})

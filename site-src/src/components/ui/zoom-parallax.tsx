// 21st.dev: efferd/zoom-parallax (adapted: overlay content + final caption)
import { useScroll, useTransform, motion } from 'motion/react'
import { useRef, type ReactNode } from 'react'

interface Image { src: string; alt?: string; logo?: boolean }
interface ZoomParallaxProps { images: Image[]; children?: ReactNode }

export function ZoomParallax({ images, children }: ZoomParallaxProps) {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] })
  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4])
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5])
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6])
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8])
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9])
  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9]
  const captionOpacity = useTransform(scrollYProgress, [0.72, 0.9], [0, 1])
  const captionY = useTransform(scrollYProgress, [0.72, 0.95], [40, 0])
  const shade = useTransform(scrollYProgress, [0.5, 0.78], [0, 0.74])

  return (
    <div ref={container} className="relative h-[230vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-bone">
        {images.map(({ src, alt, logo }, index) => {
          const scale = scales[index % scales.length]
          return (
            <motion.div key={index} style={{ scale }}
              className={`absolute top-0 flex h-full w-full items-center justify-center ${index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''} ${index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''} ${index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''} ${index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''} ${index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''} ${index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''}`}>
              <div className={logo ? 'relative grid h-[25vh] w-[25vw] place-items-center' : 'relative h-[25vh] w-[25vw] overflow-hidden rounded-[6px] shadow-[0_30px_80px_-20px_rgba(0,0,0,.45)]'}>
                {logo
                  ? <img src={src} alt={alt || ''} className="h-[80%] w-[90%] object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,.12)]" loading="lazy" />
                  : <img src={src} alt={alt || `WISE photo ${index + 1}`} className="h-full w-full object-cover" loading="lazy" />}
              </div>
            </motion.div>
          )
        })}
        <motion.div className="pointer-events-none absolute inset-0 bg-ink" style={{ opacity: shade }} />
        {children && (
          <motion.div className="absolute inset-0 flex items-center justify-center px-6" style={{ opacity: captionOpacity, y: captionY }}>
            {children}
          </motion.div>
        )}
      </div>
    </div>
  )
}

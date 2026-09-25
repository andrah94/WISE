// 21st.dev: efferd/zoom-parallax (adapted: overlay content + final caption)
import { useScroll, useTransform, motion } from 'motion/react'
import { useRef, type ReactNode } from 'react'

interface Image { src: string; alt?: string; logo?: boolean }
const MOBILE: Record<number, string> = {
  0: 'max-md:[&>div]:!h-[22vh] max-md:[&>div]:!w-[70vw]',
  1: 'max-md:[&>div]:!-top-[31vh] max-md:[&>div]:!h-[8vh] max-md:[&>div]:!w-[46vw]',
  2: 'max-md:[&>div]:!-top-[19vh] max-md:[&>div]:!-left-[24vw] max-md:[&>div]:!h-[8vh] max-md:[&>div]:!w-[40vw]',
  3: 'max-md:[&>div]:!-top-[19vh] max-md:[&>div]:!left-[24vw] max-md:[&>div]:!h-[8vh] max-md:[&>div]:!w-[40vw]',
  4: 'max-md:[&>div]:!top-[19vh] max-md:[&>div]:!-left-[24vw] max-md:[&>div]:!h-[8vh] max-md:[&>div]:!w-[40vw]',
  5: 'max-md:[&>div]:!top-[19vh] max-md:[&>div]:!left-[24vw] max-md:[&>div]:!h-[8vh] max-md:[&>div]:!w-[40vw]',
  6: 'max-md:[&>div]:!top-[31vh] max-md:[&>div]:!h-[8vh] max-md:[&>div]:!w-[46vw]',
}

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
              className={`absolute top-0 flex h-full w-full items-center justify-center ${MOBILE[index] ?? ''} ${index === 1 ? 'md:[&>div]:!-top-[30vh] md:[&>div]:!left-[5vw] md:[&>div]:!h-[30vh] md:[&>div]:!w-[35vw]' : ''} ${index === 2 ? 'md:[&>div]:!-top-[10vh] md:[&>div]:!-left-[25vw] md:[&>div]:!h-[45vh] md:[&>div]:!w-[20vw]' : ''} ${index === 3 ? 'md:[&>div]:!left-[27.5vw] md:[&>div]:!h-[25vh] md:[&>div]:!w-[25vw]' : ''} ${index === 4 ? 'md:[&>div]:!top-[27.5vh] md:[&>div]:!left-[5vw] md:[&>div]:!h-[25vh] md:[&>div]:!w-[20vw]' : ''} ${index === 5 ? 'md:[&>div]:!top-[27.5vh] md:[&>div]:!-left-[22.5vw] md:[&>div]:!h-[25vh] md:[&>div]:!w-[30vw]' : ''} ${index === 6 ? 'md:[&>div]:!top-[22.5vh] md:[&>div]:!left-[25vw] md:[&>div]:!h-[15vh] md:[&>div]:!w-[15vw]' : ''}`}>
              <div className={logo ? 'relative grid h-[25vh] w-[25vw] place-items-center' : 'relative h-[25vh] w-[25vw] overflow-hidden rounded-[6px] shadow-[0_30px_80px_-20px_rgba(0,0,0,.45)]'}>
                {logo
                  ? <img src={src} alt={alt || ''} className="h-full w-full object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,.12)] md:h-[80%] md:w-[90%]" loading="lazy" />
                  : <img src={src} alt={alt || `WISE photo ${index + 1}`} className="h-full w-full object-cover object-[28%_65%] md:object-center" loading="lazy" />}
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

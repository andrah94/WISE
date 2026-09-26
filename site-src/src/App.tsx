import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowRight, ArrowUpRight, BadgeCheck, CalendarCheck, Mail, Menu, ShieldCheck, X } from 'lucide-react'
import { Instagram, Linkedin } from '@/components/icons'
import { MaskedTextReveal } from '@/components/ui/text-reveal-mask'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ScrollWordReveal } from '@/components/ui/scroll-word-reveal'
import ScrollRevealContent from '@/components/ui/scroll-reveal-content'
import { ZoomParallax } from '@/components/ui/zoom-parallax'
import { TestimonialsColumn } from '@/components/ui/testimonials-columns'
import { Tilt } from '@/components/ui/tilt'
import { Spotlight } from '@/components/ui/spotlight'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import {
  AMAZON, APPLE_BOOKS, CAREER_URL, EMAIL, GLENN_IG, GLENN_IN, IMG, NEWSLETTER_ENDPOINT, VIDEO_HANDSHAKE, VIDEO_SECOND,
  REVIEWS_ARE_SAMPLE, agentFaqs, careerPath, reviews, faqs, leaders, openCalendly, partners, providers, services, steps, unsplash, wix,
} from '@/data'

const ease = [0.2, 0.7, 0.2, 1] as const

/* ---------- shared bits ---------- */
function GoldButton({ children, onClick, href, className }: { children: React.ReactNode; onClick?: () => void; href?: string; className?: string }) {
  const cls = cn('group relative inline-flex items-center gap-3 overflow-hidden rounded-full gold-bg px-7 py-4 text-[15px] font-medium text-[#141005] shadow-[0_12px_40px_-12px_rgba(201,162,75,.65)] transition-transform duration-500 hover:-translate-y-0.5', className)
  const inner = (
    <>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative">{children}</span>
      <ArrowRight className="relative size-4 transition-transform duration-500 group-hover:translate-x-1" />
    </>
  )
  return href ? <a href={href} target="_blank" rel="noopener" className={cls}>{inner}</a> : <button type="button" onClick={onClick} className={cls}>{inner}</button>
}
function GhostButton({ children, href, onClick, className }: { children: React.ReactNode; href?: string; onClick?: () => void; className?: string }) {
  const cls = cn('inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-[15px] text-white backdrop-blur-md transition-colors duration-300 hover:border-gold-2 hover:text-gold-2', className)
  return href ? <a href={href} className={cls} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}>{children}</a> : <button type="button" onClick={onClick} className={cls}>{children}</button>
}
function FadeUp({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, margin: '0px 0px -4% 0px' }} transition={{ duration: 0.75, delay: delay * 0.7, ease }}>
      {children}
    </motion.div>
  )
}
function Heading({ children, className, as = 'h2', unitClassName = 'gold-text italic' }: { children: React.ReactNode; className?: string; as?: 'h1' | 'h2'; unitClassName?: string }) {
  return <MaskedTextReveal as={as} splitBy="lines" className={cn('display text-[clamp(2.6rem,6vw,5.6rem)] text-bone', className)} unitClassName={unitClassName}>{children}</MaskedTextReveal>
}

/* ---------- nav ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])
  const links = [['Products', '#services'], ['How It Works', '#process'], ['About', '#about'], ['Founder', '#founder'], ['Join WISE', '#careers'], ['FAQ', '#faq']]
  return (
    <>
      <header className={cn('fixed inset-x-0 z-50 transition-all duration-500', scrolled ? 'top-3' : 'top-5')}>
        <div className="mx-auto max-w-7xl px-4">
          <div className={cn('flex items-center justify-between rounded-full border px-3 py-2 pl-4 transition-all duration-500', scrolled ? 'border-white/10 bg-ink/70 shadow-[0_20px_60px_-20px_rgba(0,0,0,.6)] backdrop-blur-xl' : 'border-transparent')}>
            <a href="#top" className="flex items-center gap-3" aria-label="WISE Financial Partners home">
              <img src="/img/mark.png" alt="" className="size-9 object-contain" />
              <span className="font-serif text-lg tracking-tight whitespace-nowrap text-white"><span className="tracking-[0.18em]">WISE</span><span className="hidden text-white/70 sm:inline"> Financial Partners</span></span>
            </a>
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
              {links.map(([l, h]) => <a key={h} href={h} className="rounded-full px-4 py-2 text-sm text-white/75 transition-colors hover:bg-white/5 hover:text-white">{l}</a>)}
            </nav>
            <div className="flex items-center gap-2">
              <a href="#careers" className="hidden rounded-full border border-white/20 px-5 py-2.5 text-sm whitespace-nowrap text-white transition-colors hover:border-gold-2 hover:text-gold-2 xl:inline-flex">Join the Team</a>
              <button onClick={() => openCalendly()} className="hidden rounded-full gold-bg px-5 py-2.5 text-sm font-medium whitespace-nowrap text-[#141005] transition-transform hover:-translate-y-0.5 sm:inline-flex">Book a Free Consult</button>
              <button onClick={() => setOpen(true)} className="grid size-11 place-items-center rounded-full border border-white/15 text-white lg:hidden" aria-label="Open menu"><Menu className="size-5" /></button>
            </div>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[60] flex flex-col justify-center bg-ink/97 px-8 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button onClick={() => setOpen(false)} className="absolute top-6 right-6 grid size-11 place-items-center rounded-full border border-white/15" aria-label="Close menu"><X className="size-5" /></button>
            {links.map(([l, h], i) => (
              <motion.a key={h} href={h} onClick={() => setOpen(false)} className="border-b border-white/10 py-3 font-serif text-4xl text-white" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease }}>{l}</motion.a>
            ))}
            <div className="mt-10 flex flex-col items-start gap-3">
              <GoldButton onClick={() => { setOpen(false); openCalendly() }}>Book a Free Consultation</GoldButton>
              <GhostButton onClick={() => { setOpen(false); openCalendly(CAREER_URL) }}>Explore a Career with WISE</GhostButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ---------- hero ---------- */
function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const glennY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const glennScale = useTransform(scrollYProgress, [0, 1], [1, 1.06])
  const wordY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  return (
    <section id="top" ref={ref} className="grain relative flex min-h-[100svh] items-start overflow-hidden bg-ink pb-14 lg:items-end lg:pb-0">
      <video autoPlay muted loop playsInline aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-[0.16]">
        <source src={VIDEO_HANDSHAKE} type="video/mp4" />
      </video>
      <motion.div aria-hidden className="absolute -top-40 right-[-10%] h-[80vmin] w-[80vmin] rounded-full bg-[radial-gradient(circle,rgba(201,162,75,.38),transparent_62%)] blur-2xl"
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />
      <div aria-hidden className="absolute bottom-[-20%] left-[-10%] h-[70vmin] w-[70vmin] rounded-full bg-[radial-gradient(circle,rgba(156,122,46,.22),transparent_65%)] blur-2xl" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" />

      <motion.div aria-hidden style={{ y: wordY }} className="outline-text pointer-events-none absolute hidden lg:block inset-x-0 bottom-[6vh] select-none text-center font-serif text-[34vw] leading-none tracking-[-0.04em] lg:text-[26vw]">WISE</motion.div>

      <motion.div style={{ y: glennY, scale: glennScale }} className="absolute right-[2vw] bottom-0 z-[2] hidden h-[92svh] origin-bottom lg:block">
        <div aria-hidden className="absolute inset-x-[10%] top-[8%] bottom-0 rounded-full bg-[radial-gradient(closest-side,rgba(231,206,138,.35),transparent)] blur-3xl" />
        <motion.img src="/img/glenn-cutout.webp" alt="Glenn Windom II, Founder of WISE Financial Partners" className="relative h-full w-auto max-w-none object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,.6)]"
          initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, delay: 0.2, ease }} />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
      </motion.div>
      <div aria-hidden className="absolute inset-y-0 left-0 z-[2] hidden w-[62%] bg-gradient-to-r from-ink via-ink/70 to-transparent lg:block" />

      <motion.div style={{ y: contentY, opacity: fade }} className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-[46svh] md:px-10 lg:pt-36 lg:pb-[12svh]">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }} className="eyebrow">Wealth · Impact · Strategy · Execution</motion.div>
        <div className="mt-7 max-w-[52rem]">
          <MaskedTextReveal as="h1" immediate delay={0.25} splitBy="lines" className="display text-[clamp(2.55rem,7.4vw,7.4rem)] leading-[0.98] text-white" unitClassName="gold-text italic">
            Transform your mindset. Protect your <em>income.</em> Build <em>legacy</em> wealth.
          </MaskedTextReveal>
        </div>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.9, ease }} className="mt-8 max-w-lg text-lg leading-relaxed text-white/70">
          WISE Financial Partners combines strategic financial planning with mindset transformation to help you achieve lasting wealth and freedom.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.1, ease }} className="mt-10 flex flex-wrap gap-3">
          <GoldButton onClick={() => openCalendly()}>Start Your Wealth Journey</GoldButton>
          <GhostButton href="#services">See Our Products</GhostButton>
        </motion.div>
        <motion.a href="#careers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.3 }} className="group mt-6 inline-flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-gold-2">
          <span className="h-px w-6 bg-gold-2/70" />Looking to build a career? <span className="text-gold-2">Join the team</span><ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
        </motion.a>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.4 }} className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[13px] tracking-wide text-white/68">
          <span className="flex items-center gap-2"><CalendarCheck className="size-4 text-gold-2" />Free 30-minute consultation</span>
          <span className="flex items-center gap-2"><BadgeCheck className="size-4 text-gold-2" />Licensed in multiple states</span>
          <span className="flex items-center gap-2"><ShieldCheck className="size-4 text-gold-2" />CA Insurance License #4359007</span>
        </motion.div>
      </motion.div>
      <div className="absolute inset-x-0 top-[9svh] z-[3] flex justify-end lg:hidden" aria-hidden="true">
        <motion.div className="relative mr-[-10vw] h-[52svh]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.1, ease }}>
          <div className="absolute inset-x-[8%] top-[14%] bottom-[10%] rounded-full bg-[radial-gradient(closest-side,rgba(231,206,138,.32),transparent)] blur-2xl" />
          <img src="/img/glenn-cutout.webp" alt="" className="relative h-full w-auto max-w-none object-contain object-bottom [mask-image:linear-gradient(to_right,transparent,#000_26%),linear-gradient(to_bottom,#000_45%,transparent_96%)] [mask-composite:intersect] [-webkit-mask-composite:source-in]" />
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- how it works ---------- */
function Process() {
  return (
    <section id="process" className="relative bg-bone py-16 text-ink md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <span className="eyebrow !text-gold-3">How it works</span>
        <Heading className="mt-5 !text-ink text-[clamp(2.4rem,5vw,4.6rem)]" unitClassName="gold-text-deep italic">Three steps to <em>clarity.</em></Heading>
        <ol className="mt-12 grid md:mt-16 md:grid-cols-3 md:gap-10">
          {steps.map((st, i) => (
            <FadeUp key={st.n} delay={i * 0.1}>
              <li className="relative flex gap-6 border-t border-ink/15 py-7 md:block md:pt-8">
                <span className="gold-text-deep font-serif text-5xl leading-none font-light md:text-7xl">{st.n}</span>
                <div className="md:mt-6">
                  <h3 className="font-serif text-2xl text-ink md:text-[1.9rem]">{st.title}</h3>
                  <p className="mt-3 max-w-sm text-base leading-relaxed text-ink/70">{st.desc}</p>
                </div>
              </li>
            </FadeUp>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------- WISE method ---------- */
function Method() {
  return (
    <section id="about" className="relative bg-ink">
      <ScrollRevealContent
        header={
          <>
            <span className="eyebrow">Who we are</span>
            <Heading className="mt-5 text-[clamp(2.4rem,4.6vw,4.4rem)]">What <em>WISE</em> stands for.</Heading>
            <p className="mt-5 max-w-lg font-light leading-relaxed text-bone/75">Our holistic approach addresses both the practical and psychological aspects of financial success, aligning your money decisions with your core values.</p>
          </>
        }
        items={[
          { marker: 'W', title: 'Wealth', description: 'Grow what you have built with strategic planning designed around your values and your timeline.', image: { url: wix(IMG.family, 1100, 1300), alt: 'A family walking together outdoors' } },
          { marker: 'I', title: 'Impact', description: 'Money is a tool for the life and legacy you want. We start with what matters most to you and your family.', image: { url: unsplash('photo-1577896849786-738ed6c78bd3', 1200), alt: 'A family spending time together at home' } },
          { marker: 'S', title: 'Strategy', description: 'A clear, personalized plan across protection, retirement, and legacy, aligned with your goals.', image: { url: wix(IMG.planning, 1100, 1300), alt: 'Financial planning documents' } },
          { marker: 'E', title: 'Execution', description: 'Guidance that helps you put the plan into action, one step at a time.', image: { url: unsplash('photo-1566053166065-79446ba9b79f', 1200), alt: 'A couple walking hand in hand' } },
        ]}
      />
    </section>
  )
}

/* ---------- services ---------- */
function ServiceCard({ s, i, big }: { s: (typeof services)[number]; i: number; big?: boolean }) {
  return (
    <div className={cn('group relative flex w-full flex-col justify-end overflow-hidden rounded-[28px] border border-white/10 text-left', big ? 'min-h-[28rem] md:min-h-[32rem]' : 'min-h-[24rem]')}>
      <img src={s.img} alt="" loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/5" />
      <span className="absolute top-6 left-6 text-xs tracking-[0.22em] text-gold-2">0{i + 1}</span>
      <div className="relative p-7 md:p-8">
        <h3 className={cn('font-serif leading-tight text-white', big ? 'text-3xl md:text-[2.4rem]' : 'text-2xl md:text-[1.7rem]')}>{s.title}</h3>
        <p className="mt-3 max-w-md text-base leading-relaxed text-white/75">{s.desc}</p>
        <ul className="mt-5 grid grid-cols-1 gap-y-2 border-t border-gold/25 pt-4 text-[11px] font-medium tracking-[0.16em] text-gold-2 uppercase sm:grid-cols-2 sm:gap-x-5" aria-label={`${s.title} products`}>
          {s.products.map((p) => <li key={p} className="flex items-center gap-2.5"><span aria-hidden className="h-px w-3 shrink-0 bg-gold/60" />{p}</li>)}
        </ul>
      </div>
    </div>
  )
}

function Services() {
  return (
    <section id="services" className="relative bg-ink py-16 md:py-24">
      <div aria-hidden className="absolute top-0 left-1/2 h-[60vmin] w-[90vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(201,162,75,.12),transparent)] blur-2xl" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="min-w-0 flex-[1_1_40rem]">
            <span className="eyebrow">Products &amp; services</span>
            <Heading className="mt-5">Financial solutions <em>built for you.</em></Heading>
          </div>
          <FadeUp className="flex flex-col items-start gap-5">
            <p className="max-w-sm text-bone/75">Protect those you love. Create the life you deserve. Build a financial legacy. Every consultation is free.</p>
            <GoldButton onClick={() => openCalendly()}>Book a Free Consultation</GoldButton>
          </FadeUp>
        </div>
        <div className="-mx-6 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-4 [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
          {services.map((s, i) => <div key={s.title} className="w-[80vw] shrink-0 snap-center"><ServiceCard s={s} i={i} /></div>)}
        </div>
        <p className="mt-2 text-center text-xs text-white/35 md:hidden">Swipe to see all 7 services</p>
        <div className="mt-10 hidden gap-4 md:grid md:grid-cols-2">
          {services.slice(0, 4).map((s, i) => <FadeUp key={s.title} delay={(i % 2) * 0.08}><ServiceCard s={s} i={i} big /></FadeUp>)}
        </div>
        <div className="mt-4 hidden gap-4 md:grid md:grid-cols-3">
          {services.slice(4).map((s, i) => <FadeUp key={s.title} delay={i * 0.08}><ServiceCard s={s} i={i + 4} /></FadeUp>)}
        </div>
      </div>
    </section>
  )
}

/* ---------- people gallery ---------- */
function Gallery() {
  const images = [
    { src: wix(IMG.glennWorking, 1800, 1200), alt: 'Glenn Windom II at the WISE office' },
    ...providers.map((p) => ({ src: p.src, alt: p.alt, logo: true })),
  ]
  return (
    <section className="relative bg-bone" aria-label="Real people. Real results. Real transformation.">
      <div aria-hidden className="h-[28vh] bg-gradient-to-b from-ink to-bone" />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center justify-center px-6 pb-10 text-center">
        <span className="eyebrow !text-gold-3">Your financial future starts here</span>
        <Heading className="mt-6 !text-ink" unitClassName="gold-text-deep italic">Real people. <em>Real results.</em></Heading>
        <FadeUp delay={0.15}><p className="mt-6 max-w-xl text-ink/65">Backed by a network of industry-leading carriers, with a licensed professional in your corner.</p></FadeUp>
      </div>
      <ZoomParallax images={images}>
        <div className="text-center">
          <p className="display text-[clamp(2.6rem,7vw,6.5rem)] text-white">Real <em className="gold-text italic">transformation.</em></p>
        </div>
      </ZoomParallax>
    </section>
  )
}

/* ---------- client reviews (21st.dev: efferd/testimonials-columns-1) ---------- */
function Reviews() {
  return (
    <section id="reviews" className="relative overflow-hidden bg-bone py-20 text-ink md:py-28">
      <div aria-hidden className="absolute top-1/3 left-1/2 h-[60vmin] w-[90vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(201,162,75,.22),transparent)] blur-2xl" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="min-w-0 flex-[1_1_36rem]">
            <span className="eyebrow !text-gold-3">Client stories</span>
            <Heading className="mt-5 !text-ink" unitClassName="gold-text-deep italic">Trusted by families <em>like yours.</em></Heading>
          </div>
          <FadeUp className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-3">
              <span className="font-serif text-5xl leading-none text-ink">5.0</span>
              <div>
                <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <svg key={i} viewBox="0 0 20 20" className="size-4 fill-gold" aria-hidden><path d="M10 1.5l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L1.4 7.8l6-.8z" /></svg>)}</div>
                <p className="mt-1 text-xs text-ink/55">Average client rating</p>
              </div>
            </div>
            {REVIEWS_ARE_SAMPLE && <span className="rounded-full border border-dashed border-gold-3/60 px-3 py-1 text-[11px] tracking-wide text-gold-3">Sample reviews for layout. Replace before launch.</span>}
          </FadeUp>
        </div>
        <div className="mt-12 flex max-h-[720px] justify-center gap-5 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]">
          <TestimonialsColumn reviews={reviews.slice(0, 3)} duration={26} />
          <TestimonialsColumn reviews={reviews.slice(3, 6)} duration={32} className="hidden md:block" />
          <TestimonialsColumn reviews={reviews.slice(6, 9)} duration={29} className="hidden lg:block" />
        </div>
        <p className="mt-8 text-center text-xs text-ink/50">Testimonials reflect individual experiences and may not be representative of other clients. No guarantee of future performance or success.</p>
      </div>
    </section>
  )
}

/* ---------- founder + book ---------- */
function Founder() {
  return (
    <section id="founder" className="relative overflow-hidden bg-ink-2 py-20 md:py-28">
      <div aria-hidden className="outline-text pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 select-none text-center font-serif text-[20vw] leading-none whitespace-nowrap lg:block">The Money Mirror</div>
      <div aria-hidden className="absolute top-1/2 left-1/4 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(201,162,75,.28),transparent)] blur-2xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <FadeUp className="flex flex-col items-center">
          <Tilt rotationFactor={10} isRevese springOptions={{ stiffness: 26.7, damping: 4.1, mass: 0.2 }} className="group relative rounded-[10px]" style={{ transformOrigin: 'center center' }}>
            <Spotlight className="z-10 from-white/40 via-white/15 to-transparent blur-2xl" size={260} springOptions={{ stiffness: 26.7, damping: 4.1, mass: 0.2 }} />
            <img src="/img/money-mirror.webp" alt="The Money Mirror by Glenn Windom II" className="w-[min(72vw,380px)] rounded-[10px] shadow-[0_50px_100px_-20px_rgba(0,0,0,.85),0_0_0_1px_rgba(255,255,255,.06)]" loading="lazy" />
          </Tilt>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <GoldButton href={AMAZON}>Get on Amazon</GoldButton>
            <GhostButton href={APPLE_BOOKS}>Apple Books <ArrowUpRight className="size-4" /></GhostButton>
          </div>
        </FadeUp>
        <div>
          <span className="eyebrow">Founder & Visionary</span>
          <Heading className="mt-5">Meet Glenn <em>Windom II.</em></Heading>
          <FadeUp delay={0.1}>
            <blockquote className="mt-8 border-l-2 border-gold pl-6 font-serif text-[clamp(1.7rem,2.8vw,2.6rem)] leading-tight font-light text-white italic">"Money isn't math, it's mental."</blockquote>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-8 text-lg leading-relaxed text-bone/75">Glenn Windom II is a visionary financial professional whose unique approach combines mindset coaching with strategic financial planning to help clients achieve lasting wealth and financial freedom.</p>
            <p className="mt-4 text-lg leading-relaxed text-bone/75">As founder of WISE Financial Partners, Glenn empowers creators, professionals, and entrepreneurs to build legacy wealth through a holistic approach that addresses both the practical and psychological aspects of money.</p>
            <p className="mt-6 text-lg leading-relaxed text-bone/80">His book, <em className="gold-text italic">The Money Mirror</em>, explores the psychological principles behind wealth creation.</p>
          </FadeUp>
          <FadeUp delay={0.2} className="mt-10 flex flex-wrap items-center gap-4">
            <a href={GLENN_IG} target="_blank" rel="noopener" aria-label="Glenn on Instagram" className="grid size-12 place-items-center rounded-full border border-white/15 transition-colors hover:border-gold-2 hover:text-gold-2"><Instagram className="size-5" /></a>
            <a href={GLENN_IN} target="_blank" rel="noopener" aria-label="Glenn on LinkedIn" className="grid size-12 place-items-center rounded-full border border-white/15 transition-colors hover:border-gold-2 hover:text-gold-2"><Linkedin className="size-5" /></a>
          </FadeUp>
          <p className="mt-8 text-xs tracking-wider text-white/40">CA Insurance License #4359007 · Licensed in Multiple States</p>
        </div>
      </div>
    </section>
  )
}

/* ---------- team (compact) ---------- */
function Team() {
  const team = leaders.filter((p) => !p.name.startsWith('Glenn'))
  return (
    <section id="team" className="relative border-t border-white/10 bg-ink py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-serif text-2xl text-white md:text-3xl">Our team</h2>
          <span className="text-sm text-white/45">Licensed financial professionals dedicated to your success.</span>
        </div>
        <div className="mt-6 grid sm:mt-8 sm:grid-cols-3 sm:gap-3">
          {team.map((p) => (
            <div key={p.name} className="flex items-center gap-4 border-b border-white/10 py-3 sm:rounded-2xl sm:border sm:bg-white/[0.03] sm:p-3">
              <img src={`/img/team-${p.name.split(' ')[0].toLowerCase()}.webp`} alt={p.name} loading="lazy" className="size-14 rounded-full object-cover ring-1 ring-gold/30" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">{p.name}</p>
                <p className="truncate text-xs text-gold-2">{p.role}</p>
                <p className="truncate text-[11px] text-white/40">{p.lic}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0)
  useEffect(() => { const t = window.setInterval(() => setI((n) => (n + 1) % words.length), 2200); return () => window.clearInterval(t) }, [words.length])
  return (
    <span className="relative inline-block h-[1.2em] overflow-hidden align-top">
      <AnimatePresence mode="wait" initial={false}>
        <motion.em key={words[i]} className="gold-text inline-block whitespace-nowrap italic" initial={{ y: '105%' }} animate={{ y: '0%' }} exit={{ y: '-105%' }} transition={{ duration: 0.55, ease }}>{words[i]}</motion.em>
      </AnimatePresence>
      <span className="sr-only">{words.join(', ')}</span>
    </span>
  )
}

function LitLine({ text, i }: { text: string; i: number }) {
  const ref = useRef<HTMLLIElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 92%', 'start 55%'] })
  const opacity = useTransform(scrollYProgress, [0, 1], [0.18, 1])
  const x = useTransform(scrollYProgress, [0, 1], [-24, 0])
  const line = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <motion.li ref={ref} style={{ opacity }} className="relative py-5">
      <motion.div style={{ x }} className="flex items-baseline gap-5">
        <span className="font-serif text-sm text-gold-2/80 italic">0{i + 1}</span>
        <span className="font-serif text-[clamp(1.5rem,2.6vw,2.2rem)] leading-tight font-light text-white">{text}</span>
      </motion.div>
      <motion.span aria-hidden style={{ scaleX: line }} className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-gold/70 via-white/15 to-transparent" />
    </motion.li>
  )
}

/* ---------- careers / join WISE ---------- */
function Careers() {
  const who = ['career changers.', 'entrepreneurs.', 'new grads.', 'parents.', 'side hustlers.', 'future leaders.']
  const lookFor = ['A willingness to learn', 'A genuine desire to help families', 'Coachable and consistent', 'Integrity in every conversation']
  const youGet = ['Licensing guidance and ongoing training', 'Mentorship from Glenn and experienced leaders', 'A flexible schedule you control', 'Access to industry-leading products and carriers']
  return (
    <section id="careers" className="relative overflow-hidden bg-ink">
      <div className="relative py-20 md:py-32">
        <video autoPlay muted loop playsInline preload="none" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-30">
          <source src={VIDEO_SECOND} type="video/mp4" />
        </video>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <div className="max-w-3xl">
            <span className="eyebrow">Join WISE</span>
            <div className="max-w-[min(100%,7.4em)] text-[clamp(2.6rem,6vw,5.6rem)]"><Heading className="mt-5">Build a business. <em>Grow with us.</em></Heading></div>
            <FadeUp delay={0.1}><p className="mt-7 text-lg leading-relaxed text-bone/80">Help families protect what matters and build wealth, while you build a business of your own. No finance background needed. We train you, mentor you, and grow with you.</p></FadeUp>
            <FadeUp delay={0.15} className="mt-10">
              <p className="font-serif text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[1.2] text-white/85">Built for <RotatingWord words={who} /></p>
            </FadeUp>
          </div>

          {/* path */}
          <div className="mt-16 md:mt-24">
            <p className="text-[11px] tracking-[0.24em] text-gold-2 uppercase">Your path</p>
            <ol className="relative mt-8 grid gap-0 md:grid-cols-5 md:gap-6">
              <div aria-hidden className="absolute top-5 right-[10%] left-[10%] hidden h-px bg-gradient-to-r from-gold/0 via-gold/50 to-gold/0 md:block" />
              <div aria-hidden className="absolute top-2 bottom-2 left-5 w-px bg-gradient-to-b from-gold/60 to-gold/0 md:hidden" />
              {careerPath.map((c, i) => (
                <FadeUp key={c.title} delay={i * 0.08}>
                  <li className="relative flex gap-5 pb-8 md:block md:pb-0 md:text-center">
                    <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full gold-bg font-serif text-base text-ink md:mx-auto">{i + 1}</span>
                    <div className="md:mt-6">
                      <h3 className="font-serif text-xl text-white">{c.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-white/72">{c.desc}</p>
                    </div>
                  </li>
                </FadeUp>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* expectations */}
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-16 md:grid-cols-2 md:gap-16 md:px-10 md:pb-24">
        {[['What we look for', lookFor], ['What you get', youGet]].map(([t, list]) => (
          <div key={t as string}>
            <p className="text-[11px] tracking-[0.24em] text-gold-2 uppercase">{t as string}</p>
            <ul className="mt-4">
              {(list as string[]).map((p, i) => <LitLine key={p} i={i} text={p} />)}
            </ul>
          </div>
        ))}
      </div>

      {/* faces of WISE */}
      <div className="relative pb-16 md:pb-24">
        <div className="mx-auto mb-6 flex max-w-7xl flex-wrap items-baseline justify-between gap-3 px-6 md:px-10">
          <h3 className="font-serif text-3xl text-white">Faces of <em className="gold-text italic">WISE.</em></h3>
          <span className="text-sm text-white/45">Business partners building with us.</span>
        </div>
        <div className="relative [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <InfiniteSlider gap={12} duration={60} durationOnHover={140}>
            {partners.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] py-2 pr-5 pl-2">
                <img src={`/img/partner-${i}.webp`} alt={p.name} loading="lazy" className="size-10 rounded-full object-cover" />
                <p className="text-sm whitespace-nowrap text-white/80">{p.name}</p>
              </div>
            ))}
          </InfiniteSlider>
        </div>
      </div>

      {/* agent FAQ + CTA */}
      <div className="relative mx-auto grid max-w-7xl gap-12 border-t border-white/10 px-6 py-16 md:px-10 md:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div>
          <h3 className="display text-[clamp(2.2rem,4vw,3.6rem)] text-white">Ready to <em className="gold-text italic">start?</em></h3>
          <p className="mt-5 max-w-sm text-bone/75">Book a career conversation with Glenn. We will answer your questions and map out what your first 90 days could look like.</p>
          <GoldButton className="mt-8" onClick={() => openCalendly(CAREER_URL)}>Book a Career Conversation</GoldButton>
          <p className="mt-6 max-w-sm text-[11px] leading-relaxed text-white/40">Associates are independent contractors. Earnings depend on individual effort, results, and many other factors. There is no guarantee of income.</p>
        </div>
        <Accordion type="single" collapsible className="border-t border-white/10">
          {agentFaqs.map((f, i) => (
            <AccordionItem key={f.question} value={`agent-${i}`}>
              <AccordionTrigger>{f.question}</AccordionTrigger>
              <AccordionContent>{f.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

/* ---------- faq ---------- */
function FAQ() {
  return (
    <section id="faq" className="relative bg-bone py-20 text-ink md:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div>
          <span className="eyebrow !text-gold-3">Answers</span>
          <Heading className="mt-5 !text-ink text-[clamp(2.6rem,5vw,4.8rem)]" unitClassName="gold-text-deep italic">Frequently asked <em>questions.</em></Heading>
          <FadeUp delay={0.1}><p className="mt-6 max-w-sm text-ink/70">Everything you need to know before you book your free consultation.</p></FadeUp>
        </div>
        <FadeUp delay={0.1}>
          <Accordion type="single" collapsible defaultValue="item-0" className="border-t border-ink/10">
            {faqs.map((f, i) => (
              <AccordionItem light key={f.question} value={`item-${i}`}>
                <AccordionTrigger light>{f.question}</AccordionTrigger>
                <AccordionContent light>{f.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeUp>
      </div>
    </section>
  )
}

/* ---------- contact + newsletter ---------- */
function Contact() {
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null)
  const [busy, setBusy] = useState(false)
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    if (fd.get('website')) return
    const email = String(fd.get('email') || '').trim()
    const name = String(fd.get('name') || '').trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setMsg({ text: 'Please enter a valid email address.', ok: false }); return }
    setBusy(true); setMsg({ text: 'Processing your subscription...', ok: true })
    try {
      const body = new FormData(); body.append('email', email); if (name) body.append('name', name)
      const res = await fetch(NEWSLETTER_ENDPOINT, { method: 'POST', body })
      const r = await res.json()
      if (r.status === 'success') { setMsg({ text: r.message || 'Thank you for subscribing.', ok: true }); form.reset() }
      else setMsg({ text: r.message || 'Something went wrong. Please try again.', ok: false })
    } catch (err) {
      console.error('Newsletter signup error:', err)
      setMsg({ text: 'Unable to subscribe. Please try again later.', ok: false })
    } finally { setBusy(false) }
  }
  return (
    <section id="contact" className="relative bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="min-w-0 flex-[1_1_40rem]">
            <span className="eyebrow">Get started</span>
            <Heading className="mt-5">Your legacy starts <em>today.</em></Heading>
          </div>
          <FadeUp><p className="max-w-sm text-bone/75">One free conversation. No pressure, no obligation. Just clarity on where you are and where you want to go.</p></FadeUp>
        </div>
        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <FadeUp>
            <div className="relative flex h-full min-h-[380px] flex-col justify-between overflow-hidden rounded-[32px] border border-white/10 p-8 md:p-12 lg:min-h-[460px]">
              <img src={wix(IMG.planning, 1200, 1000)} alt="" loading="lazy" className="absolute inset-0 -z-10 size-full object-cover opacity-50" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-ink/40 via-ink/80 to-ink" />
              <div>
                <span className="eyebrow">Free consultation</span>
                <h3 className="display mt-5 text-[clamp(2.2rem,3.6vw,3.4rem)] text-white">Take the <em className="gold-text italic">next step.</em></h3>
                <p className="mt-4 max-w-md text-white/80">Schedule a free 30-minute consultation with one of our licensed financial professionals.</p>
              </div>
              <div className="mt-10">
                <GoldButton onClick={() => openCalendly()}>Book Your Free Consultation</GoldButton>
                <p className="mt-6 text-sm text-white/68">Or email us directly at <a href={`mailto:${EMAIL}`} className="text-gold-2 underline-offset-4 hover:underline">{EMAIL}</a></p>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div id="newsletter" className="flex h-full flex-col justify-between pt-10 lg:min-h-[460px] lg:rounded-[32px] lg:border lg:border-white/10 lg:bg-gradient-to-b lg:from-white/[0.06] lg:to-white/[0.02] lg:p-12">
              <div>
                <span className="eyebrow">Stay informed</span>
                <h3 className="display mt-5 text-[clamp(2.2rem,3.6vw,3.4rem)] text-white">The WISE <em className="gold-text italic">Report.</em></h3>
                <p className="mt-4 max-w-md text-white/75">Join our newsletter for exclusive financial insights, market updates, and wealth-building strategies.</p>
              </div>
              <form onSubmit={submit} noValidate className="mt-10 grid gap-3">
                <label className="sr-only" htmlFor="nl-name">First name</label>
                <input id="nl-name" name="name" placeholder="Your first name" autoComplete="given-name" className="rounded-2xl border border-white/15 bg-ink/60 px-5 py-4 text-white placeholder:text-white/35 focus:border-gold focus:outline-none" />
                <label className="sr-only" htmlFor="nl-email">Email address</label>
                <input id="nl-email" name="email" type="email" required placeholder="Your email address" autoComplete="email" className="rounded-2xl border border-white/15 bg-ink/60 px-5 py-4 text-white placeholder:text-white/35 focus:border-gold focus:outline-none" />
                <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-px w-px" />
                <button disabled={busy} className="mt-2 rounded-2xl bg-bone py-4 font-medium text-ink transition-colors hover:bg-white disabled:opacity-60">{busy ? 'Subscribing...' : 'Subscribe Now'}</button>
                {msg && <p role="status" className={cn('text-sm', msg.ok ? 'text-gold-2' : 'text-red-400')}>{msg.text}</p>}
                <p className="text-xs text-white/40">We respect your privacy. Unsubscribe anytime. No spam, ever. By subscribing you agree to our <a href="/privacy.html" className="underline">Privacy Policy</a>.</p>
              </form>
            </div>
          </FadeUp>
        </div>
        <FadeUp className="mt-4">
          <div className="flex flex-col items-center gap-5 rounded-[28px] bg-bone px-6 py-5 md:flex-row md:justify-between md:px-10">
            <p className="shrink-0 text-center text-[11px] font-semibold tracking-[0.22em] text-gold-3 uppercase md:text-left">Access to leading carriers</p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:gap-x-6">
              {providers.map((p) => <img key={p.alt} src={p.src} alt={p.alt} loading="lazy" className="h-14 w-auto object-contain md:h-20" />)}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ---------- closing + footer (21st.dev: scrollxui/footer-with-suite adapted) ---------- */
function Footer() {
  const nav = [['Products', '#services'], ['How It Works', '#process'], ['About', '#about'], ['Founder', '#founder'], ['Team', '#team'], ['Join WISE', '#careers'], ['FAQ', '#faq'], ['Contact', '#contact']]
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 pt-16 md:grid-cols-4 md:px-10">
        <div className="col-span-2">
          <div className="flex items-center gap-3"><img src="/img/mark.png" alt="" className="size-12 object-contain" /><span className="font-serif text-2xl text-white"><span className="tracking-[0.18em]">WISE</span> <span className="text-white/70">Financial Partners</span></span></div>
          <p className="mt-6 max-w-xs font-serif text-xl leading-snug font-light text-white/85">Transform your mindset. Protect your income. Build legacy wealth.</p>
          <div className="mt-6 flex gap-3">
            <a href={`mailto:${EMAIL}`} aria-label="Email" className="grid size-11 place-items-center rounded-full border border-white/15 hover:border-gold-2 hover:text-gold-2"><Mail className="size-4" /></a>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="mb-2 text-[11px] tracking-[0.24em] text-gold-2 uppercase">Explore</p>
          {nav.map(([l, h]) => <a key={h} href={h} className="text-sm text-white/65 hover:text-white">{l}</a>)}
        </div>
        <div className="flex flex-col gap-2">
          <p className="mb-2 text-[11px] tracking-[0.24em] text-gold-2 uppercase">Contact</p>
          <a href={`mailto:${EMAIL}`} className="text-sm break-all text-white/65 hover:text-white">{EMAIL}</a>
          <button onClick={() => openCalendly()} className="text-left text-sm text-white/65 hover:text-white">Book a free consultation</button>
          <button onClick={() => openCalendly(CAREER_URL)} className="text-left text-sm text-white/65 hover:text-white">Partner with WISE</button>
        </div>
      </div>
      <p aria-hidden className="gold-text mt-10 text-center font-serif leading-[0.8] font-light tracking-[-0.04em] select-none" style={{ fontSize: 'clamp(5rem, 26vw, 24rem)' }}>WISE</p>
      <div className="mx-auto max-w-7xl border-t border-white/10 px-6 py-8 text-xs leading-relaxed text-white/45 md:px-10">
        <nav className="mb-4 flex flex-wrap gap-6 text-white/70" aria-label="Legal">
          <a href="/privacy.html" className="hover:text-gold-2">Privacy Policy</a>
          <a href="/terms.html" className="hover:text-gold-2">Terms of Use</a>
          <a href="/disclosures.html" className="hover:text-gold-2">Disclosures</a>
        </nav>
        <p>© {new Date().getFullYear()} WISE Financial Partners. All Rights Reserved.</p>
        <p>Glenn Windom II, CA Insurance License #4359007 | Licensed in multiple states</p>
        <p className="mt-2 max-w-4xl">The information on this website is for general educational purposes only and does not constitute financial, investment, tax, legal, or insurance advice. Please see our <a href="/disclosures.html" className="underline">Disclosures</a> for important information.</p>
        <p className="mt-2 max-w-4xl">WISE Financial Partners is affiliated with World Financial Group. Insurance and annuity products are offered through World Financial Group Insurance Agency, LLC and its affiliated agencies, and are subject to state availability. Neither World Financial Group nor its agents provide tax, estate planning, or legal advice.</p>
        <p className="mt-2 max-w-4xl">Business opportunity: associates are independent contractors. Earnings depend on individual effort, results, and many other factors. There is no guarantee of income or success.</p>
      </div>
    </footer>
  )
}

/* ---------- popup ---------- */
function Popup() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    let seen = false
    try { seen = sessionStorage.getItem('wisePopup') === '1' } catch { /* ignore */ }
    if (seen) return
    const trigger = () => { try { sessionStorage.setItem('wisePopup', '1') } catch { /* ignore */ } setShow(true); cleanup() }
    const t = window.setTimeout(trigger, 15000)
    const leave = (e: MouseEvent) => { if (e.clientY <= 0) trigger() }
    document.addEventListener('mouseleave', leave)
    const cleanup = () => { window.clearTimeout(t); document.removeEventListener('mouseleave', leave) }
    return cleanup
  }, [])
  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setShow(false) }
    window.addEventListener('keydown', esc); return () => window.removeEventListener('keydown', esc)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 z-[70] grid place-items-center bg-black/60 p-5 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={(e) => { if (e.target === e.currentTarget) setShow(false) }} role="dialog" aria-modal="true" aria-labelledby="popup-title">
          <motion.div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-gold/25 bg-ink-2 p-9 shadow-2xl" initial={{ y: 30, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.5, ease }}>
            <div aria-hidden className="absolute -top-24 -right-24 size-64 rounded-full bg-[radial-gradient(circle,rgba(201,162,75,.35),transparent_70%)]" />
            <button onClick={() => setShow(false)} aria-label="Close" className="absolute top-4 right-4 grid size-9 place-items-center rounded-full text-white/72 hover:bg-white/10 hover:text-white"><X className="size-4" /></button>
            <img src="/img/mark.png" alt="" className="relative size-12" />
            <h3 id="popup-title" className="display relative mt-5 text-4xl text-white">Start your wealth journey with <em className="gold-text italic">WISE.</em></h3>
            <p className="relative mt-3 text-white/75">Choose how you'd like to begin.</p>
            <div className="relative mt-7 grid gap-3">
              <GoldButton className="justify-center" onClick={() => { setShow(false); openCalendly() }}>Book a Free Consultation</GoldButton>
              <GhostButton className="justify-center" onClick={() => { setShow(false); openCalendly(CAREER_URL) }}>Explore a Career with WISE</GhostButton>
              <button type="button" className="mt-1 text-sm text-white/50 hover:text-gold-2" onClick={() => { setShow(false); document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }}>Or get free financial insights</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---------- always-visible booking ---------- */
function StickyCTA() {
  const [show, setShow] = useState(false)
  const [career, setCareer] = useState(false)
  useEffect(() => {
    const on = () => {
      const c = document.getElementById('careers')?.getBoundingClientRect()
      setCareer(!!c && c.top < window.innerHeight * 0.6 && c.bottom > window.innerHeight * 0.4)
      const past = window.scrollY > window.innerHeight * 0.7
      const nearEnd = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 900
      setShow(past && !nearEnd)
    }
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: 120, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 120, opacity: 0 }} transition={{ duration: 0.5, ease }}
          className="fixed inset-x-3 bottom-3 z-[55] md:hidden">
          <div className="flex items-center gap-4 rounded-full border border-gold/30 bg-ink/85 py-2 pr-2 pl-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,.8)] backdrop-blur-xl">
            <button onClick={() => openCalendly(career ? CAREER_URL : undefined)} className="flex-1 rounded-full gold-bg px-6 py-3 text-sm font-semibold whitespace-nowrap text-[#141005]">{career ? 'Book a Career Conversation' : 'Book a Free Consult'}</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---------- app ---------- */
export default function App() {
  const { scrollYProgress } = useScroll()
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: { offset: -90 } })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left gold-bg" style={{ scaleX: bar }} />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-ink">Skip to main content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Services />
        <Process />
        <ScrollWordReveal kicker="Our philosophy" goldWords={['mental', 'values']}
          text="Money isn't math, it's mental. We align your money decisions with your core values." />
        <Method />
        <Gallery />
        <Reviews />
        <Founder />
        <Team />
        <FAQ />
        <Careers />
        <Contact />
      </main>
      <Footer />
      <StickyCTA />
      <Popup />
    </>
  )
}

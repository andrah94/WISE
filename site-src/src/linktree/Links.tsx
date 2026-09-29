// wisefinancialpartners.com/linktree: Glenn's personal link-in-bio. One column of links, but
// premium: a slow WebGL mesh-gradient backdrop (Paper Shaders, via 21st.dev), Glenn's
// portrait, Fraunces serif, glass rows that fill ivory on hover, and real imagery (photos,
// the book, brand logos) instead of line icons.
import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'motion/react'
import { MeshGradient } from '@paper-design/shaders-react'
import { ArrowRight, ArrowUpRight, Check, Contact, Plus, Share2 } from 'lucide-react'
import { Tilt } from '@/components/ui/tilt'
import { cn } from '@/lib/utils'
import {
  AMAZON, APPLE_BOOKS, BOOK_URL, CAREER_URL, EMAIL, EMAIL_RE, GLENN_IG, GLENN_IN, IG_URL, IMG,
  openCalendly, sendToHQ, subscribeNewsletter, track, wix, withParams,
} from '@/data'

const SITE = 'https://www.wisefinancialpartners.com'
// Glenn's page lives on his own domain; the old WISE address forwards here (see worker/index.js).
const PAGE = 'https://imglennwin.com/linktree/'
const fromHere = { utm_source: 'linktree', utm_medium: 'bio' }
const site = (hash = '') => withParams(`${SITE}/`, fromHere) + hash
const ease = [0.2, 0.7, 0.2, 1] as const
const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]'
const clicked = (link: string) => track('linktree_click', { link })

/* ---------- colorway: Cognac (Glenn's pick; his favorite color is orange) ----------
   accent = labels on dark, deep = labels on the ivory card, glow = halo rgb, soft = avatar/monogram fill.
   Orange stays burnt/cognac on espresso brown, never on black (no Halloween, no candy corn). */
type Theme = { base: string; mesh: string[]; accent: string; deep: string; glow: string; soft: [string, string] }
const theme: Theme = { base: '#1c0e08', mesh: ['#1c0e08', '#43200f', '#7c3514', '#b85a24'], accent: '#f3ab74', deep: '#9a3f12', glow: '240,150,95', soft: ['#f6d2b0', '#d98a52'] }

function Backdrop({ theme }: { theme: Theme }) {
  const still = useReducedMotion()
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0" style={{ background: theme.base }}>
      <MeshGradient className="absolute inset-0 size-full" colors={theme.mesh} distortion={0.9} swirl={0.35} speed={still ? 0 : 0.18} grainOverlay={0.12} />
      <div className="absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_0%,rgba(var(--glow),.16),transparent_70%)]" />
    </div>
  )
}

/* ---------- thumbnails: real imagery, never line icons ---------- */
const thumb = 'relative block size-12 shrink-0 overflow-hidden rounded-[14px] ring-1 ring-white/15'
// If a photo fails to load (e.g. the old Wix host), fall back to a quiet copper tile rather than a broken image.
const Photo = ({ src, pos = 'center' }: { src: string; pos?: string }) => (
  <span className={cn(thumb, 'bg-[linear-gradient(150deg,var(--soft1),var(--soft2))]')}>
    <img src={src} alt="" loading="lazy" className="size-full object-cover" style={{ objectPosition: pos }} onError={(e) => { e.currentTarget.style.display = 'none' }} />
  </span>
)
const Logo = ({ src, bg = '#fff', pad = 'p-2.5' }: { src: string; bg?: string; pad?: string }) => <span className={cn(thumb, 'grid place-items-center', pad)} style={{ background: bg }}><img src={src} alt="" className="size-full object-contain" /></span>
const Avatar = ({ dot }: { dot?: boolean }) => (
  <span className="relative size-12 shrink-0">
    <span className={cn(thumb, 'block bg-[linear-gradient(160deg,var(--soft1),var(--soft2))]')}>
      <img src="/img/glenn-cutout.webp" alt="" className="absolute top-[4%] left-1/2 h-[170%] w-auto max-w-none -translate-x-1/2 object-contain object-top" />
    </span>
    {dot && <span className="absolute -right-0.5 -bottom-0.5 size-3.5 rounded-full border-2 border-[var(--base)] bg-emerald-400" />}
  </span>
)
// Press: a quiet serif masthead tile, so a feature reads as editorial rather than another app icon.
const Masthead = ({ text }: { text: string }) => <span className={cn(thumb, 'grid place-items-center bg-[#f4ede0] font-serif text-[15px] font-semibold tracking-tight text-[var(--base)] italic')}>{text}</span>

/* ---------- a link row: glass, fills ivory on hover ---------- */
type Row = { key: string; title: string; note?: string; media: React.ReactNode; href?: string; onClick?: () => void }
function LinkRow({ r, i }: { r: Row; i: number }) {
  const external = r.href?.startsWith('http')
  const cls = cn('group relative flex w-full items-center gap-4 overflow-hidden rounded-[20px] border border-white/12 bg-[rgba(28,14,8,.5)] p-2.5 pr-4 text-left backdrop-blur-xl transition-[border-color,transform] duration-500 hover:-translate-y-[1px] hover:border-transparent', focusRing)
  const inner = <>
    <span aria-hidden className="absolute inset-0 origin-left scale-x-0 bg-[#f4ede0] transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-x-100" />
    <span className="relative">{r.media}</span>
    <span className="relative min-w-0 flex-1">
      <span className="block text-[15.5px] leading-snug font-medium text-[#f4ede0] transition-colors duration-500 group-hover:text-[var(--base)]">{r.title}</span>
      {r.note && <span className="mt-0.5 block text-[13px] text-[#f4ede0]/75 transition-colors duration-500 group-hover:text-[var(--base)]/75">{r.note}</span>}
    </span>
    <span className="relative text-[#f4ede0]/70 transition-all duration-500 group-hover:translate-x-0.5 group-hover:text-[var(--base)]">
      {external ? <ArrowUpRight className="size-[18px]" strokeWidth={1.6} /> : <ArrowRight className="size-[18px]" strokeWidth={1.6} />}
    </span>
  </>
  const onClick = () => { clicked(r.key); r.onClick?.() }
  return (
    <Reveal i={i}>
      {r.href
        ? <a href={r.href} onClick={onClick} className={cls} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>{inner}</a>
        : <button type="button" onClick={onClick} className={cls}>{inner}</button>}
    </Reveal>
  )
}

function Reveal({ i, children }: { i: number; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -4% 0px' }}
      transition={{ duration: 0.6, delay: Math.min(i, 6) * 0.05, ease }}>{children}</motion.div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-10" aria-label={label}>
      <div className="mb-4 flex items-center gap-4">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20" />
        <h2 className="rounded-full bg-[rgba(28,14,8,.5)] px-3.5 py-1.5 font-serif text-[12.5px] tracking-[0.34em] text-[var(--accent)] uppercase backdrop-blur-md">{label}</h2>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/20" />
      </div>
      <div className="grid gap-3">{children}</div>
    </section>
  )
}

/* ---------- hero ---------- */
function vCard() {
  const lines = ['BEGIN:VCARD', 'VERSION:3.0', 'N:Windom II;Glenn;;;', 'FN:Glenn Windom II', 'ORG:WISE Financial Partners',
    'TITLE:Entrepreneur · Author · Founder of WISE Financial Partners', `EMAIL;TYPE=INTERNET:${EMAIL}`, `URL:${PAGE}`,
    `X-SOCIALPROFILE;TYPE=instagram:${GLENN_IG}`, `X-SOCIALPROFILE;TYPE=linkedin:${GLENN_IN}`, 'END:VCARD']
  const url = URL.createObjectURL(new Blob([lines.join('\r\n')], { type: 'text/vcard' }))
  const a = document.createElement('a'); a.href = url; a.download = 'Glenn-Windom-II.vcf'
  document.body.appendChild(a); a.click(); a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
  clicked('save_contact')
}

function Hero({ onShare }: { onShare: () => void }) {
  const pill = cn('inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-[rgba(28,14,8,.5)] px-4 text-[13px] font-medium text-[#f4ede0] backdrop-blur-xl transition-colors hover:border-white/40 hover:bg-[rgba(28,14,8,.62)]', focusRing)
  return (
    <header className="relative">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-[rgba(28,14,8,.5)] px-3.5 py-2 font-serif text-[12.5px] tracking-[0.3em] text-[#f4ede0]/90 uppercase backdrop-blur-md">Glenn E. Windom II</span>
        <button type="button" onClick={onShare} aria-label="Share this page" className={cn('grid size-11 place-items-center rounded-full border border-white/15 bg-[rgba(28,14,8,.5)] text-[#f4ede0] backdrop-blur-xl hover:bg-[rgba(28,14,8,.62)]', focusRing)}>
          <Share2 className="size-4" strokeWidth={1.7} />
        </button>
      </div>

      <div className="relative mx-auto mt-6 h-[min(50svh,400px)] w-full">
        <motion.div aria-hidden className="absolute bottom-[4%] left-1/2 size-[min(78vw,340px)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(var(--glow),.5),rgba(var(--glow),.08)_70%,transparent)]"
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, ease }} />
        <motion.img src="/img/glenn-cutout.webp" alt="Glenn Windom II" fetchPriority="high"
          className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain object-bottom [mask-image:linear-gradient(to_bottom,#000_70%,transparent)]"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.1, ease }} />
      </div>

      <div className="relative isolate -mt-4 text-center">
        <div aria-hidden className="absolute -inset-x-4 -inset-y-6 -z-10 bg-[radial-gradient(60%_55%_at_50%_45%,rgba(28,14,8,.55),transparent)]" />
        <motion.h1 className="display text-[clamp(2.1rem,9.6vw,3.5rem)] leading-[0.95] text-balance text-[#f4ede0]"
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25, ease }}>
          Glenn E. Windom <em className="accent-text italic">II</em>
        </motion.h1>
        <motion.p className="mt-4 text-[12px] font-medium tracking-[0.3em] text-[var(--accent)] uppercase"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.4 }}>
          Entrepreneur · Author · Founder
        </motion.p>
        <motion.blockquote className="mx-auto mt-3 max-w-[22rem] font-serif text-[17.5px] leading-snug text-[#f4ede0]/85 italic"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.5 }}>
          “<span className="text-[var(--accent)] not-italic">Close the gap.</span> Connection is the bridge between where you are and where you’re meant to be.”
        </motion.blockquote>
        <motion.div className="mt-6 flex flex-wrap items-center justify-center gap-2" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease }}>
          <a href={GLENN_IG} target="_blank" rel="noopener" onClick={() => clicked('ig_glenn_pill')} className={pill}><img src="/img/brands/instagram.svg" alt="" className="size-4" />Instagram</a>
          <a href={GLENN_IN} target="_blank" rel="noopener" onClick={() => clicked('linkedin_pill')} className={pill}><img src="/img/brands/linkedin.svg" alt="" className="size-4 rounded-[3px] bg-white" />LinkedIn</a>
          <button type="button" onClick={vCard} className={pill}><Contact className="size-4" strokeWidth={1.7} />Save contact</button>
        </motion.div>
      </div>
    </header>
  )
}

/* ---------- featured booking: the one ivory card ---------- */
function Consult() {
  return (
    <Reveal i={0}>
      <button type="button" onClick={() => { clicked('book_consult'); openCalendly(withParams(BOOK_URL, { ...fromHere, utm_campaign: 'booking' })) }}
        className={cn('group relative w-full overflow-hidden rounded-[24px] bg-[#f4ede0] p-5 text-left shadow-[0_30px_60px_-30px_rgba(0,0,0,.8)]', focusRing)}>
        <span aria-hidden className="absolute -top-24 -right-20 size-60 rounded-full bg-[radial-gradient(circle,rgba(var(--glow),.4),transparent_65%)] transition-transform duration-700 group-hover:scale-125" />
        <span className="relative flex items-center gap-4">
          <Avatar dot />
          <span className="min-w-0 flex-1">
            <span className="block text-[12px] font-semibold tracking-[0.24em] text-[var(--deep)] uppercase">Free · 30 minutes</span>
            <span className="mt-0.5 block font-serif text-[1.55rem] leading-tight text-[var(--base)]">Book a consultation</span>
          </span>
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[var(--base)] text-[#f4ede0] transition-transform duration-500 group-hover:-rotate-45"><ArrowRight className="size-[18px]" /></span>
        </span>
        <span className="relative mt-3 block text-[13px] text-[var(--base)]/75">With WISE Financial Partners · No cost, no obligation</span>
      </button>
    </Reveal>
  )
}

function Book() {
  const store = (href: string, key: string, children: React.ReactNode) => (
    <a href={href} target="_blank" rel="noopener" onClick={() => clicked(key)}
      className={cn('inline-flex h-11 items-center gap-1.5 rounded-full bg-[#f4ede0] px-4 text-[13px] font-semibold text-[var(--base)] transition-transform hover:-translate-y-0.5', focusRing)}>{children}</a>
  )
  return (
    <Reveal i={0}>
      <div className="relative flex items-center gap-5 overflow-hidden rounded-[24px] border border-white/12 bg-[rgba(28,14,8,.5)] p-5 backdrop-blur-xl">
        <Tilt rotationFactor={12} className="w-[96px] shrink-0">
          <img src="/img/money-mirror.webp" alt="The Money Mirror by Glenn Windom II" loading="lazy" className="w-full rounded-[4px] shadow-[0_22px_34px_-12px_rgba(0,0,0,.8),0_0_0_1px_rgba(255,255,255,.08)]" />
        </Tilt>
        <div className="min-w-0">
          <p className="text-[12px] font-medium tracking-[0.28em] text-[var(--accent)] uppercase">My book</p>
          <p className="mt-1.5 font-serif text-[1.6rem] leading-tight text-[#f4ede0]">The Money <em className="italic">Mirror</em></p>
          <p className="mt-0.5 text-[13px] text-[#f4ede0]/75">Money isn’t math, it’s mental.</p>
          <div className="mt-3.5 flex flex-wrap gap-2">
            {store(AMAZON, 'book_amazon', <>Amazon<ArrowUpRight className="size-3.5" /></>)}
            {store(APPLE_BOOKS, 'book_apple', <><img src="/img/brands/apple.svg" alt="" className="-mt-0.5 size-3.5" />Books<ArrowUpRight className="size-3.5" /></>)}
          </div>
        </div>
      </div>
    </Reveal>
  )
}

/* The WISE Report, Glenn's monthly WISE newsletter: a row that opens into a small form. Sign-ups also go to WISE HQ. */
function Newsletter() {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [msg, setMsg] = useState('')
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const email = String(f.get('email') || '').trim(); const name = String(f.get('name') || '').trim()
    if (!EMAIL_RE.test(email)) { setState('error'); setMsg('Please enter a valid email.'); return }
    setState('sending')
    const r = await subscribeNewsletter(email, name)
    if (r.ok) { sendToHQ({ kind: 'newsletter', email, name, consent: true }); track('newsletter_signup', { location: 'linktree' }) }
    setState(r.ok ? 'done' : 'error'); setMsg(r.text)
  }
  const field = 'w-full min-w-0 rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-[15px] text-[#f4ede0] placeholder:text-[#f4ede0]/65 focus:border-[var(--accent)] focus:outline-none'
  return (
    <Reveal i={0}>
      <div className={cn('overflow-hidden rounded-[20px] border bg-[rgba(28,14,8,.5)] backdrop-blur-xl transition-colors duration-300', open ? 'border-white/35' : 'border-white/12 hover:border-white/30')}>
        <button type="button" aria-expanded={open} onClick={() => { setOpen(!open); if (!open) clicked('newsletter_open') }}
          className={cn('flex w-full items-center gap-4 p-2.5 pr-4 text-left', focusRing)}>
          <Logo src="/img/mark.png" bg="#0d0d0f" pad="p-2" />
          <span className="min-w-0 flex-1">
            <span className="block text-[15.5px] font-medium text-[#f4ede0]">The WISE Report</span>
            <span className="mt-0.5 block text-[13px] text-[#f4ede0]/75">The monthly playbook for building a legacy.</span>
          </span>
          <Plus className={cn('size-[18px] text-[#f4ede0]/50 transition-transform duration-300', open && 'rotate-45 text-[#f4ede0]')} strokeWidth={1.6} />
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease }}>
              <div className="px-3 pb-3">
                {state === 'done'
                  ? <p role="status" className="flex items-center gap-2 px-1 py-2 text-[15px] text-[var(--accent)]"><Check className="size-5" />{msg || 'You’re on the list.'}</p>
                  : <form onSubmit={submit} className="grid gap-2" noValidate>
                      <label className="sr-only" htmlFor="lt-name">First name</label>
                      <input id="lt-name" name="name" autoComplete="given-name" placeholder="First name" className={field} />
                      <label className="sr-only" htmlFor="lt-email">Email</label>
                      <input id="lt-email" name="email" type="email" required autoComplete="email" placeholder="you@email.com" className={field} />
                      <button type="submit" disabled={state === 'sending'} className={cn('rounded-2xl bg-[#f4ede0] px-6 py-3 text-[15px] font-semibold text-[var(--base)] transition-opacity hover:opacity-90 disabled:opacity-60', focusRing)}>
                        {state === 'sending' ? 'Subscribing…' : 'Subscribe'}
                      </button>
                    </form>}
                {state === 'error' && <p role="alert" className="mt-2 px-1 text-sm text-red-300">{msg}</p>}
                <p className="mt-2 px-1 text-[12px] text-[#f4ede0]/70">Unsubscribe anytime. We never sell your information.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  )
}

/* ---------- page ---------- */
export default function Links() {
  const [toast, setToast] = useState('')
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(''), 2400); return () => clearTimeout(t) }, [toast])
  async function share() {
    clicked('share')
    try {
      if (navigator.share) { await navigator.share({ title: 'Glenn Windom II', url: PAGE }); return }
      await navigator.clipboard.writeText(PAGE); setToast('Link copied')
    } catch (err) {
      if ((err as Error)?.name !== 'AbortError') setToast(`Copy this link: ${PAGE.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, '')}`)
    }
  }
  return (
    <MotionConfig reducedMotion="user">
      <div style={{ '--base': theme.base, '--accent': theme.accent, '--deep': theme.deep, '--glow': theme.glow, '--soft1': theme.soft[0], '--soft2': theme.soft[1] } as React.CSSProperties} className="min-h-svh overflow-x-clip text-[#f4ede0]">
        <Backdrop theme={theme} />
        <main className="relative mx-auto w-full max-w-[520px] px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-12">
          <Hero onShare={share} />

          <Section label="Work with me">
            <Consult />
            <LinkRow i={1} r={{ key: 'career', title: 'Build a career with WISE', note: 'Part-time or full-time · we train you', media: <Photo src={wix(IMG.glennWorking, 160, 160, 't')} pos="top" />,
              onClick: () => openCalendly(withParams(CAREER_URL, { ...fromHere, utm_campaign: 'careers' })) }} />
          </Section>

          <Section label="The book">
            <Book />
            <LinkRow i={1} r={{ key: 'check_in', title: 'Take the Money Mirror Check-In', note: 'Five questions · two minutes', media: <Photo src="/img/money-mirror.webp" pos="top" />, href: site('#check-in') }} />
          </Section>

          <Section label="Featured">
            <LinkRow i={0} r={{ key: 'press_voyage_baltimore', title: 'Exploring Life & Business with Glenn Windom II', note: 'Voyage Baltimore · Interview', media: <Masthead text="VB" />,
              href: 'https://voyagebaltimore.com/interview/exploring-life-business-with-glenn-windom-ii-of-wise-financial-partners/' }} />
          </Section>

          <Section label="Ventures">
            <LinkRow i={0} r={{ key: 'website', title: 'WISE Financial Partners', note: 'Wealth · Impact · Strategy · Execution', media: <Logo src="/img/mark.png" bg="#0d0d0f" pad="p-2" />, href: site() }} />
            <Newsletter />
          </Section>

          <Section label="Stay connected">
            <LinkRow i={1} r={{ key: 'ig_glenn', title: '@imglennwin', note: 'Instagram', media: <Logo src="/img/brands/instagram.svg" />, href: GLENN_IG }} />
            <LinkRow i={2} r={{ key: 'ig_wise', title: '@wisefinancialpartners', note: 'Instagram', media: <Logo src="/img/brands/instagram.svg" />, href: IG_URL }} />
            <LinkRow i={3} r={{ key: 'linkedin', title: 'Glenn Windom II', note: 'LinkedIn', media: <Logo src="/img/brands/linkedin.svg" />, href: GLENN_IN }} />
          </Section>

          <footer className="mt-14 rounded-[24px] bg-[rgba(28,14,8,.5)] px-5 py-8 text-center backdrop-blur-md">
            <p className="font-serif text-2xl text-[#f4ede0] italic">Glenn E. Windom <span className="accent-text">II</span></p>
            <p className="mt-4 flex justify-center gap-3 text-[12px] text-[#f4ede0]/80">
              <a href={`${SITE}/disclosures.html`} className="inline-block min-w-11 px-1 py-[13px] hover:text-[var(--accent)]">Disclosures</a>
              <a href={`${SITE}/privacy.html`} className="inline-block min-w-11 px-1 py-[13px] hover:text-[var(--accent)]">Privacy</a>
              <a href={`${SITE}/terms.html`} className="inline-block min-w-11 px-1 py-[13px] hover:text-[var(--accent)]">Terms</a>
            </p>
            <p className="mt-2 text-[12px] text-[#f4ede0]/65">© {new Date().getFullYear()} Glenn E. Windom II</p>
          </footer>
        </main>
      </div>
      <AnimatePresence>
        {toast && (
          <motion.div role="status" className="fixed inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#f4ede0] px-5 py-3 text-sm font-medium text-[var(--base)] shadow-xl" style={{ '--base': theme.base } as React.CSSProperties}><Check className="size-4" />{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}

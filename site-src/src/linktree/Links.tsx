// wisefinancialpartners.com/linktree: Glenn's personal link-in-bio. Glenn first, then each
// of his ventures (WISE Financial Partners is one; add others to `ventures` below). Same
// design system as the main site (gold on ink, Fraunces + Inter, 21st.dev spotlight/tilt),
// built as a second Vite page so it shares the site's booking, quiz and HQ hooks.
import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { ArrowRight, ArrowUpRight, BadgeCheck, Briefcase, CalendarCheck, Check, Contact, Globe, Mail, Share2, ShieldCheck, Sparkles } from 'lucide-react'
import { Instagram, Linkedin } from '@/components/icons'
import { Spotlight } from '@/components/ui/spotlight'
import { Tilt } from '@/components/ui/tilt'
import { cn } from '@/lib/utils'
import {
  AMAZON, APPLE_BOOKS, BOOK_URL, CAREER_URL, EMAIL, EMAIL_RE, GLENN_IG, GLENN_IN, IG_URL,
  openCalendly, sendToHQ, subscribeNewsletter, track, withParams,
} from '@/data'

const ease = [0.2, 0.7, 0.2, 1] as const
const SITE = 'https://www.wisefinancialpartners.com'
const PAGE = `${SITE}/linktree/`
const fromHere = { utm_source: 'linktree', utm_medium: 'bio' }
const site = (hash = '') => withParams('/', fromHere) + hash
const bookUrl = withParams(BOOK_URL, { ...fromHere, utm_campaign: 'booking' })
const careerUrl = withParams(CAREER_URL, { ...fromHere, utm_campaign: 'careers' })
const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-2'

const clicked = (link: string) => track('linktree_click', { link })

/* ---------- backdrop ---------- */
function Backdrop() {
  return (
    <div aria-hidden className="grain pointer-events-none fixed inset-0 overflow-hidden">
      <motion.div className="absolute -top-[30vmax] left-1/2 h-[80vmax] w-[80vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,162,75,.28),transparent_60%)] blur-2xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.9, 1, 0.9] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute -bottom-[25vmax] -left-[20vmax] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle,rgba(156,122,46,.2),transparent_65%)] blur-2xl"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="outline-text absolute inset-x-0 top-[20vh] text-center font-serif text-[40vw] leading-none tracking-[-0.04em] opacity-70 select-none md:text-[26vw]">GW</div>
    </div>
  )
}

/* ---------- top bar ---------- */
function TopBar({ onShare }: { onShare: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-full border border-gold/40 font-serif text-sm tracking-wider text-gold-2">GW</span>
        <span className="font-serif text-base text-white">Glenn Windom <span className="gold-text italic">II</span></span>
      </span>
      <button type="button" onClick={onShare} className={cn('inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.04] px-4 py-2 text-sm text-white/85 backdrop-blur-md transition-colors hover:border-gold-2 hover:text-gold-2', focusRing)}>
        <Share2 className="size-4" />Share
      </button>
    </div>
  )
}

/* ---------- profile ---------- */
function vCard() {
  const lines = ['BEGIN:VCARD', 'VERSION:3.0', 'N:Windom II;Glenn;;;', 'FN:Glenn Windom II', 'ORG:WISE Financial Partners',
    'TITLE:Entrepreneur · Author · Founder of WISE Financial Partners', `EMAIL;TYPE=INTERNET:${EMAIL}`, `URL:${SITE}`,
    `X-SOCIALPROFILE;TYPE=instagram:${GLENN_IG}`, `X-SOCIALPROFILE;TYPE=linkedin:${GLENN_IN}`,
    'NOTE:CA Insurance License #4359007 · Author of The Money Mirror', 'END:VCARD']
  const url = URL.createObjectURL(new Blob([lines.join('\r\n')], { type: 'text/vcard' }))
  const a = document.createElement('a'); a.href = url; a.download = 'Glenn-Windom-II.vcf'
  document.body.appendChild(a); a.click(); a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
  clicked('save_contact')
}

function Social({ href, label, children, onClick }: { href?: string; label: string; children: React.ReactNode; onClick?: () => void }) {
  const cls = cn('grid size-12 place-items-center rounded-full border border-white/12 bg-white/[.04] text-white/85 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-2 hover:text-gold-2', focusRing)
  return href
    ? <a href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel="noopener" aria-label={label} title={label} className={cls} onClick={onClick}>{children}</a>
    : <button type="button" aria-label={label} title={label} className={cls} onClick={onClick}>{children}</button>
}

function Profile() {
  return (
    <header className="mt-10 flex flex-col items-center text-center">
      <motion.div className="relative size-36" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease }}>
        <div aria-hidden className="absolute -inset-6 rounded-full bg-[radial-gradient(closest-side,rgba(231,206,138,.35),transparent)] blur-xl" />
        <div aria-hidden className="ring-spin absolute -inset-[3px] rounded-full" />
        <div className="absolute inset-0 overflow-hidden rounded-full bg-gradient-to-b from-ink-3 to-ink">
          <img src="/img/glenn-cutout.webp" alt="Glenn Windom II" className="absolute top-[6%] left-1/2 h-[150%] w-auto max-w-none -translate-x-1/2 object-contain object-top" />
        </div>
        <span className="absolute right-1 bottom-2 grid size-8 place-items-center rounded-full border-4 border-ink gold-bg" title="Licensed financial professional">
          <BadgeCheck className="size-4 text-ink" strokeWidth={2.5} />
        </span>
      </motion.div>

      <motion.h1 className="display mt-7 text-[clamp(2.4rem,9vw,3.4rem)] text-white" initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.9, delay: 0.15, ease }}>
        Glenn Windom <em className="gold-text italic">II</em>
      </motion.h1>
      <motion.p className="mt-3 max-w-sm text-[15px] leading-relaxed text-white/72" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease }}>
        Entrepreneur · Author of <span className="text-white">The Money Mirror</span> · Founder of <span className="text-white">WISE Financial Partners</span>
      </motion.p>
      <motion.div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[12px] tracking-wide text-white/65" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.45 }}>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[.03] px-3 py-1.5"><ShieldCheck className="size-3.5 text-gold-2" />CA License #4359007</span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[.03] px-3 py-1.5"><BadgeCheck className="size-3.5 text-gold-2" />Licensed in multiple states</span>
      </motion.div>
      <motion.div className="mt-6 flex items-center gap-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.55, ease }}>
        <Social href={GLENN_IG} label="Glenn on Instagram" onClick={() => clicked('ig_glenn_icon')}><Instagram className="size-5" /></Social>
        <Social href={GLENN_IN} label="Glenn on LinkedIn" onClick={() => clicked('linkedin_icon')}><Linkedin className="size-[18px]" /></Social>
        <Social href={`mailto:${EMAIL}`} label="Email WISE" onClick={() => clicked('email_icon')}><Mail className="size-5" /></Social>
        <Social label="Save Glenn's contact" onClick={vCard}><Contact className="size-5" /></Social>
      </motion.div>
    </header>
  )
}

/* ---------- cards ---------- */
type CardProps = { href?: string; onClick?: () => void; className?: string; children: React.ReactNode; i: number; label?: string; external?: boolean }
function Card({ href, onClick, className, children, i, label, external }: CardProps) {
  const cls = cn('group relative block h-full overflow-hidden rounded-[26px] border border-white/10 bg-ink-2/80 p-6 text-left backdrop-blur-xl transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-gold/45 hover:shadow-[0_30px_60px_-30px_rgba(201,162,75,.45)]', focusRing, className)
  const inner = <><Spotlight className="from-gold-2/25 via-gold/10 to-transparent" size={260} />{children}</>
  return (
    <motion.div className="h-full" initial={{ opacity: 0, y: 26, filter: 'blur(6px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, margin: '0px 0px -5% 0px' }} transition={{ duration: 0.7, delay: 0.05 * i, ease }}>
      {href
        ? <a href={href} aria-label={label} onClick={onClick} className={cls} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>{inner}</a>
        : <button type="button" aria-label={label} onClick={onClick} className={cn(cls, 'w-full')}>{inner}</button>}
    </motion.div>
  )
}
const Arrow = ({ up }: { up?: boolean }) => {
  const Icon = up ? ArrowUpRight : ArrowRight
  return <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/15 text-white/80 transition-all duration-500 group-hover:border-gold-2 group-hover:bg-gold-2 group-hover:text-ink"><Icon className="size-4" /></span>
}
const Kicker = ({ children }: { children: React.ReactNode }) => <span className="text-[11px] font-semibold tracking-[0.24em] text-gold-2 uppercase">{children}</span>

function SectionTitle({ kicker, children }: { kicker: string; children: React.ReactNode }) {
  return (
    <div className="mt-14 mb-5 text-center">
      <span className="eyebrow">{kicker}</span>
      <h2 className="display mt-3 text-[2.2rem] text-white">{children}</h2>
    </div>
  )
}

/* ---------- ventures ---------- */
// Glenn's other ventures. Add one entry per venture and it appears under "More from Glenn".
type Venture = { name: string; tagline: string; href: string; logo?: string; cta?: string }
const ventures: Venture[] = []

const help = ['Life insurance', 'Retirement', 'Income protection', 'Estate & legacy', 'College funding', 'Business owners']
function WiseVenture() {
  const sub = (label: string, icon: React.ReactNode, props: { href?: string; onClick?: () => void }) => {
    const cls = cn('group inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sm whitespace-nowrap text-white transition-colors hover:border-gold-2 hover:text-gold-2', focusRing)
    return props.href ? <a href={props.href} onClick={props.onClick} className={cls}>{icon}{label}</a> : <button type="button" onClick={props.onClick} className={cls}>{icon}{label}</button>
  }
  return (
    <motion.div className="beam relative rounded-[28px] p-[1.5px]" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.65, ease }}>
      <div className="relative overflow-hidden rounded-[26.5px] bg-ink-2 p-5 sm:p-6">
        <Spotlight className="from-gold-2/20 via-gold/10 to-transparent" size={300} />
        <div className="relative flex items-center gap-3.5">
          <img src="/img/mark.png" alt="" className="size-11 object-contain" />
          <div className="min-w-0 flex-1">
            <p className="font-serif text-xl leading-tight text-white">WISE Financial Partners</p>
            <p className="text-[13px] text-white/55">Founder & CEO · Wealth, Impact, Strategy, Execution</p>
          </div>
        </div>
        <button type="button" onClick={() => { clicked('book_consult'); openCalendly(bookUrl) }}
          className={cn('group relative mt-5 flex w-full items-center gap-4 overflow-hidden rounded-2xl gold-bg p-4 text-left text-[#141005] shadow-[0_18px_50px_-18px_rgba(201,162,75,.8)] sm:p-5', focusRing)}>
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative grid size-12 shrink-0 place-items-center rounded-xl bg-ink/90 text-gold-2"><CalendarCheck className="size-5" /></span>
          <span className="relative min-w-0 flex-1">
            <span className="block font-serif text-[1.35rem] leading-tight sm:text-2xl">Book a free consultation</span>
            <span className="block text-[13px] text-[#141005]/70">30 minutes · No cost · No obligation</span>
          </span>
          <ArrowRight className="relative size-5 shrink-0 transition-transform duration-500 group-hover:translate-x-1" />
        </button>
        <div className="relative mt-3 flex gap-2">
          {sub('Join the team', <Briefcase className="size-4" />, { onClick: () => { clicked('career'); openCalendly(careerUrl) } })}
          {sub('Website', <Globe className="size-4" />, { href: site(), onClick: () => clicked('website') })}
        </div>
        <div className="relative mt-5 flex flex-wrap gap-1.5">
          {help.map((h) => (
            <a key={h} href={site('#services')} onClick={() => clicked(`help_${h}`)}
              className={cn('rounded-full border border-white/10 bg-white/[.03] px-3 py-1.5 text-[12px] text-white/65 transition-colors hover:border-gold-2 hover:text-gold-2', focusRing)}>{h}</a>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function VentureCard({ v, i }: { v: Venture; i: number }) {
  return (
    <Card i={i} href={v.href} external onClick={() => clicked(`venture_${v.name}`)} className="p-5">
      <div className="relative flex items-center gap-4">
        {v.logo
          ? <img src={v.logo} alt="" className="size-12 shrink-0 rounded-2xl object-cover" />
          : <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-gold/30 bg-gold/10 font-serif text-lg text-gold-2">{v.name.slice(0, 1)}</span>}
        <span className="min-w-0 flex-1">
          <span className="block font-serif text-lg leading-tight text-white">{v.name}</span>
          <span className="mt-0.5 block text-[13px] text-white/55">{v.tagline}</span>
        </span>
        <Arrow up />
      </div>
    </Card>
  )
}

function CheckInCard({ i }: { i: number }) {
  return (
    <Card i={i} href={site('#check-in')} onClick={() => clicked('check_in')} className="min-h-[220px] bg-[linear-gradient(140deg,rgba(201,162,75,.16),rgba(13,13,15,.85)_55%)]">
      <div aria-hidden className="mirror absolute -top-10 -right-10 size-48 rounded-full border border-gold-2/30" />
      <div aria-hidden className="mirror absolute -top-2 -right-2 size-32 rounded-full border border-gold-2/20 [animation-delay:-3s]" />
      <div className="relative flex h-full flex-col">
        <Kicker>2-minute check-in</Kicker>
        <h2 className="display mt-4 max-w-[16ch] text-[2.1rem] text-white">What does your money <em className="gold-text italic">say</em> about you?</h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65">Five quick questions. Get the chapter of <span className="text-white/85">The Money Mirror</span> written for where you are right now.</p>
        <div className="mt-auto flex items-center justify-between pt-6"><span className="text-sm font-medium text-gold-2">Take the Money Mirror Check-In</span><Arrow /></div>
      </div>
    </Card>
  )
}

function BookCard({ i }: { i: number }) {
  const store = (href: string, label: string, key: string) => (
    <a href={href} target="_blank" rel="noopener" onClick={() => clicked(key)}
      className={cn('inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white/15 px-4 py-3 text-sm whitespace-nowrap text-white transition-colors hover:border-gold-2 hover:bg-gold-2 hover:text-ink', focusRing)}>
      {label}<ArrowUpRight className="size-3.5" />
    </a>
  )
  return (
    <motion.div className="h-full" initial={{ opacity: 0, y: 26, filter: 'blur(6px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.05 * i, ease }}>
      <div className="relative flex h-full flex-col gap-6 overflow-hidden rounded-[26px] border border-white/10 bg-ink-2/80 p-6 backdrop-blur-xl sm:flex-row sm:items-center">
        <Spotlight className="from-gold-2/25 via-gold/10 to-transparent" size={260} />
        <Tilt rotationFactor={10} className="mx-auto w-32 shrink-0 sm:mx-0 sm:w-36">
          <img src="/img/money-mirror.webp" alt="The Money Mirror: Money Isn't Math, It's Mental, by Glenn Windom II" loading="lazy"
            className="w-full rounded-md shadow-[0_30px_50px_-15px_rgba(0,0,0,.85),0_0_0_1px_rgba(231,206,138,.2)]" />
        </Tilt>
        <div className="relative min-w-0 flex-1 text-center sm:text-left">
          <h2 className="display text-[2rem] text-white">The Money <em className="gold-text italic">Mirror</em></h2>
          <p className="mt-1 text-sm text-white/60">By Glenn E. Windom II</p>
          <div className="mt-5 flex gap-2">{store(AMAZON, 'Amazon', 'book_amazon')}{store(APPLE_BOOKS, 'Apple Books', 'book_apple')}</div>
        </div>
      </div>
    </motion.div>
  )
}

function SocialCard({ i, href, handle, note, icon, k }: { i: number; href: string; handle: string; note: string; icon: React.ReactNode; k: string }) {
  return (
    <Card i={i} href={href} external onClick={() => clicked(k)} className="p-5">
      <div className="relative flex items-center gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/[.06] text-white transition-colors group-hover:text-gold-2">{icon}</span>
        <span className="min-w-0 flex-1"><span className="block truncate text-[15px] font-medium text-white">{handle}</span><span className="block truncate text-[13px] text-white/55">{note}</span></span>
        <Arrow up />
      </div>
    </Card>
  )
}

/* ---------- newsletter (sign-ups also go to WISE HQ) ---------- */
function Newsletter({ i }: { i: number }) {
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
  const field = 'w-full min-w-0 rounded-full border border-white/15 bg-ink/70 px-5 py-3.5 text-[15px] text-white placeholder:text-white/40 focus:border-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-2/60'
  return (
    <motion.div initial={{ opacity: 0, y: 26, filter: 'blur(6px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.05 * i, ease }}
      className="relative overflow-hidden rounded-[26px] border border-gold/20 bg-[linear-gradient(160deg,rgba(201,162,75,.12),rgba(13,13,15,.9)_60%)] p-6 backdrop-blur-xl">
      <div className="flex items-center gap-3"><Sparkles className="size-5 text-gold-2" /><Kicker>Notes from Glenn</Kicker></div>
      <h2 className="mt-3 font-serif text-2xl text-white">Mindset, money and legacy, in your inbox.</h2>
      {state === 'done'
        ? <p role="status" className="mt-5 flex items-center gap-2 text-[15px] text-gold-2"><Check className="size-5" />{msg || 'You’re on the list.'}</p>
        : <form onSubmit={submit} className="mt-5 grid gap-2.5 sm:grid-cols-[1fr_1.4fr_auto]" noValidate>
            <label className="sr-only" htmlFor="lt-name">First name</label>
            <input id="lt-name" name="name" autoComplete="given-name" placeholder="First name" className={field} />
            <label className="sr-only" htmlFor="lt-email">Email</label>
            <input id="lt-email" name="email" type="email" required autoComplete="email" placeholder="you@email.com" className={field} />
            <button type="submit" disabled={state === 'sending'} className={cn('rounded-full gold-bg px-6 py-3.5 text-[15px] font-medium whitespace-nowrap text-[#141005] transition-transform hover:-translate-y-0.5 disabled:opacity-60', focusRing)}>
              {state === 'sending' ? 'Joining…' : 'Join'}
            </button>
          </form>}
      {state === 'error' && <p role="alert" className="mt-3 text-sm text-red-300">{msg}</p>}
      <p className="mt-3 text-[12px] text-white/45">Unsubscribe anytime. We never sell your information.</p>
    </motion.div>
  )
}

function Footer() {
  return (
    <footer className="mt-14 border-t border-white/10 pt-8 pb-10 text-center text-[12px] leading-relaxed text-white/45">
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-white/60">
        <a href="/disclosures.html" className="hover:text-gold-2">Disclosures</a>
        <a href="/privacy.html" className="hover:text-gold-2">Privacy</a>
        <a href="/terms.html" className="hover:text-gold-2">Terms</a>
      </div>
      <p className="mx-auto mt-5 max-w-xl">About WISE Financial Partners: WISE Financial Partners is affiliated with World Financial Group. Insurance and annuity products are offered through World Financial Group Insurance Agency, LLC and its affiliated agencies, and are subject to state availability. Neither World Financial Group nor its agents provide tax, estate planning, or legal advice.</p>
      <p className="mt-3">© {new Date().getFullYear()} Glenn E. Windom II</p>
    </footer>
  )
}

/* ---------- page ---------- */
export default function Links() {
  const [toast, setToast] = useState('')
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(''), 2400); return () => clearTimeout(t) }, [toast])
  async function share() {
    clicked('share')
    const data = { title: 'Glenn Windom II', text: 'Everything Glenn Windom II is building, in one place.', url: PAGE }
    try {
      if (navigator.share) { await navigator.share(data); return }
      await navigator.clipboard.writeText(PAGE); setToast('Link copied')
    } catch (err) {
      if ((err as Error)?.name !== 'AbortError') setToast('Copy this link: wisefinancialpartners.com/linktree')
    }
  }
  let n = 0
  return (
    <MotionConfig reducedMotion="user">
      <Backdrop />
      <main className="relative mx-auto w-full max-w-[640px] px-4 pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-6 sm:pt-8">
        <TopBar onShare={share} />
        <Profile />
        <p className="mt-12 mb-4 text-center"><span className="eyebrow">Ventures</span></p>
        <section aria-label="Ventures" className="grid gap-4">
          <WiseVenture />
          {ventures.map((v) => <VentureCard key={v.name} v={v} i={n++} />)}
        </section>
        <SectionTitle kicker="The book">Money isn’t math, it’s <em className="gold-text italic">mental.</em></SectionTitle>
        <section aria-label="The Money Mirror" className="grid gap-4">
          <BookCard i={n++} />
          <CheckInCard i={n++} />
        </section>
        <SectionTitle kicker="Connect">Follow the <em className="gold-text italic">journey.</em></SectionTitle>
        <section aria-label="Social" className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2"><SocialCard i={n++} href={GLENN_IG} handle="@imglennwin" note="Glenn on Instagram" icon={<Instagram className="size-5" />} k="ig_glenn" /></div>
          <SocialCard i={n++} href={GLENN_IN} handle="LinkedIn" note="Glenn Windom II" icon={<Linkedin className="size-[18px]" />} k="linkedin" />
          <SocialCard i={n++} href={IG_URL} handle="@wisefinancialpartners" note="WISE on Instagram" icon={<Instagram className="size-5" />} k="ig_wise" />
        </section>
        <div className="mt-4"><Newsletter i={n++} /></div>
        <Footer />
      </main>
      <AnimatePresence>
        {toast && (
          <motion.div role="status" className="fixed inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-ink/90 px-5 py-3 text-sm text-white shadow-2xl backdrop-blur-xl"><Check className="size-4 text-gold-2" />{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}

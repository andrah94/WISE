// wisefinancialpartners.com/linktree: Glenn's personal link-in-bio. Still a Linktree (one
// column of links) but editorial: portrait hero, Fraunces serif, hairline ivory rows grouped
// into short sections, and an espresso fill that sweeps in on hover. Gold is an accent only.
// Add a link by adding a row to one of the `sections` below.
import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { ArrowRight, ArrowUpRight, BookOpen, Briefcase, Check, Contact, Mail, Plus, Share2 } from 'lucide-react'
import { Instagram, Linkedin } from '@/components/icons'
import { Tilt } from '@/components/ui/tilt'
import { cn } from '@/lib/utils'
import {
  AMAZON, APPLE_BOOKS, BOOK_URL, CAREER_URL, EMAIL, EMAIL_RE, GLENN_IG, GLENN_IN, IG_URL,
  openCalendly, sendToHQ, subscribeNewsletter, track, withParams,
} from '@/data'

const SITE = 'https://www.wisefinancialpartners.com'
const PAGE = `${SITE}/linktree/`
const fromHere = { utm_source: 'linktree', utm_medium: 'bio' }
const site = (hash = '') => withParams('/', fromHere) + hash
const ease = [0.2, 0.7, 0.2, 1] as const
const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9c7a2e]'
const clicked = (link: string) => track('linktree_click', { link })

/* palette: ivory paper, espresso ink, champagne accent */
const INK = 'text-[#1d1a16]'
const MUTED = 'text-[#7a7064]'

type Row = { key: string; title: string; note?: string; icon: React.ReactNode; href?: string; onClick?: () => void }
const glyph = (node: React.ReactNode) => <span className="grid size-11 shrink-0 place-items-center rounded-full border border-[#e4dac7] bg-[#f8f3ea] text-[#8a6a24] transition-colors duration-500 group-hover:border-white/15 group-hover:bg-white/10 group-hover:text-[#e7ce8a]">{node}</span>

/* ---------- a link row: hairline ivory, espresso sweeps in on hover ---------- */
function LinkRow({ r, i }: { r: Row; i: number }) {
  const external = r.href?.startsWith('http')
  const cls = cn('group relative flex w-full items-center gap-4 overflow-hidden rounded-[22px] border border-[#e8e0d1] bg-white/75 py-3 pr-4 pl-3 text-left shadow-[0_1px_0_rgba(255,255,255,.9)_inset,0_8px_24px_-18px_rgba(60,45,15,.35)] backdrop-blur-sm transition-[border-color,transform] duration-500 hover:-translate-y-[1px] hover:border-[#1d1a16]', focusRing)
  const inner = <>
    <span aria-hidden className="absolute inset-0 origin-left scale-x-0 bg-[#1d1a16] transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-x-100" />
    <span className="relative">{glyph(r.icon)}</span>
    <span className="relative min-w-0 flex-1">
      <span className={cn('block text-[15.5px] leading-snug font-medium transition-colors duration-500 group-hover:text-[#f6f1e8]', INK)}>{r.title}</span>
      {r.note && <span className={cn('mt-0.5 block text-[13px] transition-colors duration-500 group-hover:text-white/60', MUTED)}>{r.note}</span>}
    </span>
    <span className="relative grid size-8 shrink-0 place-items-center rounded-full text-[#a79c89] transition-all duration-500 group-hover:translate-x-0.5 group-hover:text-[#e7ce8a]">
      {external ? <ArrowUpRight className="size-[18px]" /> : <ArrowRight className="size-[18px]" />}
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

function Reveal({ i, children, className }: { i: number; children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -4% 0px' }}
      transition={{ duration: 0.6, delay: Math.min(i, 6) * 0.05, ease }}>{children}</motion.div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-10" aria-label={label}>
      <div className="mb-4 flex items-center gap-4">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d9cdb6]" />
        <h2 className="font-serif text-[13px] tracking-[0.32em] text-[#8a6a24] uppercase">{label}</h2>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d9cdb6]" />
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

function Social({ href, label, children, onClick }: { href?: string; label: string; children: React.ReactNode; onClick?: () => void }) {
  const cls = cn('grid size-11 place-items-center rounded-full border border-[#e4dac7] bg-white/70 text-[#1d1a16] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1d1a16] hover:bg-[#1d1a16] hover:text-[#e7ce8a]', focusRing)
  return href
    ? <a href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel="noopener" aria-label={label} title={label} className={cls} onClick={onClick}>{children}</a>
    : <button type="button" aria-label={label} title={label} className={cls} onClick={onClick}>{children}</button>
}

function Hero({ onShare }: { onShare: () => void }) {
  return (
    <header>
      <motion.div className="relative h-[min(64svh,460px)] overflow-hidden rounded-[32px] bg-[radial-gradient(90%_70%_at_50%_100%,#e9d7ab_0%,#dcc79a_28%,#cbb389_52%,#b9a07a_100%)] shadow-[0_30px_60px_-35px_rgba(60,45,15,.6)]"
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}>
        <div aria-hidden className="grain absolute inset-0" />
        <motion.span aria-hidden className="absolute inset-x-0 top-[7%] text-center font-serif text-[clamp(8rem,42vw,15rem)] leading-none font-light tracking-[-0.05em] text-white/25 italic select-none"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, delay: 0.2, ease }}>GW</motion.span>
        <motion.img src="/img/glenn-cutout.webp" alt="Glenn Windom II" fetchPriority="high"
          className="absolute bottom-0 left-1/2 h-[92%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom drop-shadow-[0_20px_30px_rgba(60,40,10,.35)]"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.1, ease }} />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#f6f1e8] via-[#f6f1e8]/70 to-transparent" />
        <button type="button" onClick={onShare} aria-label="Share this page"
          className={cn('absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-white/55 text-[#1d1a16] backdrop-blur-md transition-colors hover:bg-white', focusRing)}>
          <Share2 className="size-4" />
        </button>
      </motion.div>

      <div className="relative -mt-6 text-center">
        <motion.h1 className={cn('display text-[clamp(2.7rem,11vw,3.6rem)] leading-[0.95]', INK)}
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25, ease }}>
          Glenn Windom <em className="gold-text-deep italic">II</em>
        </motion.h1>
        <motion.p className="mt-4 text-[11.5px] font-medium tracking-[0.28em] text-[#8a6a24] uppercase"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.4 }}>
          Entrepreneur · Author · Founder
        </motion.p>
        <motion.p className={cn('mx-auto mt-3 max-w-[22rem] font-serif text-[17px] leading-snug italic', MUTED)}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.5 }}>
          Money isn’t math, it’s mental. Building wealth, impact and legacy.
        </motion.p>
        <motion.div className="mt-6 flex items-center justify-center gap-2.5" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease }}>
          <Social href={GLENN_IG} label="Instagram" onClick={() => clicked('ig_glenn_icon')}><Instagram className="size-[19px]" /></Social>
          <Social href={GLENN_IN} label="LinkedIn" onClick={() => clicked('linkedin_icon')}><Linkedin className="size-[17px]" /></Social>
          <Social href={`mailto:${EMAIL}`} label="Email" onClick={() => clicked('email_icon')}><Mail className="size-[19px]" /></Social>
          <Social label="Save my contact" onClick={vCard}><Contact className="size-[19px]" /></Social>
        </motion.div>
      </div>
    </header>
  )
}

/* ---------- featured: the one dark moment on the page ---------- */
function Consult() {
  return (
    <Reveal i={0}>
      <button type="button" onClick={() => { clicked('book_consult'); openCalendly(withParams(BOOK_URL, { ...fromHere, utm_campaign: 'booking' })) }}
        className={cn('group relative w-full overflow-hidden rounded-[26px] bg-[#1d1a16] p-6 text-left text-[#f6f1e8] shadow-[0_24px_50px_-28px_rgba(29,26,22,.9)]', focusRing)}>
        <span aria-hidden className="absolute -top-20 -right-16 size-56 rounded-full bg-[radial-gradient(circle,rgba(231,206,138,.28),transparent_65%)] transition-transform duration-700 group-hover:scale-125" />
        <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[.06] to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
        <span className="relative flex items-end justify-between gap-4">
          <span>
            <span className="text-[11px] font-medium tracking-[0.28em] text-[#e7ce8a] uppercase">WISE Financial Partners</span>
            <span className="mt-2 block font-serif text-[1.9rem] leading-[1.05] font-light">Book a free<br /><em className="gold-text italic">consultation</em></span>
            <span className="mt-3 block text-[13px] text-white/55">30 minutes · No cost · No obligation</span>
          </span>
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#f6f1e8] text-[#1d1a16] transition-transform duration-500 group-hover:rotate-[-45deg]"><ArrowRight className="size-5" /></span>
        </span>
      </button>
    </Reveal>
  )
}

function Book() {
  const store = (href: string, label: string, key: string) => (
    <a href={href} target="_blank" rel="noopener" onClick={() => clicked(key)}
      className={cn('inline-flex items-center gap-1.5 rounded-full border border-[#1d1a16]/15 px-4 py-2 text-[13px] font-medium text-[#1d1a16] transition-colors hover:border-[#1d1a16] hover:bg-[#1d1a16] hover:text-[#f6f1e8]', focusRing)}>
      {label}<ArrowUpRight className="size-3.5" />
    </a>
  )
  return (
    <Reveal i={0}>
      <div className="relative flex items-center gap-5 overflow-hidden rounded-[26px] border border-[#e8e0d1] bg-gradient-to-br from-white/90 to-[#f3ead9]/90 p-5 shadow-[0_8px_24px_-18px_rgba(60,45,15,.35)]">
        <Tilt rotationFactor={12} className="w-[92px] shrink-0">
          <img src="/img/money-mirror.webp" alt="The Money Mirror by Glenn Windom II" loading="lazy" className="w-full rounded-[4px] shadow-[0_18px_30px_-12px_rgba(40,25,5,.6),0_0_0_1px_rgba(0,0,0,.06)]" />
        </Tilt>
        <div className="min-w-0">
          <p className="text-[11px] font-medium tracking-[0.28em] text-[#8a6a24] uppercase">My book</p>
          <p className={cn('mt-1.5 font-serif text-[1.55rem] leading-tight', INK)}>The Money <em className="italic">Mirror</em></p>
          <p className={cn('mt-0.5 text-[13px]', MUTED)}>Money isn’t math, it’s mental.</p>
          <div className="mt-3.5 flex flex-wrap gap-2">{store(AMAZON, 'Amazon', 'book_amazon')}{store(APPLE_BOOKS, 'Apple Books', 'book_apple')}</div>
        </div>
      </div>
    </Reveal>
  )
}

/* Money notes: a row that opens into a small form. Sign-ups also go to WISE HQ. */
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
  const field = 'w-full min-w-0 rounded-2xl border border-[#e4dac7] bg-[#fbf8f2] px-4 py-3 text-[15px] text-[#1d1a16] placeholder:text-[#a79c89] focus:border-[#9c7a2e] focus:outline-none'
  return (
    <Reveal i={0}>
      <div className={cn('overflow-hidden rounded-[22px] border bg-white/75 backdrop-blur-sm transition-colors duration-300', open ? 'border-[#1d1a16]' : 'border-[#e8e0d1] hover:border-[#1d1a16]')}>
        <button type="button" aria-expanded={open} onClick={() => { setOpen(!open); if (!open) clicked('newsletter_open') }}
          className={cn('group flex w-full items-center gap-4 py-3 pr-4 pl-3 text-left', focusRing)}>
          <span className="grid size-11 shrink-0 place-items-center rounded-full border border-[#e4dac7] bg-[#f8f3ea] text-[#8a6a24]"><Mail className="size-[18px]" /></span>
          <span className="min-w-0 flex-1">
            <span className={cn('block text-[15.5px] font-medium', INK)}>Get my money notes</span>
            <span className={cn('mt-0.5 block text-[13px]', MUTED)}>Mindset, money and legacy, by email</span>
          </span>
          <Plus className={cn('mr-1.5 size-[18px] text-[#a79c89] transition-transform duration-300', open && 'rotate-45 text-[#1d1a16]')} />
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease }}>
              <div className="px-4 pb-4">
                {state === 'done'
                  ? <p role="status" className="flex items-center gap-2 py-2 text-[15px] text-[#8a6a24]"><Check className="size-5" />{msg || 'You’re on the list.'}</p>
                  : <form onSubmit={submit} className="grid gap-2" noValidate>
                      <label className="sr-only" htmlFor="lt-name">First name</label>
                      <input id="lt-name" name="name" autoComplete="given-name" placeholder="First name" className={field} />
                      <label className="sr-only" htmlFor="lt-email">Email</label>
                      <input id="lt-email" name="email" type="email" required autoComplete="email" placeholder="you@email.com" className={field} />
                      <button type="submit" disabled={state === 'sending'} className={cn('rounded-2xl bg-[#1d1a16] px-6 py-3 text-[15px] font-medium text-[#f6f1e8] transition-opacity hover:opacity-90 disabled:opacity-60', focusRing)}>
                        {state === 'sending' ? 'Joining…' : 'Sign me up'}
                      </button>
                    </form>}
                {state === 'error' && <p role="alert" className="mt-2 text-sm text-red-700">{msg}</p>}
                <p className="mt-2 text-[11.5px] text-[#a79c89]">Unsubscribe anytime. We never sell your information.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  )
}

/* ---------- page ---------- */
const wiseMark = <span className="-m-[11px] grid size-11 place-items-center rounded-full bg-[#1d1a16]"><img src="/img/mark.png" alt="" className="size-6 object-contain" /></span>

export default function Links() {
  const [toast, setToast] = useState('')
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(''), 2400); return () => clearTimeout(t) }, [toast])
  async function share() {
    clicked('share')
    try {
      if (navigator.share) { await navigator.share({ title: 'Glenn Windom II', url: PAGE }); return }
      await navigator.clipboard.writeText(PAGE); setToast('Link copied')
    } catch (err) {
      if ((err as Error)?.name !== 'AbortError') setToast('Copy this link: wisefinancialpartners.com/linktree')
    }
  }
  return (
    <MotionConfig reducedMotion="user">
      <div aria-hidden className="grain pointer-events-none fixed inset-0 bg-[radial-gradient(120%_50%_at_50%_0%,#efe2c2_0%,rgba(239,226,194,0)_70%)]" />
      <main className="relative mx-auto w-full max-w-[520px] px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-12">
        <Hero onShare={share} />

        <Section label="Work with me">
          <Consult />
          <LinkRow i={1} r={{ key: 'career', title: 'Build a career with WISE', note: 'Part-time or full-time · we train you', icon: <Briefcase className="size-[18px]" />,
            onClick: () => openCalendly(withParams(CAREER_URL, { ...fromHere, utm_campaign: 'careers' })) }} />
        </Section>

        <Section label="The book">
          <Book />
          <LinkRow i={1} r={{ key: 'check_in', title: 'Take the Money Mirror Check-In', note: 'Five questions · two minutes', icon: <BookOpen className="size-[18px]" />, href: site('#check-in') }} />
        </Section>

        <Section label="Ventures">
          <LinkRow i={0} r={{ key: 'website', title: 'WISE Financial Partners', note: 'Wealth · Impact · Strategy · Execution', icon: wiseMark, href: site() }} />
        </Section>

        <Section label="Stay connected">
          <Newsletter />
          <LinkRow i={1} r={{ key: 'ig_glenn', title: '@imglennwin', note: 'Instagram', icon: <Instagram className="size-[18px]" />, href: GLENN_IG }} />
          <LinkRow i={2} r={{ key: 'ig_wise', title: '@wisefinancialpartners', note: 'Instagram', icon: <Instagram className="size-[18px]" />, href: IG_URL }} />
          <LinkRow i={3} r={{ key: 'linkedin', title: 'Glenn Windom II', note: 'LinkedIn', icon: <Linkedin className="size-4" />, href: GLENN_IN }} />
        </Section>

        <footer className="mt-14 text-center">
          <p className={cn('font-serif text-2xl italic', INK)}>Glenn Windom <span className="gold-text-deep">II</span></p>
          <p className="mx-auto mt-5 max-w-md text-[11px] leading-relaxed text-[#a0968a]">WISE Financial Partners is affiliated with World Financial Group. Insurance and annuity products are offered through World Financial Group Insurance Agency, LLC and its affiliated agencies, and are subject to state availability. Neither World Financial Group nor its agents provide tax, estate planning, or legal advice. CA Insurance License #4359007.</p>
          <p className="mt-3 flex justify-center gap-4 text-[11.5px] text-[#7a7064]">
            <a href="/disclosures.html" className="hover:text-[#8a6a24]">Disclosures</a>
            <a href="/privacy.html" className="hover:text-[#8a6a24]">Privacy</a>
            <a href="/terms.html" className="hover:text-[#8a6a24]">Terms</a>
          </p>
          <p className="mt-2 text-[11px] text-[#a0968a]">© {new Date().getFullYear()} Glenn E. Windom II</p>
        </footer>
      </main>
      <AnimatePresence>
        {toast && (
          <motion.div role="status" className="fixed inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#1d1a16] px-5 py-3 text-sm text-[#f6f1e8] shadow-xl"><Check className="size-4 text-[#e7ce8a]" />{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}

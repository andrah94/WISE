// wisefinancialpartners.com/linktree: Glenn's personal link-in-bio. A classic Linktree:
// photo, name, one-line bio, social icons, then a single column of link buttons. Light and
// simple on purpose; gold is only an accent. Add a button by adding an entry to `links`.
import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { ArrowUpRight, BookOpen, Briefcase, CalendarCheck, Check, ChevronDown, Contact, Globe, Mail, Share2, Sparkles } from 'lucide-react'
import { Instagram, Linkedin } from '@/components/icons'
import { cn } from '@/lib/utils'
import {
  AMAZON, APPLE_BOOKS, BOOK_URL, CAREER_URL, EMAIL, EMAIL_RE, GLENN_IG, GLENN_IN, IG_URL,
  openCalendly, sendToHQ, subscribeNewsletter, track, withParams,
} from '@/data'

const SITE = 'https://www.wisefinancialpartners.com'
const PAGE = `${SITE}/linktree/`
const fromHere = { utm_source: 'linktree', utm_medium: 'bio' }
const site = (hash = '') => withParams('/', fromHere) + hash
const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9c7a2e]'
const clicked = (link: string) => track('linktree_click', { link })

type Link = { key: string; title: string; note?: string; thumb: React.ReactNode; href?: string; onClick?: () => void; featured?: boolean }
const tile = (icon: React.ReactNode) => <span className="grid size-full place-items-center bg-[#f3ecdd] text-[#8a6a24]">{icon}</span>
const img = (src: string) => <img src={src} alt="" className="size-full object-cover object-top" />

const links: Link[] = [
  { key: 'book_consult', title: 'Book a free consultation', note: 'WISE Financial Partners · 30 min', featured: true, thumb: tile(<CalendarCheck className="size-5" />),
    onClick: () => openCalendly(withParams(BOOK_URL, { ...fromHere, utm_campaign: 'booking' })) },
  { key: 'book_amazon', title: 'Get my book on Amazon', note: 'The Money Mirror', thumb: img('/img/money-mirror.webp'), href: AMAZON },
  { key: 'book_apple', title: 'Get my book on Apple Books', note: 'The Money Mirror', thumb: img('/img/money-mirror.webp'), href: APPLE_BOOKS },
  { key: 'check_in', title: 'Take the Money Mirror Check-In', note: '2 minutes · free', thumb: tile(<BookOpen className="size-5" />), href: site('#check-in') },
  { key: 'website', title: 'WISE Financial Partners', note: 'My financial services firm', thumb: <span className="grid size-full place-items-center bg-[#111]"><img src="/img/mark.png" alt="" className="size-7 object-contain" /></span>, href: site() },
  { key: 'career', title: 'Build a career with WISE', note: 'Part-time or full-time', thumb: tile(<Briefcase className="size-5" />),
    onClick: () => openCalendly(withParams(CAREER_URL, { ...fromHere, utm_campaign: 'careers' })) },
]

/* ---------- pieces ---------- */
function LinkButton({ l, i }: { l: Link; i: number }) {
  const external = l.href?.startsWith('http')
  const cls = cn('group relative flex w-full items-center gap-3 rounded-2xl border p-2 pr-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-12px_rgba(60,45,15,.35)]',
    l.featured ? 'border-transparent bg-[#1b1a17] text-white' : 'border-[#e6dfd2] bg-white text-[#1b1a17] hover:border-[#c9a24b]', focusRing)
  const inner = <>
    <span className="size-12 shrink-0 overflow-hidden rounded-xl">{l.thumb}</span>
    <span className="min-w-0 flex-1 text-center">
      <span className="block text-[15px] leading-snug font-semibold">{l.title}</span>
      {l.note && <span className={cn('mt-0.5 block text-[12.5px]', l.featured ? 'text-white/65' : 'text-[#6b645a]')}>{l.note}</span>}
    </span>
    <span className="w-12 shrink-0 text-right">{external && <ArrowUpRight className={cn('ml-auto size-4', l.featured ? 'text-[#e7ce8a]' : 'text-[#b5ab9a] group-hover:text-[#9c7a2e]')} />}</span>
  </>
  const onClick = () => { clicked(l.key); l.onClick?.() }
  return (
    <motion.li initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}>
      {l.href
        ? <a href={l.href} onClick={onClick} className={cls} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>{inner}</a>
        : <button type="button" onClick={onClick} className={cls}>{inner}</button>}
    </motion.li>
  )
}

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
  const cls = cn('grid size-10 place-items-center rounded-full text-[#1b1a17] transition-colors hover:bg-[#1b1a17]/[.06] hover:text-[#8a6a24]', focusRing)
  return href
    ? <a href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel="noopener" aria-label={label} title={label} className={cls} onClick={onClick}>{children}</a>
    : <button type="button" aria-label={label} title={label} className={cls} onClick={onClick}>{children}</button>
}

/* Newsletter: a link-style button that opens into a small form. Sign-ups also go to WISE HQ. */
function Newsletter({ i }: { i: number }) {
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
  const field = 'w-full min-w-0 rounded-xl border border-[#e6dfd2] bg-[#faf8f4] px-4 py-3 text-[15px] text-[#1b1a17] placeholder:text-[#a39a8a] focus:border-[#c9a24b] focus:outline-none'
  return (
    <motion.li initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
      className={cn('overflow-hidden rounded-2xl border bg-white transition-colors', open ? 'border-[#c9a24b]' : 'border-[#e6dfd2] hover:border-[#c9a24b]')}>
      <button type="button" aria-expanded={open} onClick={() => { setOpen(!open); if (!open) clicked('newsletter_open') }}
        className={cn('flex w-full items-center gap-3 p-2 pr-4 text-left text-[#1b1a17]', focusRing)}>
        <span className="size-12 shrink-0 overflow-hidden rounded-xl">{tile(<Sparkles className="size-5" />)}</span>
        <span className="min-w-0 flex-1 text-center">
          <span className="block text-[15px] font-semibold">Get my money notes</span>
          <span className="mt-0.5 block text-[12.5px] text-[#6b645a]">Mindset, money and legacy by email</span>
        </span>
        <span className="w-12 shrink-0"><ChevronDown className={cn('ml-auto size-4 text-[#b5ab9a] transition-transform', open && 'rotate-180')} /></span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.25 }}>
            <div className="px-4 pt-1 pb-4">
              {state === 'done'
                ? <p role="status" className="flex items-center justify-center gap-2 py-2 text-[15px] text-[#8a6a24]"><Check className="size-5" />{msg || 'You’re on the list.'}</p>
                : <form onSubmit={submit} className="grid gap-2" noValidate>
                    <label className="sr-only" htmlFor="lt-name">First name</label>
                    <input id="lt-name" name="name" autoComplete="given-name" placeholder="First name" className={field} />
                    <label className="sr-only" htmlFor="lt-email">Email</label>
                    <input id="lt-email" name="email" type="email" required autoComplete="email" placeholder="you@email.com" className={field} />
                    <button type="submit" disabled={state === 'sending'} className={cn('rounded-xl bg-[#1b1a17] px-6 py-3 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60', focusRing)}>
                      {state === 'sending' ? 'Joining…' : 'Sign me up'}
                    </button>
                  </form>}
              {state === 'error' && <p role="alert" className="mt-2 text-center text-sm text-red-700">{msg}</p>}
              <p className="mt-2 text-center text-[11.5px] text-[#8c8474]">Unsubscribe anytime. We never sell your information.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
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
      if ((err as Error)?.name !== 'AbortError') setToast('Copy this link: wisefinancialpartners.com/linktree')
    }
  }
  return (
    <MotionConfig reducedMotion="user">
      <div aria-hidden className="pointer-events-none fixed inset-0 bg-[radial-gradient(120%_60%_at_50%_0%,#f3e6c4_0%,rgba(243,230,196,0)_60%)]" />
      <main className="relative mx-auto w-full max-w-[580px] px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-10">
        <div className="flex justify-end">
          <button type="button" onClick={share} aria-label="Share this page" className={cn('grid size-10 place-items-center rounded-full bg-white/70 text-[#1b1a17] shadow-sm backdrop-blur transition-colors hover:bg-white', focusRing)}>
            <Share2 className="size-4" />
          </button>
        </div>

        <header className="flex flex-col items-center text-center">
          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="relative size-28 overflow-hidden rounded-full bg-gradient-to-b from-[#e9dcc0] to-[#cdb88a] ring-4 ring-white shadow-[0_12px_30px_-12px_rgba(60,45,15,.45)]">
            <img src="/img/glenn-cutout.webp" alt="Glenn Windom II" className="absolute top-[6%] left-1/2 h-[150%] w-auto max-w-none -translate-x-1/2 object-contain object-top" />
          </motion.div>
          <h1 className="mt-4 text-[22px] font-bold tracking-tight text-[#1b1a17]">Glenn Windom II</h1>
          <p className="mt-1.5 max-w-xs text-[14.5px] leading-snug text-[#5c554b]">Entrepreneur · Author of <em>The Money Mirror</em> · Founder of WISE Financial Partners</p>
          <div className="mt-3 flex items-center gap-1">
            <Social href={GLENN_IG} label="Instagram" onClick={() => clicked('ig_glenn_icon')}><Instagram className="size-[22px]" /></Social>
            <Social href={GLENN_IN} label="LinkedIn" onClick={() => clicked('linkedin_icon')}><Linkedin className="size-5" /></Social>
            <Social href={`mailto:${EMAIL}`} label="Email" onClick={() => clicked('email_icon')}><Mail className="size-[22px]" /></Social>
            <Social label="Save my contact" onClick={vCard}><Contact className="size-[22px]" /></Social>
          </div>
        </header>

        <ul className="mt-7 grid gap-3.5">
          {links.map((l, i) => <LinkButton key={l.key} l={l} i={i} />)}
          <Newsletter i={links.length} />
          <LinkButton i={links.length + 1} l={{ key: 'ig_wise', title: '@wisefinancialpartners', note: 'WISE on Instagram', thumb: tile(<Instagram className="size-5" />), href: IG_URL }} />
          <LinkButton i={links.length + 2} l={{ key: 'website_more', title: 'Explore everything WISE offers', thumb: tile(<Globe className="size-5" />), href: site('#services') }} />
        </ul>

        <footer className="mt-12 text-center text-[11.5px] leading-relaxed text-[#8c8474]">
          <p className="mx-auto max-w-md">WISE Financial Partners is affiliated with World Financial Group. Insurance and annuity products are offered through World Financial Group Insurance Agency, LLC and its affiliated agencies, and are subject to state availability. Neither World Financial Group nor its agents provide tax, estate planning, or legal advice. CA Insurance License #4359007.</p>
          <p className="mt-3 flex justify-center gap-4 text-[#5c554b]">
            <a href="/disclosures.html" className="hover:text-[#8a6a24]">Disclosures</a>
            <a href="/privacy.html" className="hover:text-[#8a6a24]">Privacy</a>
            <a href="/terms.html" className="hover:text-[#8a6a24]">Terms</a>
          </p>
          <p className="mt-2">© {new Date().getFullYear()} Glenn E. Windom II</p>
        </footer>
      </main>
      <AnimatePresence>
        {toast && (
          <motion.div role="status" className="fixed inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#1b1a17] px-5 py-3 text-sm text-white shadow-xl"><Check className="size-4 text-[#e7ce8a]" />{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}

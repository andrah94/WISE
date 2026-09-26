const W = 'https://static.wixstatic.com/media/'
/** Wix image resize helper (serves AVIF/WebP automatically) */
export const wix = (id: string, w: number, h: number, al: 'c' | 't' = 'c') =>
  `${W}${id}/v1/fill/w_${w},h_${h},al_${al},q_82,enc_auto/img.jpg`
export const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const BOOK_URL = 'https://calendly.com/gwindom2?utm_source=website&utm_medium=popup&utm_campaign=booking'
export const CAREER_URL = 'https://calendly.com/gwindom2/partner-with-wise-fp?utm_source=website&utm_medium=popup&utm_campaign=careers'
export const EMAIL = 'wisefinancialpartners@gmail.com'
export const IG_URL = 'https://www.instagram.com/wisefinancialpartners?igsh=bGo5a2hxczlmaW81'
export const GLENN_IG = 'https://www.instagram.com/imglennwin?igsh=MWd0Z24zbWdrbTNweA=='
export const GLENN_IN = 'https://www.linkedin.com/in/gwindom2'
export const AMAZON = 'https://a.co/d/aTH4fPE'
export const APPLE_BOOKS = 'https://books.apple.com/us/book/the-money-mirror/id6746219698'
export const NEWSLETTER_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwbI0yQQoAkw7OywIvSb_ZAdaP70UmXxgOvK3aocQ7Ak60_xR78Sc994sA9_m0fRj6q/exec'

export const VIDEO_HANDSHAKE = 'https://video.wixstatic.com/video/5e8141_3cad640d6a804c4d88c4e00482cbb845/720p/mp4/file.mp4'
export const VIDEO_SECOND = 'https://video.wixstatic.com/video/5e8141_dac915906c6d4bb0825bc3e5d9f966c8/1080p/mp4/file.mp4'

export const IMG = {
  glennPortrait: '2853e8_30a8c226eaa44f20b55ad1214803ccb5~mv2.png',
  glennWorking: '5e8141_6f7ec354a2884af1ad1278405c67ed1d~mv2.png',
  family: '5e8141_58f3f13f4f07470bbb75f838aee0699a~mv2.jpg',
  planning: '5e8141_9b245128d85447fb95a61ab72bf081e2~mv2.jpg',
  newsletterBg: '5e8141_5c2162c6d7c143a29dd74e2a6280c5a6~mv2.jpg',
}

export const providers = [
  { src: W + '5e8141_83a0fe8f518b4bb48c028479618f2e94~mv2.webp', alt: 'Crump' },
  { src: W + '5e8141_c782f9209f2445f5b04b3c0272e472bc~mv2.webp', alt: 'AMS' },
  { src: W + '5e8141_2bff2ce9a0dd4d4980a0febca0b6e50b~mv2.webp', alt: 'Nationwide' },
  { src: W + '5e8141_b16320ee53cb41a7be87d3ba900ee4ca~mv2.webp', alt: 'Pacific Life' },
  { src: W + '5e8141_8e37718a72a9477cbd82f4f67e97fd54~mv2.webp', alt: 'Everest' },
  { src: W + '5e8141_63ad9169f5be4115a12d8e98e309c3a8~mv2.webp', alt: 'Transamerica' },
]

export const leaders = [
  { name: 'Glenn Windom II', role: 'Founder & CEO', lic: 'CA Insurance License #4359007', img: '2853e8_30a8c226eaa44f20b55ad1214803ccb5~mv2.png' },
  { name: 'Adara Johnson', role: 'Licensed Financial Professional', lic: 'License #4313838', img: '5e8141_877c8cd47ec04deb890e20f308247ba7~mv2.jpg' },
  { name: 'Andra Howard', role: 'Licensed Financial Professional', lic: 'License #4383341', img: '5e8141_e0c938f2c47640a5be8d8f88fae39e82~mv2.jpeg' },
  { name: 'Sidney Martin', role: 'Licensed Financial Professional', lic: 'License #4457318', img: '5e8141_8dcfdba385a946ff94b8ee86bf0a361f~mv2.jpeg' },
]

export const partners = [
  { name: 'Daniel Daniels', img: '5e8141_6a9bcd8d5e004752ab5cb6d25d26aa1a~mv2.jpg' },
  { name: 'Laura Oliden', img: '5e8141_440f60ef88d94203a83fe9df23f00c51~mv2.jpeg' },
  { name: 'Ashia Anderson', img: '5e8141_8013a8ea2bb44f75bb3f01c9b1f353c8~mv2.jpeg' },
  { name: 'Nathaniel Ilo', img: '5e8141_d2982284904f402f87e41ac0f985c19e~mv2.jpeg' },
  { name: 'Ajani Johnson', img: '5e8141_19d793055cb9436599acec506b35c6ec~mv2.jpg' },
  { name: 'Brandynn Hardin', img: '5e8141_fefa54cf1e8542569b95829b950a1f70~mv2.jpg' },
  { name: 'Britney Woods', img: '5e8141_a7d489be9bab423790bd4ab661c246e3~mv2.jpg' },
  { name: 'DeAnna Cole', img: '5e8141_86b5795bdc9b49d0a89932763fbba94f~mv2.jpg' },
  { name: 'Darius K. Rodgers', img: '5e8141_584b610338104cb09017fd58744ea0ed~mv2.jpeg' },
  { name: 'Jazlyn Miller', img: '5e8141_162e2559ff5b4bbaa34b24f751f8f0bf~mv2.jpeg' },
  { name: 'Stanley Morgan', img: '5e8141_63771c106f774ad382f2d7a29ece73d1~mv2.jpeg' },
]

/** Product list mirrors World Financial Group's U.S. client solutions */
export const services = [
  { title: 'Life Insurance', desc: 'Protect those you love. Coverage that replaces your income and keeps your family’s plans on track, no matter what.', products: ['Term Life', 'Whole Life', 'Universal Life', 'Indexed Universal Life', 'No-Medical-Exam Options'], img: wix(IMG.family, 1000, 1200) },
  { title: 'Retirement Strategies', desc: 'Create the life you deserve. Build retirement income you can count on and help protect your savings from market swings.', products: ['Fixed Annuities', 'Fixed Indexed Annuities', 'Retirement Income Strategies'], img: unsplash('photo-1554331292-735256644d5f', 1000) },
  { title: 'Income Protection', desc: 'Your ability to earn is your biggest asset. Protect it if illness, injury, or the need for care interrupts your paycheck.', products: ['Disability Insurance', 'Long Term Care Insurance', 'Living Benefits'], img: wix(IMG.planning, 1000, 1200) },
  { title: 'Estate Preservation', desc: 'Build a financial legacy. Strategies to help transfer wealth to the next generation, prepared alongside your legal and tax professionals.', products: ['Life Insurance Strategies', 'Wealth Replacement Strategies', 'Charitable Strategies & Trusts'], img: unsplash('photo-1592599457566-c660153d9548', 1000) },
  { title: 'College Funding', desc: 'Plan ahead for the rising cost of higher education.', products: ['College Funding Plans', 'Education Savings Strategies'], img: unsplash('photo-1665598214162-274973faa6f7', 1000) },
  { title: 'Business Strategies', desc: 'Protect what you built and reward the people who help you build it.', products: ['Business Continuation', 'Executive Compensation', 'Business Insurance & Retirement'], img: unsplash('photo-1611432579402-7037e3e2c1e4', 1000) },
  { title: 'Tax-Advantaged Strategies', desc: 'Grow and access money with tax advantages, coordinated with your tax professional.', products: ['Tax-Deferred Growth', 'Tax-Advantaged Cash Value'], img: unsplash('photo-1599837487527-e009248aa71b', 1000) },
]

export const steps = [
  { n: '01', title: 'Free consultation', desc: 'A relaxed, 30-minute conversation with a licensed professional about where you are and where you want to go.' },
  { n: '02', title: 'Financial Needs Analysis', desc: 'We look at the full picture: income, protection, debt, savings, and goals, so nothing important gets missed.' },
  { n: '03', title: 'Your custom strategy', desc: 'Clear recommendations that fit your needs and budget, using products from top-rated carriers. Then we stay with you as life changes.' },
]

export const careerPath = [
  { title: 'Connect with Glenn', desc: 'A no-pressure conversation about your goals and whether this business is a fit.' },
  { title: 'Get licensed', desc: 'We guide you through pre-licensing education and your state insurance exam.' },
  { title: 'Train in the field', desc: 'Learn side by side with an experienced mentor through real client appointments.' },
  { title: 'Serve your first clients', desc: 'Start helping families with protection, retirement, and legacy strategies.' },
  { title: 'Build your business', desc: 'Grow at your own pace, full-time or part-time, and develop a team of your own.' },
]

export const agentFaqs = [
  { question: 'Do I need a background in finance?', answer: 'No. Many of our associates come from other careers entirely: teaching, sales, the military, healthcare, entrepreneurship. What matters most is a willingness to learn and a desire to help people.' },
  { question: 'Can I start part-time?', answer: 'Yes. You can build your business part-time around your current schedule, and move to full-time when you are ready.' },
  { question: 'How do I get licensed?', answer: 'We walk you through pre-licensing education and the state insurance exam. Timelines vary by state and by how much time you put in. There are some out-of-pocket costs for licensing and getting started.' },
  { question: 'How are associates paid?', answer: 'Associates are independent contractors paid on commission. Earnings depend on individual effort, results, and many other factors, and there is no guarantee of income.' },
]

export const igPosts = [
  '5e8141_e8740f95ebe347df8a6ee734802564b5~mv2.jpg',
  '5e8141_81f43291b27a4f89a64acba7d2d287e9~mv2.jpg',
  '5e8141_bdd8824118864d93878f03232f946e6e~mv2.jpg',
  '5e8141_e18dbdda34ba46f899b36b33cf77397c~mv2.jpg',
  '5e8141_e3c51bd71b0f430ca404e44b23745d25~mv2.jpg',
  '5e8141_3e6ec92cf7ae4c07863a2cbd5dec4750~mv2.jpg',
]

export const faqs = [
  { question: 'What services does WISE Financial Partners offer?', answer: 'We offer life insurance (term, whole, universal, and indexed universal life), retirement strategies including fixed and fixed indexed annuities, disability and long term care insurance, estate preservation, college funding, business strategies, and tax-advantaged strategies, tailored to your goals after a free Financial Needs Analysis.' },
  { question: 'Do you give tax or legal advice?', answer: 'No. We do not provide tax, estate planning, or legal advice. When your strategy touches those areas, we work alongside your tax and legal professionals.' },
  { question: 'How much does a consultation cost?', answer: "Your initial 30-minute consultation is completely free, with no cost or obligation. It's a chance to discuss your goals and see how we can help." },
  { question: 'What states are you licensed in?', answer: 'Glenn Windom II holds CA Insurance License #4359007 and is licensed in multiple states. Product and service availability is subject to applicable state licensing requirements.' },
  { question: 'How do I get started?', answer: "The easiest way to begin is to book a free consultation through this website. We'll discuss your goals and build a strategy tailored to your situation." },
]

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (o: { url: string }) => void }
    gtag?: (...args: unknown[]) => void
  }
}
export function openCalendly(url: string = BOOK_URL) {
  if (window.Calendly) window.Calendly.initPopupWidget({ url })
  else window.open(url, '_blank', 'noopener')
}

/** Returns `url` with the given query params set (overriding any existing ones). Values are URL-encoded; empty values are skipped. */
export function withParams(url: string, params: Record<string, string | undefined>) {
  const [base, query = ''] = url.split('?')
  const merged = new Map(query.split('&').filter(Boolean).map((kv) => { const i = kv.indexOf('='); return [kv.slice(0, i), kv.slice(i + 1)] as [string, string] }))
  for (const [k, v] of Object.entries(params)) if (v) merged.set(k, encodeURIComponent(v))
  return `${base}?${[...merged].map(([k, v]) => `${k}=${v}`).join('&')}`
}

/** Booking link for the Money Mirror Check-In: quiz UTMs, plus Calendly prefill when the visitor gave a name/email. */
export function quizBookUrl(pattern: PatternKey, prefill: { name?: string; email?: string } = {}) {
  const email = prefill.email?.trim()
  return withParams(BOOK_URL, {
    utm_source: 'website', utm_medium: 'quiz', utm_campaign: 'money_mirror', utm_content: pattern,
    name: prefill.name?.trim(),
    email: email && EMAIL_RE.test(email) ? email : undefined,
  })
}

/** Fire a GA4 event if gtag is on the page. Never pass answers or personal data. */
export function track(event: string, params?: Record<string, string>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') window.gtag('event', event, ...(params ? [params] : []))
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
/** Shared newsletter signup (Contact form + Money Mirror Check-In). Sends only email and optional first name. */
export async function subscribeNewsletter(email: string, name?: string): Promise<{ ok: boolean; text: string }> {
  try {
    const body = new FormData(); body.append('email', email); if (name) body.append('name', name)
    const res = await fetch(NEWSLETTER_ENDPOINT, { method: 'POST', body })
    const r = await res.json()
    if (r.status === 'success') return { ok: true, text: r.message || 'Thank you for subscribing.' }
    return { ok: false, text: r.message || 'Something went wrong. Please try again.' }
  } catch (err) {
    console.error('Newsletter signup error:', err)
    return { ok: false, text: 'Unable to subscribe. Please try again later.' }
  }
}

/* ---------- The Money Mirror Check-In ---------- */
export type Option = { value: string; label: string; quote?: string }
export type Question =
  | { id: 'life' | 'depends'; kind: 'multi'; prompt: string; hint: string; options: Option[]; exclusive?: string }
  | { id: 'runway' | 'pattern'; kind: 'single'; prompt: string; hint: string; options: Option[] }
  | { id: 'stopped'; kind: 'text'; prompt: string; hint: string; maxLength: number }

export const quizQuestions: Question[] = [
  {
    id: 'life', kind: 'multi', prompt: 'What’s going on in your life right now?', hint: 'Choose all that apply.',
    options: [
      { value: 'family', label: 'Growing family' },
      { value: 'home', label: 'Bought or buying a home' },
      { value: 'job_change', label: 'Changed jobs or have an old 401(k)' },
      { value: 'business', label: 'Own a business' },
      { value: 'build_wealth', label: 'Want to build wealth' },
      { value: 'retirement', label: 'Thinking about retirement' },
      { value: 'checkup', label: 'Just want a check-up' },
    ],
  },
  {
    id: 'depends', kind: 'multi', prompt: 'Who depends on your income?', hint: 'Choose all that apply.', exclusive: 'self',
    options: [
      { value: 'partner', label: 'My partner' },
      { value: 'kids', label: 'My kids' },
      { value: 'parents', label: 'My parents' },
      { value: 'business', label: 'A business' },
      { value: 'self', label: 'Just me' },
    ],
  },
  {
    id: 'runway', kind: 'single', prompt: 'If your paycheck stopped tomorrow, how long would your household be okay?', hint: 'Choose one. Your best guess is fine.',
    options: [
      { value: 'lt1', label: 'Less than a month' },
      { value: '1to3', label: '1 to 3 months' },
      { value: '3to6', label: '3 to 6 months' },
      { value: 'gt6', label: 'More than 6 months' },
      { value: 'unsure', label: 'I’m not sure' },
    ],
  },
  {
    id: 'pattern', kind: 'single', prompt: 'Which sounds most like you right now?', hint: 'Choose the one that feels closest.',
    options: [
      { value: 'avoid', label: 'I avoid looking.', quote: 'I’d avoid checking my balance because I didn’t want to feel the stress.' },
      { value: 'restart', label: 'I start strong, then it falls apart.', quote: 'Budget. Break it. Shame myself. Repeat.' },
      { value: 'alone', label: 'I’m figuring it out on my own.', quote: 'I’d smile and say, ‘I’m good. Just grinding.’' },
      { value: 'busy', label: 'I’m busy, but not getting ahead.', quote: 'Moving fast, sweating hard… but the view never changed.' },
    ],
  },
  { id: 'stopped', kind: 'text', prompt: 'What’s stopped you from getting this handled before now?', hint: 'A sentence or two is enough.', maxLength: 1000 },
]

export type PatternKey = 'avoid' | 'restart' | 'alone' | 'busy'
export const isPatternKey = (v: unknown): v is PatternKey => v === 'avoid' || v === 'restart' || v === 'alone' || v === 'busy'

/** Result texts are verbatim from Glenn's manuscript of The Money Mirror. Do not paraphrase or add to them. */
export const quizResults: Record<PatternKey, { chapter: string; chapterTitle: string; reframe: string[]; tool: string; intro?: string; prompts: string[]; outro?: string }> = {
  avoid: {
    chapter: 'Chapter 1', chapterTitle: 'The Money Mirror',
    reframe: ['Money is never just money. It’s a mirror.', 'Awareness is where change begins. Not shame. Power.'],
    tool: 'The Money Mirror Check-In',
    intro: 'Go back through your last 15–20 transactions. For each one, ask yourself:',
    prompts: ['What was I feeling in that moment?', 'What did I really need?', 'Was that purchase aligned with my long-term goals or just a short-term feeling?'],
    outro: 'Highlight any patterns that come up, not to shame yourself, but to understand yourself.',
  },
  restart: {
    chapter: 'Chapter 2', chapterTitle: 'Budgeting with Broken Beliefs',
    reframe: ['Most people don’t have a budgeting problem. They have a belief problem.', 'Real budgeting is about alignment. It’s not self-denial. It’s self-respect.'],
    tool: 'The Belief Audit',
    prompts: [
      'What do I believe about budgeting?',
      'How do I feel when I sit down to look at my money?',
      'Do I see budgeting as a tool for peace, or pressure?',
      'What story did I grow up hearing about money and planning?',
      'What would it look like to build a budget that honors who I am becoming, not just where I am right now?',
    ],
  },
  alone: {
    chapter: 'Chapter 4', chapterTitle: 'Closed Mouths Miss Clarity',
    reframe: ['Closed mouths don’t just miss meals. They miss mentorship. They miss solutions. They miss peace.'],
    tool: 'Unspoken Truths',
    prompts: [
      'Where in my life have I stayed silent, even though I needed help or clarity?',
      'What’s one financial or personal struggle I’ve been trying to figure out alone?',
      'What am I afraid might happen if I tell the truth about where I’m really at?',
      'What mindset or belief might be keeping me from asking for help?',
      'What’s one area of my life I need to open my mind, or my mouth, to move forward?',
    ],
  },
  busy: {
    chapter: 'Chapter 5', chapterTitle: 'Always Moving, Never Arriving',
    reframe: ['Just because I’m moving doesn’t mean I’m progressing.', 'Is this movement, or momentum?'],
    tool: '30-Day Strategic Focus Plan',
    intro: 'Choose one main area of focus for the next 30 days. Then answer:',
    prompts: [
      'What does success look like 30 days from now? (Be specific.)',
      'What 3–5 habits will help me get there?',
      'What distractions do I need to eliminate?',
      'Who or what can help hold me accountable?',
      'What will I do weekly to check in with my progress?',
    ],
  },
}

/** SAMPLE reviews for layout only. Replace with real, approved client reviews before launch (set REVIEWS_ARE_SAMPLE = false). */
export const REVIEWS_ARE_SAMPLE = true
export const reviews = [
  { text: 'Glenn walked us through term vs. IUL without any pressure. For the first time we actually understand what we are paying for and why.', name: 'Marcus T.', place: 'Inglewood, CA', product: 'Life Insurance', when: '2 months ago' },
  { text: 'I kept putting off planning for retirement because it felt overwhelming. The Needs Analysis broke it down into steps I could actually follow.', name: 'Denise R.', place: 'Long Beach, CA', product: 'Retirement Strategies', when: '3 weeks ago' },
  { text: 'As a small business owner I never had a plan if something happened to me. Now my family and my business are both protected.', name: 'Andre W.', place: 'Atlanta, GA', product: 'Business Strategies', when: '1 month ago' },
  { text: 'The Money Mirror changed how I think about spending. Meeting with the team afterward helped me turn that into a real plan.', name: 'Keisha M.', place: 'Carson, CA', product: 'Financial Needs Analysis', when: '5 months ago' },
  { text: 'They answered every question my husband and I had, even the ones we were embarrassed to ask. Professional and patient.', name: 'Latoya & James B.', place: 'Houston, TX', product: 'Life Insurance', when: '4 months ago' },
  { text: 'We started a college fund for our daughter the same week. Wish we had done this when she was born.', name: 'Carlos V.', place: 'Pasadena, CA', product: 'College Funding', when: '6 weeks ago' },
  { text: 'I rolled my old 401(k) into something I understand and I finally sleep at night. Great follow-up after the fact too.', name: 'Pamela H.', place: 'Riverside, CA', product: 'Annuities', when: '2 months ago' },
  { text: 'No sales pitch, just clarity. They looked at my whole picture and showed me where the gaps were.', name: 'Jordan K.', place: 'Los Angeles, CA', product: 'Income Protection', when: '1 week ago' },
  { text: 'My parents never talked about money. Working with WISE, I am building something my kids will actually inherit.', name: 'Brianna S.', place: 'Oakland, CA', product: 'Estate Preservation', when: '3 months ago' },
]

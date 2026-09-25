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

export const services = [
  { title: 'Wealth Management', desc: 'Strategic investment planning and portfolio management to grow your assets and achieve your financial goals, built around your values and timeline.', img: wix(IMG.family, 1000, 1200) },
  { title: 'Income Protection', desc: 'Safeguard your financial future with comprehensive insurance and risk management strategies.', img: wix(IMG.planning, 1000, 1200) },
  { title: 'Retirement Planning', desc: 'Personalized retirement strategies to ensure financial security and maintain your lifestyle.', img: unsplash('photo-1566053166065-79446ba9b79f', 1000) },
  { title: 'Legacy & Estate Planning', desc: "Preserve and transfer your wealth to future generations with thoughtful estate planning that protects your family's future.", img: unsplash('photo-1592599457566-c660153d9548', 1000) },
  { title: 'Educational Savings', desc: 'College funding strategies.', img: unsplash('photo-1665598214162-274973faa6f7', 1000) },
  { title: 'Tax Optimization', desc: 'Minimize liabilities and maximize wealth.', img: unsplash('photo-1599837487527-e009248aa71b', 1000) },
  { title: 'Business Planning', desc: 'Succession and benefits solutions.', img: unsplash('photo-1611432579402-7037e3e2c1e4', 1000) },
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
  { question: 'What services does WISE Financial Partners offer?', answer: 'We offer wealth management, income protection, retirement planning, legacy and estate planning, educational savings strategies, tax optimization guidance, and business planning, tailored to your individual goals.' },
  { question: 'How much does a consultation cost?', answer: "Your initial 30-minute consultation is completely free, with no cost or obligation. It's a chance to discuss your goals and see how we can help." },
  { question: 'What states are you licensed in?', answer: 'Glenn Windom II holds CA Insurance License #4359007 and is licensed in multiple states. Product and service availability is subject to applicable state licensing requirements.' },
  { question: 'How do I get started?', answer: "The easiest way to begin is to book a free consultation through this website. We'll discuss your goals and build a strategy tailored to your situation." },
]

declare global {
  interface Window { Calendly?: { initPopupWidget: (o: { url: string }) => void } }
}
export function openCalendly(url: string = BOOK_URL) {
  if (window.Calendly) window.Calendly.initPopupWidget({ url })
  else window.open(url, '_blank', 'noopener')
}

// Serves the built site from the repo root (see wrangler.jsonc). The bare domain
// redirects to www so every visitor, link and search result uses one address.
//
// Glenn's personal link page also answers on his own domain, imglennwin.com, so
// shared links and previews show his name, not WISE's: the home page there is
// /linktree/, www redirects to the bare domain, and the page's share tags
// (canonical, og:url, og:image) are rewritten to imglennwin.com.
const PERSONAL = 'imglennwin.com';
const WISE_PAGE = 'https://www.wisefinancialpartners.com/linktree/';
const WISE_ORIGIN = 'https://www.wisefinancialpartners.com';

async function personal(request, env, url) {
  if (url.pathname === '/' || url.pathname === '/linktree' || url.pathname === '/linktree/') {
    const page = await env.ASSETS.fetch(new Request(new URL('/linktree/', url), request));
    const toPersonal = (value) => value.replace(WISE_PAGE, `https://${PERSONAL}/`).replace(WISE_ORIGIN, `https://${PERSONAL}`);
    return new HTMLRewriter()
      .on('link[rel="canonical"]', { element: (el) => el.setAttribute('href', toPersonal(el.getAttribute('href') || '')) })
      .on('meta[property^="og:"], meta[name^="twitter:"]', { element: (el) => { const c = el.getAttribute('content'); if (c) el.setAttribute('content', toPersonal(c)); } })
      .transform(page);
  }
  // Scripts, images and fonts are shared with the WISE site; anything else goes to the page.
  const res = await env.ASSETS.fetch(request);
  return res.status === 404 ? Response.redirect(`https://${PERSONAL}/`, 302) : res;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === `www.${PERSONAL}`) {
      url.hostname = PERSONAL;
      return Response.redirect(url.toString(), 301);
    }
    if (url.hostname === PERSONAL) return personal(request, env, url);
    if (url.hostname === 'wisefinancialpartners.com') {
      url.hostname = 'www.wisefinancialpartners.com';
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};

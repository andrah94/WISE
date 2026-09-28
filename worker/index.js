// Serves the built site from the repo root (see wrangler.jsonc). The bare domain
// redirects to www so every visitor, link and search result uses one address.
//
// Glenn's personal link page lives on his own domain: imglennwin.com/linktree/.
// The old wisefinancialpartners.com/linktree address forwards there for good.
// imglennwin.com itself is kept free for a future landing page, so for now it
// forwards to /linktree/ with a temporary redirect (easy to replace later).
const PERSONAL = 'imglennwin.com';
const LINKTREE = `https://${PERSONAL}/linktree/`;
const isLinktree = (path) => path === '/linktree' || path === '/linktree/' || path === '/linktree.html' || path === '/linktree/index.html';

function redirect(to, from, status) {
  const target = new URL(to);
  target.search = from.search;
  return Response.redirect(target.toString(), status);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === `www.${PERSONAL}`) {
      url.hostname = PERSONAL;
      return Response.redirect(url.toString(), 301);
    }
    if (url.hostname === PERSONAL) {
      if (url.pathname === '/') return redirect(LINKTREE, url, 302);
      const res = await env.ASSETS.fetch(request);
      return res.status === 404 ? redirect(LINKTREE, url, 302) : res;
    }
    if (isLinktree(url.pathname)) return redirect(LINKTREE, url, 301);
    if (url.hostname === 'wisefinancialpartners.com') {
      url.hostname = 'www.wisefinancialpartners.com';
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};

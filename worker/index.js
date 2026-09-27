// Serves the built site from the repo root (see wrangler.jsonc). The bare domain
// redirects to www so every visitor, link and search result uses one address.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === 'wisefinancialpartners.com') {
      url.hostname = 'www.wisefinancialpartners.com';
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};

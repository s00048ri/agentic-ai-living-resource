// Deployment paths shared by astro.config.mjs and scripts/check-links.mjs.
// In CI these come from actions/configure-pages; locally the defaults apply.
const rawBase = process.env.BASE_PATH ?? '/agentic-ai-living-resource';
export const BASE_PATH = rawBase === '' ? '/' : rawBase;
export const SITE_URL = process.env.SITE_URL || undefined;

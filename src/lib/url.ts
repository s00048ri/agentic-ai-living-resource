/**
 * Builds an internal URL under the deployment base path.
 * Always use this helper for internal links; never hard-code root-relative paths.
 */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL;
  const prefix = base.endsWith('/') ? base : `${base}/`;
  return prefix + path.replace(/^\/+/, '');
}

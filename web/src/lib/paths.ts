/** URL-safe kebab slug for storefront paths. */
export function slugifyPath(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function storeProductPath(slug: string): string {
  const safe = slugifyPath(slug);
  return `/products/${encodeURIComponent(safe || slug)}`;
}

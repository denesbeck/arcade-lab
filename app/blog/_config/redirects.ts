// Retired blog URLs that now 308 to another post — old slugs and the legacy
// numeric ids that pointed at posts since removed or merged. Keys are matched
// against the [slug] route param (always a string); values are live post slugs.
// Consumed by app/blog/[slug]/page.tsx for the redirect and by its
// generateStaticParams so the retired URLs keep resolving. Enforced by
// redirects.test.ts: every target is a live slug and nothing chains.
export const BLOG_REDIRECTS: Record<string, string> = {
  // Merged the two CloudGoat Beanstalk write-ups into one. The survivor kept
  // id 10, so /blog/10 redirects via the legacy numeric route, not here.
  '11': 'cloudgoat-beanstalk-secrets',
  'cloudgoat-beanstalk-secrets-aws-cli': 'cloudgoat-beanstalk-secrets',
  'cloudgoat-beanstalk-secrets-pacu': 'cloudgoat-beanstalk-secrets',
}

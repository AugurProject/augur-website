/** Interest capture behind the footer form. Nothing is mailed: the augur-forms Worker stores the
 * address in D1 for a later import into a newsletter service. Raise `consentVersion` whenever
 * `consent` changes, so each stored row says which wording it agreed to. The Worker imports this
 * file, so the page and the server share one set of messages and one address check.
 */
export const newsletter = {
  path: '/subscribe',
  consentVersion: '2026-10-31',
  /** Shown under the field; the contact address is appended by the footer. */
  consent: 'We’ll keep your email to tell you about Augur’s progress. Nothing is sent yet; before any newsletter starts we’ll ask you to confirm. To be removed,',
  messages: {
    subscribed: 'Thanks, we’ve noted your interest. We haven’t sent anything; before any newsletter starts we’ll ask you to confirm.',
    invalid: 'Enter a valid email address, like you@example.com.',
    error: 'We couldn’t save your address. Please try again later.',
  },
} as const;
/** Result pages under /newsletter/; the Worker redirects to one of these without JavaScript. */
export type NewsletterResult = keyof typeof newsletter.messages;
/** Shared by the browser check and the Worker, so both accept the same addresses. */
export const isEmail = (value: string) => value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

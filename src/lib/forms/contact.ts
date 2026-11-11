/** The contact form on /contact/. It posts to the augur-forms Worker's `/contact` route, which
 * checks the same rules and emails the message to the team (workers/forms/src/contact.ts). The
 * Worker imports this file, so the page and the server share one set of fields, limits and messages.
 * Fields follow the lab's contact page (augur-web-lab 1b95a3a); the wording is jubalm's approval of
 * that page plus the notice and results recommended on #35.
 */
import { isEmail } from './newsletter';

export const contact = {
  path: '/contact',
  /** Field order, input limits and whether a value is required. */
  fields: {
    name: { required: true, maxLength: 100 },
    email: { required: true, maxLength: 254 },
    company: { required: false, maxLength: 200 },
    website: { required: false, maxLength: 2048 },
    message: { required: true, maxLength: 5000 },
  },
  notice: 'We use your name and email only to reply. Your message is sent to the Augur team by email and isn’t stored on this website.',
  /** Short messages for the page's status line; the result pages below say more. */
  messages: {
    sent: 'Message sent. We’ll reply to the email you gave.',
    invalid: 'Some fields need attention, so nothing was sent.',
    'rate-limited': 'Too many messages in a short time, so this one wasn’t sent. Wait a minute and try again.',
    error: 'Your message wasn’t sent. Please try again later, or email us instead.',
  },
} as const;

export type ContactField = keyof typeof contact.fields;
export type ContactValues = Record<ContactField, string>;
/** Result pages under /contact/; the Worker redirects to one of these without JavaScript. */
export type ContactResult = keyof typeof contact.messages;

const singleLine = /^[^\r\n]*$/;
const isWebsite = (value: string) => {
  try { return ['https:', 'http:'].includes(new URL(value).protocol); } catch { return false; }
};

/** One field's error, or '' when it is acceptable. Values are already trimmed. Shared by the
 * page script and the Worker, so both accept the same input. */
export function contactError(field: ContactField, value: string): string {
  const { required, maxLength } = contact.fields[field];
  if (!value) return required ? { name: 'Enter your name.', email: 'Enter your email address.', message: 'Write your message.' }[field as 'name' | 'email' | 'message'] : '';
  if (value.length > maxLength) return `Keep this to ${maxLength} characters or fewer.`;
  if (field !== 'message' && !singleLine.test(value)) return 'Keep this to one line.';
  if (field === 'email' && !isEmail(value)) return 'Enter a valid email address, like you@example.com.';
  if (field === 'website' && !isWebsite(value)) return 'Enter a website address starting with https:// or http://.';
  return '';
}

export function contactErrors(values: ContactValues): Partial<Record<ContactField, string>> {
  const errors: Partial<Record<ContactField, string>> = {};
  for (const field of Object.keys(contact.fields) as ContactField[]) {
    const error = contactError(field, values[field]);
    if (error) errors[field] = error;
  }
  return errors;
}

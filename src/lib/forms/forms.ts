/** Forms post to the separate `augur-forms` Worker (workers/forms/), so the site stays static.
 * Its address is build configuration: set PUBLIC_FORMS_URL to the deployed Worker's origin.
 * Without it a production build keeps the forms offline: they send nothing and say so.
 * The Worker imports this file too, so both sides agree on the honeypot field.
 *
 * `enabled` switches both forms off for the DevCon launch (jubalm, 2 November 2026): the footer
 * shows follow links instead of the newsletter form, /contact/ offers a mailto link instead of the
 * message form, and the result pages are not built. Set it back to true to restore the forms.
 */
const enabled = false;
// `?.` because the Worker bundles this file without Vite's import.meta.env.
const configured = String(import.meta.env?.PUBLIC_FORMS_URL ?? '').replace(/\/+$/, '');
export const forms = {
  enabled,
  url: enabled ? configured || (import.meta.env?.DEV ? 'http://localhost:8788' : null) : null,
  /** Visually hidden trap field; people leave it empty, form-filling bots don't. */
  honeypot: 'nickname',
} as const;

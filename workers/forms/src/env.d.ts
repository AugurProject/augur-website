// The site's data files read Vite's import.meta.env; in the Worker bundle it is undefined.
interface ImportMeta { readonly env?: { readonly PUBLIC_FORMS_URL?: string; readonly DEV?: boolean } }
// Not in wrangler.jsonc: the SMTP token is a secret, and the host and port overrides exist only to
// point local tests somewhere other than smtp.protonmail.ch:587.
interface Env { PROTON_SMTP_TOKEN?: string; PROTON_SMTP_HOST?: string; PROTON_SMTP_PORT?: string }

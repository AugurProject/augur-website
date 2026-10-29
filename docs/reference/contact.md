# Contact page

`/contact/` lets a visitor email the Augur team. The page is static; the form posts to the separate `augur-forms` Worker in [workers/forms](../../workers/forms/), which checks the submission, emails it through Augur's Proton account and answers with a redirect back to the site or, for script submits, JSON. Nothing is stored.

## Page

- [contact/index.astro](../../src/pages/contact/index.astro) renders the page with [PageLayout.astro](../../src/layouts/PageLayout.astro) and `footer={false}`, because the footer's contact band would repeat the page. Layout, fields and copy follow the lab's contact page (augur-web-lab `1b95a3a`), approved by the owner on 29 October 2026; the notice and result wording were recommended on Track #35 and approved the same day.
- Fields, limits, the notice, the status messages and the field rules are in [contact.ts](../../src/data/contact.ts). The Worker imports the same file, so the page and the server accept the same input.

| Field | `name` | Required | Limit and rule |
|---|---|---|---|
| Name | `name` | Yes | 100 characters, one line |
| Email | `email` | Yes | 254 characters, the shared `isEmail` check |
| Company / project | `company` | No | 200 characters, one line |
| Website | `website` | No | 2,048 characters, an `http://` or `https://` address |
| Message | `message` | Yes | 5,000 characters |

- Every field has a visible label, `autocomplete` where one applies, and an error element linked by `aria-describedby`; the notice is linked to the required fields too. An off-screen honeypot field (`forms.honeypot`, `nickname`) is left empty by people.
- Without JavaScript the browser enforces `required`, `maxlength`, `type` and `pattern` attributes that mirror the server's rules, then posts to the Worker. With JavaScript, the page script checks each field with `contactError`, shows an error summary and focuses the first invalid field, posts form-urlencoded with `Accept: application/json` (a simple cross-origin request, no preflight), and shows the Worker's message in the status line. Only `ok: true` clears the form.
- Without `PUBLIC_FORMS_URL` in a production build the form is offline: `method="dialog"`, no honeypot, and a note that the form can't send and gives the email address instead. Development defaults to `http://localhost:8788` ([forms.ts](../../src/data/forms.ts)).
- [contact/[result].astro](../../src/pages/contact/[result].astro) prerenders the `noindex` result pages `/contact/sent/`, `/contact/invalid/`, `/contact/rate-limited/` and `/contact/error/`. Every result except `sent` also gives the email address. The `invalid` page says the browser's Back button usually returns to the form with what was written; it is reached only when the server rejects something the browser accepted.

## Worker route: `POST /contact`

[contact.ts](../../workers/forms/src/contact.ts) defines the route; [form.ts](../../workers/forms/src/form.ts) runs the steps every form shares: the `Origin` must be in `ALLOWED_ORIGINS` (403 otherwise), the body must be a form body of at most 16 KB, a filled honeypot gets the generic failure, then the rate limit (`CONTACT_RATE_LIMITER`, 3 per 60 seconds per IP, approximate and per Cloudflare location), validation, and sending.

- The email goes to `CONTACT_TO`, from `PROTON_SMTP_USER` with the display name "Augur website", with the visitor as `Reply-To` and the subject "Augur inquiry from <name>". The plain-text body lists name, email, company and website when given, then the message.
- Responses: JSON `{ ok, status, message, fieldErrors? }` with 200 `accepted`, 422 `invalid`, 400 `rejected`, 429 `rate-limited` or 503 `unavailable`; or, without JavaScript, a 303 to `SITE_URL` + `/contact/sent/`, `/contact/invalid/`, `/contact/rate-limited/` or `/contact/error/` (`rejected` and `unavailable` both go to `error`).
- Success is reported only after the mail server accepts the message. A missing token, a refused connection, a failed TLS upgrade, a rejected login or recipient, or 25 seconds without finishing becomes `unavailable`. A timeout after the message was handed over may still have delivered it, so the form can under-report a send but never claim one that didn't happen.
- Logs carry the route name, the failing step and the server's reply code only, never names, addresses, IPs or message text.

## Mail sender

[mail/index.ts](../../workers/forms/src/mail/index.ts) picks the sender from `MAIL_PROVIDER`:

- `proton`: SMTP submission to `smtp.protonmail.ch` port 587 with STARTTLS and `AUTH PLAIN`, using `PROTON_SMTP_USER` and the secret `PROTON_SMTP_TOKEN`, through the Workers `connect()` socket API. Proton issues SMTP tokens on paid plans with custom-domain addresses, one token per address, and keeps a copy of each message in that address's Sent folder. augur.net's SPF and DKIM already authorize Proton, so no DNS change is needed. The client is [mail/smtp.ts](../../workers/forms/src/mail/smtp.ts). `PROTON_SMTP_HOST` and `PROTON_SMTP_PORT` override the server for local tests only.
- `log`: sends nothing and logs the message length. It throws when `ENVIRONMENT` is `production`, so it can never report a message as sent in production.

Messages are UTF-8 plain text with a base64 body and RFC 2047 headers. Another provider, such as Resend or Cloudflare's `send_email` binding once augur.net is on Cloudflare DNS, is one more entry in `senders`.

Setup, secrets and commands are in [deploy](../guides/deploy.md#forms-worker-augur-forms).

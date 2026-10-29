# augur-forms

Form endpoints for the static Augur website. The site's forms post here; this Worker validates the submission, stores or sends it, and answers with a redirect back to the site or, for script submits, JSON.

- [src/index.ts](src/index.ts): one route per form.
- [src/form.ts](src/form.ts): the steps every form shares (Origin check, body limits, honeypot, rate limit, validation, responses). Success is reported only after the form's submit step resolves.
- [src/subscribe.ts](src/subscribe.ts): `POST /subscribe`, the newsletter interest list in D1.
- [src/contact.ts](src/contact.ts): `POST /contact`, the contact page; emails the message through [src/mail](src/mail/index.ts), which picks a sender with `MAIL_PROVIDER` (`proton` over SMTP, or `log` in development).

Messages and the shared address check come from the site's [src/data](../../src/data/) files, so the page and the Worker say the same things.

Commands, variables, bindings and the first deploy are in the site's [deploy guide](../../docs/guides/deploy.md#forms-worker-augur-forms); the request and response contracts are in the [homepage reference](../../docs/reference/homepage.md#newsletter-interest-list) and the [contact page reference](../../docs/reference/contact.md). Run commands from this folder through the package scripts, which pass `--config wrangler.jsonc`.

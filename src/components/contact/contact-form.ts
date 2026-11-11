// Without JavaScript the browser checks the fields and the form posts to the Worker, which redirects
// to a result page. Here the script checks each field with the Worker's own rules, posts in place and
// shows the Worker's answer: only `ok` means the message was accepted for delivery.
import { contact, contactError, type ContactField } from '@/lib/forms/contact';
const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
if (form) {
  form.noValidate = true;
  const fields = Array.from(
    form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('.field input, .field textarea'),
  );
  const summary = form.querySelector<HTMLElement>('[data-error-summary]')!;
  const status = form.querySelector<HTMLElement>('[data-contact-status]')!;
  const email = form.closest('.contact-layout')!.querySelector<HTMLAnchorElement>('.email-direct a')!;
  let sending = false;
  const show = (field: HTMLInputElement | HTMLTextAreaElement, error: string) => {
    const message = document.getElementById(`${field.id}-error`)!;
    message.textContent = error;
    message.hidden = !error;
    field.setAttribute('aria-invalid', String(Boolean(error)));
  };
  const validate = (field: HTMLInputElement | HTMLTextAreaElement) => {
    const error = contactError(field.name as ContactField, field.value.trim());
    show(field, error);
    return !error;
  };
  const report = (invalid: (HTMLInputElement | HTMLTextAreaElement)[]) => {
    summary.textContent = `Please correct ${invalid.length === 1 ? 'the highlighted field' : `the ${invalid.length} highlighted fields`}.`;
    invalid[0]?.focus();
  };
  const say = (message: string, fallback: boolean) => {
    status.replaceChildren(message);
    if (fallback) {
      const link = document.createElement('a');
      link.href = email.href;
      link.textContent = email.textContent;
      status.append(' ', link);
    }
  };
  for (const field of fields) {
    field.addEventListener('blur', () => {
      if (field.value.trim() || field.getAttribute('aria-invalid') === 'true') validate(field);
    });
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') validate(field);
    });
  }
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending) return;
    summary.replaceChildren();
    status.replaceChildren();
    const invalid = fields.filter((field) => !validate(field));
    if (invalid.length) {
      report(invalid);
      return;
    }
    if (form.dataset.contactForm === 'offline') {
      say('This form isn’t connected yet, so nothing was sent. Email us at', true);
      return;
    }
    sending = true;
    form.setAttribute('aria-busy', 'true');
    try {
      const body = new URLSearchParams([...new FormData(form)].map(([key, value]) => [key, String(value)]));
      const response = await fetch(form.action, { method: 'POST', body, headers: { accept: 'application/json' } });
      const result = (await response.json()) as {
        ok: boolean;
        status: string;
        message: string;
        fieldErrors?: Record<string, string>;
      };
      if (result.status === 'invalid' && result.fieldErrors) {
        for (const field of fields) show(field, result.fieldErrors[field.name] ?? '');
        report(fields.filter((field) => result.fieldErrors![field.name]));
      } else {
        say(result.message, !result.ok);
        if (result.ok) form.reset();
      }
    } catch {
      say(contact.messages.error, true);
    } finally {
      sending = false;
      form.removeAttribute('aria-busy');
    }
  });
}

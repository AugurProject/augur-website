import { isEmail, newsletter } from '../../../src/data/newsletter';
import type { FormSpec } from './form';

// Newsletter interest list: stores the address in D1 and sends nothing. New and existing
// addresses get the same answer, so the form can't reveal who is on the list.
export const subscribe = (env: Env): FormSpec => ({
	name: 'subscribe',
	fields: ['email'],
	limiter: env.SUBSCRIBE_RATE_LIMITER,
	validate({ email }): Record<string, string> {
		const message = !email ? 'Enter your email address.' : isEmail(email) ? '' : newsletter.messages.invalid;
		return message ? { email: message } : {};
	},
	async submit({ email }) {
		await env.SIGNUPS.prepare('INSERT INTO signups (email, created_at, consent_version, source) VALUES (?, ?, ?, ?) ON CONFLICT(email) DO NOTHING')
			.bind(email.toLowerCase(), new Date().toISOString(), newsletter.consentVersion, 'footer')
			.run();
	},
	messages: {
		accepted: newsletter.messages.subscribed,
		invalid: newsletter.messages.invalid,
		rejected: newsletter.messages.error,
		'rate-limited': newsletter.messages.error,
		unavailable: newsletter.messages.error,
	},
	redirect: result => `/newsletter/${result.ok ? 'subscribed' : result.status === 'invalid' ? 'invalid' : 'error'}/`,
});

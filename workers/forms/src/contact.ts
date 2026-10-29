import { contact, contactErrors, type ContactResult, type ContactValues } from '../../../src/data/contact';
import { mailSender } from './mail';
import type { FormSpec } from './form';

// Contact form: emails the message to CONTACT_TO, with the visitor as Reply-To. Nothing is stored.
export const contactForm = (env: Env): FormSpec => ({
	name: 'contact',
	fields: Object.keys(contact.fields),
	limiter: env.CONTACT_RATE_LIMITER,
	validate: values => contactErrors(values as ContactValues),
	async submit(values) {
		const { name, email, company, website, message } = values as ContactValues;
		const lines = [`Name: ${name}`, `Email: ${email}`, company && `Company / project: ${company}`, website && `Website: ${website}`];
		await mailSender(env)({
			to: env.CONTACT_TO,
			from: { name: 'Augur website', email: env.PROTON_SMTP_USER },
			replyTo: { name, email },
			subject: `Augur inquiry from ${name}`,
			text: `${lines.filter(Boolean).join('\n')}\n\n${message}\n`,
		});
	},
	messages: {
		accepted: contact.messages.sent,
		invalid: contact.messages.invalid,
		rejected: contact.messages.error,
		'rate-limited': contact.messages['rate-limited'],
		unavailable: contact.messages.error,
	},
	redirect: result => `/contact/${resultPage(result.ok ? 'accepted' : result.status)}/`,
});

const resultPage = (status: string): ContactResult =>
	status === 'accepted' ? 'sent' : status === 'invalid' ? 'invalid' : status === 'rate-limited' ? 'rate-limited' : 'error';

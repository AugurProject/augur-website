import { connect } from 'cloudflare:sockets';
import { send } from './smtp';

// The contact form's mail sender. MAIL_PROVIDER picks one; each resolves only once the provider has
// accepted the message, and throws otherwise. Another provider (Resend, Cloudflare's send_email) is one
// more entry in `senders`.

export interface MailMessage {
	to: string;
	from: { name: string; email: string };
	replyTo: { name: string; email: string };
	subject: string;
	text: string;
}
export type MailSender = (message: MailMessage) => Promise<void>;

const senders: Record<string, (env: Env) => MailSender> = {
	// Augur's own Proton account, through an SMTP submission token for one custom-domain address.
	proton: env => async message => {
		if (!env.PROTON_SMTP_TOKEN) throw new Error('PROTON_SMTP_TOKEN is not set');
		await send((host, port) => connect({ hostname: host, port }, { secureTransport: 'starttls', allowHalfOpen: false }), {
			host: env.PROTON_SMTP_HOST || 'smtp.protonmail.ch',
			port: Number(env.PROTON_SMTP_PORT || 587),
			user: env.PROTON_SMTP_USER,
			password: env.PROTON_SMTP_TOKEN,
			to: message.to,
			data: toMime(message),
		});
	},
	// Development only: sends nothing and logs a summary without the message's content.
	log: env => async message => {
		if (env.ENVIRONMENT === 'production') throw new Error('the log mail provider is disabled in production');
		console.log(`mail (log provider): ${message.text.length} characters, nothing sent`);
	},
};

export function mailSender(env: Env): MailSender {
	const sender = senders[env.MAIL_PROVIDER];
	if (!sender) throw new Error(`unknown MAIL_PROVIDER "${env.MAIL_PROVIDER}"`);
	return sender(env);
}

const encoder = new TextEncoder();
const base64 = (bytes: Uint8Array) => {
	let binary = '';
	for (const byte of bytes) binary += String.fromCharCode(byte);
	return btoa(binary);
};

/** RFC 2047 encoded words, split under the 75-character limit without breaking a character. */
function encodeWords(text: string): string {
	const words: string[] = [];
	let chunk = '';
	for (const char of text) {
		if (encoder.encode(chunk + char).length > 45) {
			words.push(chunk);
			chunk = '';
		}
		chunk += char;
	}
	if (chunk || !words.length) words.push(chunk);
	return words.map(word => `=?UTF-8?B?${base64(encoder.encode(word))}?=`).join('\r\n ');
}

const mailbox = ({ name, email }: { name: string; email: string }) => `${encodeWords(name)} <${email}>`;

/** A plain-text UTF-8 message; the body is base64 so no line is too long or starts with a dot. */
export function toMime(message: MailMessage, date = new Date()): string {
	const body = base64(encoder.encode(message.text.replace(/\r?\n/g, '\r\n'))).replace(/.{76}/g, '$&\r\n');
	return [
		`Date: ${date.toUTCString()}`,
		`Message-ID: <${crypto.randomUUID()}@${message.from.email.split('@')[1]}>`,
		`From: ${mailbox(message.from)}`,
		`To: <${message.to}>`,
		`Reply-To: ${mailbox(message.replyTo)}`,
		`Subject: ${encodeWords(message.subject)}`,
		'MIME-Version: 1.0',
		'Content-Type: text/plain; charset=utf-8',
		'Content-Transfer-Encoding: base64',
		'',
		body,
	].join('\r\n');
}

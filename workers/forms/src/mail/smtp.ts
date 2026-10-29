// A minimal SMTP submission client: STARTTLS, AUTH PLAIN, one recipient, one plain-text message.
// `send` resolves only after the server accepts the message (250 after DATA); anything else throws.
// The 25-second limit allows for servers that pause between replies (a test server took 10–16 s);
// a timeout after DATA may still have delivered, so the visitor is told it wasn't sent, never the reverse.
// Errors name the step and the server's reply code only, never addresses or message text.

export interface SmtpSocket {
	readable: ReadableStream<Uint8Array>;
	writable: WritableStream<Uint8Array>;
	startTls(): SmtpSocket;
	close(): Promise<void>;
}
export type OpenSocket = (host: string, port: number) => SmtpSocket;

export interface SmtpOptions {
	host: string;
	port: number;
	/** Login and envelope sender. */
	user: string;
	password: string;
	to: string;
	/** The full message, headers and body, with CRLF line ends. */
	data: string;
	timeoutMs?: number;
}

export class SmtpError extends Error {}

const encoder = new TextEncoder();

class Session {
	private reader: ReadableStreamDefaultReader<Uint8Array>;
	private writer: WritableStreamDefaultWriter<Uint8Array>;
	private decoder = new TextDecoder();
	private buffer = '';

	socket: SmtpSocket;

	constructor(socket: SmtpSocket) {
		this.socket = socket;
		this.reader = socket.readable.getReader();
		this.writer = socket.writable.getWriter();
	}

	/** Swaps to the TLS socket; the old reader and writer stop working. */
	upgrade() {
		this.reader.releaseLock();
		this.writer.releaseLock();
		const secure = this.socket.startTls();
		this.socket = secure;
		this.reader = secure.readable.getReader();
		this.writer = secure.writable.getWriter();
		this.buffer = '';
	}

	private async line(): Promise<string> {
		while (!this.buffer.includes('\r\n')) {
			const { value, done } = await this.reader.read();
			if (done) throw new SmtpError('connection closed');
			this.buffer += this.decoder.decode(value, { stream: true });
		}
		const end = this.buffer.indexOf('\r\n');
		const line = this.buffer.slice(0, end);
		this.buffer = this.buffer.slice(end + 2);
		return line;
	}

	/** One reply, which may span several `250-` lines; returns its code. */
	async reply(step: string, expected: number): Promise<number> {
		let line: string;
		do line = await this.line();
		while (/^\d{3}-/.test(line));
		const code = Number(line.slice(0, 3));
		if (code !== expected) throw new SmtpError(`${step} failed: ${Number.isNaN(code) ? 'no reply code' : code}`);
		return code;
	}

	async command(text: string, step: string, expected: number) {
		await this.writer.write(encoder.encode(`${text}\r\n`));
		return this.reply(step, expected);
	}

	async write(text: string) {
		await this.writer.write(encoder.encode(text));
	}
}

const base64 = (text: string) => btoa(String.fromCharCode(...encoder.encode(text)));

export async function send(open: OpenSocket, options: SmtpOptions): Promise<void> {
	const domain = options.user.split('@')[1] ?? 'localhost';
	let session: Session | undefined;
	let timer: ReturnType<typeof setTimeout> | null = null;
	const timeout = new Promise<never>((_, reject) => {
		timer = setTimeout(() => reject(new SmtpError('timed out')), options.timeoutMs ?? 25_000);
	});
	const dialogue = async (session: Session) => {
		await session.reply('greeting', 220);
		await session.command(`EHLO ${domain}`, 'EHLO', 250);
		await session.command('STARTTLS', 'STARTTLS', 220);
		session.upgrade();
		await session.command(`EHLO ${domain}`, 'EHLO after STARTTLS', 250);
		await session.command(`AUTH PLAIN ${base64(`\0${options.user}\0${options.password}`)}`, 'AUTH', 235);
		await session.command(`MAIL FROM:<${options.user}>`, 'MAIL FROM', 250);
		await session.command(`RCPT TO:<${options.to}>`, 'RCPT TO', 250);
		await session.command('DATA', 'DATA', 354);
		// Lines starting with a dot are doubled so the server doesn't read them as the end.
		await session.write(`${options.data.replace(/^\./gm, '..')}\r\n.\r\n`);
		await session.reply('message', 250);
		await session.command('QUIT', 'QUIT', 221).catch(() => {});
	};
	try {
		session = new Session(open(options.host, options.port));
		await Promise.race([dialogue(session), timeout]);
	} catch (error) {
		throw error instanceof SmtpError ? error : new SmtpError(`connection failed: ${error instanceof Error ? error.name : 'unknown'}`);
	} finally {
		if (timer !== null) clearTimeout(timer);
		await session?.socket.close().catch(() => {});
	}
}

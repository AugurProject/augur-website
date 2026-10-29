import { forms } from '../../../src/data/forms';

// Shared steps for every form endpoint, in order: Origin, body, honeypot, rate limit,
// validation, then the form's own submit. Success is reported only after submit resolves.

export type FormStatus = 'accepted' | 'invalid' | 'rejected' | 'rate-limited' | 'unavailable';
export type FormResult =
	| { ok: true; status: 'accepted'; message: string }
	| { ok: false; status: Exclude<FormStatus, 'accepted'>; message: string; fieldErrors?: Record<string, string> };
export type FormValues = Record<string, string>;

export interface FormSpec {
	/** Rate-limit key prefix and log label. */
	name: string;
	/** The only fields read, as trimmed strings. */
	fields: readonly string[];
	limiter: RateLimit;
	/** Field errors keyed by field name; empty when the values are acceptable. */
	validate(values: FormValues): Record<string, string>;
	/** Stores or sends the values. Throwing reports `unavailable`; resolving reports success. */
	submit(values: FormValues): Promise<void>;
	messages: Record<FormStatus, string>;
	/** Site path a no-JavaScript submit is redirected to. */
	redirect(result: FormResult): string;
}

const httpStatus: Record<FormStatus, number> = { accepted: 200, invalid: 422, rejected: 400, 'rate-limited': 429, unavailable: 503 };
const maxBodyBytes = 16 * 1024;
const formTypes = ['application/x-www-form-urlencoded', 'multipart/form-data'];

/** The request's Origin when ALLOWED_ORIGINS lists it, so other sites can't post here. */
export function allowedOrigin(request: Request, env: Env): string | null {
	const origin = request.headers.get('origin');
	return origin && env.ALLOWED_ORIGINS.split(',').map(entry => entry.trim()).includes(origin) ? origin : null;
}

const corsHeaders = (origin: string) => ({ 'access-control-allow-origin': origin, vary: 'Origin' });

export function preflight(request: Request, env: Env): Response {
	const origin = allowedOrigin(request, env);
	if (!origin) return new Response(null, { status: 403 });
	return new Response(null, {
		status: 204,
		headers: { ...corsHeaders(origin), 'access-control-allow-methods': 'POST', 'access-control-allow-headers': 'content-type, accept', 'access-control-max-age': '86400' },
	});
}

export async function handleForm(request: Request, env: Env, spec: FormSpec): Promise<Response> {
	const origin = allowedOrigin(request, env);
	if (!origin) return new Response('Forbidden', { status: 403 });

	// Scripts ask for JSON and show the message in place; plain form posts get a redirect.
	const wantsJson = (request.headers.get('accept') ?? '').includes('application/json');
	const respond = (result: FormResult) =>
		wantsJson
			? Response.json(result, { status: httpStatus[result.status], headers: corsHeaders(origin) })
			: new Response(null, { status: 303, headers: { location: new URL(spec.redirect(result), env.SITE_URL).href } });
	const fail = (status: Exclude<FormStatus, 'accepted'>, fieldErrors?: Record<string, string>) =>
		respond({ ok: false, status, message: spec.messages[status], ...(fieldErrors && { fieldErrors }) });

	const type = (request.headers.get('content-type') ?? '').split(';')[0].trim().toLowerCase();
	if (!formTypes.includes(type)) return fail('rejected');
	const body = await request.arrayBuffer();
	if (body.byteLength > maxBodyBytes) return fail('rejected');
	let data: FormData;
	try {
		data = await new Response(body, { headers: { 'content-type': request.headers.get('content-type')! } }).formData();
	} catch {
		return fail('rejected');
	}

	// A filled trap gets the generic failure, never success: a browser may have autofilled it.
	if (String(data.get(forms.honeypot) ?? '')) return fail('rejected');

	// The IP is only the limiter key; it is never stored or logged.
	const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';
	if (!(await spec.limiter.limit({ key: `${spec.name}:${ip}` })).success) return fail('rate-limited');

	const values: FormValues = Object.fromEntries(spec.fields.map(field => [field, String(data.get(field) ?? '').trim()]));
	const fieldErrors = spec.validate(values);
	if (Object.keys(fieldErrors).length) return fail('invalid', fieldErrors);

	try {
		await spec.submit(values);
	} catch (error) {
		// Status and error text only; never the submitted values.
		console.error(`${spec.name} unavailable`, error instanceof Error ? error.message : String(error));
		return fail('unavailable');
	}
	return respond({ ok: true, status: 'accepted', message: spec.messages.accepted });
}

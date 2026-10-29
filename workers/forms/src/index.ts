import { handleForm, preflight, type FormSpec } from './form';
import { subscribe } from './subscribe';

// One route per form. Each route builds its spec from the environment; form.ts does the rest.
const routes: Record<string, (env: Env) => FormSpec> = {
	'/subscribe': subscribe,
};

export default {
	async fetch(request, env) {
		const route = routes[new URL(request.url).pathname];
		if (!route) return new Response('Not Found', { status: 404 });
		if (request.method === 'OPTIONS') return preflight(request, env);
		if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405, headers: { allow: 'POST, OPTIONS' } });
		return handleForm(request, env, route(env));
	},
} satisfies ExportedHandler<Env>;

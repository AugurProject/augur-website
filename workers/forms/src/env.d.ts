// The site's data files read Vite's import.meta.env; in the Worker bundle it is undefined.
interface ImportMeta { readonly env?: { readonly PUBLIC_FORMS_URL?: string; readonly DEV?: boolean } }

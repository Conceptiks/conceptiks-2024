import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PRIVATE_NETLIFY_BUILD_HOOK, PRIVATE_NETLIFY_BUILD_HOOK_SECRET } from '$env/static/private';

export const POST: RequestHandler = async ({ request, fetch }) => {
    if (request.headers.get('X-SECRET') !== PRIVATE_NETLIFY_BUILD_HOOK_SECRET) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = PRIVATE_NETLIFY_BUILD_HOOK;

    try {
        const res = await fetch(url, { method: 'POST' });
        if (!res.ok) {
            return json({ error: 'Failed to trigger build' }, { status: 500 });
        }

        return json({}, { status: 200 });
    } catch (error) {
        console.error(error);
        return json({ error: 'Failed to trigger build' }, { status: 500 });
    }
};

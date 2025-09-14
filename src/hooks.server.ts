/** @type {import('@sveltejs/kit').Handle} */

export async function handle({ event, resolve }) {
  const country = event.request.headers.get('x-vercel-ip-country');
  const region = event.request.headers.get('x-vercel-ip-country-region');

  // Allow only from Texas, USA (adjust logic as needed)
  if (country !== 'US' || region !== 'TX') {
    return new Response('Access Denied', { status: 403 });
  }

  return resolve(event);
}
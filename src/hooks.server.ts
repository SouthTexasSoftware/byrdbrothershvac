import { dev } from "$app/environment";
import { error, redirect } from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  if (dev) {
    return resolve(event);
  }
  const userAgent =
    event.request.headers.get("user-agent")?.toLowerCase() || "";
  const country = event.request.headers.get("x-vercel-ip-country");
  const region = event.request.headers.get("x-vercel-ip-country-region");

  // Allow Googlebot and other search engine crawlers
  if (
    userAgent.includes("googlebot") ||
    userAgent.includes("bingbot") || // Optional: Add other crawlers like Bing
    userAgent.includes("adsbot-google")
  ) {
    return resolve(event);
  }

  // Block non-Texas traffic
  // if (country !== "US" || region !== "TX") {
  //   throw error(
  //     403,
  //     "Not available in your Region. Please call (979) 480-8444.",
  //   );
  // }

  return resolve(event);
}

const securityHeaders = {
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
};

async function fetchAsset(request, assets) {
  let response = await assets.fetch(request);
  const url = new URL(request.url);

  if (
    response.status === 404 &&
    (request.method === "GET" || request.method === "HEAD") &&
    url.pathname.endsWith("/")
  ) {
    url.pathname += "index.html";
    response = await assets.fetch(new Request(url, request));
  }

  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(securityHeaders)) {
    headers.set(name, value);
  }

  if (url.pathname.startsWith("/_astro/")) {
    headers.set("Cache-Control", "public, max-age=31556952, immutable");
  } else if (headers.get("Content-Type")?.includes("text/html")) {
    headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request, env) {
    return fetchAsset(request, env.ASSETS);
  },
};

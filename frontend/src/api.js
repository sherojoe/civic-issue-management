export const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

let authorityAuthorization = "";

export async function authorityLogin(email, password) {
  const authorization = `Basic ${btoa(unescape(encodeURIComponent(`${email}:${password}`)))}`;
  const response = await fetch(`${API_BASE}/api/authority/session`, {
    headers: { Authorization: authorization },
  });
  if (!response.ok) throw new Error("Invalid authority credentials or authority access is not configured.");
  authorityAuthorization = authorization;
}

export function authorityFetch(path, options = {}) {
  return fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { ...options.headers, Authorization: authorityAuthorization },
  });
}

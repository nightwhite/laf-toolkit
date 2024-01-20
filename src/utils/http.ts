import fetch, { RequestInit,Headers,Response } from "node-fetch";

interface FetchOptions extends RequestInit {
  jwtToken?: string;
}

async function fetchWrapper(url: string,options: FetchOptions = {}): Promise<Response> {
  try {
    const { jwtToken, ...fetchOptions } = options;

    const headers:Headers = new Headers();

    if (jwtToken) {
      headers.append("Authorization", `Bearer ${jwtToken}`);
    }

    if (fetchOptions.headers) {
      for (const [key, value] of Object.entries(fetchOptions.headers)) {
        headers.append(key, value);
      }
    }
    
    const requestOptions: RequestInit = { ...fetchOptions, headers};
    const response = await fetch(url, requestOptions);
    return response;
  } catch (error: any) {
    throw new Error(`Failed to fetch ${url}: ${error.message}`);
  }
}

export async function get(url: string, options?: FetchOptions): Promise<Response> {
  return fetchWrapper(url, { ...options, method: "GET" });
}

export async function post(
  url: string,
  body: object,
  options?: FetchOptions
): Promise<Response> {
  const requestOptions: FetchOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    ...options,
  };

  return fetchWrapper(url, requestOptions);
}

const BASE_URL = "/react";

type HTTPMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

type FetchOptions = Omit<RequestInit, "body"> & {
	url: string;
	body?: Record<PropertyKey, unknown> | FormData;
};

const apiClient = <Resource>(
	method: HTTPMethod,
	{ url, body, headers, ...options }: FetchOptions,
) => {
	const csrfToken =
		document
			.querySelector("meta[name='csrf-token']")
			?.getAttribute("content") || "";

	return fetch(`${BASE_URL}${url}`, {
		method,
		...(body && {
			body: body instanceof FormData ? body : JSON.stringify(body),
		}),
		headers: {
			"X-CSRF-Token": csrfToken,
			...(!(body instanceof FormData) && {
				"Content-Type": "application/json",
				Accept: "application/json",
			}),
			...headers,
		},
		credentials: "same-origin",
		...options,
	}).then((response) => {
		if (response.ok) {
			return response.json() as Promise<Resource>;
		}
		throw new Error(response.statusText);
	});
};

export const client = {
	get: <Resource>(options: FetchOptions) => {
		return apiClient<Resource>("GET", options);
	},
	post: <Resource>(options: FetchOptions) => {
		return apiClient<Resource>("POST", options);
	},
	patch: <Resource>(options: FetchOptions) => {
		return apiClient<Resource>("PATCH", options);
	},
	put: <Resource>(options: FetchOptions) => {
		return apiClient<Resource>("PUT", options);
	},
	delete: <Resource>(options: FetchOptions) => {
		return apiClient<Resource>("DELETE", options);
	},
};

enum Verb {
    GET = 'get',
    PUT = 'put',
    POST = 'post',
    DELETE = 'delete',
    PATCH = 'patch'
}

/**
 * A standard method for calling an action (GET, POST, etc) on an URL.
 * @param {string} accessToken The authenticated user's access token.
 * @param {string} url The relative URL.
 * @param {string} method The method (GET, POST, etc.)
 * @param {any} message (Optional) The object to go in the request body as JSON.
 * @param {string} contentType (Optional) The content type
 */
const authorizedActionAsync = async <T>(method: Verb, url: string, message?: any, contentType = 'application/json'): Promise<T> => {
    // console.log(`Verb ${method} - url - ${url}`)
    return fetch(url, {
        method,
        headers: {
            'Content-Type': `${contentType}; charset=utf-8`,
            'Accept-Language': navigator.language,
        },

        cache: 'no-cache',
        body: message ? JSON.stringify(message) : null
    })
        .then(async response => {
            if (response.ok) {
                // Get the content type
                const responseContentType = response.headers.get('content-type')
                // If JSON...
                if (responseContentType && -1 !== responseContentType.indexOf('application/json')) {
                    // Return parsed JSON
                    return response.json()
                }
                // Return text
                return response.text()
            }
            const text = await response.text()
            const message = text ? `${response.status} ${response.statusText} - ${text}` : `${response.status} ${response.statusText}`
            throw new Error(message)
        })
        .then(value => {
            return value as T
        })
}

/**
 * A standard DELETE request.
 * @param accessToken The authenticated user's access token.
 * @param url The URL.
 * @returns
 */
export const authorizedDeleteAsync = async <T>(url: string): Promise<T> => authorizedActionAsync<T>(Verb.DELETE, url)

/**
 * A standard GET request.
 * @param {string} accessToken The authenticated user's access token.
 * @param {string} url The URL.
 * @returns
 */
export const authorizedGetAsync = async <T>(url: string): Promise<T> => authorizedActionAsync<T>(Verb.GET, url)

/**
 * A standard POST request.
 * @param accessToken The authenticated user's access token.
 * @param url The URL.
 * @param message The POST content.
 * @param contentType The POST content type (default JSON)
 * @returns
 */
export const authorizedPostAsync = async <T>(url: string, message?: unknown, contentType?: string): Promise<T> =>
    authorizedActionAsync<T>(Verb.POST, url, message, contentType)

/**
 * A standard PATCH request.
 * @param accessToken The authenticated user's access token.
 * @param url The URL.
 * @param message The PATCH content.
 * @param contentType The PATCH content type (default JSON)
 * @returns
 */
export const _authorizedPatchAsync = async <T>(url: string, message?: unknown, contentType?: string): Promise<T> =>
    authorizedActionAsync<T>(Verb.PATCH, url, message, contentType)

/**
 * A standard PUT request.
 * @param accessToken The authenticated user's access token.
 * @param url The URL.
 * @param message The PUT content.
 * @param contentType The PUT content type (default JSON)
 * @returns
 */
export const authorizedPutAsync = async <T>(url: string, message?: unknown, contentType?: string): Promise<T> =>
    authorizedActionAsync<T>(Verb.PUT, url, message, contentType)

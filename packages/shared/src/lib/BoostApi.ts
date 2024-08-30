import axios, { type AxiosRequestConfig, AxiosError } from 'axios';
const apiBase: string = import.meta.env.VITE_API_ENDPOINT;

export class BoostApi {
    baseUrl: string;
    constructor(baseUrl: string = apiBase) {
        this.baseUrl = baseUrl;
        // Setting up axios defaults
        axios.defaults.withCredentials = true;

        // Set common headers
        const authToken = import.meta.env.VITE_API_TOKEN;
        if (import.meta.env.DEV && authToken) {
            //console.log('Setting up axios with token:', authToken, ', apiBase: ', this.baseUrl);
            axios.defaults.headers.common['Authorization'] = authToken;
        } else {
            if (window.boostConfig.authToken) {
                axios.defaults.headers.common['Authorization'] = window.boostConfig.authToken;
            }

            //console.log('Axios is in production modex');
            //console.log('apiBase: ', this.baseUrl);
        }

        // Extract tenant ID from URL and set it as a default header
        const currentUrl = window.location.href;
        const url = new URL(currentUrl);
        const pathSegments = url.pathname.split('/');
        if (pathSegments[1]) {
            axios.defaults.headers.common['X-Tenantid'] = pathSegments[1];
        }
    }

    private dateReviver(key: string, value: any) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(Z|[\+\-]\d{2}:\d{2})?)?$/;
        if (typeof value === "string" && dateRegex.test(value)) {
            return new Date(value);
        }
        return value;
    };

    private async request<T>(method: 'get' | 'post' | 'put' | 'delete' | 'patch', path: string, payload: Record<string, any> | null = null): Promise<T> {
        console.log('Request sent')
        const config: AxiosRequestConfig = {
            method,
            url: path.startsWith('http') ? path : `${this.baseUrl}${path}`,
            data: payload,
            transformResponse: [(data) => {
                return data && JSON.parse(data, this.dateReviver);
            }]
        };

        try {
            const response = await axios.request<T>(config);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Handle Axios error
                console.error('Axios error:', error.message, 'Response:', error.response?.data);
                const axiosMessage = error.message;
                error.message = error.response?.data?.message || axiosMessage;
            } else {
                // Handle non-Axios error
                console.error('Unexpected error:', error);
            }
            throw error;
        }
    }

    async get<T>(path: string): Promise<T> {
        return this.request<T>('get', path);
    }

    async post<T>(path: string, payload: Record<string, any>): Promise<T> {
        return this.request<T>('post', path, payload);
    }

    async put<T>(path: string, payload: Record<string, any>): Promise<T> {
        return this.request<T>('put', path, payload);
    }

    async patch<T>(path: string, payload: Record<string, any>): Promise<T> {
        return this.request<T>('patch', path, payload);
    }

    async delete<T>(path: string): Promise<T> {
        return this.request<T>('delete', path);
    }

    async search<T>(request: { query: string; area: string }): Promise<T> {
        return this.request<T>('post', '/search', request);
    }

    async getHTML(fullPath: string): Promise<string> {
        const config: AxiosRequestConfig = {
            method: 'get',
            url: fullPath,
            headers: {
                Accept: 'text/html'
            },
            responseType: 'text' // Ensure the response is handled as text
        };

        try {
            const response = await axios.request<string>(config);
            if (response.status !== 200) {
                const message = (response.data as any).message || 'An error occurred';
                alert(`Error: ${message}`);
                throw new Error(message);
            }
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Handle Axios error
                console.error('Axios error:', error.message, 'Response:', error.response?.data);
                const message = error.response?.data?.message || 'An error occurred';
                alert(`Error: ${message}`);
            } else {
                // Handle non-Axios error
                console.error('Unexpected error:', error);
                alert(`Error: ${error}`);
            }
            throw error;
        }
    }
}

export const boostApi = new BoostApi();

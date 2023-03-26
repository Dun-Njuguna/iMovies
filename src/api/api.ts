import axios from 'axios';

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const getBaseUrl = (): string | undefined => {
	const _default = new URL(base_url as string);
	return _default.href;
};

const baseURL = getBaseUrl();

const api = axios.create({ baseURL });

const _request_interceptor = api.interceptors.request.use((request) => {
	console.log('apikey', API_KEY);
	request.params = {
		...request.params,
		api_key: API_KEY,
	};
	return request;
});

const _response_interceptor = api.interceptors.response.use(
	(response) => {
		response.config._retry = false;
		return response;
	},
	(error) => {
		return error;
	},
);

export { baseURL, _request_interceptor, _response_interceptor };

export default api;

declare module 'axios' {
	export interface AxiosRequestConfig {
		_retry?: boolean;
	}
}

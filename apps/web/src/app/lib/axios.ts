import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const http = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

// Attach JWT from localStorage on every request
http.interceptors.request.use((config) => {
    const token = localStorage.getItem('ada_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// On 401, clear token and redirect to login (except when 401 is from the login request itself)
http.interceptors.response.use(
    (res) => res,
    (err) => {
        const isLoginRequest = err.config?.url?.includes('/auth/login');
        if (err.response?.status === 401 && !isLoginRequest) {
            localStorage.removeItem('ada_token');
            window.location.href = '/login';
        }
        return Promise.reject(err);
    }
);

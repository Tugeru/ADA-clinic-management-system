import axios from 'axios';
import { env } from '../../config/env.js'

const BASE_URL = env.VITE_API_BASE_URL;

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

// On 401, clear token and redirect to login
http.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            localStorage.removeItem('ada_token');
            window.location.href = '/login';
        }
        return Promise.reject(err);
    }
);

// src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

// Safari-specific interceptor
api.interceptors.request.use(async (config) => {
    if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}cookie-init`, {
            withCredentials: true
        });
    }
    return config;
});

export default api;
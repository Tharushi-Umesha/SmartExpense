import api from './api';

const authService = {
    // Register new user
    register: async (userData) => {
        const response = await api.post('/api/Auth/register', userData);
        return response.data;
    },

    // Login user
    login: async (credentials) => {
        const response = await api.post('/api/Auth/login', credentials);
        return response.data;
    },
};

export default authService;
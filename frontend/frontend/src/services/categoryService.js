import api from './api';

const categoryService = {
    // Get all categories
    getAll: async () => {
        const response = await api.get('/api/categories');
        return response.data;
    },

    // Get categories by type
    getByType: async (type) => {
        const response = await api.get(`/api/categories/type/${type}`);
        return response.data;
    },

    // Get single category
    getById: async (id) => {
        const response = await api.get(`/api/categories/${id}`);
        return response.data;
    },

    // Create custom category
    create: async (categoryData) => {
        const response = await api.post('/api/categories', categoryData);
        return response.data;
    },

    // Delete custom category
    delete: async (id) => {
        const response = await api.delete(`/api/categories/${id}`);
        return response.data;
    },
};

export default categoryService;
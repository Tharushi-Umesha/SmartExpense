import api from './api';

const transactionService = {
    // Get all transactions
    getAll: async () => {
        const response = await api.get('/api/transactions');
        return response.data;
    },

    // Get transactions by type
    getByType: async (type) => {
        const response = await api.get(`/api/transactions/type/${type}`);
        return response.data;
    },

    // Get transactions by date range
    getByDateRange: async (startDate, endDate) => {
        const response = await api.get('/api/transactions/daterange', {
            params: { startDate, endDate }
        });
        return response.data;
    },

    // Get single transaction
    getById: async (id) => {
        const response = await api.get(`/api/transactions/${id}`);
        return response.data;
    },

    // Get summary
    getSummary: async (startDate = null, endDate = null) => {
        const params = {};
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;

        const response = await api.get('/api/transactions/summary', { params });
        return response.data;
    },

    // Create transaction
    create: async (transactionData) => {
        const response = await api.post('/api/transactions', transactionData);
        return response.data;
    },

    // Update transaction
    update: async (id, transactionData) => {
        const response = await api.put(`/api/transactions/${id}`, transactionData);
        return response.data;
    },

    // Delete transaction
    delete: async (id) => {
        const response = await api.delete(`/api/transactions/${id}`);
        return response.data;
    },
};

export default transactionService;
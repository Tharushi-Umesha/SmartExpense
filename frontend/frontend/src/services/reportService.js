import api from './api';

const reportService = {
    // Get expense breakdown by category
    getExpenseByCategory: async (startDate = null, endDate = null) => {
        const params = {};
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;

        const response = await api.get('/api/reports/expense-by-category', { params });
        return response.data;
    },

    // Get income breakdown by category
    getIncomeByCategory: async (startDate = null, endDate = null) => {
        const params = {};
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;

        const response = await api.get('/api/reports/income-by-category', { params });
        return response.data;
    },

    // Get monthly trend
    getMonthlyTrend: async (months = 6) => {
        const response = await api.get('/api/reports/monthly-trend', {
            params: { months }
        });
        return response.data;
    },

    // Get spending pattern
    getSpendingPattern: async () => {
        const response = await api.get('/api/reports/spending-pattern');
        return response.data;
    },
};

export default reportService;
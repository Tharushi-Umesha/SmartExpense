import { useState, useEffect } from 'react';
import reportService from '../../services/reportService';
import Card from '../common/Card/Card';

const SpendingPatternCard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const result = await reportService.getSpendingPattern();
            setData(result);
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            console.error('Failed to load spending pattern');
        } finally {
            setLoading(false);
        }
    };

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    if (loading) {
        return (
            <Card>
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-12 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </Card>
        );
    }

    if (!data) {
        return (
            <Card>
                <p className="text-center text-gray-500 py-8">No spending pattern data available</p>
            </Card>
        );
    }

    return (
        <Card>
            <h3 className="text-xl font-bold text-gray-800 mb-6">Spending Insights</h3>

            <div className="space-y-4">
                {/* Average Daily Spending */}
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">📅</span>
                        <div>
                            <p className="text-sm text-gray-600">Average Daily Spending</p>
                            <p className="text-xl font-bold text-blue-700">
                                {formatAmount(data.averageDailySpending)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Highest Expense Category */}
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">🔝</span>
                        <div>
                            <p className="text-sm text-gray-600">Highest Expense Category</p>
                            <p className="text-xl font-bold text-red-700">
                                {data.highestExpenseCategory || 'N/A'}
                            </p>
                            <p className="text-xs text-gray-500">
                                {data.highestExpenseAmount > 0 && formatAmount(data.highestExpenseAmount)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Most Frequent Category */}
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">⭐</span>
                        <div>
                            <p className="text-sm text-gray-600">Most Frequent Category</p>
                            <p className="text-xl font-bold text-purple-700">
                                {data.mostFrequentCategory || 'N/A'}
                            </p>
                            <p className="text-xs text-gray-500">
                                {data.mostFrequentCount > 0 && `${data.mostFrequentCount} transactions`}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Total Transactions This Month */}
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">📊</span>
                        <div>
                            <p className="text-sm text-gray-600">Transactions This Month</p>
                            <p className="text-xl font-bold text-green-700">
                                {data.totalTransactionsThisMonth || 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default SpendingPatternCard;
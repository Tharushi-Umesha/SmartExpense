import { useState, useEffect } from 'react';
import reportService from '../../services/reportService';
import Card from '../common/Card/Card';

const IncomeByCategoryChart = ({ startDate, endDate }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, [startDate, endDate]);

    const loadData = async () => {
        try {
            setLoading(true);
            const result = await reportService.getIncomeByCategory(startDate, endDate);
            setData(result);
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            console.error('Failed to load income data');
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

    const totalIncome = data.reduce((sum, item) => sum + item.totalAmount, 0);

    const getPercentage = (amount) => {
        if (totalIncome === 0) return 0;
        return ((amount / totalIncome) * 100).toFixed(1);
    };

    if (loading) {
        return (
            <Card>
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-16 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <Card>
            <h3 className="text-xl font-bold text-gray-800 mb-6">Income by Category</h3>

            {data.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No income data available</p>
            ) : (
                <div className="space-y-4">
                    {data.map((item) => (
                        <div key={item.categoryId} className="border-b pb-4 last:border-b-0">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">{item.icon}</span>
                                    <span className="font-semibold text-gray-800">{item.categoryName}</span>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-green-600">{formatAmount(item.totalAmount)}</p>
                                    <p className="text-xs text-gray-500">{getPercentage(item.totalAmount)}%</p>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-green-500 h-2 rounded-full transition-all"
                                    style={{ width: `${getPercentage(item.totalAmount)}%` }}
                                ></div>
                            </div>

                            <p className="text-xs text-gray-500 mt-1">
                                {item.transactionCount} transaction{item.transactionCount !== 1 ? 's' : ''}
                            </p>
                        </div>
                    ))}

                    {/* Total */}
                    <div className="pt-4 border-t-2">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-gray-800">Total Income</span>
                            <span className="font-bold text-green-600 text-xl">{formatAmount(totalIncome)}</span>
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default IncomeByCategoryChart;
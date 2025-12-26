import { useState, useEffect } from 'react';
import reportService from '../../services/reportService';
import Card from '../common/Card/Card';

const MonthlyTrendChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const result = await reportService.getMonthlyTrend(6);
            setData(result);
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            console.error('Failed to load monthly trend');
        } finally {
            setLoading(false);
        }
    };

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const maxAmount = Math.max(
        ...data.map(item => Math.max(item.totalIncome, item.totalExpense))
    );

    const getBarHeight = (amount) => {
        if (maxAmount === 0) return 0;
        return (amount / maxAmount) * 100;
    };

    if (loading) {
        return (
            <Card>
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-64 bg-gray-200 rounded"></div>
                </div>
            </Card>
        );
    }

    return (
        <Card>
            <h3 className="text-xl font-bold text-gray-800 mb-6">Monthly Trend (Last 6 Months)</h3>

            {data.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No trend data available</p>
            ) : (
                <div>
                    {/* Chart */}
                    <div className="flex items-end justify-around h-64 border-b border-gray-300 mb-4">
                        {data.map((item, index) => (
                            <div key={index} className="flex flex-col items-center gap-2 flex-1 max-w-[100px]">
                                {/* Bars */}
                                <div className="w-full flex gap-1 items-end justify-center h-full">
                                    {/* Income Bar */}
                                    <div className="relative flex-1 bg-green-500 rounded-t transition-all hover:bg-green-600"
                                        style={{ height: `${getBarHeight(item.totalIncome)}%` }}
                                        title={`Income: ${formatAmount(item.totalIncome)}`}>
                                    </div>

                                    {/* Expense Bar */}
                                    <div className="relative flex-1 bg-red-500 rounded-t transition-all hover:bg-red-600"
                                        style={{ height: `${getBarHeight(item.totalExpense)}%` }}
                                        title={`Expense: ${formatAmount(item.totalExpense)}`}>
                                    </div>
                                </div>

                                {/* Month Label */}
                                <p className="text-xs font-semibold text-gray-600 text-center">
                                    {item.month}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center justify-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-500 rounded"></div>
                            <span className="text-sm text-gray-600">Income</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-red-500 rounded"></div>
                            <span className="text-sm text-gray-600">Expense</span>
                        </div>
                    </div>

                    {/* Summary Table */}
                    <div className="mt-6 overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-2">Month</th>
                                    <th className="text-right py-2">Income</th>
                                    <th className="text-right py-2">Expense</th>
                                    <th className="text-right py-2">Net</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index} className="border-b last:border-b-0">
                                        <td className="py-2 font-semibold">{item.month}</td>
                                        <td className="text-right text-green-600">{formatAmount(item.totalIncome)}</td>
                                        <td className="text-right text-red-600">{formatAmount(item.totalExpense)}</td>
                                        <td className={`text-right font-semibold ${item.netAmount >= 0 ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {formatAmount(item.netAmount)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default MonthlyTrendChart;
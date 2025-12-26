import { useState, useEffect } from 'react';
import transactionService from '../../services/transactionService';
import Card from '../Common/Card/Card';

const SummaryCards = () => {
    const [summary, setSummary] = useState({
        totalIncome: 0,
        totalExpense: 0,
        netBalance: 0,
        transactionCount: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSummary();
    }, []);

    const loadSummary = async () => {
        try {
            const data = await transactionService.getSummary();
            setSummary(data);
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            console.error('Failed to load summary');
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="animate-pulse">
                        <div className="h-20 bg-gray-200 rounded"></div>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Total Income */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-green-600 font-semibold mb-1">Total Income</p>
                        <p className="text-2xl font-bold text-green-700">
                            {formatAmount(summary.totalIncome)}
                        </p>
                    </div>
                    <div className="text-4xl">💰</div>
                </div>
            </Card>

            {/* Total Expense */}
            <Card className="bg-gradient-to-br from-red-50 to-red-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-red-600 font-semibold mb-1">Total Expense</p>
                        <p className="text-2xl font-bold text-red-700">
                            {formatAmount(summary.totalExpense)}
                        </p>
                    </div>
                    <div className="text-4xl">💸</div>
                </div>
            </Card>

            {/* Net Balance */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-blue-600 font-semibold mb-1">Net Balance</p>
                        <p className="text-2xl font-bold text-blue-700">
                            {formatAmount(summary.netBalance)}
                        </p>
                    </div>
                    <div className="text-4xl">📊</div>
                </div>
            </Card>

            {/* Transaction Count */}
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-purple-600 font-semibold mb-1">Transactions</p>
                        <p className="text-2xl font-bold text-purple-700">
                            {summary.transactionCount}
                        </p>
                    </div>
                    <div className="text-4xl">📝</div>
                </div>
            </Card>
        </div>
    );
};

export default SummaryCards;
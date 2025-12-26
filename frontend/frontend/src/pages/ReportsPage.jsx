import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import DateRangeFilter from '../components/reports/DateRangeFilter';
import ExpenseByCategoryChart from '../components/reports/ExpenseByCategoryChart';
import IncomeByCategoryChart from '../components/reports/IncomeByCategoryChart';
import MonthlyTrendChart from '../components/reports/MonthlyTrendChart';
import SpendingPatternCard from '../components/reports/SpendingPatternCard';

const ReportsPage = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleFilter = (start, end) => {
        setStartDate(start);
        setEndDate(end);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Financial Reports</h1>

                {/* Date Range Filter */}
                <DateRangeFilter onFilter={handleFilter} />

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <ExpenseByCategoryChart startDate={startDate} endDate={endDate} />
                    <IncomeByCategoryChart startDate={startDate} endDate={endDate} />
                </div>

                {/* Monthly Trend - Full Width */}
                <div className="mb-6">
                    <MonthlyTrendChart />
                </div>

                {/* Spending Pattern */}
                <SpendingPatternCard />
            </div>
        </div>
    );
};

export default ReportsPage;
import { useState } from 'react';
import InputField from '../Common/InputField';
import PrimaryBtn from '../Common/Buttons/PrimaryBtn';

const DateRangeFilter = ({ onFilter }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleFilter = () => {
        onFilter(startDate, endDate);
    };

    const handleReset = () => {
        setStartDate('');
        setEndDate('');
        onFilter('', '');
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Filter by Date Range</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <InputField
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <InputField
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>

            <div className="flex flex-wrap gap-3">
                <PrimaryBtn onClick={handleFilter}>
                    Apply Filter
                </PrimaryBtn>
                <PrimaryBtn onClick={handleReset}>
                    Reset
                </PrimaryBtn>
            </div>
        </div>
    );
};

export default DateRangeFilter;
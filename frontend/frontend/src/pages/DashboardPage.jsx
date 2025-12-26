import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/layout/Navbar';
import SummaryCards from '../components/dashboard/SummaryCards';
import { Link } from 'react-router-dom';
import Card from '../components/Common/Card/Card';

const DashboardPage = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Welcome back, {user?.firstName}! 👋
                    </h1>
                    <p className="text-gray-600">Here's your financial overview</p>
                </div>

                {/* Summary Cards */}
                <SummaryCards />

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link to="/transactions">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold mb-1">Transactions</h3>
                                    <p className="text-sm text-blue-100">View and manage all transactions</p>
                                </div>
                                <div className="text-4xl">💳</div>
                            </div>
                        </Card>
                    </Link>

                    <Link to="/categories">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold mb-1">Categories</h3>
                                    <p className="text-sm text-purple-100">Manage expense categories</p>
                                </div>
                                <div className="text-4xl">🏷️</div>
                            </div>
                        </Card>
                    </Link>

                    <Link to="/reports">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-green-500 to-green-600 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold mb-1">Reports</h3>
                                    <p className="text-sm text-green-100">View detailed analytics</p>
                                </div>
                                <div className="text-4xl">📈</div>
                            </div>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
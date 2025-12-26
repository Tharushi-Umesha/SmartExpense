import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import PrimaryBtn from '../Common/Buttons/PrimaryBtn';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout, isAuthenticated } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-8">
                        <Link to="/dashboard" className="flex-shrink-0">
                            <h1 className="text-2xl font-bold text-blue-600">SmartExpense</h1>
                        </Link>

                        {/* Navigation Links */}
                        {isAuthenticated && (
                            <div className="hidden md:flex items-center gap-6">
                                <Link
                                    to="/dashboard"
                                    className={`font-semibold transition-colors ${isActive('/dashboard')
                                        ? 'text-blue-600'
                                        : 'text-gray-600 hover:text-blue-600'
                                        }`}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/transactions"
                                    className={`font-semibold transition-colors ${isActive('/transactions')
                                        ? 'text-blue-600'
                                        : 'text-gray-600 hover:text-blue-600'
                                        }`}
                                >
                                    Transactions
                                </Link>
                                <Link
                                    to="/categories"
                                    className={`font-semibold transition-colors ${isActive('/categories')
                                        ? 'text-blue-600'
                                        : 'text-gray-600 hover:text-blue-600'
                                        }`}
                                >
                                    Categories
                                </Link>
                            </div>
                        )}
                    </div>
                    <Link
                        to="/reports"
                        className={`font-semibold transition-colors ${isActive('/reports')
                                ? 'text-blue-600'
                                : 'text-gray-600 hover:text-blue-600'
                            }`}
                    >
                        Reports
                    </Link>

                    {/* User Info & Logout */}
                    {isAuthenticated && (
                        <div className="flex items-center gap-4">
                            <span className="text-gray-700">
                                Welcome, <span className="font-semibold">{user?.firstName}</span>
                            </span>
                            <PrimaryBtn variant="outline" onClick={handleLogout}>
                                Logout
                            </PrimaryBtn>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
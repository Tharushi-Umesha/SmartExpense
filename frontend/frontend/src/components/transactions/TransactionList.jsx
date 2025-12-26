import { useState, useEffect } from 'react';
import transactionService from '../../services/transactionService';
import PrimaryBtn from '../Common/Buttons/PrimaryBtn';
import Card from '../Common/Card/Card';
import Modal from '../Common/Modal/Modal';
import CreateTransactionForm from './CreateTransactionForm';
import EditTransactionForm from './EditTransactionForm';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [filterType, setFilterType] = useState('All');

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = async () => {
        try {
            setLoading(true);
            const data = await transactionService.getAll();
            setTransactions(data);
            setError('');
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError('Failed to load transactions');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this transaction?')) return;

        try {
            await transactionService.delete(id);
            setTransactions(transactions.filter(t => t.transactionId !== id));
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            alert('Failed to delete transaction');
        }
    };

    const handleEdit = (transaction) => {
        setSelectedTransaction(transaction);
        setIsEditModalOpen(true);
    };

    const handleTransactionCreated = (newTransaction) => {
        setTransactions([newTransaction, ...transactions]);
        setIsCreateModalOpen(false);
    };

    const handleTransactionUpdated = (updatedTransaction) => {
        setTransactions(
            transactions.map(t =>
                t.transactionId === updatedTransaction.transactionId ? updatedTransaction : t
            )
        );
        setIsEditModalOpen(false);
    };

    const filteredTransactions = filterType === 'All'
        ? transactions
        : transactions.filter(t => t.type === filterType);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-xl text-gray-600">Loading transactions...</div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Transactions</h2>
                <PrimaryBtn onClick={() => setIsCreateModalOpen(true)}>
                    + Add Transaction
                </PrimaryBtn>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                    {error}
                </div>
            )}

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6">
                {['All', 'Expense', 'Income'].map((type) => (
                    <PrimaryBtn
                        key={type}
                        onClick={() => setFilterType(type)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${filterType === type
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {type}
                    </PrimaryBtn>
                ))}
            </div>

            {/* Transactions List */}
            <div className="space-y-3">
                {filteredTransactions.map((transaction) => (
                    <Card key={transaction.transactionId} className="hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                                {/* Category Info */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-gray-800">
                                            {transaction.categoryName}
                                        </h3>
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full ${transaction.type === 'Expense'
                                                ? 'bg-red-100 text-red-700'
                                                : 'bg-green-100 text-green-700'
                                                }`}
                                        >
                                            {transaction.type}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">{transaction.description}</p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {formatDate(transaction.transactionDate)}
                                    </p>
                                </div>

                                {/* Amount */}
                                <div className="text-right">
                                    <p
                                        className={`text-xl font-bold ${transaction.type === 'Expense' ? 'text-red-600' : 'text-green-600'
                                            }`}
                                    >
                                        {transaction.type === 'Expense' ? '-' : '+'}
                                        {formatAmount(transaction.amount)}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 ml-4">
                                <PrimaryBtn
                                    onClick={() => handleEdit(transaction)}
                                    className="text-blue-500 hover:text-blue-700 p-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </PrimaryBtn>
                                <PrimaryBtn
                                    onClick={() => handleDelete(transaction.transactionId)}
                                    className="text-red-500 hover:text-red-700 p-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </PrimaryBtn>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {filteredTransactions.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No transactions found</p>
                </div>
            )}

            {/* Create Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Add Transaction"
            >
                <CreateTransactionForm onSuccess={handleTransactionCreated} />
            </Modal>

            {/* Edit Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Transaction"
            >
                {selectedTransaction && (
                    <EditTransactionForm
                        transaction={selectedTransaction}
                        onSuccess={handleTransactionUpdated}
                    />
                )}
            </Modal>
        </div>
    );
};

export default TransactionList;
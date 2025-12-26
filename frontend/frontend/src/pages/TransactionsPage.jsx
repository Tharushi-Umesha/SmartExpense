import Navbar from '../components/layout/Navbar';
import TransactionList from '../components/transactions/TransactionList';

const TransactionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TransactionList />
      </div>
    </div>
  );
};

export default TransactionsPage;
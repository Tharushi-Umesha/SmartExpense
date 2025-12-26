import { useState, useEffect } from 'react';
import categoryService from '../../services/categoryService';
import PrimaryBtn from '../Common/Buttons/PrimaryBtn';
import Card from '../Common/Card/Card';
import Modal from '../Common/Modal/Modal';
import CreateCategoryForm from './CreateCategoryForm';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterType, setFilterType] = useState('All');

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            setLoading(true);
            const data = await categoryService.getAll();
            setCategories(data);
            setError('');
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError('Failed to load categories');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return;

        try {
            await categoryService.delete(id);
            setCategories(categories.filter(cat => cat.categoryId !== id));
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to delete category');
        }
    };

    const handleCategoryCreated = (newCategory) => {
        setCategories([...categories, newCategory]);
        setIsModalOpen(false);
    };

    const filteredCategories = filterType === 'All'
        ? categories
        : categories.filter(cat => cat.type === filterType);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-xl text-gray-600">Loading categories...</div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
                <PrimaryBtn onClick={() => setIsModalOpen(true)}>
                    + Add Category
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

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCategories.map((category) => (
                    <Card key={category.categoryId}>
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">{category.icon}</span>
                                <div>
                                    <h3 className="font-semibold text-gray-800">{category.name}</h3>
                                    <span
                                        className={`text-xs px-2 py-1 rounded-full ${category.type === 'Expense'
                                            ? 'bg-red-100 text-red-700'
                                            : 'bg-green-100 text-green-700'
                                            }`}
                                    >
                                        {category.type}
                                    </span>
                                </div>
                            </div>

                            {/* Only show delete for custom categories (those with userId) */}
                            {category.userId && (
                                <PrimaryBtn
                                    onClick={() => handleDelete(category.categoryId)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </PrimaryBtn>
                            )}
                        </div>

                        {/* Color Badge */}
                        <div className="mt-3 flex items-center gap-2">
                            <div
                                className="w-4 h-4 rounded-full border"
                                style={{ backgroundColor: category.color }}
                            />
                            <span className="text-xs text-gray-500">{category.color}</span>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {filteredCategories.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No categories found</p>
                </div>
            )}

            {/* Create Category Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create Custom Category"
            >
                <CreateCategoryForm onSuccess={handleCategoryCreated} />
            </Modal>
        </div>
    );
};

export default CategoryList;
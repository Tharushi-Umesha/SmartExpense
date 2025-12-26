import { useState, useEffect } from 'react';
import InputField from '../Common/InputField';
import Select from '../Common/Select/Select';
import Textarea from '../Common/Textarea/Textarea';
import PrimaryBtn from '../Common/Buttons/PrimaryBtn';
import categoryService from '../../services/categoryService';
import transactionService from '../../services/transactionService';

const CreateTransactionForm = ({ onSuccess }) => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        categoryId: '',
        amount: '',
        type: '',
        description: '',
        transactionDate: new Date().toISOString().slice(0, 16),
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await categoryService.getAll();
            setCategories(data);
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            console.error('Failed to load categories');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.categoryId) {
            newErrors.categoryId = 'Category is required';
        }

        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            newErrors.amount = 'Amount must be greater than 0';
        }

        if (!formData.type) {
            newErrors.type = 'Type is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            const transactionData = {
                ...formData,
                categoryId: parseInt(formData.categoryId),
                amount: parseFloat(formData.amount),
            };

            const response = await transactionService.create(transactionData);
            onSuccess(response);
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to create transaction');
        } finally {
            setLoading(false);
        }
    };

    // Filter categories by selected type
    const filteredCategories = formData.type
        ? categories.filter(cat => cat.type === formData.type)
        : categories;

    return (
        <form onSubmit={handleSubmit}>
            <Select
                label="Type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                options={[
                    { value: 'Expense', label: 'Expense' },
                    { value: 'Income', label: 'Income' },
                ]}
                required
                error={errors.type}
            />

            <Select
                label="Category"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                options={filteredCategories.map(cat => ({
                    value: cat.categoryId,
                    label: `${cat.icon} ${cat.name}`,
                }))}
                placeholder="Select a category"
                required
                error={errors.categoryId}
            />

            <InputField
                label="Amount"
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                required
                error={errors.amount}
            />

            <Textarea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter transaction details..."
                required
                error={errors.description}
                rows={3}
            />

            <InputField
                label="Date & Time"
                type="datetime-local"
                name="transactionDate"
                value={formData.transactionDate}
                onChange={handleChange}
                required
            />

            <PrimaryBtn type="submit" variant="primary" fullWidth loading={loading}>
                Add Transaction
            </PrimaryBtn>
        </form>
    );
};

export default CreateTransactionForm;
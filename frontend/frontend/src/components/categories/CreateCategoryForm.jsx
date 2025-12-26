import { useState } from 'react';
import InputField from '../Common/InputField';
import Select from '../Common/Select/Select';
import PrimaryBtn from '../Common/Buttons/PrimaryBtn';
import categoryService from '../../services/categoryService';

const CreateCategoryForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        icon: '',
        color: '#3B82F6',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Category name is required';
        }

        if (!formData.type) {
            newErrors.type = 'Category type is required';
        }

        if (!formData.icon.trim()) {
            newErrors.icon = 'Icon is required';
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
            const response = await categoryService.create(formData);
            onSuccess(response);
            setFormData({ name: '', type: '', icon: '', color: '#3B82F6' });
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to create category');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputField
                label="Category Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Gym Membership"
                required
                error={errors.name}
            />

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

            <InputField
                label="Icon (Emoji)"
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                placeholder="💪"
                required
                error={errors.icon}
            />

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Color <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3">
                    <input
                        type="color"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        className="w-12 h-12 rounded cursor-pointer"
                    />
                    <input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="#3B82F6"
                    />
                </div>
            </div>

            <PrimaryBtn type="submit" variant="primary" fullWidth loading={loading}>
                Create Category
            </PrimaryBtn>
        </form>
    );
};

export default CreateCategoryForm;
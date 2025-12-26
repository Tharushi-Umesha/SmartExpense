import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../Common/InputField';
import PrimaryBtn from '../Common/Buttons/PrimaryBtn';
import authService from '../../services/authService';
import { useAuth } from '../../hooks/useAuth';

const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
        setApiError('');
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
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
        setApiError('');

        try {
            const response = await authService.login(formData);

            // Save user data and token
            login({
                userId: response.userId,
                firstName: response.firstName,
                lastName: response.lastName,
                email: response.email,
            }, response.token);

            // Redirect to dashboard
            navigate('/dashboard');
        } catch (error) {
            setApiError(error.response?.data?.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            {apiError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                    {apiError}
                </div>
            )}

            <InputField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                error={errors.email}
            />

            <InputField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                error={errors.password}
            />

            <PrimaryBtn type="submit" variant="primary" fullWidth loading={loading}>
                Sign In
            </PrimaryBtn>
        </form>
    );
};

export default LoginForm;
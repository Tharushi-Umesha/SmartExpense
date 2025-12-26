// Storage keys
export const STORAGE_KEYS = {
    TOKEN: 'token',
    USER: 'user',
};

// Get token from localStorage
export const getToken = () => {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

// Get user from localStorage
export const getUser = () => {
    const userData = localStorage.getItem(STORAGE_KEYS.USER);
    return userData ? JSON.parse(userData) : null;
};

// Save auth data to localStorage
export const saveAuthData = (userData, token) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
};

// Clear auth data from localStorage
export const clearAuthData = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
};
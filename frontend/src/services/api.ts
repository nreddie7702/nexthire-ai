import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getProfile = async (userId: number) => {
    const response = await apiClient.get(`/users/${userId}/profile`);
    return response.data;
};

export const updateProfile = async (userId: number, data: any) => {
    const response = await apiClient.put(`/users/${userId}/profile`, data);
    return response.data;
};

export const createUser = async (userData: any) => {
    const response = await apiClient.post('/users/', userData);
    return response.data;
};

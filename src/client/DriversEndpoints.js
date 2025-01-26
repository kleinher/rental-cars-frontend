import axios from 'axios';

const API_URL = 'http://localhost:4000/api/driver';

export const getDrivers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching drivers:', error);
        throw error;
    }
};

export const getDriverById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching driver with ID ${id}:`, error);
        throw error;
    }
};

export const createDriver = async (driverData) => {
    try {
        const response = await axios.post(API_URL, driverData);
        return response.data;
    } catch (error) {
        console.error('Error creating driver:', error);
        throw error;
    }
};

export const updateDriver = async (id, driverData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, driverData);
        return response.data;
    } catch (error) {
        console.error(`Error updating driver with ID ${id}:`, error);
        throw error;
    }
};

export const deleteDriver = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting driver with ID ${id}:`, error);
        throw error;
    }
};
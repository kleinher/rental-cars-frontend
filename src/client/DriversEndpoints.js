import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/driver`;

const getDrivers = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log("getDrivers" + response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching drivers:', error);
        throw error;
    }
};

const getDriverById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching driver with ID ${id}:`, error);
        throw error;
    }
};

const createDriver = async (driverData) => {
    try {
        const response = await axios.post(API_URL, { ...driverData });
        return response.data;
    } catch (error) {
        console.error('Error creating driver:', error);
        throw error;
    }
};

const updateDriver = async (id, driverData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, driverData);
        return response.data;
    } catch (error) {
        console.error(`Error updating driver with ID ${id}:`, error);
        throw error;
    }
};

const deleteDriver = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting driver with ID ${id}:`, error);
        throw error;
    }
};

export default {
    getDrivers,
    getDriverById,
    createDriver,
    updateDriver,
    deleteDriver
};
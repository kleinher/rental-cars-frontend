import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/mechanic`;

const getMechanics = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log("getMechanics" + API_URL)
        console.log("getMechanics" + response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching mechanics:', error);
        throw error;
    }
};

const getMechanicById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching mechanic with ID ${id}:`, error);
        throw error;
    }
};

const createMechanic = async (mechanicData) => {
    try {
        const response = await axios.post(API_URL, { ...mechanicData });
        return response.data;
    } catch (error) {
        console.error('Error creating mechanic:', error);
        throw error;
    }
};

const updateMechanic = async (id, mechanicData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, mechanicData);
        return response.data;
    } catch (error) {
        console.error(`Error updating mechanic with ID ${id}:`, error);
        throw error;
    }
};

const deleteMechanic = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting mechanic with ID ${id}:`, error);
        throw error;
    }
};

export default {
    getMechanics,
    getMechanicById,
    createMechanic,
    updateMechanic,
    deleteMechanic
};

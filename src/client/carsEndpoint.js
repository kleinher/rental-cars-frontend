import wppClient from "./wppClient";
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/car`;
export const createCar = async (carData) => {
    try {
        const response = await axios.post(API_URL, carData);
        return response.data;
    } catch (error) {
        console.error('Error creating car:', error);
        throw error;
    }
};

export const updateCar = async (id, carData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, carData);
        return response.data;
    } catch (error) {
        console.error(`Error updating car with ID ${id}:`, error);
        throw error;
    }
};

export const carEndMaintainance = async (licencePlate) => {
    const api = wppClient;

    const message = {
        licencePlate: licencePlate
    };

    await api.post("/car/maintainance/end", message);
};


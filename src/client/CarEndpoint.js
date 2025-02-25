import wppClient from "./wppClient";
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/car`;

const CarEndpoint = {
    async createCar(carData) {
        try {
            const response = await axios.post(API_URL, carData);
            return response.data;
        } catch (error) {
            console.error('Error creating car:', error);
            throw error;
        }
    },

    async updateCar(id, carData) {
        try {
            const response = await axios.put(`${API_URL}/${id}`, carData);
            return response.data;
        } catch (error) {
            console.error(`Error updating car with ID ${id}:`, error);
            throw error;
        }
    },

    async deleteCar(id) {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting car with ID ${id}:`, error);
            throw error;
        }
    },


    async carEndMaintainance(licencePlate) {
        const api = wppClient;

        const message = {
            licencePlate: licencePlate
        };

        await api.post("/car/maintainance/end", message);
    }
}
export default CarEndpoint;
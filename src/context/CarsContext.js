import React, { createContext, useState } from 'react';
import { initialCars } from '../Data';

// Create the context
export const CarsContext = createContext();

// Create a provider component
export const CarsProvider = ({ children }) => {
    const [cars, setCars] = useState(initialCars);
    // Initialize cars state with data from Data.js


    const addCar = (car) => {
        setCars([...cars, car]);
    };

    const removeCar = (carId) => {
        setCars(cars.filter(car => car.id !== carId));
    };
    const updateReminderSent = (carId, reminderSent) => {
        setCars(cars.map(car => (car.licensePlate === carId ? { ...car, reminderSent, reminderSentDate: new Date() } : car)));
    };

    const updateCarMaintenanceStatus = (licensePlate) => {
        setCars(cars.map(car => (car.licensePlate === licensePlate ? { ...car, inMaintenance: false } : car)));
    };

    const updateCar = (updatedCar) => {
        setCars(cars.map(car => (car.id === updatedCar.id ? updatedCar : car)));
    };

    return (
        <CarsContext.Provider value={{ cars, addCar, removeCar, updateCar, updateReminderSent, updateCarMaintenanceStatus }}>
            {children}
        </CarsContext.Provider>
    );
};

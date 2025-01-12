import React, { createContext, useState, useContext } from 'react';

// Create the context
const CarsContext = createContext();

// Create a provider component
export const CarsProvider = ({ children }) => {
    const [cars, setCars] = useState([]);

    const addCar = (car) => {
        setCars([...cars, car]);
    };

    const removeCar = (carId) => {
        setCars(cars.filter(car => car.id !== carId));
    };
    const updateReminderSent = (carId, reminderSent) => {
        setCars(cars.map(car => (car.id === carId ? { ...car, reminderSent } : car)));
    };
    const updateCar = (updatedCar) => {
        setCars(cars.map(car => (car.id === updatedCar.id ? updatedCar : car)));
    };

    return (
        <CarsContext.Provider value={{ cars, addCar, removeCar, updateCar, updateReminderSent }}>
            {children}
        </CarsContext.Provider>
    );
};

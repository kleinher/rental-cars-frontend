import React, { createContext, useState, useEffect } from 'react';
import { getDrivers, createDriver, deleteDriver } from '../client/DriversEndpoints'; // Update the path as necessary

const DriverContext = createContext();

const DriverProvider = ({ children }) => {
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        try {
            const data = await getDrivers();
            setDrivers(data);
        } catch (error) {
            console.error('Error fetching drivers:', error);
        }
    };

    const addDriver = async (driver) => {
        try {
            const newDriver = await createDriver(driver);
            setDrivers([...drivers, newDriver]);
        } catch (error) {
            console.error('Error creating driver:', error);
        }
    };

    const removeDriver = async (id) => {
        try {
            await deleteDriver(id);
            setDrivers(drivers.filter(driver => driver.id !== id));
        } catch (error) {
            console.error(`Error deleting driver with ID ${id}:`, error);
        }
    };

    return (
        <DriverContext.Provider value={{ drivers, addDriver, removeDriver, fetchDrivers }}>
            {children}
        </DriverContext.Provider>
    );
};

export { DriverContext, DriverProvider };
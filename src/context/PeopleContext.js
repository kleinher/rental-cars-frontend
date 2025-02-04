import React, { createContext, useState, useEffect } from 'react';
import DriversEndpoints from '../client/DriversEndpoints';
import MechanicsEndpoints from '../client/MechanicsEndpoints';

const PeopleContext = createContext();

const PeopleProvider = ({ children }) => {
    const [drivers, setDrivers] = useState([]);
    const [mechanics, setMechanics] = useState([]);

    useEffect(() => {
        fetchDrivers();
        fetchMechanics();
    }, []);

    // Drivers methods
    const fetchDrivers = async () => {
        try {
            const data = await DriversEndpoints.getDrivers();
            setDrivers(data);
        } catch (error) {
            console.error('Error fetching drivers:', error);
        }
    };

    const addDriver = async (driver) => {
        try {
            const newDriverId = await DriversEndpoints.createDriver(driver);
            const newDriver = { id: newDriverId, ...driver };
            setDrivers([...drivers, newDriver]);
        } catch (error) {
            console.error('Error creating driver:', error);
        }
    };

    const removeDriver = async (id) => {
        try {
            await DriversEndpoints.deleteDriver(id);
            setDrivers(drivers.filter(driver => driver.id !== id));
        } catch (error) {
            console.error(`Error deleting driver with ID ${id}:`, error);
        }
    };

    const updateDriver = async (id, updatedDriver) => {
        try {
            await DriversEndpoints.updateDriver(id, updatedDriver);
            setDrivers(drivers.map(driver => driver.id === id ? { ...driver, ...updatedDriver } : driver));
        } catch (error) {
            console.error(`Error updating driver with ID ${id}:`, error);
        }
    };

    // Mechanics methods
    const fetchMechanics = async () => {
        try {
            const data = await MechanicsEndpoints.getMechanics();
            setMechanics(data);
        } catch (error) {
            console.error('Error fetching mechanics:', error);
        }
    };

    const addMechanic = async (mechanic) => {
        try {
            const newMechanicId = await MechanicsEndpoints.createMechanic(mechanic);
            const newMechanic = { id: newMechanicId, ...mechanic };
            setMechanics([...mechanics, newMechanic]);
        } catch (error) {
            console.error('Error creating mechanic:', error);
        }
    };

    const removeMechanic = async (id) => {
        try {
            await MechanicsEndpoints.deleteMechanic(id);
            setMechanics(mechanics.filter(mechanic => mechanic.id !== id));
        } catch (error) {
            console.error(`Error deleting mechanic with ID ${id}:`, error);
        }
    };

    const updateMechanic = async (id, updateMechanic) => {
        try {
            await MechanicsEndpoints.updateMechanic(id, updateMechanic);
            setMechanics(mechanics.map(mechanic => mechanic.id === id ? { ...mechanic, ...updateMechanic } : mechanic));
        } catch (error) {
            console.error(`Error updating mechanic with ID ${id}:`, error);
        }
    };

    return (
        <PeopleContext.Provider value={{
            drivers,
            mechanics,
            updateDriver,
            addDriver,
            removeDriver,
            fetchDrivers,
            updateMechanic,
            addMechanic,
            removeMechanic,
            fetchMechanics
        }}>
            {children}
        </PeopleContext.Provider>
    );
};

export { PeopleContext, PeopleProvider };
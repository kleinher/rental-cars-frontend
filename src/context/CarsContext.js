import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const CarsContext = createContext();

// Create a provider component
export const CarsProvider = ({ children }) => {
    const [cars, setCars] = useState([]);
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:4000');

        setWs(socket);

        socket.onopen = () => {
            console.log('Conectado al WebSocket');
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);

            console.log('Actualización recibida del servidor:', data);

            setCars(data);
        };

        socket.onclose = () => {
            console.log('Conexión WebSocket cerrada');
        };

        socket.onerror = (error) => {
            console.error('Error en WebSocket:', error);
        };

        return () => {
            socket.close();
        };
    }, []);

    const addCar = (car) => {
        setCars([...cars, car]);

    };

    const removeCar = (carId) => {
        setCars(cars.filter(car => car.id !== carId));

    };

    const updateCar = (updatedCar) => {
        setCars(cars.map(car => (car.id === updatedCar.id ? updatedCar : car)));

    };

    const updateReminderSent = (carId, reminderSent) => {
        setCars(cars.map(car => (car.licensePlate === carId ? { ...car, reminderSent, reminderSentDate: new Date() } : car)));

    };

    const updateCarMaintenanceStatus = (licensePlate) => {
        setCars(cars.map(car => (car.licensePlate === licensePlate ? { ...car, inMaintenance: false } : car)));

    };

    return (
        <CarsContext.Provider
            value={{
                cars,
                addCar,
                removeCar,
                updateCar,
                updateReminderSent,
                updateCarMaintenanceStatus,
            }}
        >
            {children}
        </CarsContext.Provider>
    );
};

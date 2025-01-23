import React, { createContext, useState, useEffect } from 'react';
import { carEndMaintainance } from '../client/carsEndpoint';
// Create the context
export const CarsContext = createContext();

// Create a provider component
export const CarsProvider = ({ children }) => {
    const [cars, setCars] = useState([]);
    const [ws, setWs] = useState(null);
    const [qr, setQr] = useState(null); // Estado para el QR
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:4000');

        setWs(socket);

        socket.onopen = () => {
            console.log('Conectado al WebSocket');
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Mensaje recibido:', data);

            if (data.type === 'qr') {
                setQr(data.qr); // Actualiza el QR recibido
                setValidated(false); // Asegúrate de que no esté validado
            } else if (data.type === 'validated') {
                setValidated(data.value);
            } else if (data.type === 'cars') {
                setCars(data.cars);
            }
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
        carEndMaintainance(licensePlate);

    };

    return (
        <CarsContext.Provider
            value={{
                qr, validated,
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

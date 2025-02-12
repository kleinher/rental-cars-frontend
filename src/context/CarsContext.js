import React, { createContext, useState, useEffect } from 'react';
import { carEndMaintainance } from '../client/carsEndpoint';
import { createCar, updateCar } from '../client/carsEndpoint';

// Create the context
export const CarsContext = createContext();
// Create a provider component
export const CarsProvider = ({ children }) => {
    const [cars, setCars] = useState([]);
    const [qr, setQr] = useState(null); // Estado para el QR
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:4000');

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

    const addCar = async (newEntry) => {
        const response = await createCar(newEntry)
        if (response) {
            newEntry = {
                id: response.id,
                ...newEntry
            }
            setCars([...cars, newEntry]);
        }

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

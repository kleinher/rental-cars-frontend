import React, { createContext, useState, useEffect } from 'react';
import { carEndMaintainance } from '../client/CarEndpoint';
import CarEndpoint from '../client/CarEndpoint';

const REACT_APP_WS_URL = process.env.REACT_APP_WS_URL;
export const CarsContext = createContext();
// Create a provider component
export const CarsProvider = ({ children }) => {
    const [cars, setCars] = useState([]);
    const [qr, setQr] = useState(null); // Estado para el QR
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        const socket = new WebSocket(REACT_APP_WS_URL);

        socket.onopen = () => {
            console.log('Conectado al WebSocket');
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Mensaje recibido:', data);

            if (data.type === 'qr') {
                setQr(data.qr);
                console.log('QR recibido', data);
                setValidated(false);
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
        const response = await CarEndpoint.createCar(newEntry)
        if (response) {
            newEntry = {
                id: response.id,
                ...newEntry
            }
            setCars([...cars, newEntry]);
        }

    };

    const removeCar = (carId) => {
        CarEndpoint.deleteCar(carId);
        setCars(cars.filter(car => car.id !== carId));

    };

    const updateCar = async (id, data) => {
        const response = await CarEndpoint.updateCar(id, data);
        if (response) {
            setCars(cars.map(car => (car.id === id ? { ...car, ...data } : car)));
        }
    };

    const updateReminderSent = (carId, reminderSent) => {
        setCars(cars.map(car => (car.licencePlate === carId ? { ...car, reminderSent: reminderSent, reminderSentDate: new Date() } : car)));
    };

    const updateCarMaintenanceStatus = (licencePlate) => {
        CarEndpoint.carEndMaintainance(licencePlate);

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

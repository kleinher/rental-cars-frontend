// MechanicForm.jsx
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import CityAutocomplete from '../mechanic/CityAutocomplete';
import { createDriver } from '../../client/DriversEndpoints';

function CommonForm({ handleClose }) {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [location, setLocation] = useState({
        address: '',
        latitude: null,
        longitude: null,
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        const newMechanic = {
            name,
            phoneNumber,
            latitude: location.latitude,
            longitude: location.longitude,
        };

        createDriver(newMechanic);

        // Reseteamos
        setName('');
        setPhoneNumber('');
        setLocation({ address: '', latitude: null, longitude: null });
        handleClose();
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,           // separa los elementos con espacio
                maxWidth: 600,    // ancho máximo para el formulario
                margin: '10px'  // centrar horizontalmente
            }}
        >
            <Typography variant="h6">Agregar Mecánico</Typography>

            <TextField
                label="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <TextField
                label="Teléfono"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
            />

            <Box>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Ciudad
                </Typography>

                <CityAutocomplete onSelectCity={(data) => setLocation(data)} />
            </Box>

            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button type="submit" color="primary">
                Save
            </Button>
        </Box>
    );
}

export default CommonForm;


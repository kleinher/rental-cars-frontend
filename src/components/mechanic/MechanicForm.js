// MechanicForm.jsx
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import CityAutocomplete from './CityAutocomplete';

function MechanicForm({ onAddMechanic }) {
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
            city: location.address,
            latitude: location.latitude,
            longitude: location.longitude,
        };
        onAddMechanic(newMechanic);

        // Reseteamos
        setName('');
        setPhoneNumber('');
        setLocation({ address: '', latitude: null, longitude: null });
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

        </Box>
    );
}

export default MechanicForm;


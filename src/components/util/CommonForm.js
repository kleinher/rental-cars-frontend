// MechanicForm.jsx
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import CityAutocomplete from '../mechanic/CityAutocomplete';

function CommonForm({ handleClose, createFunction }) {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [location, setLocation] = useState({
        address: '',
        latitude: null,
        longitude: null,
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newEntry = {
            name,
            phoneNumber,
            address: location.address,
            latitude: location.latitude,
            longitude: location.longitude,
        };

        const response = await createFunction(newEntry);
        if (response) {
            alert('Entrada creada correctamente');
        }
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
                <CityAutocomplete onSelectCity={(data) => setLocation(data)} />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button type="submit" color="primary">
                    Save
                </Button>
            </Box>
        </Box>
    );
}

export default CommonForm;


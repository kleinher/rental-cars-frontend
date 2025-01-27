// CityAutocomplete.jsx
import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

// Importes de MUI
import { TextField, Box, Paper, MenuItem, Typography } from '@mui/material';

function CityAutocomplete({ onSelectCity }) {
    const [address, setAddress] = useState('');

    const handleChange = (value) => {
        setAddress(value);
    };

    const handleSelect = async (value) => {
        setAddress(value);
        try {
            // 1. Hacemos geocode para obtener info detallada
            const results = await geocodeByAddress(value);
            // 2. Obtenemos lat y lng
            const { lat, lng } = await getLatLng(results[0]);

            // 3. Llamamos la función que recibimos por props
            onSelectCity({
                address: value,
                latitude: lat,
                longitude: lng,
            });
        } catch (error) {
            console.error('Error al obtener coordenadas:', error);
        }
    };

    return (
        <PlacesAutocomplete
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}
            // Restringir a ciudades: solo sugiere ciudades
            searchOptions={{ types: ['(cities)'] }}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <Box sx={{ position: 'relative' }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Ciudad"
                        {...getInputProps({
                            placeholder: 'Escribe tu ciudad...',
                        })}
                    />

                    {suggestions.length > 0 && (
                        <Paper
                            square
                            sx={{
                                position: 'absolute',
                                width: '100%',
                                zIndex: 999,
                                mt: 0.5, // pequeño margen arriba
                            }}
                        >
                            {loading && (
                                <Box sx={{ p: 2 }}>
                                    <Typography variant="body2">Cargando...</Typography>
                                </Box>
                            )}
                            {suggestions.map((suggestion, index) => {
                                const isActive = suggestion.active;
                                return (
                                    <MenuItem
                                        key={index}
                                        {...getSuggestionItemProps(suggestion)}
                                        sx={{
                                            backgroundColor: isActive ? 'action.hover' : 'inherit',
                                        }}
                                    >
                                        {suggestion.description}
                                    </MenuItem>
                                );
                            })}
                        </Paper>
                    )}
                </Box>
            )}
        </PlacesAutocomplete>
    );
}

export default CityAutocomplete;

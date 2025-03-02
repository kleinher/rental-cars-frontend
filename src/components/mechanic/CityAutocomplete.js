// CityAutocomplete.jsx
import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

// Importes de MUI
import { TextField, Box, Paper, MenuItem, Typography } from '@mui/material';

function CityAutocomplete({ addressParam, onSelectCity, label = 'Ciudad', required = true, variant = 'outlined' }) {
    const [address, setAddress] = useState(addressParam);

    const handleChange = (value) => {
        setAddress(value);
    };

    const handleSelect = async (value) => {
        setAddress(value);
        try {
            const results = await geocodeByAddress(value);
            const { lat, lng } = await getLatLng(results[0]);

            const formattedAddress = results[0].formatted_address;

            onSelectCity({
                address: formattedAddress,
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
            searchOptions={{ types: ['(cities)'] }}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <Box sx={{ position: 'relative' }}>
                    <TextField
                        required={required}
                        fullWidth
                        variant={variant}
                        label={label}
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

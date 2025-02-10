import React, { useState, useContext } from 'react';
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { PeopleContext } from '../../context/PeopleContext';
import CityAutocomplete from '../mechanic/CityAutocomplete';
import { createCar, updateCar } from '../../client/carsEndpoint';

function CarForm({ datos, handleClose }) {
    const { drivers } = useContext(PeopleContext);
    const [licencePlate, setLicencePlate] = useState(datos ? datos.licencePlate : '');
    const [kilometers, setKilometers] = useState(datos ? datos.kilometers : '');
    const [location, setLocation] = useState({
        address: datos ? datos.address : '',
        latitude: datos ? datos.latitude : null,
        longitude: datos ? datos.longitude : null,
    });
    const [estMaintainance, setEstMaintainance] = useState(datos ? datos.estMaintainance : '');
    const [lastUpdate, setLastUpdate] = useState(datos ? datos.lastUpdate : '');
    const [driverId, setDriverId] = useState(datos ? datos.driverId : '');
    const [inMaintenance, setInMaintenance] = useState(datos ? datos.inMaintenance : false);
    const [lastMaintainance, setLastMaintainance] = useState(datos ? datos.lastMaintainance : '');
    const id = datos ? datos.id : null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newEntry = {
            licencePlate,
            kilometers,
            address: location.address,
            latitude: location.latitude,
            longitude: location.longitude,
            estMaintainance,
            lastUpdate,
            driverId,
            inMaintenance,
            lastMaintainance,
        };

        const response = id ? await updateCar(id, newEntry) : await createCar(newEntry);
        if (response) {
            alert('Entrada creada correctamente');
        }
        // Reseteamos
        setLicencePlate('');
        setKilometers('');
        setLocation({ address: '', latitude: null, longitude: null });
        setEstMaintainance('');
        setLastUpdate('');
        setDriverId('');
        setInMaintenance(false);
        setLastMaintainance('');
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
                label="Matrícula"
                value={licencePlate}
                onChange={(e) => setLicencePlate(e.target.value)}
                required
            />

            <TextField
                label="Kilometros"
                value={kilometers}
                onChange={(e) => setKilometers(e.target.value)}
                required
            />

            <Box required>
                <CityAutocomplete addressParam={location.address} onSelectCity={(data) => setLocation(data)} />
            </Box>

            <FormControl fullWidth>
                <InputLabel>Driver</InputLabel>
                <Select
                    value={driverId}
                    label="Driver"
                    onChange={(e) => setDriverId(e.target.value)}
                >
                    {drivers.map((driver) => (
                        <MenuItem key={driver.id} value={driver.id}>
                            {driver.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

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

export default CarForm;


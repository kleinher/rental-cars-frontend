import React, { useState } from "react";
import { cars } from "./Data";
import { Box, Card, CardContent, Typography, TextField, Button } from "@mui/material";

const UserProfile = ({ userId }) => {
    const [kilometers, setKilometers] = useState("");
    const userCar = cars.find((car) => car.id === userId);

    const handleUpdate = () => {
        alert(`Kilómetros actualizados a: ${kilometers}`);
        setKilometers(""); // Limpia el input después de actualizar
    };

    return (
        <Box sx={{ p: 4 }}>
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>Perfil del Usuario</Typography>
                    <Typography variant="body1">Coche asignado: {userCar.model}</Typography>
                    <Typography variant="body1">Kilómetros actuales: {userCar.kilometers}</Typography>
                    <TextField
                        label="Actualizar kilómetros"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={kilometers}
                        onChange={(e) => setKilometers(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleUpdate}>
                        Actualizar Kilómetros
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default UserProfile;


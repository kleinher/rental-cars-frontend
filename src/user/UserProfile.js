import React, { useState } from "react";
import { Box, CardContent, Typography, Button, Grid2, Dialog, DialogContent, DialogActions, TextField } from "@mui/material";
import carLogo from "../files/car.png";
import { cars } from "../Data";

const styles = {
    container: {
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    gridContainer: {
        justifyContent: "center",
    },
    button: {
        display: "flex",
        flexDirection: "column",
        width: "120px",
        height: "120px",
        fontWeight: "bold",
        fontSize: "1.2rem",
        fontFamily: "Arial, sans-serif",
    },
    carImage: {
        width: "100%",
        height: "40%",
        backgroundColor: "transparent",
    },
};

const UserProfile = ({ userId }) => {
    const [open, setOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [newKm, setNewKm] = useState("");

    const userCars = cars.filter((car) => car.userId === userId);

    const handleOpen = (car) => {
        setSelectedCar(car);
        setNewKm("");
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedCar(null);
        setNewKm("");
    };

    const handleSave = () => {
        console.log(`Coche: ${selectedCar.id}, KM: ${newKm}`);
        // Aquí puedes actualizar el estado global o enviar los datos al backend
        setOpen(false);
    };

    return (
        <Box sx={styles.container}>
            <Typography variant="h5" gutterBottom>Pedro Enrique Conqui</Typography>

            <CardContent>
                <Grid2 container spacing={2} sx={styles.gridContainer}>
                    {userCars.map((car) => (
                        <Grid2 xs={6} key={car.id}>
                            <Button
                                variant="outlined"
                                sx={styles.button}
                                onClick={() => handleOpen(car)}
                            >
                                <img src={carLogo} alt={car.licensePlate} style={styles.carImage} />
                                {car.licensePlate}
                            </Button>
                        </Grid2>
                    ))}
                </Grid2>
            </CardContent>

            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <Typography variant="h6" gutterBottom>
                            Modificar kilómetros del coche:
                        </Typography>
                        <Typography variant="h6" color="primary" gutterBottom>
                            {selectedCar?.licensePlate}
                        </Typography>
                    </Box>
                    <TextField
                        fullWidth
                        label="Kilómetros"
                        value={newKm}
                        onChange={(e) => setNewKm(e.target.value)}
                        type="number"
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={handleSave} color="primary" variant="contained">
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UserProfile;

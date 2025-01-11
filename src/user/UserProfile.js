import React, { useState } from "react";
import { Box, Typography, CardContent } from "@mui/material";
import CarGrid from "./CarGrid";
import CarDialog from "./CarDialog";
import { cars } from "../Data";

const styles = {
    container: {
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
        setOpen(false);
    };

    return (
        <Box sx={styles.container}>
            <Typography variant="h5" gutterBottom>Pedro Enrique Conqui</Typography>
            <CardContent>
                <CarGrid cars={userCars} onCarClick={handleOpen} />
            </CardContent>
            <CarDialog
                open={open}
                car={selectedCar}
                newKm={newKm}
                onClose={handleClose}
                onSave={handleSave}
                onKmChange={setNewKm}
            />
        </Box>
    );
};

export default UserProfile;

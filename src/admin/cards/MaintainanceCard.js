import React from "react";
import { Card, CardContent, Typography, Box, Grid2 } from "@mui/material";
import MaintainanceButton from "../buttons/MaintainanceButton";

const CarCard = ({ car }) => {
    const styles = {
        card: {
            margin: 1,
            padding: 2,
            borderRadius: 2,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
        },
    };

    return (
        <Card sx={styles.card}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ marginRight: 4 }}>
                    <Typography variant="h6" fontWeight="bold"> {car.licensePlate}</Typography>
                    <Typography variant="body2">Usuario: {car.user}</Typography>
                    <Typography variant="body2">Kilómetros: {car.kilometers}</Typography>
                </Box>
                <Grid2 container spacing={1} item xs={12} sx={{ flexDirection: 'column', justifyContent: 'center' }}>
                    <MaintainanceButton phoneNumber={car.phoneNumber} licencePlate={car.licensePlate} />
                </Grid2>
            </CardContent>
        </Card>
    );
};

export default CarCard;

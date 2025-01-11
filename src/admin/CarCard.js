import React from "react";
import { Card, CardContent, Typography, Box, Button, Grid2 } from "@mui/material";
import { formatDistanceStrict, differenceInDays, differenceInMonths } from "date-fns";
import { useState } from "react";
import SendButton from "./SendButton";

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

    const calculateRelativeDate = (dateString) => {
        const updatedDate = new Date(dateString);
        const today = new Date();

        const months = differenceInMonths(today, updatedDate);
        const days = differenceInDays(today, updatedDate) - months * 30;

        if (months >= 1) {
            return `${months} mes${months > 1 ? "es" : ""} y ${days} día${days !== 1 ? "s" : ""}`;
        } else {
            return `${days} día${days !== 1 ? "s" : ""}`;
        }
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
                    <Typography variant="body2" color="text.secondary">
                        Última actualización: hace {calculateRelativeDate(car.lastUpdated)}
                    </Typography>
                    <SendButton />
                </Grid2>
            </CardContent>
        </Card>
    );
};

export default CarCard;

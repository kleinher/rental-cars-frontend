import React from "react";
import { Card, CardContent, Typography, Box, Grid2 } from "@mui/material";
import { differenceInDays, differenceInMonths } from "date-fns";
import ResendButton from "../buttons/ResendButton";

const ReminderCard = ({ car }) => {
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
            return `Aviso enviado hace: ${months} mes${months > 1 ? "es" : ""} y ${days} día${days !== 1 ? "s" : ""}`;
        }
        if (days >= 1) {
            return `Aviso enviado hace: ${days} día${days !== 1 ? "s" : ""}`;
        }
        return "Aviso enviado hoy";
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
                        {calculateRelativeDate(car.reminderSentDate)}
                    </Typography>
                    <ResendButton phoneNumber={car.phoneNumber} licencePlate={car.licensePlate} />
                </Grid2>
            </CardContent>
        </Card>
    );
};

export default ReminderCard;

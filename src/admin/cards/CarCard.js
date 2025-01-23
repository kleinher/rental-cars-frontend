import React from "react";
import { Card, CardContent, Typography, Box, Grid2 } from "@mui/material";
import { differenceInDays, differenceInMonths } from "date-fns";
import SendButton from "../buttons/SendButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const CarCard = ({ car }) => {
    const theme = createTheme({
        typography: {
            subtitle1: {
                fontSize: 13,

            },
        },
    });

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
        if (dateString === null) {
            return "nunca";
        }

        const updatedDate = new Date(dateString);
        const today = new Date();

        const months = differenceInMonths(today, updatedDate);
        const days = differenceInDays(today, updatedDate) - months * 30;

        if (months >= 1) {
            return `hace ${months} mes${months > 1 ? "es" : ""} y ${days} día${days !== 1 ? "s" : ""}`;
        } else if (days > 0) {
            return `hace ${days} día${days !== 1 ? "s" : ""}`;
        } else {
            return "hoy";
        }
    };

    const calculateRelativeFutureDate = (dateString) => {
        if (dateString === null) {
            return "sin datos";
        }

        const updatedDate = new Date(dateString);
        const today = new Date();

        const months = differenceInMonths(updatedDate, today);
        const days = differenceInDays(updatedDate, today) - months * 30;

        if (months >= 1) {
            return `dentro de ${months} mes${months > 1 ? "es" : ""} y ${days} día${days !== 1 ? "s" : ""}`;
        } else if (days > 0) {
            return `dentro de ${days} día${days !== 1 ? "s" : ""}`;
        } else {
            return "hoy";
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Card sx={styles.card}>
                <CardContent sx={{ display: 'flex' }}>
                    <Box sx={{ marginRight: 4 }}>
                        <Typography variant="h6" fontWeight="bold"> {car.licensePlate}</Typography>
                        <Typography variant="body2">Usuario: {car.user}</Typography>
                        <Typography variant="body2">Kilómetros: {car.kilometers}</Typography>

                    </Box>
                    <Grid2 container sx={{ marginLeft: 4 }}>
                        <Typography variant="subtitle1" color="text.secondary">
                            {`Último mantenimiento: ${calculateRelativeDate(car.lastMaintainance)}`}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {`Última actualización: ${calculateRelativeDate(car.lastUpdated)}`}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {`Mantenimiento estimado: ${calculateRelativeFutureDate(car.estMaintainance)}`}
                        </Typography>
                        <SendButton phoneNumber={car.phoneNumber} licencePlate={car.licensePlate} />
                    </Grid2>
                </CardContent>
            </Card>
        </ThemeProvider >
    );
};

export default CarCard;

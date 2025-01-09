import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { formatDistanceStrict, differenceInDays, differenceInMonths } from "date-fns";
import { useState } from "react";

const CarCard = ({ car }) => {
    const styles = {

        card: {
            border: "1px solid",
            borderColor: "grey.500",
        },
    };

    const calculateRelativeDate = (dateString) => {
        const updatedDate = new Date(dateString);
        const today = new Date();

        const months = differenceInMonths(today, updatedDate);
        const days = differenceInDays(today, updatedDate) - months * 30; // Ajusta los días restantes

        if (months >= 1) {
            return `${months} mes${months > 1 ? "es" : ""} y ${days} día${days !== 1 ? "s" : ""}`;
        } else {
            return `${days} día${days !== 1 ? "s" : ""}`;
        }
    };

    const [buttonText, setButtonText] = useState("Enviar recordatorio");
    const [buttonColor, setButtonColor] = useState("primary");

    const handleButtonClick = () => {
        setButtonText("Reenviar recordatorio");
        setButtonColor("secondary");
    };

    return (
        <Card sx={styles.card}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ marginRight: 4 }}>
                    <Typography variant="h6" fontWeight="bold"> {car.licensePlate}</Typography>
                    <Typography variant="body2">Usuario: {car.user}</Typography>
                    <Typography variant="body2">Kilómetros: {car.kilometers}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', width: '50%' }}>
                    <Typography variant="body2" color="text.secondary">
                        Última actualización: hace {calculateRelativeDate(car.lastUpdated)}
                    </Typography>
                    <Button variant='contained' color={buttonColor} sx={{ alignSelf: 'flex-end', padding: '0 8px' }} onClick={handleButtonClick}>
                        {buttonText}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CarCard;

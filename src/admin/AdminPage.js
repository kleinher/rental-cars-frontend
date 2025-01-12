import React, { useContext } from "react";
import { Box, ThemeProvider } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import CarList from "./CarList";
import { CarsContext } from "../context/CarsContext";

const AdminPage = () => {
    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    const { cars } = useContext(CarsContext);

    const reminderSentFalse = cars.filter(car => !car.reminderSent);
    const reminderSentTrue = cars.filter(car => car.reminderSent);
    const service = cars.filter(car => car.service);

    const styles = {
        container: {
            display: "flex",
            flexDirection: "row",
            margin: "0px",
        },
        card: {
            border: "1px solid",
            borderColor: "grey.500",
        },
        list: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "5px",
            marginLeft: "10px", // Horizontal margin
            marginRight: "10px", // Horizontal margin
        },
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={styles.container}>
                <CarList cars={reminderSentFalse} title="Coches" />
                <CarList cars={reminderSentTrue} title="Aviso enviado" />
                <CarList cars={service} title="Mantenimiento" />
            </Box>
        </ThemeProvider >
    );
};

export default AdminPage;

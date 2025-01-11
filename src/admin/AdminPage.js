import React from "react";
import { cars, pending, service } from "../Data";
import { Box, Typography, ThemeProvider, Grid2 } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import CarList from "./CarList";

const AdminPage = () => {
    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    const sortedCars = [...cars].sort((a, b) => new Date(a.lastUpdated) - new Date(b.lastUpdated));

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
                <CarList cars={sortedCars} title="Coches" />
                <CarList cars={pending} title="Aviso enviado" />
                <CarList cars={service} title="Mantenimiento" />
            </Box>
        </ThemeProvider >
    );
};

export default AdminPage;

import React from "react";
import { cars } from "../Data";
import { Box, Typography, ThemeProvider } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import CarList from "./CarList";

const AdminPage = () => {
    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    const sortedCars = [...cars].sort((a, b) => new Date(a.lastUpdated) - new Date(b.lastUpdated));

    const styles = {
        container: {
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "calc(100vh - 128px)",
        },
        card: {
            border: "1px solid",
            borderColor: "grey.500",
        },
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={styles.container}>
                <Typography style={{ fontFamily: 'Arial, sans-serif', fontWeight: "bold" }} variant="h4" gutterBottom>
                    Lista de Coches
                </Typography>
                <CarList cars={sortedCars} />
            </Box>
        </ThemeProvider>
    );
};

export default AdminPage;

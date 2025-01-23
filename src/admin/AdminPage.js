import React, { useContext } from "react";
import { Box, ThemeProvider, Grid2, CircularProgress, IconButton } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import CarList from "./CarList";
import { CarsContext } from "../context/CarsContext";
import CarCard from "./cards/CarCard";
import ReminderCard from "./cards/ReminderCard";
import MaintainanceCard from "./cards/MaintainanceCard";
import LoginIcon from '@mui/icons-material/Login';

const AdminPage = () => {
    const { qr, validated } = useContext(CarsContext);
    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    const { cars } = useContext(CarsContext);

    const normalCars = cars
        .filter(car => !car.reminderSent && !car.inMaintenance)
        .sort((a, b) => a.estMaintainance === null ? 1 : new Date(a.estMaintainance) - new Date(b.estMaintainance));
    const reminderSentCars = cars
        .filter(car => car.reminderSent)
        .sort((a, b) => new Date(b.reminderSentDate) - new Date(a.reminderSentDate));
    const inMaintenanceCars = cars.filter(car => car.inMaintenance);

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
        <Box>
            {
                validated ? (
                    <ThemeProvider theme={theme} >
                        <Box sx={styles.container}>
                            <CarList title="Coches" >
                                {normalCars.map((car) => (
                                    <Grid2 sx={{ width: "100%" }} item xs={12} key={car.id}>
                                        <CarCard car={car} />
                                    </Grid2>
                                ))}
                            </CarList>
                            <CarList title="Aviso enviado" >
                                {reminderSentCars.map((car) => (
                                    <Grid2 sx={{ width: "100%" }} item xs={12} key={car.id}>
                                        <ReminderCard car={car} />
                                    </Grid2>
                                ))}
                            </CarList>
                            <CarList title="Mantenimiento" >
                                {inMaintenanceCars.map((car) => (
                                    <Grid2 sx={{ width: "100%" }} item xs={12} key={car.id}>
                                        <MaintainanceCard car={car} />
                                    </Grid2>
                                ))}
                            </CarList>
                        </Box>
                    </ThemeProvider >
                ) : qr ? (
                    <div>
                        <h1>Escanea este QR:</h1>
                        <img src={qr} alt="QR Code" />
                    </div>
                ) : (
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <IconButton color="primary" size="large">
                            <LoginIcon fontSize="large" />
                        </IconButton>
                        <CircularProgress style={{ marginTop: '10px' }} />
                    </Box>
                )}
        </Box>
    );
};

export default AdminPage;

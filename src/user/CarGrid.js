import React from "react";
import { Grid2, Button } from "@mui/material";
import carLogo from "../files/car.png";

const styles = {
    gridContainer: {
        justifyContent: "center",
    },
    button: {
        display: "flex",
        flexDirection: "column",
        width: "120px",
        height: "120px",
        fontWeight: "bold",
        fontSize: "1.2rem",
        fontFamily: "Arial, sans-serif",
    },
    carImage: {
        width: "100%",
        height: "40%",
        backgroundColor: "transparent",
    },
};

const CarGrid = ({ cars, onCarClick }) => {
    return (
        <Grid2 container spacing={2} sx={styles.gridContainer}>
            {cars.map((car) => (
                <Grid2 xs={6} key={car.id}>
                    <Button
                        variant="outlined"
                        sx={styles.button}
                        onClick={() => onCarClick(car)}
                    >
                        <img src={carLogo} alt={car.licensePlate} style={styles.carImage} />
                        {car.licensePlate}
                    </Button>
                </Grid2>
            ))}
        </Grid2>
    );
};

export default CarGrid;

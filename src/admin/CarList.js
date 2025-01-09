import React from "react";
import { Grid2 } from "@mui/material";
import CarCard from "./CarCard";

const CarList = ({ cars }) => {
    const styles = {
        gridContainer: {
            flexDirection: "row",
        }
    };

    return (
        <Grid2 container spacing={1} sx={styles.gridContainer}>
            {cars.map((car) => (
                <Grid2 sx={{ width: "100%" }} item xs={12} key={car.id}>
                    <CarCard car={car} styles={styles} />
                </Grid2>
            ))}
        </Grid2>);
};

export default CarList;

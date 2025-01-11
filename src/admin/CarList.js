import React from "react";
import { Grid2, Box, Typography } from "@mui/material";
import CarCard from "./CarCard";

const CarList = ({ cars, title }) => {
    const styles = {
        list: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "5px",
            marginLeft: "10px", // Horizontal margin
            marginRight: "10px", // Horizontal margin
            border: "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
        gridContainer: {
            overflowY: "auto",
            maxHeight: "calc(100vh - 110px)",
            flexDirection: "row",
        },
    };

    return (
        <Box sx={styles.list}>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <Grid2 spacing={1} sx={styles.gridContainer}>
                {cars.map((car) => (
                    <Grid2 sx={{ width: "100%" }} item xs={12} key={car.id}>
                        <CarCard car={car} />
                    </Grid2>
                ))}
            </Grid2>
        </Box>);
};

export default CarList;

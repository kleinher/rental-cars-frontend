import React from "react";
import { Grid2, Box, Typography } from "@mui/material";
import CarCard from "./CarCard";

const CarList = ({ cars, title, CardComponent }) => {
    const styles = {
        list: {
            margin: "5px",
            marginLeft: "10px", // Horizontal margin
            marginRight: "10px", // Horizontal margin
            border: "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            width: "98%",
        },
        gridContainer: {
            overflowY: "auto",
            height: "calc(100vh - 115px)",
            flexDirection: "row",

        },
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "calc(100vh - 110px)",
            width: "100%",
        },
    };

    return (
        <Box sx={styles.container}>
            <Typography variant="h6" gutterBottom >
                {title}
            </Typography>
            <Box sx={styles.list}>

                <Grid2 spacing={1} sx={styles.gridContainer}>
                    {cars.map((car) => (
                        <Grid2 sx={{ width: "100%" }} item xs={12} key={car.id}>
                            <CarCard car={car} />
                        </Grid2>
                    ))}
                </Grid2>
            </Box>
        </Box>);
};

export default CarList;

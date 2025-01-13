import React from "react";
import { Grid2, Box, Typography } from "@mui/material";

const CarList = ({ title, children }) => {
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
                    {children}
                </Grid2>
            </Box>
        </Box>);
};

export default CarList;

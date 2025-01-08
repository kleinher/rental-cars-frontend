import React, { useState } from "react";
import { cars } from "../Data";
import { Box, Card, CardContent, Typography, TextField, Button, Grid2 } from "@mui/material";


const UserProfile = ({ userId }) => {
    const userCars = cars.filter((car) => car.userId === userId);

    return (
        <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h5" gutterBottom>Pedro Enrique Conqui</Typography>
                    <Grid2 container spacing={2}>
                        {userCars.map((car) => (
                            <Grid2 item xs={12} key={car.id}>
                                <Button variant="outlined" fullWidth sx={{ height: '100px' }}>
                                    {car.licensePlate}
                                </Button>
                            </Grid2>
                        ))}
                    </Grid2>
                </CardContent>
            </Card>
        </Box>
    );
};

export default UserProfile;

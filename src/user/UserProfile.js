import { cars } from "../Data";
import { Box, CardContent, Typography, Button, Grid2 } from "@mui/material";
import carLogo from "../files/car.png";

const styles = {
    container: {
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
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

const UserProfile = ({ userId }) => {
    const userCars = cars.filter((car) => car.userId === userId);

    return (
        <Box sx={styles.container}>
            <Typography variant="h5" gutterBottom>Pedro Enrique Conqui</Typography>

            <CardContent>
                <Grid2
                    container
                    spacing={2}
                    sx={styles.gridContainer}
                >
                    {userCars.map((car) => (
                        <Grid2 xs={6} key={car.id} >
                            <Button
                                variant="outlined"
                                sx={styles.button}
                            >
                                <img src={carLogo} alt={car.licensePlate} style={styles.carImage} />
                                {car.licensePlate}
                            </Button>
                        </Grid2>
                    ))}
                </Grid2>
            </CardContent>
        </Box>
    );
};

export default UserProfile;

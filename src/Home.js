import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Box, CircularProgress, IconButton } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useContext } from 'react';
import { CarsContext } from './context/CarsContext';
const Home = () => {
    const navigate = useNavigate();
    const { qr, validated } = useContext(CarsContext);

    const navigateToAdmin = () => {
        navigate('/admin');
    };

    const navigateToUser = () => {
        navigate('/user');
    };


    return (
        <Container>
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                {validated ? (
                    <div>
                        <h1>QR Validado</h1>
                        <Button variant="contained" onClick={navigateToAdmin} style={{ margin: '0 10px' }}>
                            Admin
                        </Button>
                        <Button variant="contained" onClick={navigateToUser} style={{ margin: '0 10px' }}>
                            User
                        </Button>
                    </div>
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
        </Container>
    );
};

export default Home;

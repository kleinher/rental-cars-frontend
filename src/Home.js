import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Box } from '@mui/material';

const Home = () => {
    const navigate = useNavigate();

    const navigateToAdmin = () => {
        navigate('/admin');
    };

    const navigateToUser = () => {
        navigate('/user');
    };

    return (
        <Container>
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Button variant="contained" color="primary" onClick={navigateToAdmin} style={{ margin: '0 10px' }}>
                    Admin
                </Button>
                <Button variant="contained" color="secondary" onClick={navigateToUser} style={{ margin: '0 10px' }}>
                    User
                </Button>
            </Box>
        </Container>
    );
};

export default Home;

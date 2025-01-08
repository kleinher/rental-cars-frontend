import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./admin/AdminPage";
import UserProfile from "./UserProfile";
import { Container, AppBar, Toolbar, Typography } from "@mui/material";
import logo from "./files/logo.png";

const App = () => {
    return (
        <Router>
            <AppBar position="absolute" style={{ width: '100%' }}>
                <Toolbar>
                    <img src={logo} alt="Logo" style={{ marginRight: 14, width: 80, height: 65, padding: '5px' }} />
                    <Typography variant="h6" style={{ fontFamily: 'Arial, sans-serif', fontWeight: "bold" }}>Rental Cars MVP</Typography>
                </Toolbar>
            </AppBar>
            <Toolbar /> {/* This is a spacer to push the content below the AppBar */}
            <Container>
                <Routes>
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/user" element={<UserProfile userId={1} />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;

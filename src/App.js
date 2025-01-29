import React from "react";
import { CarsProvider } from "./context/CarsContext";
import { DriverProvider } from "./context/DriverContext";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BuildIcon from '@mui/icons-material/Build';
import PersonIcon from '@mui/icons-material/Person';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Outlet } from 'react-router';
import logo from "./files/logo.png";

const NAVIGATION = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        title: 'Matenimiento',
        icon: <DashboardIcon />,
    },
    {
        segment: 'driver',
        title: 'Conductores',
        icon: <PersonIcon />,
    },
    {
        segment: 'mechanic',
        title: 'Mecanicos',
        icon: <BuildIcon />,
    },
    {
        segment: 'car',
        title: 'Coches',
        icon: <DirectionsCarIcon />,
    },
    {
        segment: 'new/admin',
        title: 'Panel de Admininstrador',
        icon: <AdminPanelSettingsIcon />,
    },


];

const BRANDING = {
    logo: (
        <img
            src={logo}
            alt="MUI logo"
            style={{ height: 35 }}
        />
    ),
    title: '',
};

const App = () => {
    return (

        <DriverProvider>
            <CarsProvider>
                <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
                    <Outlet />
                </ReactRouterAppProvider>
            </CarsProvider>
        </DriverProvider>
    );
};

export default App;

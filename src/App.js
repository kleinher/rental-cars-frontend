import React from "react";
import { CarsProvider } from "./context/CarsContext";
import BuildIcon from '@mui/icons-material/Build';
import PersonIcon from '@mui/icons-material/Person';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Outlet } from 'react-router';
import logo from "./files/logo.png";
import { PeopleProvider } from "./context/PeopleContext";

const NAVIGATION = [
    {
        kind: 'header',
        title: 'Menú',
    },
    {
        segment: 'new/admin',
        title: 'Panel de Admininstrador',
        icon: <AdminPanelSettingsIcon />,
    },
    {
        segment: 'driver',
        title: 'Conductores',
        icon: <PersonIcon />,
    },
    {
        segment: 'mechanic',
        title: 'Mecánicos',
        icon: <BuildIcon />,
    },
    {
        segment: 'car',
        title: 'Coches',
        icon: <DirectionsCarIcon />,
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

        <PeopleProvider>
            <CarsProvider>
                <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
                    <Outlet />
                </ReactRouterAppProvider>
            </CarsProvider>
        </PeopleProvider>
    );
};

export default App;

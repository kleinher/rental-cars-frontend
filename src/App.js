import React from "react";
import { CarsProvider } from "./context/CarsContext";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Outlet } from 'react-router';

const NAVIGATION = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        title: 'Admin',
        icon: <DashboardIcon />,
    },
    {
        segment: 'user',
        title: 'Users',
        icon: <ShoppingCartIcon />,
    },
];

const BRANDING = {
    title: 'My Toolpad Core App',
};

const App = () => {
    return (
        <CarsProvider>
            <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
                <Outlet />
            </ReactRouterAppProvider>
        </CarsProvider>
    );
};

export default App;

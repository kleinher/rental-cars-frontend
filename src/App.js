import React from "react";
import { CarsProvider } from "./context/CarsContext";
import { DriverProvider } from "./context/DriverContext";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
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
        segment: 'user',
        title: 'Users',
        icon: <ShoppingCartIcon />,
    },
    {
        segment: 'new/admin',
        title: 'New Admin Page',
        icon: <ShoppingCartIcon />,
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

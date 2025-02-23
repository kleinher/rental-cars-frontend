import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from 'react-router';
import "./index.css"; // Opcional, si estás usando estilos
import Layout from "./layouts/dashboard";
import DriversPage from "./pages/DriversPage";
import NewAdminPage from "./pages/new/NewAdmin";
import CarPage from "./pages/CarPage";
import MechanicPage from "./pages/MechanicPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
    {
        Component: App, // root layout route
        children: [
            {
                path: '/',
                Component: Layout,
                children: [
                    {
                        path: '',
                        Component: NewAdminPage,
                    },
                    {
                        path: 'driver',
                        Component: DriversPage,
                    },
                    {
                        path: 'mechanic',
                        Component: MechanicPage,
                    },
                    {
                        path: 'car',
                        Component: CarPage,
                    },
                    {
                        path: 'new/admin',
                        Component: NewAdminPage,
                    }
                ],
            },
        ],
    },
]);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

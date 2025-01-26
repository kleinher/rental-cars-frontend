import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from 'react-router';
import "./index.css"; // Opcional, si estás usando estilos
import Layout from "./layouts/dashboard";
import AdminPage from "./pages/admin";
import UserPage from "./pages/user";

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
                        Component: AdminPage,
                    },
                    {
                        path: 'User',
                        Component: UserPage,
                    },
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

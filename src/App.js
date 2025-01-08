import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./admin/AdminPage";
import UserProfile from "./UserProfile";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/user" element={<UserProfile userId={1} />} />
            </Routes>
        </Router>
    );
};

export default App;

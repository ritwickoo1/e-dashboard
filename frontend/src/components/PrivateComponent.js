import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
    const user = localStorage.getItem("user");
    if (!user) {
        return <Navigate to="/signup" />;
    }
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default PrivateComponent;
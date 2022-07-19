import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ children }) {
    const auth = useSelector((state) => state.user.user.email);
    return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;

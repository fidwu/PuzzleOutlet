import React from "react"
import { Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, props }) => {

    const userAuth = useSelector((state) => state.user);

    let location = useLocation();

    return (
        userAuth.authenticated ?
            <Component {...props} />
            : <Redirect to={{
                pathname: "/login",
                state: { from: location.pathname }
            }} />
    ) 
}

export default PrivateRoute;
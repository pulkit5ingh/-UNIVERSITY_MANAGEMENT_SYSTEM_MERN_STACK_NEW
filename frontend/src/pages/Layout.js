import React from "react";
import { Outlet } from "react-router-dom";

const layout = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default layout;
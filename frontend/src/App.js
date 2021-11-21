import React from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";

// * Pages
import Login from "./pages/Login";
import Layout from "./pages/Layout";
// * Admin pages
import AdminDashboard from "./pages/Admin/Dashboard";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
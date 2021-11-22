import React from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";

// * Pages
import Login from "./pages/Login";
import Layout from "./pages/Layout";
// * Admin pages
import AdminDashboard from "./pages/Admin/Dashboard";
import AllStudents from "./pages/Admin/AllStudents";
import AllTeachers from "./pages/Admin/AllTeachers";
import CreateStudent from "./pages/Admin/CreateStudent";
import CreateTeacher from "./pages/Admin/CreateTeacher";


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="/admin/all-students" exact element={<AllStudents />} />
          <Route path="/admin/all-teachers" exact element={<AllTeachers />} />
          <Route path="/admin/add-student" element={<CreateStudent />} />
          <Route path="/admin/add-teacher" element={<CreateTeacher />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
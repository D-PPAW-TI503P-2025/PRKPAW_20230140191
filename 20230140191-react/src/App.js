import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import PresensiPage from "./components/PresensiPage";
import ReportPage from "./components/ReportPage";
import DashboardPage from "./components/DashboardPage";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  try {
    jwtDecode(token);
    return children;
  } catch {
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }
};

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  try {
    const user = jwtDecode(token);
    if (user.role !== "admin") return <Navigate to="/" />;
    return children;
  } catch {
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }
};

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      {token && <Navbar />}

      <div className="pt-20">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/presensi"
            element={
              <ProtectedRoute>
                <PresensiPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <AdminRoute>
                <ReportPage />
              </AdminRoute>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

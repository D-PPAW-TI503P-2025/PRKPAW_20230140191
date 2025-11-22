import React from "react";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center p-6">

      <div className="backdrop-blur-xl bg-white/20 border border-white/30 px-10 py-12 rounded-2xl shadow-2xl text-center max-w-lg w-full">

        <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-4">
          Dashboard
        </h1>

        <p className="text-white/90 text-lg mb-10">
          Halo, selamat datang di halaman dashboard!  
        </p>

        <button
          onClick={handleLogout}
          className="w-full py-3 bg-white text-blue-700 font-bold rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>

    </div>
  );
}

export default DashboardPage;

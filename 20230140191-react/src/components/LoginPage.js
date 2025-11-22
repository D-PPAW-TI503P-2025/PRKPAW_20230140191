import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password
      });

      const token = response.data.token;
      localStorage.setItem('token', token);

      navigate('/dashboard');

    } catch (err) {
      setError(err.response ? err.response.data.message : 'Login gagal');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 flex flex-col">

      {/* NAVBAR */}
      <div className="w-full flex justify-end p-4 text-white font-semibold space-x-6">
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/register" className="hover:underline">Register</Link>
      </div>

      {/* FORM */}
      <div className="flex flex-col items-center justify-center flex-1 px-4">
        <div className="backdrop-blur-xl bg-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/30">

          <h2 className="text-4xl font-bold text-center mb-6 text-white drop-shadow-md">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-white/80 focus:ring-2 focus:ring-white focus:outline-none"
                placeholder="Masukkan email..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-white/80 focus:ring-2 focus:ring-white focus:outline-none"
                placeholder="Masukkan password..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-white text-blue-700 font-bold rounded-lg shadow-md hover:bg-gray-100"
            >
              Login
            </button>
          </form>

          {error && (
            <p className="text-red-200 text-sm mt-4 text-center">{error}</p>
          )}

          {/* Link daftar */}
          <p className="text-center text-white mt-6">
            Belum punya akun?{" "}
            <Link to="/register" className="font-semibold underline">
              Daftar di sini
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default LoginPage;

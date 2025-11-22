import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('mahasiswa');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await axios.post('http://localhost:3001/api/auth/register', {
        nama,
        email,
        password,
        role,
      });

      setSuccess('Registrasi berhasil! Silakan login.');
      setTimeout(() => navigate('/login'), 1500);

    } catch (err) {
      setError(err.response ? err.response.data.message : 'Registrasi gagal');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center p-6">

      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-10 w-full max-w-lg border border-white/30">

        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8 drop-shadow">
          Daftar Akun
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Nama */}
          <div className="relative">
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 text-gray-800 placeholder-transparent focus:outline-none focus:border-blue-600"
              placeholder="Nama"
            />
            <label className="absolute left-0 -top-4 text-gray-600 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-sm peer-focus:text-blue-600 transition-all">
              Nama Lengkap
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 text-gray-800 placeholder-transparent focus:outline-none focus:border-blue-600"
              placeholder="Email"
            />
            <label className="absolute left-0 -top-4 text-gray-600 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-sm peer-focus:text-blue-600 transition-all">
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 text-gray-800 placeholder-transparent focus:outline-none focus:border-blue-600"
              placeholder="Password"
            />
            <label className="absolute left-0 -top-4 text-gray-600 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-sm peer-focus:text-blue-600 transition-all">
              Password
            </label>
          </div>

          {/* Role */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 bg-white py-2 px-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="mahasiswa">Mahasiswa</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-transform hover:scale-[1.02]"
          >
            Register
          </button>

        </form>

        {/* Error / Success */}
        {error && (
          <p className="text-red-600 text-sm mt-4 text-center font-medium">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-sm mt-4 text-center font-medium">{success}</p>
        )}

        {/* Link Login */}
        <div className="text-center mt-6">
          <Link to="/login" className="text-blue-800 hover:underline font-semibold">
            Sudah punya akun? Login di sini
          </Link>
        </div>

      </div>

    </div>
  );
}

export default RegisterPage;

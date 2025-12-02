import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setUser(null);
            return;
        }

        try {
            const decoded = jwtDecode(token);
            setUser(decoded);
        } catch (error) {
            console.error("Token tidak valid:", error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (!user) return null;

    const isAdmin = user.role === 'admin';

    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div className="font-semibold">Selamat datang, {user.nama}</div>
            <div className="space-x-4">

                <button
                    onClick={() => navigate('/')}
                    className="hover:underline"
                >
                    Dashboard
                </button>

                <button
                    onClick={() => navigate('/presensi')}
                    className="hover:underline"
                >
                    Presensi
                </button>

                {isAdmin && (
                    <button
                        onClick={() => navigate('/reports')}
                        className="hover:underline"
                    >
                        Laporan Admin
                    </button>
                )}

                <button onClick={handleLogout} className="hover:underline">
                    Logout
                </button>

            </div>
        </nav>
    );
};

export default Navbar;

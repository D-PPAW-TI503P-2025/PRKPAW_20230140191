const jwt = require('jsonwebtoken');

// Ganti dengan secret kamu sendiri
const SECRET_KEY = 'secret_key_anda';

// ===========================
// Middleware: Authenticate Token
// ===========================
exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Format token: "Bearer <token>"
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: "Token tidak ditemukan, akses ditolak."
        });
    }

    try {
        const user = jwt.verify(token, SECRET_KEY);
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({
            message: "Token tidak valid.",
            error: error.message
        });
    }
};

// ===========================
// Middleware Dummy (opsional)
// ===========================
exports.addUserData = (req, res, next) => {
    console.log('Middleware: Menambahkan data user dummy...');
    req.user = {
        id: 123,
        nama: 'admin',
        role: 'admin'
    };
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        console.log('Middleware: Izin admin diberikan.');
        next();
    } else {
        console.log('Middleware: Gagal! Pengguna bukan admin.');
        return res.status(403).json({ message: 'Akses ditolak: Hanya untuk admin.' });
    }
};

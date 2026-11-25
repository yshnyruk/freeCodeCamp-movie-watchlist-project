import express from 'express';
import { findByUsername } from '../utils/db.js';
import bcrypt from 'bcryptjs';
import { signToken } from '../utils/jwt.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }
    const user = findByUsername(username);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const payload = { id: user.id, username: user.username, role: user.role };
    const token = signToken(payload);
    res.json({ token });
})

export default router;

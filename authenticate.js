import { verifyToken } from '../utils/jwt.js';
import { isBlacklisted } from '../utils/tocken-blacklist.js';

export function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided.' });
    }
    
    const token = authHeader.split(' ')[1];
    if (isBlacklisted(token)) {
        return res.status(401).json({ message: 'Token has been invalidated. Log in again.' });
    }
    const payload = verifyToken(token);
    if (!payload) {
        return res.status(401).json({ error: 'Invalid or expired token.' });
    }
    req.user = payload;
    next();
};

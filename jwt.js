import jwt from "jsonwebtoken";

export function signToken(payload) {
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: "1d" };
    return jwt.sign(payload, secret, options);
}

export function verifyToken(token) {
    const secret = process.env.JWT_SECRET;
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        return null;
    }
}

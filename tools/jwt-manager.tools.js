import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


// Options de notre token
const JWT_SECRET = process.env.JWT_SECRET;
const DEFAULT_OPTIONS = {
    expiresIn: "1h",
    algorithm: "HS256",
    audience: "http://localhost:4200", // Audience : le front-end
    issuer: "http://localhost:3000",  // Issuer : le back-end
};

if (!JWT_SECRET) {
    throw new Error(
        "JWT_SECRET n'est pas définie dans les variables d'environement"
    );
}

// créer un token
export const generateToken = (user, options = {}) => {
    const payload = {
        id: user.id,
        username: user.username,
        roles: user.roles || [],
    };

    return jwt.sign(payload, JWT_SECRET, { ...DEFAULT_OPTIONS, ...options });
};

// Vérifier un token
export const verifyToken = (token, options = {}) => {
    try {
        return jwt.verify(token, JWT_SECRET, {
            ...DEFAULT_OPTIONS,
            ...options,
        });
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return "Token invalide";
        }
        if (error instanceof jwt.TokenExpiredError) {
            return "le token à expiré";
        }
        return "erreur lors de la vérification du token";
    }
};

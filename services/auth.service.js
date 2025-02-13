import * as utilisateurRepository from "../repositories/utilisateur.repository.js";
import * as authRepository from "../repositories/auth.repository.js";
import * as jwtManger from "../tools/jwt-manager.tools.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

// 1. Créer un utilisateur (register)
export const register = async (data) => {
    const { username, email, password } = data;

    if (!username || !email || !password) {
        return "Nom, email et mot de passe requis !!!";
    }

    const utilisateurExistant = await utilisateurRepository.getByUsername(
        username
    );
    if (utilisateurExistant) {
        return "Nom d'utilisateur déjà pris...";
    }

    const emailExistant = await utilisateurRepository.getByEmail(email);
    if (emailExistant) {
        return "E-mail déjà pris...";
    }

    const passwordHash = await bcrypt.hash(password, 10);

    return await authRepository.register({
        username,
        email,
        password: passwordHash,
    });
};

export const login = async (data) => {
    const { username, password } = data;

    if (!username || !password) {
        return "Nom d'utilisateur et mot de passe requis";
    }

    const utilisateur = await utilisateurRepository.getByUsername(username);
    if (!utilisateur) {
        return `Aucun utilisteur n'est trouvé pour ${username}`;
    }

    const passwordValide = await bcrypt.compare(password, utilisateur.password);
    if (!passwordValide) {
        return "Mot de passe invalide !";
    }

    const token = jwtManger.generateToken(
        { id: utilisateur.id, username: utilisateur.username },
        { expiresIn: "2h" }
    );

    return { message: "Connexion réussie", token };
};

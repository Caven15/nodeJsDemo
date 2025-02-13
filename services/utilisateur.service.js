import * as utilisateurRepository from "../repositories/utilisateur.repository.js";

// 1. Créer un utilisateur (Create)
export const create = async (data) => {
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

    return await utilisateurRepository.create({
        username,
        email,
        password,
    });
};

// 2. Récupérer tous les utilisateurs (Read All)
export const getAll = async () => {
    return await utilisateurRepository.getAll();
};

// 3. Mettre à jour un utilisateur existant (Update)
export const update = async (id, data) => {
    const utilisateur = await utilisateurRepository.getById(id);
    if (!utilisateur) {
        return "Utilisateur non trouvé ";
    }

    const utilisateurExistant = await utilisateurRepository.getByUsername(
        data.username
    );
    if (utilisateurExistant) {
        return "Nom d'utilisateur déjà pris...";
    }

    const emailExistant = await utilisateurRepository.getByEmail(data.username);
    if (emailExistant) {
        return "E-mail déjà pris...";
    }

    return await utilisateurRepository.update(id, data);
};

// 4. Supprimer un utilisateur (Delete)
export const deleteOne = async (id) => {
    const utilisateur = await utilisateurRepository.getById(id);
    if (!utilisateur) {
        return "Utilisateur non trouvé ";
    }

    return await utilisateurRepository.deleteOne(id);
};

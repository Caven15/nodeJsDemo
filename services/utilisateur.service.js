import * as utilisateurRepository from "../repositories/utilisateur.repository.js";

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

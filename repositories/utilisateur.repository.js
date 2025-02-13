import db from "../models/index.js";
const { Utilisateur } = db;

// 1. Créer un utilisateur (Create)
export const create = async (data) => {
    return await Utilisateur.create(data);
};

// 2. Récupérer tous les utilisateurs (Read All)
export const getAll = async () => {
    return await Utilisateur.findAll();
};

// 3. Mettre à jour un utilisateur existant (Update)
export const update = async (id, data) => {
    await Utilisateur.update(data, { where: { id } });
    return await Utilisateur.findByPk(id);
};

// 4. Supprimer un utilisateur (Delete)
export const deleteOne = async (id) => {
    await Utilisateur.destroy({ where: { id } });
};

export const getByUsername = async (username) => {
    return await Utilisateur.findOne({ where: { username } });
};

export const getByEmail = async (email) => {
    return await Utilisateur.findOne({ where: { email } });
};

export const getById = async (id) => {
    return await Utilisateur.findOne({ where: { id } });
};
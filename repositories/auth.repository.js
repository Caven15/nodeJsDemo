import db from "../models/index.js";
const { Utilisateur } = db;

// 1. Créer un utilisateur (Create)
export const register = async (data) => {
	return await Utilisateur.create(data);
};
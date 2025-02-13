import db from "../models/index.js";
const { Livre } = db;

// getAll
export const getAll = async () => {
    return await Livre.findAll();
};

// getOne
export const getOneById = async (id) => {
    return await Livre.findByPk(id);
};

// Create
export const create = async (livre) => {
    return await Livre.create(livre);
};

// Update
export const updateBook = async (id, data) => {
    const livre = Livre.findByPk(id);
};

// Delete
export const deleteBook = async (id) => {
    const livre = Livre.findByPk(id);
};
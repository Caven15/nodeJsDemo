import * as livreRepository from "../repositories/livre.repostory.js";


// getAll
export const getAllBooks = async () => {
	const books = await livreRepository.getAll();
	return books.length ? books : "Aucun livre disponible";
}

// getOne
export const getOneById = async (id) => {
	if (isNaN(id) || id < 1){
		return "Id invalide.";
	}
	const book = await livreRepository.getOneById(id);
	return book || "Livre non trouvé"
}

// Create
export const createBook = async (data) => {
	if (!data.titre ||!data.auteur || !data.annee){
		return "Tous les champ (titre auteur, année) sont requis.";
	}
	return await livreRepository.create(data);
}

// Update
export const updateBook = async (id,data) => {
	if (isNaN(id) || id < 1) {
		return "Id introuvable";
	}
	if (!data.titre && !data.auteur && !data.annee){
		return "Au moins un chmap doit être mis a jour";
	}
	const LivreUpdate = await livreRepository.updateBook(id, data);
	return LivreUpdate || "Livre non trouvé";
}

// Delete
export const deleteBook = async (id) => {
	if (isNaN(id) || id < 1){
		return "Id invalide.";
	}
	const deleteBook = await livreRepository.deleteBook(id);
	return deleteBook || "Livre non trouvé";
}
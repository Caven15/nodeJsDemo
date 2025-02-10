import * as livreRepository from "../repositories/livre.repostory.js";


// getAll
export const getAllBooks = () => {
	const books = livreRepository.getAll();
	return books.length ? books : "Aucun livre disponible";
}

// getOne
export const getOneById = (id) => {
	if (isNaN(id) || id < 1){
		return "Id invalide.";
	}
	const book = livreRepository.getOneById(id);
	return book || "Livre non trouvé"
}

// Create
export const createBook = (data) => {
	if (!data.titre ||!data.auteur || !data.annee){
		return "Tous les champ (titre auteur, année) sont requis.";
	}
	return livreRepository.create(data);
}

// Update
export const updateBook = (id,data) => {
	if (isNaN(id) || id < 1) {
		return "Id introuvable";
	}
	if (!data.titre && !data.auteur && !data.annee){
		return "Au moins un chmap doit être mis a jour";
	}
	const LivreUpdate = livreRepository.updateBook(id, data);
	return updateBook || "Livre non trouvé";
}

// Delete
export const deleteBook = (id) => {
	if (isNaN(id) || id < 1){
		return "Id invalide.";
	}
	const deleteBook = livreRepository.deleteBook(id);
	return deleteBook || "Livre non trouvé";
}
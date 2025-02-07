import * as livreRepository from "../repositories/livre.repostory.js";


// getAll
export const getAllBooks = () => {
	const books = livreRepository.getAll();
	return books.length ? books : "Aucun livre disponible";
}

// getOne

// Create

// Update

// Delete
export const deleteBook = (id) => {
	if (isNaN(id) || id < 1){
		return "Id invalide.";
	}
	const deleteBook = livreRepository.deleteBook(id);
	return deleteBook || "Livre non trouvé";
}
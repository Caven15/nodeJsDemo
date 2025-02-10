import Livre from "../models/livre.model.js"

let livres = [
	{
		id : 1,
		titre : "toto  dans la jungle",
		auteur : "fulstack",
		annee : 2025
	}
];
let id = 1;

// getAll
export const getAll = () => {
	return livres;
}

// getOne
export const getOneById = (id) => {
	return livres.find(livre => livre.id === Number(id) || null);
}

// Create
export const create = (livre) => {
	const newLivre = new Livre(
		++id,
		livre.titre,
		livre.auteur,
		livre.annee
	);
	livres.push(newLivre);
	return newLivre;
}

// Update
export const updateBook = (id, data) => {
	console.log(`data : ${data}`);
	const livre = livres.find(livre => livre.id === Number(id));
	if (livre) {
		Object.assign(livre, data);
		console.log(`livre : ${data}`);
		return livre; 
	}
	return null; 
};


// Delete
export const deleteBook = (id) => {
	console.log(id);
	const index = livres.findIndex(livre => livre.id === Number(id));
	if (index !== -1) {
		return livres.splice(index, 1)[0]; // Supprime et on retourne le livre supprimé
	}
	return null; // Aucun livre avec l'id n'a été trouvé...
}
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

// Create

// Update

// Delete
export const deleteBook = (id) => {
	console.log(id);
	const index = livres.findIndex(livre => livre.id === Number(id));
	if (index !== -1) {
		return livres.splice(index, 1)[0]; // Supprime et on retourne le livre supprimé
	}
	return null; // Aucun livre avec l'id n'a été trouvé...
}
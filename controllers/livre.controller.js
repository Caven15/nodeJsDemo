import * as livreService from "../services/livre.service.js";

// getAll
export const getAllBooks = (req, res) => {
	const books = livreService.getAllBooks();
	res.writeHead(200, {"Content-Type" : "Application/json"});
	res.end(JSON.stringify({books}));
}

// getOne


// Create


// Update


// Delete
export const deleteBook = (req, res) => {
	const id = Number(req.url.split('/')[2]);
	const deleteBook = livreService.deleteBook(id);

	if (typeof deleteBook === "string") {
		res.writeHead(404, {"Content-Type" : "Application/json"});
		res.end(JSON.stringify({erreur : deleteBook}));
	}
	else {
		res.writeHead(204).end();
	}
}
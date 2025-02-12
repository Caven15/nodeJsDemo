import * as livreService from "../services/livre.service.js";

const typeJson = { "Content-Type": "Application/json" };

// getAll
export const getAllBooks = async (req, res) => {
    const books = await livreService.getAllBooks();
    res.writeHead(200, typeJson);
    console.log(books);
    res.end(JSON.stringify({ books }));
};

// getOne
export const getBookById = async (req, res) => {
    const id = Number(req.url.split("/")[2]);
    const book = await livreService.getOneById(id);
    if (typeof book === "string") {
        res.writeHead(404, typeJson);
        res.end(JSON.stringify({ erreur: book }));
    } else {
        res.writeHead(200, typeJson);
        res.end(JSON.stringify({ book }));
    }
};

// Create
export const createBook = async (req, res) => {
    let data = "";

    req.on("data", (body) => (data += body)); // Accumule les données reçue du data dans le body

    req.on("end", async () => {
        try {
            const donneeRecue = JSON.parse(data || {}); // Conversion en json
            const newLivre = await livreService.createBook(donneeRecue);

            if (typeof newLivre === "string") {
                res.writeHead(400, typeJson);
                res.end(JSON.stringify({ error: newLivre }));
            } else {
                res.writeHead(201, typeJson);
                console.log("ok");
                res.end(JSON.stringify(newLivre));
            }
        } catch (error) {
            res.writeHead(400, typeJson);
            console.log(error);
            res.end(JSON.stringify({ error: "Reqête invalide !!!" }));
        }
    });
};

// Update
export const updateBook = async (req, res) => {
    let data = "";
    const id = Number(req.url.split("/")[2]);

    req.on("data", (body) => (data += body));

    req.on("end", async () => {
        try {
            const donneeRecue = JSON.parse(data || "{}");
            const livreModif = await livreService.updateBook(id, donneeRecue);

            if (typeof livreModif === "string") {
                res.writeHead(404, typeJson);
                res.end(JSON.stringify({ erreur: livreModif }));
            } else {
                res.writeHead(200, typeJson);
                res.end(JSON.stringify(livreModif));
            }
        } catch (error) {
            res.writeHead(400, typeJson);
            res.end(JSON.stringify({ error: "Requête invalide !!!" }));
        }
    });
};

// Delete
export const deleteBook = async (req, res) => {
    const id = Number(req.url.split("/")[2]);
    const deleteBook = await livreService.deleteBook(id);

    if (typeof deleteBook === "string") {
        res.writeHead(404, { "Content-Type": "Application/json" });
        res.end(JSON.stringify({ erreur: deleteBook }));
    } else {
        res.writeHead(204).end();
    }
};

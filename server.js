// Importation du module HTTP de Node.js pour l création de notre serveur
import http from "http";

// Repository
let livres = [
    {
        id : 1,
        titre : "toto",
        auteur : "fullStack",
        annee : 2025
    },
    {
        id : 2,
        titre : "tata",
        auteur : "fullStack",
        annee : 2025
    }
];


// Service
const getAllBookService = () => {
    return livres;
};


// Controller 
const getAllBookController = (req, res) => {
    const livres = getAllBookService();
    res.writeHead(200, { "Content-Type": "application/json"});
    res.end(JSON.stringify(livres))
};

// Routage manuel
const server =  http.createServer((req,res) => {

    if (req.method === "GET" && req.url === "/livres"){
        getAllBookController(req,res);
    }
});

// Le serveur écoute les requêtes sur le 3000 et tourne en boucle indéfiniment
server.listen(3000, () => {
    console.log("Serveur démarré sur http://localhost:3000");
});
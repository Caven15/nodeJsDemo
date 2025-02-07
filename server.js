// Importation du module HTTP de Node.js pour l création de notre serveur
import http from "http";

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

// http.createServer => Crée un serveur qui éctoute les requêtes entrantes.
// Le serveur tourne en boucle et exécute la fonction callback chaque fois qu'une requette http arrive.
const server =  http.createServer((req,res) => {
    // req => Contient les information de la requête http envoyé par le client.
        // permet d'acceder 
            // Url 
            // Verb => GET POST DELETE PATCH ect....
            // Les en-têtes http (headers)
            // Les données que celle-ci contient (creation, mise à jour)

    // res => la réponse pour renvoyer les infos au client
        // permet d'acceder 
            // Définir le code de statut (ex 200 => ok || 404 not found)
            // Définition du type de retour ( text / json / autre...)
            // Envoyer les donnée au client  en json ou en texte

    if (req.method === "GET" && req.url === "/livres"){
        // Si l'utilisateur demande GET /livres

        // Définition du statut de la réponse http (200 = OK)
        res.writeHead(200, {"content-type" : "application/json"});

        // Envoi des données sous forme de json
        res.end(JSON.stringify(livres))
        console.log("Récupération de tout les livres...");
    }
})

// Le serveur écoute les requêtes sur le 3000 et tourne en boucle indéfiniment
server.listen(3000, () => {
    console.log("Serveur démarré sur http://localhost:3000");
})
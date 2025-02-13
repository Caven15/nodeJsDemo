import * as utilisateurService from "../services/utilisateur.service.js";

const typeJson = { "Content-Type": "Application/json" };

// 1. Créer un utilisateur (Create)
export const create = async (req, res) => {
    console.log("Je rentre dans le create 😊");
    let body = "";

    req.on("data", (data) => {
        body += data.toString();
    });

    console.log(body);

    req.on("end", async () => {
        try {
            const credentials = JSON.parse(body);

            const utilisateur = await utilisateurService.create(credentials);

            if (typeof utilisateur === "string") {
                res.writeHead(400, typeJson);
                res.end(
                    JSON.stringify({
                        erreur: utilisateur,
                    })
                );
            } else {
                res.writeHead(201, typeJson);
                res.end(
                    JSON.stringify({
                        message: "Utilisateur créer avec succès !!!",
                        utilisateur,
                    })
                );
            }
        } catch (error) {
            res.writeHead(400, typeJson);
            res.end(
                JSON.stringify({
                    erreur: "format invalide ou manquant...",
                    error,
                })
            );
        }
    });
};

// 2. Récupérer tous les utilisateurs (Read All)
export const getAll = async (req, res) => {
    try {
        const utilisateurs = await utilisateurService.getAll();
        res.writeHead(200, typeJson);
        res.end(JSON.stringify({ utilisateurs }));
    } catch (error) {
        res.writeHead(500, typeJson);
        res.end(JSON.stringify({ message: error }));
    }
};

// 3. Mettre à jour un utilisateur existant (Update)
export const update = async (req, res) => {
    try {
        let body = "";
        req.on("data", (data) => {
            body += data.toString();
        });

        req.on("end", async () => {
            const utilisateurData = JSON.parse(body);
            const utilisteur = await utilisateurService.update(
                req.params.id,
                utilisateurData
            );
            res.writeHead(200, typeJson);
            res.end(JSON.stringify({ message: utilisteur }));
        });
    } catch (error) {
        res.writeHead(400, typeJson);
        res.end(JSON.stringify({ message: error }));
    }
};

// 4. Supprimer un utilisateur (Delete)
export const deleteOne = async (req, res) => {
    try {
        await utilisateurService.deleteOne(req.params.id);
        res.writeHead(204);
        res.end();
    } catch (error) {
        res.writeHead(404, typeJson);
        res.end(JSON.stringify({ message: error }));
    }
};

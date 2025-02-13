import * as authService from "../services/auth.service.js";

const typeJson = { "Content-Type": "Application/json" };

// 1. Créer un utilisateur (Create)
export const register = async (req, res) => {
    console.log("Je rentre dans le create 😊");
    let body = "";

    req.on("data", (data) => {
        body += data.toString();
    });

    console.log(body);

    req.on("end", async () => {
        try {
            const credentials = JSON.parse(body);

            const utilisateur = await authService.register(credentials);

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
                        id: utilisateur.id,
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

export const login = async (req, res) => {
    let body = "";

    req.on("data", (data) => {
        body += data.toString();
    });

    console.log(body);

    req.on("end", async () => {
        try {
            const credentials = JSON.parse(body);

            const resultat = await authService.login(credentials);

            if (typeof resultat === "string") {
                res.writeHead(400, { typeJson });
                res.end(JSON.stringify(resultat));
            } else {
				res.writeHead(200, { typeJson });
                res.end(JSON.stringify(resultat));
			}
        } catch (error) {
			res.writeHead(400, { typeJson });
			res.end(JSON.stringify({erreur : error.message}));
		}
    });
};

class Router {
    constructor() {
        this.routes = []; // Liste des routes enregistrées
    }

    /**
     * Enregistre une nouvelle route.
     * @param {string} method - Méthode HTTP (GET, POST, PUT, DELETE).
     * @param {string} path - URL de la route (ex: "/books/:id").
     * @param {Function} handler - Fonction qui gère la requête.
     * @param {Function|null} middleware - Middleware optionnel.
     */
    register(method, path, handler, middleware = null) {
        this.routes.push({ method, path, handler, middleware });
    }

    /**
     * Gère une requête HTTP en cherchant une route correspondante.
     * @param {Object} req - Objet de requête.
     * @param {Object} res - Objet de réponse.
     */
    handleRequest(req, res) {
        const { method, url } = req;

        for (const route of this.routes) {
            // Convertit "/books/:id" en une expression régulière "/books/(\w+)"
            const regex = new RegExp(
                `^${route.path.replace(/:\w+/g, "(\\w+)")}$`
            );
            const match = url.match(regex);

            if (route.method === method && match) {
                // Extraire les paramètres dynamiques (ex: :id)
                req.params = this.extractParams(route.path, match);

                // Si un middleware est défini, l'exécuter avant le contrôleur
                if (route.middleware) {
                    return route.middleware(req, res, () =>
                        route.handler(req, res)
                    );
                }

                return route.handler(req, res);
            }
        }

        // Route non trouvée
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route non trouvée" }));
    }

    /**
     * Extrait les paramètres dynamiques d'une URL.
     * @param {string} path - Chemin de la route (ex: "/books/:id").
     * @param {Array} match - Résultat du test regex.
     * @returns {Object} - Objet contenant les paramètres (ex: { id: "123" }).
     */
    extractParams(path, match) {
        const paramNames = path.match(/:(\w+)/g) || [];
        return paramNames.reduce((params, param, index) => {
            params[param.substring(1)] = match[index + 1];
            return params;
        }, {});
    }
}

// Exporte une instance unique du routeur
export const router = new Router();

// Importation du module HTTP de Node.js pour l création de notre serveur
import fs from "fs";
import http from "http";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { router } from "./tools/router-manager.tools.js";

// Import dynamique des routes
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const chargerRoutes = () => {
    const routeDir = path.join(__dirname, "routers");
    fs.readdirSync(routeDir)
    .filter( file => file.endsWith(".js"))
    .forEach(file => {
        import(pathToFileURL(path.join(routeDir, file)));
        console.log(`Route chargée => ${file}`);
    })
}

const startServer = () => {
    chargerRoutes();
    const server  = http.createServer((req, res) => router.handleRequest(req, res));
    const port = 3000;
    server.listen(port, () => console.log(`Start serveur : http://localhost:${port}`));
}

startServer();
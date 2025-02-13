import * as jwtManager from "../tools/jwt-manager.tools.js";

const typeJson = { "Content-Type": "Application/json" };

const authMiddleware = (req, res, next) => {

    const headers = req.headers["authorization"];

    if (!headers || !headers.startsWith("Bearer ")) {
        return res
            .writeHead(401, typeJson)
            .end(JSON.stringify({ message: "Token manquant ou mal formaté" }));
    }

    console.log(typeof headers);

    const token = headers.split(" ")[1];

    try {
        const decode = jwtManager.verifyToken(token);
        if (typeof decode === "string") {
            res.writeHead(401, typeJson);
            res.end(JSON.stringify({ message: decode }));
        } else {
            next();
        }
    } catch (error) {
        res.writeHead(401, typeJson);
        res.end(JSON.stringify({ message: "Token invalide" }));
    }
};

export default authMiddleware;

import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const configPath = path.join(__dirname, "../config/config.json");
const configJson = JSON.parse(fs.readFileSync(configPath, "utf-8"));

const env = process.env.NODE_ENV || "development";
const config = configJson[env];

export const sequelize = config.use_env_variable
    ? new Sequelize(process.env[config.use_env_variable], config)
    : new Sequelize(config.database, config.username, config.password, config);

export const db = {};

// import des modèles
import Livre from "./livre.model.js";

db.Livre = Livre(sequelize);



Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

console.log("- Modèles chargés :", Object.keys(db));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

import { router } from "../tools/router-manager.tools.js";
import * as utilisateurController from "../controllers/utilisateur.controller.js";

router.register("POST", "/utilisateurs", utilisateurController.create);
router.register("GET", "/utilisateurs", utilisateurController.getAll);
router.register("PUT", "/utilisateurs/:id", utilisateurController.update);
router.register("DELETE", "/utilisateurs/:id", utilisateurController.deleteOne);
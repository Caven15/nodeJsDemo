import { router } from "../tools/router-manager.tools.js";
import * as utilisateurController from "../controllers/utilisateur.controller.js";
import authMiddleware from "../middleware/auth.middleware.js" 

router.register("POST", "/utilisateurs", utilisateurController.create);
router.register("GET", "/utilisateurs", utilisateurController.getAll, authMiddleware);
router.register("PUT", "/utilisateurs/:id", utilisateurController.update);
router.register("DELETE", "/utilisateurs/:id", utilisateurController.deleteOne);
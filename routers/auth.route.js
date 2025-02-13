import * as authController from "../controllers/auth.Controller.js";
import {router} from "../tools/router-manager.tools.js";

router.register("POST", "/register", authController.register);
router.register("POST", "/login", authController.login);
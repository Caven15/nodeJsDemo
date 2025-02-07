import {router} from "../tools/router-manager.tools.js";
import * as bookController from "../controllers/livre.controller.js";


router.register("GET", "/livres", bookController.getAllBooks);
router.register("DELETE", "/livres/:id", bookController.deleteBook);
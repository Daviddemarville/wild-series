import express from "express";
import validateBody from "./middlewares/validateBody";
import { categorySchema, programSchema } from "./modules/validators/validator";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

// Define program-related routes
import programActions from "./modules/program/programActions";

router.get("/api/programs", programActions.browse);
router.get("/api/programs/:id", programActions.read);
router.put(
  "/api/programs/:id",
  validateBody(programSchema),
  programActions.edit,
);
router.post("/api/programs", validateBody(programSchema), programActions.add);
router.delete("/api/programs/:id", programActions.destroy);

// Define category-related routes
import categoryActions from "./modules/category/categoryActions";

router.get("/api/categories", categoryActions.browse);
router.get("/api/categories/:id", categoryActions.read);
router.put(
  "/api/categories/:id",
  validateBody(categorySchema),
  categoryActions.edit,
);
router.post(
  "/api/categories",
  validateBody(categorySchema),
  categoryActions.add,
);
router.delete("/api/categories/:id", categoryActions.destroy);

/* ************************************************************************* */

// Declaration of a "Welcome" route

//import { r } from "@faker-js/faker/dist/airline-C5Qwd7_q";
//import sayActions from "./modules/say/sayActions";

//router.get("/", sayActions.sayWelcome);

/* ************************************************************************* */

export default router;

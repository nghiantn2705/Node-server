import express from "express";
import {
  create,
  getAll,
  getDetail,
  remove,
  update,
} from "../controllers/category.js";
import { checkPermission } from "../middlewares/checkPermission.js";
const router = express.Router();

router.get("/category", getAll);
router.get("/category/:id", getDetail);
router.post("/category", create);
router.put("/category/:id", update);
router.delete("/category/:id", remove);

export default router;
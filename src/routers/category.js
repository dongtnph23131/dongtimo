import express from "express"
import { create, get, getAll, remove, update } from "../controllers/category"
import { authorization } from "../middlewares/authorization"
import { authenticate } from "../middlewares/authenticate"

const router = express.Router()

router.post("/categories", authenticate, authorization, create)
router.get("/categories", getAll)
router.get("/categories/:id", get)
router.delete("/categories/:id", authenticate, authorization, remove)
router.put("/categories/:id", authenticate, authorization, update)
export default router
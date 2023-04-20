import express from "express"
import { create, get, getAll, remove, update } from "../controllers/category"

const router =express.Router()

router.post("/categories",create)
router.get("/categories",getAll)
router.get("/categories/:id",get)
router.delete("/categories/:id",remove)
router.put("/categories/:id",update)
export default router
import express from "express"
import { create, get, getAll, remove, restore, update } from "../controllers/product"
import {CloudinaryStorage} from "multer-storage-cloudinary"
import multer from "multer"
import cloudinary from "../config/cloudinary"
import { authenticate } from "../middlewares/authenticate"
import { authorization } from "../middlewares/authorization"
const router =express.Router()

const storage=new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder:"Nodejs",
        format:"png"
    }
})

const upload=multer({storage: storage})

router.post("/products",authenticate,authorization,upload.array("images",10),create)
router.get("/products",getAll)
router.delete("/products/:id",authenticate,authorization,remove)
router.patch("/products/:id",authenticate,authorization,restore)
router.get("/products/:id",get)
router.put("/products/:id",authenticate,authorization,update)
export default router
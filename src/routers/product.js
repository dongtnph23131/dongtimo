import express from "express"
import { create, get, getAll, remove, restore, update } from "../controllers/product"
import {CloudinaryStorage} from "multer-storage-cloudinary"
import multer from "multer"
import cloudinary from "../config/cloudinary"
const router =express.Router()

const storage=new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder:"Nodejs",
        format:"png"
    }
})

const upload=multer({storage: storage})

router.post("/products",upload.array("images",10),create)
router.get("/products",getAll)
router.delete("/products/:id",remove)
router.patch("/products/:id",restore)
router.get("/products/:id",get)
router.put("/products/:id",update)
export default router
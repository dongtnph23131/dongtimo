import express from "express"
import { create } from "../controllers/product"
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

export default router
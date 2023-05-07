import express from "express"
import { forgotPassword, resetPassword } from "../controllers/user"

const router=express.Router()

router.post('/forgotPassword',forgotPassword)
router.patch('/resetPassword/:token',resetPassword)
export default router
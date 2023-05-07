import express from "express"
import { forgotPassword, resetPassword, updatePassword } from "../controllers/user"
import { authenticate } from "../middlewares/authenticate"

const router=express.Router()

router.post('/forgotpassword',forgotPassword)
router.patch('/resetpassword/:token',resetPassword)
router.patch('/user/password/update',authenticate,updatePassword)
export default router
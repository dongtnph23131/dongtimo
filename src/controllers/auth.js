import User from "../models/user"
import { signinSchema, signupSchema } from "../schemas/auth"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
dotenv.config()
export const signup = async (req, res) => {
    try {
        const { email, password, name } = req.body
        const { error } = signupSchema.validate(req.body, {
            abortEarly: false
        })
        if (error) {
            return res.status(400).json({
                messages: error.details.map(error => error.message)
            })
        }
        const userExits = await User.findOne({ email: email })
        if (userExits) {
            return res.status(400).json({
                message: "Email đã được đăng ký"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name, email, password: hashPassword
        })
        user.password = undefined

        return res.status(200).json({
            message: "Đăng ký thành công",
            user
        })
    }
    catch (error) {
        res.status(400).json({
            message: "Đăng ký thất bại",
            error: error.message
        })
    }
}

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body
        const { error } = signinSchema.validate(req.body, {
            abortEarly: false
        })
        if (error) {
            return res.status(400).json({
                message: error.details.map(error => error.message)
            })
        }
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({
                message: "Tài khoản không tồn tại"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                message: "Mật khẩu không đúng"
            })
        }
        const token=jwt.sign({id:user._id},"dongtimo",{
            expiresIn:'1d'
        })
        user.password=undefined
        return res.status(400).json({
            message:"Đăng nhập thành công",
            user,
            token
        })
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
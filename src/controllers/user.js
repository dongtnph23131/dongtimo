import nodemailer from "nodemailer"
import User from "../models/user"
import crypto from "crypto-js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
export const forgotPassword = async (req, res) => {
    try {
        const email = req.body.email
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({
                message: "Email chưa được đăng ký"
            })
        }
        const resetToken = crypto.lib.WordArray.random(32).toString();
        user.passwordResetToken = crypto.SHA256(resetToken, 'dongcute').toString();
        user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
        await user.save({ validateBeforeSave: false })
        const resetURL = `http://localhost:8080/api/resetPassword/${resetToken}`
        const message = `Bạn có thể thay đổi mật khẩu ${resetURL}`
        const transporter = nodemailer.createTransport({
            tls: {
                rejectUnauthorized: false
            },
            service: 'gmail',
            auth: {
                user: 'tranngocdong2042003@gmail.com',
                pass: process.env.MAIL_PASSWORD
            }

        });
        const mailOptions = {
            from: 'tranngocdong2042003@gmail.com',
            to: req.body.email,
            subject: 'FORGOT PASSWORD',
            text: message
        }
        try {
            await transporter.sendMail(mailOptions)
            return res.status(200).json({
                status: "success",
                message: "Token sent to email"
            })
        }
        catch (error) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({ validateBeforeSave: false });
        }
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
export const resetPassword = async (req, res, next) => {
    try {
        const hashedToken = crypto.SHA256(req.params.token, 'dongcute').toString();
        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({
                message: "Token resetPassword hết hạn"
            })
        }
        const handlePass = await bcrypt.hash(req.body.password, 10)
        user.password = handlePass;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined
        user.passwordChangeAt = Date.now();
        await user.save()
        const token = jwt.sign({ id: user._id }, "dongcute", {
            expiresIn: '1d'
        })
        user.password = undefined
        return res.status(200).json({
            message: "Mật khẩu mới được cập nhâp",
            user,
            token
        })
    }
    catch (error) {
        res.status(400).json({
            message: error
        })
    }
}


export const updatePassword = async (req, res) => {
    try {
        const user = req.user
        const isMatch = await bcrypt.compare(user.password, req.body.currentPassword)
        if (!isMatch) {
            return res.status(400).json({
                message: "Mật khẩu hiện tại không đúng"
            })
        }

        const userNew = await User.findByIdAndUpdate(req.user._id, { password: req.body.password }, {
            new: true
        })
        userNew.passwordChangeAt=Date.now()
        const token = jwt.sign({ id: userNew._id }, "dongtimo", {
            expiresIn: '1d'
        })
        return res.status(200).json({
            message: "Đổi mật khẩu thành công",
            token
        })
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}




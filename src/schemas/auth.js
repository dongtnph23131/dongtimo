import Joi from "joi"

export const signupSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Trường tên không được để trống",
        "string.empty": "Trường tên không được để trống "
    }),
    email: Joi.string().required().email().messages({
        "any.required": "Trường email bắt buộc phải có",
        "string.empty": "Trường email không được để trống",
        "string.email": "Không đúng địng dạng email"
    }),
    password: Joi.string().required().min(6).messages({
        "any.required": "Trường mật khẩu bắt buộc phải có",
        "string.empty": "Trường mật khẩu không được để trống",
        "string.min": "Mật khẩu ít nhất {#limit} kí tự"
    }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
        "any.required": "Trường nhập lại mật khẩu bắt buộc phải có",
        "string.empty": "Trường nhập lại mật khẩu không được để trống",
        "any.only": "Mật khẩu nhập lại không khớp"
    })
})

export const signinSchema=Joi.object({
    email: Joi.string().required().email().messages({
        "any.required": "Trường email bắt buộc phải có",
        "string.empty": "Trường email không được để trống",
        "string.email": "Không đúng địng dạng email"
    }),
    password: Joi.string().required().min(6).messages({
        "any.required": "Trường mật khẩu bắt buộc phải có",
        "string.empty": "Trường mật khẩu không được để trống",
        "string.min": "Mật khẩu ít nhất {#limit} kí tự"
    }),
})
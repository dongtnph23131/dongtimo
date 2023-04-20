import Joi from "joi";

export const categorySchema=Joi.object({
    name:Joi.string().min(6).max(255).required().messages({
        "any.required":"Trường tên danh mục sản phẩm bắt buộc phải có",
        "string.empty":"Tên danh mục sản phẩm không được để trống",
        "string.min":"Tên danh mục sản phẩm ít nhất 6 kí tự",
        "string.max":"Tên danh mục sản phẩm nhiều nhất 255 kí tự"
    })
})


import Joi from "joi";

export const productSchema =Joi.object({
    name:Joi.string().required().min(6).max(255).messages({
        "any.required":"Trường tên sản phẩm bắt buộc phải có",
        "string.empty":"Tên sản phẩm không được để trống",
        "string.min":"Tên sản phẩm ít nhất 6 kí tự",
        "string.max":"Tên sản phẩm nhiều nhất 255 kí tự"
    }),
    price:Joi.number().min(0).required().messages({
        "any.required":"Trường giá sản phẩm bắt buộc phải có",
        "number.empty":"Tên giá sản phẩm không được để trống",
        "number.base":"Giá sản phẩm phải là số",
        "number.min":"Giá sản phẩm phải là số dương"
    }),
    description:Joi.string().required().messages({
        "any.required":"Trường mô tả sản phẩm bắt buộc phải có",
        "string.empty":"Tên mô tả sản phẩm không được để trống",
    }),
    categoryId:Joi.string().required().messages({
        "any.required":"Trường danh mục sản phẩm bắt buộc phải có",
        "string.empty":"Danh mục sản phẩm không được để trống",
    })
})
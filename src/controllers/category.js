import Category from "../models/category";
import Product from "../models/product";
import { categorySchema } from "../schemas/category";

export const create = async (req, res) => {
    try {
        const { error } = categorySchema.validate(req.body, {
            abortEarly: false
        })
        if (error) {
            return res.status(400).json({
                messages: error.details.map(error => error.message)
            })
        }
        const category = await Category.create(req.body)
        return res.status(200).json({
            message: "Thêm danh mục sản phẩm thành công",
            category
        })
    }
    catch (error) {
        res.status(400).json({
            message: "Thêm danh mục sản phẩm thất bại",
            error: error.message
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const listCategory = await Category.find().populate('products')
        if (listCategory.length == 0) {
            return res.status(200).json({
                message: "Chưa có danh mục sản phẩm nào"
            })
        }
        return res.status(200).json(listCategory)
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export const get = async (req, res) => {
    try {
        const id = req.params.id
        const category = await Category.findById(id).populate("products")
        if (!category) {
            return res.status(200).json({
                message: "Không tìm thấy danh mục sản phẩm nào"
            })
        }

        return res.status(200).json(category)
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
export const remove = async (req, res) => {
    try {
        const id = req.params.id
        await Product.updateMany({ categoryId: id }, {
            categoryId: null
        })
        const category = await Category.findByIdAndDelete(id)
        if (!category) {
            return res.status(400).json({
                message: "Không tìm thấy danh mục sản phẩm nào"
            })
        }
        if (!category.isDeleteable) {
            return res.status(400).json({ message: 'Không thể xóa danh mục này' });
        }
        return res.status(200).json({
            message: "Xóa danh mục sản phẩm thành công"
        })
    }
    catch (error) {
        res.status(400).json({
            message: "Xóa danh mục sản phẩm thất bại",
            error: error.message
        })
    }
}
export const update = async (req, res) => {
    try {
        const id = req.params.id
        const categoryUpdate = await Category.findOneAndUpdate({ _id: id }, req.body, {
            new: true
        })
        return res.status(200).json({
            message: "Cập nhập danh mục sản phẩm thành công",
            categoryUpdate
        })
    }
    catch (error) {
        res.status(400).json({
            message: "Cập nhập danh mục sản phẩm thất bại",
            error: error.message
        })
    }
}
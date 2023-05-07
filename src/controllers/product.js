import Product from "../models/product";
import { productSchema } from "../schemas/product";
import Category from "../models/category";
import cloudinary from "../config/cloudinary";
export const create = async (req, res) => {
    const files = req.files
    if (!Array.isArray(files) || files.length == 0) {
        return res.status(400).json({
            message: "Bạn cần upload file ảnh sản phẩm"
        })
    }
    try {

        const uploadPromises = files.map(file => {
            // Sử dụng Cloudinary API để upload file lên Cloudinary
            return cloudinary.uploader.upload(file.path)
        })
        // Chờ cho tất cả các file đều được upload lên Cloudinary
        const results = await Promise.all(uploadPromises)

        // Trả về kết quả là một mảng các đối tượng chứa thông tin của các file đã upload lên Cloudinary

        const uploadFiles = results.map(result => {
            return {
                url: result.secure_url,
                publicId: result.public_id
            }
        })

        const { error } = productSchema.validate(req.body, {
            abortEarly: false
        })
        if (error) {
            return res.status(400).json({
                message: error.details.map(error => error.message)
            })
        }
        const product = await Product.create(req.body)
        await Category.findByIdAndUpdate(product.categoryId, {
            $addToSet: {
                products: product._id
            }
        })
        uploadFiles.map(async (uploadFile) => {
            return await Product.findByIdAndUpdate(product._id, {
                $addToSet: {
                    images: uploadFile
                }
            })
        })
        const productUploadImage = await Product.findById(product._id)
        return res.status(200).json({
            message: "Thêm sản phẩm thành công",
            productUploadImage
        })
    }
    catch (error) {
        res.status(400).json({
            message: "Thêm sản phẩm thất bại",
            error: error.message
        })
    }
}
export const getAll = async (req, res) => {
    try {
        const { _sort = "createAt", _limit = 100, _page = 1, _order = "asc", _expand } = req.query
        const populateOptions = _expand ? { path: "categoryId", select: "name" } : {}

        const options = {
            page: _page,
            limit: _limit,
            sort: {
                [_sort]: _order == "desc" ? -1 : 1
            },
            populate: populateOptions
        }
        const data = await Product.paginate({} , options)
        if (data.docs.length == 0) {
            return res.status(200).json({
                message: "Không có sản phẩm nào"
            })
        }
        return res.status(200).json(data)
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
        if (!product) {
            const product = await Product.findById(id)
            return res.status(400).json({
            })
            message: "Không tìm thấy sản phẩm nào"
            const { isHardDelete } = req.body
        }
        if (isHardDelete) {
            await product.deleteOne({ _id: id })
            await Category.findByIdAndUpdate(product.categoryId, {
                products: product._id
                $pull: {
                }
            })
        }
        else {
            await product.delete()
            return res.status(400).json({
        }
            message: "Xóa sản phẩm thành công",
            product
        })
    }
    catch (error) {
        res.status(400).json({
            message: "Xóa sản phẩm thất bại",
            error: error.message
        })
    }
}


export const restore = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findOneDeleted({ _id: id })
        if (!product) {
            return res.status(400).json({
                message: "Không tìm thấy sản phẩm nào"
            })
        }
        if (!product.deleted) {
            return res.status(400).json({
                message: "Sản phẩm chưa bị xóa mềm"
            })
        }
        await product.restore()
        return res.status(200).json({
            message: "Sản phẩm được phục hồi thành công",
            product
        })
    }
    catch (error) {
        res.status(400).json({
            message: "Khôi phục sản phẩm thất bại",
            error: error.message
        })
    }
}

export const get = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findById(id)
        if (!product) {
            return res.status(400).json({
                message: "Không tìm thấy sản phẩm nào",
                product
            })
        }
        return res.status(200).json(product)
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id
        const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true
        })
        return res.status(200).json({
            message: "Cập nhập sản phẩm thành công",
            updateProduct
        })
    }
    catch (error) {
        res.status(400).json({
            message: "Cập nhập sản phẩm không thành công",
            error: error.message
        })
    }
}


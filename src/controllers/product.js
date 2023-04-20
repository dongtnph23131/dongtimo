import Product from "../models/product";
import { productSchema } from "../schemas/product";
import Category from "../models/category";
import cloudinary from "../config/cloudinary";
export const create = async (req, res) => {
    const files = req.files
    if (!Array.isArray(files)) {
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
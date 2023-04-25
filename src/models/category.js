import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
import mongoosePaginate from "mongoose-paginate-v2"
const plugins = [mongooseDelete, mongoosePaginate]
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isDeleteable: {
        type: Boolean,
        default: true
    },
    products: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Product"
        }
    ]
}, {
    timestamps: true,
    versionKey: false
})
plugins.map(plugin => {
    categorySchema.plugin(plugin)
})
export default mongoose.model("Category", categorySchema)
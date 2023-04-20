import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
import mongoosePaginate from "mongoose-paginate-v2"
const plugins = [mongooseDelete, mongoosePaginate]
const productSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   price: {
      type: Number,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category"
   },
   images: [Object],
   deleted: {
      type: Boolean,
      default: false
   },
   deletedAt: {
      type: Date,
      default: null
   }
}, {
   timestamps: true,
   versionKey: false
})
plugins.map(plugin => {
   productSchema.plugin(plugin, {
      deletedAt: true,
      overrideMethods: true
   })
})
export default mongoose.model("Product", productSchema)
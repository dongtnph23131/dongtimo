import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    isDeleteable: {
        type: Boolean,
        default: true
    },
    products:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Product"
        }
    ]
},{
    timestamps:true,
    versionKey:false
})
export default mongoose.model("Category",categorySchema)
import mongoose from "mongoose";
export default mongoose.model("Wishlist",new mongoose.Schema({student:{type:mongoose.Schema.Types.ObjectId,ref:"User"},course:{type:mongoose.Schema.Types.ObjectId,ref:"Course"}},{timestamps:true}));

import mongoose from "mongoose";
export default mongoose.model("Review",new mongoose.Schema({
 student:{type:mongoose.Schema.Types.ObjectId,ref:"User"},course:{type:mongoose.Schema.Types.ObjectId,ref:"Course"},rating:{type:Number,min:1,max:5},comment:String
},{timestamps:true}));

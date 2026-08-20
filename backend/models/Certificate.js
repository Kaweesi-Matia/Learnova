import mongoose from "mongoose";
export default mongoose.model("Certificate",new mongoose.Schema({
 student:{type:mongoose.Schema.Types.ObjectId,ref:"User"},course:{type:mongoose.Schema.Types.ObjectId,ref:"Course"},certificateId:{type:String,unique:true},issuedAt:{type:Date,default:Date.now}
}));

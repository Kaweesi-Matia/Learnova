import mongoose from "mongoose";
export default mongoose.model("Enrollment",new mongoose.Schema({
 student:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
 course:{type:mongoose.Schema.Types.ObjectId,ref:"Course",required:true},
 progress:{type:Number,default:0},completed:{type:Boolean,default:false},completedAt:Date,currentLesson:mongoose.Schema.Types.ObjectId
},{timestamps:true}));

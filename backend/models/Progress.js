import mongoose from "mongoose";
export default mongoose.model("Progress",new mongoose.Schema({
 student:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
 course:{type:mongoose.Schema.Types.ObjectId,ref:"Course",required:true},
 completedLessons:[mongoose.Schema.Types.ObjectId],lastLesson:mongoose.Schema.Types.ObjectId,percentage:{type:Number,default:0}
},{timestamps:true}));

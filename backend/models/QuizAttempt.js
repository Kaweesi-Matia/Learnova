import mongoose from "mongoose";
export default mongoose.model("QuizAttempt",new mongoose.Schema({quiz:{type:mongoose.Schema.Types.ObjectId,ref:"Quiz"},student:{type:mongoose.Schema.Types.ObjectId,ref:"User"},answers:[Number],score:Number,passed:Boolean},{timestamps:true}));

import mongoose from "mongoose";
const q=new mongoose.Schema({question:String,options:[String],correctIndex:Number});
export default mongoose.model("Quiz",new mongoose.Schema({course:{type:mongoose.Schema.Types.ObjectId,ref:"Course"},lesson:mongoose.Schema.Types.ObjectId,title:String,questions:[q]}));

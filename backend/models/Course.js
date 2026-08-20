import mongoose from "mongoose";
const lessonSchema=new mongoose.Schema({title:String,type:{type:String,enum:["VIDEO","TEXT","QUIZ","ASSIGNMENT"],default:"VIDEO"},duration:String,content:String,videoUrl:String,order:Number});
const moduleSchema=new mongoose.Schema({title:String,order:Number,lessons:[lessonSchema]});
const schema=new mongoose.Schema({
 title:{type:String,required:true},slug:{type:String,unique:true},description:String,thumbnail:String,
 category:{type:mongoose.Schema.Types.ObjectId,ref:"Category"},instructor:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
 level:{type:String,enum:["Beginner","Intermediate","Advanced"],default:"Beginner"},price:{type:Number,default:0},
 duration:String,objectives:[String],requirements:[String],modules:[moduleSchema],
 rating:{type:Number,default:0},reviewCount:{type:Number,default:0},studentsCount:{type:Number,default:0},published:{type:Boolean,default:true}
},{timestamps:true});
export default mongoose.model("Course",schema);

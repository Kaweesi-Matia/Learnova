import mongoose from "mongoose";
const schema=new mongoose.Schema({
 name:{type:String,required:true,trim:true},
 email:{type:String,required:true,unique:true,lowercase:true,trim:true},
 password:{type:String,required:true,select:false},
 role:{type:String,enum:["STUDENT","INSTRUCTOR","ADMIN"],default:"STUDENT"},
 avatar:String,bio:String,isApproved:{type:Boolean,default:false}
},{timestamps:true});
export default mongoose.model("User",schema);

import {Router} from "express";
import Review from "../models/Review.js";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import {auth,roles} from "../middleware/auth.js";
const r=Router();
r.get("/course/:courseId",async(req,res,next)=>{try{res.json({reviews:await Review.find({course:req.params.courseId}).populate("student","name avatar").sort({createdAt:-1})})}catch(e){next(e)}});
r.post("/",auth,roles("STUDENT"),async(req,res,next)=>{try{if(!await Enrollment.exists({student:req.user._id,course:req.body.courseId}))return res.status(403).json({message:"Enroll first"});const rv=await Review.create({student:req.user._id,course:req.body.courseId,rating:req.body.rating,comment:req.body.comment});const all=await Review.find({course:req.body.courseId});await Course.findByIdAndUpdate(req.body.courseId,{rating:all.reduce((s,x)=>s+x.rating,0)/all.length,reviewCount:all.length});res.status(201).json({review:rv})}catch(e){next(e)}});
export default r;

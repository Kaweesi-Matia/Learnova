import {Router} from "express";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import {auth,roles} from "../middleware/auth.js";
const r=Router();
r.post("/",auth,roles("STUDENT"),async(req,res,next)=>{try{const {courseId}=req.body;if(await Enrollment.findOne({student:req.user._id,course:courseId}))return res.status(409).json({message:"Already enrolled"});const e=await Enrollment.create({student:req.user._id,course:courseId});await Course.findByIdAndUpdate(courseId,{$inc:{studentsCount:1}});res.status(201).json({enrollment:e})}catch(e){next(e)}});
r.get("/check/:courseId",auth,async(req,res,next)=>{try{res.json({enrolled:!!await Enrollment.exists({student:req.user._id,course:req.params.courseId})})}catch(e){next(e)}});
r.get("/my-courses",auth,roles("STUDENT"),async(req,res,next)=>{try{const enrollments=await Enrollment.find({student:req.user._id}).populate("course","title thumbnail duration");const completed=enrollments.filter(e=>e.completed).length;res.json({enrollments,stats:{enrolled:enrollments.length,completed,hours:enrollments.length*8,certificates:completed}})}catch(e){next(e)}});
export default r;

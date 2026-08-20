import {Router} from "express";
import Wishlist from "../models/Wishlist.js";
import {auth,roles} from "../middleware/auth.js";
const r=Router();
r.get("/",auth,roles("STUDENT"),async(req,res,next)=>{try{res.json({wishlist:await Wishlist.find({student:req.user._id}).populate("course","title thumbnail price rating instructor")})}catch(e){next(e)}});
r.post("/",auth,roles("STUDENT"),async(req,res,next)=>{try{res.status(201).json({item:await Wishlist.create({student:req.user._id,course:req.body.courseId})})}catch(e){next(e)}});
r.delete("/:courseId",auth,roles("STUDENT"),async(req,res,next)=>{try{await Wishlist.findOneAndDelete({student:req.user._id,course:req.params.courseId});res.json({message:"Removed"})}catch(e){next(e)}});
export default r;

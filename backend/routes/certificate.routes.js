import {Router} from "express";
import Certificate from "../models/Certificate.js";
import {auth} from "../middleware/auth.js";
const r=Router();
r.get("/",auth,async(req,res,next)=>{try{res.json({certificates:await Certificate.find({student:req.user._id}).populate("course","title instructor").populate({path:"course",populate:{path:"instructor",select:"name"}})})}catch(e){next(e)}});
r.get("/:id",async(req,res,next)=>{try{const c=await Certificate.findOne({certificateId:req.params.id}).populate("student","name").populate("course","title");if(!c)return res.status(404).json({message:"Certificate not found"});res.json({certificate:c})}catch(e){next(e)}});
export default r;

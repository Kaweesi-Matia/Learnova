import {Router} from "express";
import Quiz from "../models/Quiz.js";
import QuizAttempt from "../models/QuizAttempt.js";
import {auth,roles} from "../middleware/auth.js";
const r=Router();
r.get("/:id",auth,async(req,res,next)=>{try{const q=await Quiz.findById(req.params.id).select("-questions.correctIndex");res.json({quiz:q})}catch(e){next(e)}});
r.post("/:id/submit",auth,roles("STUDENT"),async(req,res,next)=>{try{const q=await Quiz.findById(req.params.id);const answers=req.body.answers||[];let correct=0;q.questions.forEach((x,i)=>{if(x.correctIndex===answers[i])correct++});const score=Math.round(correct/q.questions.length*100);const a=await QuizAttempt.create({quiz:q._id,student:req.user._id,answers,score,passed:score>=70});res.json({attempt:a,score,passed:score>=70})}catch(e){next(e)}});
export default r;

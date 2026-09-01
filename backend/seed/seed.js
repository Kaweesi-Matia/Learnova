import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/User.js";
import Category from "../models/Category.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import Progress from "../models/Progress.js";
import Wishlist from "../models/Wishlist.js";
import Review from "../models/Review.js";
import Certificate from "../models/Certificate.js";

const categories=[
  "Web Development","Frontend Development","Backend Development","Full Stack Development",
  "Data Science","Data Analytics","Artificial Intelligence","Machine Learning","Generative AI",
  "UI/UX Design","Graphic Design","Product Design","UX Research",
  "Cybersecurity","Networking","Cloud Computing","DevOps",
  "Business","Entrepreneurship","Digital Marketing",
  "Mobile Development","Photography"
];
const thumbs=[
"https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80"];

await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/learnhub", { dbName: "learnhub" });
await Promise.all([User.deleteMany({}),Category.deleteMany({}),Course.deleteMany({}),Enrollment.deleteMany({}),Progress.deleteMany({}),Wishlist.deleteMany({}),Review.deleteMany({}),Certificate.deleteMany({})]);

const pass=await bcrypt.hash("Password123!",12);
const admin=await User.create({name:"LearnHub Admin",email:"admin@learnhub.dev",password:pass,role:"ADMIN",isApproved:true});
const instructor=await User.create({name:"Alex Morgan",email:"instructor@learnhub.dev",password:pass,role:"INSTRUCTOR",isApproved:true});
const moreInstructors=await User.insertMany(Array.from({length:7},(_,i)=>({name:`Instructor ${i+2}`,email:`instructor${i+2}@learnhub.dev`,password:pass,role:"INSTRUCTOR",isApproved:true})));
const students=await User.insertMany(Array.from({length:20},(_,i)=>({name:`Student ${i+1}`,email:`student${i+1}@learnhub.dev`,password:pass,role:"STUDENT"})));
const demoStudent=await User.create({name:"Demo Student",email:"student@learnhub.dev",password:pass,role:"STUDENT"});

const cats=await Category.insertMany(categories.map(name=>({name,slug:name.toLowerCase().replaceAll(" ","-").replace("/","-")})));
const titles=[
  "HTML & CSS for Beginners","JavaScript Foundations","React for Beginners","Python Programming Essentials",
  "UI/UX Design Fundamentals","Digital Marketing Starter Course","Git & GitHub Essentials","Introduction to Data Analytics",
  "Full Stack Web Development","React Professional Development","Node.js Backend Engineering","Python for Data Science",
  "Product Design & Prototyping","Cloud Computing Fundamentals","Cybersecurity Foundations","Mobile App Development",
  "Advanced JavaScript Architecture","Advanced React & Next.js","Machine Learning with Python","Generative AI for Developers",
  "Advanced Cybersecurity & Ethical Hacking","DevOps & CI/CD Mastery","Advanced UI/UX Research","Data Engineering with Python"
];
const instructors=[instructor,...moreInstructors];
const courses = await Course.insertMany(
  titles.map((title, i) => ({
    title,
    slug: title.toLowerCase().replaceAll(" ", "-"),
    description: `A practical, career-focused ${title} course designed to help you build confidence through concepts, guided practice and portfolio-ready work.`,
    thumbnail: thumbs[i % thumbs.length],
    category: cats[i % cats.length]._id,
    instructor: instructors[i % instructors.length]._id,
    level: ["Beginner", "Intermediate", "Advanced"][i % 3],
    price: [49, 69, 59, 79, 45, 89, 65, 75, 85, 55][i],
    duration: `${6 + i}h 30m`,
    objectives: ["Understand core concepts", "Build practical projects", "Apply professional workflows", "Develop portfolio-ready skills"],
    requirements: ["Basic computer skills", "Willingness to practice"],
    rating: 4.4 + (i % 5) / 10,
    reviewCount: 0,
    studentsCount: 0,
    modules: [
      {
        title: "Introduction & Getting Started",
        order: 1,
        lessons: [
          { title: "Welcome to the course", type: "VIDEO", duration: "8m", content: "Welcome to LearnHub. Understand the course roadmap and how to get the most from the learning experience.", order: 1 },
          { title: "Core fundamentals", type: "TEXT", duration: "18m", content: "Learn the core ideas that form the foundation for the rest of the course.", order: 2 },
        ],
      },
      {
        title: "Practical Skills",
        order: 2,
        lessons: [
          { title: "Building the first project", type: "VIDEO", duration: "32m", content: "Follow a practical workflow and apply the concepts in a guided project.", order: 1 },
          { title: "Practice exercise", type: "ASSIGNMENT", duration: "25m", content: "Complete the exercise and compare your implementation with the course objectives.", order: 2 },
        ],
      },
      {
        title: "Advanced Concepts",
        order: 3,
        lessons: [
          { title: "Professional workflow", type: "VIDEO", duration: "28m", content: "Explore patterns and techniques used in professional development teams.", order: 1 },
          { title: "Final project", type: "ASSIGNMENT", duration: "60m", content: "Bring everything together in a portfolio-ready final project.", order: 2 },
        ],
      },
    ],
  }))
);

const demoEnrollments=[];
for(let i=0;i<students.length;i++){
  const course=courses[i%courses.length];
  const completed=i<5;
  demoEnrollments.push({student:students[i]._id,course:course._id,progress:completed?100:25+(i%4)*15,completed,completedAt:completed?new Date():undefined,currentLesson:course.modules[0].lessons[0]._id});
}
// Make the demo student visible in dashboard data too.
for(let i=0;i<3;i++){
  const course=courses[i];
  demoEnrollments.push({student:demoStudent._id,course:course._id,progress:i===0?65:0,completed:false,currentLesson:course.modules[0].lessons[0]._id});
}
await Enrollment.insertMany(demoEnrollments);

for(const e of demoEnrollments){
  const course=await Course.findById(e.course);
  if(!course) continue;
  course.studentsCount+=1;
  await course.save();
  await Progress.create({student:e.student,course:e.course,completedLessons:e.completed?course.modules.flatMap(m=>m.lessons.map(l=>l._id)):[],lastLesson:e.currentLesson,percentage:e.progress});
  if(e.completed){await Certificate.create({student:e.student,course:e.course,certificateId:`LH-${crypto.randomBytes(5).toString("hex").toUpperCase()}`});}
}

for(let i=0;i<6;i++) await Wishlist.create({student:demoStudent._id,course:courses[(i+3)%courses.length]._id});
for(let i=0;i<10;i++){
  const student=students[i]; const course=courses[i%courses.length];
  await Review.create({student:student._id,course:course._id,rating:4+(i%2),comment:["Excellent practical course.","Very clear explanations and useful projects."][i%2]});
}
for(const course of courses){const reviews=await Review.find({course:course._id});if(reviews.length){course.rating=reviews.reduce((s,x)=>s+x.rating,0)/reviews.length;course.reviewCount=reviews.length;await course.save();}}

console.log("Seed complete.");
console.log("Admin: admin@learnhub.dev / Password123!");
console.log("Instructor: instructor@learnhub.dev / Password123!");
console.log("Student: student@learnhub.dev / Password123!");
await mongoose.disconnect();

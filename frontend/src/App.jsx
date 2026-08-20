import { Routes,Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import AuthPage from "./pages/AuthPage";
import StudentDashboard from "./pages/StudentDashboard";
import LearnPage from "./pages/LearnPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App(){
 return <Routes>
  <Route path="/" element={<LandingPage/>}/>
  <Route path="/courses" element={<CoursesPage/>}/>
  <Route path="/courses/:id" element={<CourseDetailPage/>}/>
  <Route path="/login" element={<AuthPage mode="login"/>}/>
  <Route path="/register" element={<AuthPage mode="register"/>}/>
  <Route path="/forgot-password" element={<PlaceholderPage title="Forgot password"/>}/>
  <Route path="/about" element={<PlaceholderPage title="About LearnHub"/>}/>
  <Route path="/instructors" element={<PlaceholderPage title="Expert instructors"/>}/>
  <Route element={<ProtectedRoute roles={["STUDENT","INSTRUCTOR","ADMIN"]}/>}><Route path="/dashboard" element={<StudentDashboard/>}/><Route path="/dashboard/*" element={<PlaceholderPage title="Student workspace"/>}/></Route>
  <Route element={<ProtectedRoute roles={["STUDENT"]}/>}><Route path="/learn/:id" element={<LearnPage/>}/></Route>
  <Route element={<ProtectedRoute roles={["INSTRUCTOR"]}/>}><Route path="/instructor" element={<PlaceholderPage title="Instructor dashboard" role="INSTRUCTOR"/>}/><Route path="/instructor/*" element={<PlaceholderPage title="Instructor workspace" role="INSTRUCTOR"/>}/></Route>
  <Route element={<ProtectedRoute roles={["ADMIN"]}/>}><Route path="/admin" element={<PlaceholderPage title="Admin dashboard" role="ADMIN"/>}/><Route path="/admin/*" element={<PlaceholderPage title="Admin workspace" role="ADMIN"/>}/></Route>
  <Route path="*" element={<LandingPage/>}/>
 </Routes>
}

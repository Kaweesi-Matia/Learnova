import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import AuthPage from "./pages/AuthPage";
import StudentDashboard from "./pages/StudentDashboard";
import LearnPage from "./pages/LearnPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import InstructorsPage from "./pages/InstructorsPage";
import AboutPage from "./pages/AboutPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import MyCoursesPage from "./pages/dashboard/MyCoursesPage";
import WishlistPage from "./pages/dashboard/WishlistPage";
import CertificatesPage from "./pages/dashboard/CertificatesPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import CertificateViewPage from "./pages/dashboard/CertificateViewPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminCoursesPage from "./pages/admin/AdminCoursesPage";
import AdminCategoriesPage from "./pages/admin/AdminCategoriesPage";
import AdminReviewsPage from "./pages/admin/AdminReviewsPage";
import { useAuth } from "./context/AuthContext";

const RoleLayout = ({ role, children }) => (
  <DashboardLayout role={role}>{children}</DashboardLayout>
);

function ProfileRoute() {
  const { user } = useAuth();
  return <RoleLayout role={user?.role || "STUDENT"}><ProfilePage /></RoleLayout>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:id" element={<CourseDetailPage />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/register" element={<AuthPage mode="register" />} />
      <Route path="/forgot-password" element={<PlaceholderPage title="Forgot password" />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/instructors" element={<InstructorsPage />} />

      {/* STUDENT */}
      <Route element={<ProtectedRoute roles={["STUDENT"]} />}>
        <Route path="/dashboard" element={<RoleLayout role="STUDENT"><StudentDashboard /></RoleLayout>} />
        <Route path="/dashboard/courses" element={<RoleLayout role="STUDENT"><MyCoursesPage /></RoleLayout>} />
        <Route path="/dashboard/wishlist" element={<RoleLayout role="STUDENT"><WishlistPage /></RoleLayout>} />
        <Route path="/dashboard/certificates" element={<RoleLayout role="STUDENT"><CertificatesPage /></RoleLayout>} />
        <Route path="/dashboard/settings" element={<RoleLayout role="STUDENT"><SettingsPage /></RoleLayout>} />
        <Route path="/certificate/:id" element={<CertificateViewPage />} />
        <Route path="/learn/:id" element={<LearnPage />} />
      </Route>

      {/* PROFILE is available to every authenticated role. */}
      <Route element={<ProtectedRoute roles={["STUDENT", "INSTRUCTOR", "ADMIN"]} />}>
        <Route path="/dashboard/profile" element={<ProfileRoute />} />
      </Route>

      {/* INSTRUCTOR */}
      <Route element={<ProtectedRoute roles={["INSTRUCTOR"]} />}>
        <Route path="/instructor" element={<PlaceholderPage title="Instructor dashboard" role="INSTRUCTOR" />} />
        <Route path="/instructor/*" element={<PlaceholderPage title="Instructor workspace" role="INSTRUCTOR" />} />
      </Route>

      {/* ADMIN */}
      <Route element={<ProtectedRoute roles={["ADMIN"]} />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/courses" element={<AdminCoursesPage />} />
        <Route path="/admin/categories" element={<AdminCategoriesPage />} />
        <Route path="/admin/reviews" element={<AdminReviewsPage />} />
      </Route>

      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}

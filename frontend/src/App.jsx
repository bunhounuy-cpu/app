import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Layout from './components/Layout/Layout';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CourseList from './pages/CourseList';
import CourseDetail from './pages/CourseDetail';
import InstructorCourses from './pages/InstructorCourses';
import CreateCourse from './pages/CreateCourse';
import EditCourse from './pages/EditCourse';
import MyCourses from './pages/MyCourses';
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/courses/:id" element={<CourseDetail />} />

            <Route path="/profile" element={
              <ProtectedRoute><Profile /></ProtectedRoute>
            } />
            <Route path="/my-courses" element={
              <ProtectedRoute roles={['student']}><MyCourses /></ProtectedRoute>
            } />
            <Route path="/instructor/courses" element={
              <ProtectedRoute roles={['instructor']}><InstructorCourses /></ProtectedRoute>
            } />
            <Route path="/instructor/courses/new" element={
              <ProtectedRoute roles={['instructor']}><CreateCourse /></ProtectedRoute>
            } />
            <Route path="/instructor/courses/:id/edit" element={
              <ProtectedRoute roles={['instructor']}><EditCourse /></ProtectedRoute>
            } />

            <Route path="/dashboard/student" element={
              <ProtectedRoute roles={['student']}><StudentDashboard /></ProtectedRoute>
            } />
            <Route path="/dashboard/instructor" element={
              <ProtectedRoute roles={['instructor']}><InstructorDashboard /></ProtectedRoute>
            } />
            <Route path="/dashboard/admin" element={
              <ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute roles={['admin']}><AdminUsers /></ProtectedRoute>
            } />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

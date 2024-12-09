import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import CreatePost from "./pages/login/CreatePost";
import { ToastContainer } from "react-toastify";
import Category from "./pages/category/Category";
import PostDetails from "./pages/post-Details/PostDetails";
import Profile from "./pages/profile/Profile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserTables from "./pages/admin/UserTables";
import PostTable from "./pages/admin/PostTable";
import CategoriesDashboard from "./pages/admin/CategoriesDashboard";
import CommentsDashboard from "./pages/admin/CommentsDashboard";
import Register from "./pages/forms/Register";
import Login from "./pages/forms/Login";
import ForgotPassword from "./pages/forms/ForgotPassword";
import ResetPassword from "./pages/forms/ResetPassword";
import { useSelector } from "react-redux";
import NotFound from "./pages/notfound/NotFound";
import VerifyEmail from "./pages/verify-email/VerifyEmail";
function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />

          <Route path="/posts">
            <Route
              path="create"
              element={user ? <CreatePost /> : <Navigate to={"/"} />}
            />
            <Route path="categories/:category" element={<Category />} />
            <Route path="details/:id" element={<PostDetails />} />
          </Route>

          <Route path="/admin-dashboard">
            <Route
              index
              element={
                user?.isAdmin ? <AdminDashboard /> : <Navigate to={"/"} />
              }
            />
            <Route
              path="users"
              element={user?.isAdmin ? <UserTables /> : <Navigate to={"/"} />}
            />
            <Route
              path="posts"
              element={user?.isAdmin ? <PostTable /> : <Navigate to={"/"} />}
            />
            <Route
              path="categories-table"
              element={
                user?.isAdmin ? <CategoriesDashboard /> : <Navigate to={"/"} />
              }
            />
            <Route
              path="comments-table"
              element={
                user?.isAdmin ? <CommentsDashboard /> : <Navigate to={"/"} />
              }
            />
          </Route>

          <Route
            path="/login"
            element={user ? <Navigate to={"/"} /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to={"/"} /> : <Register />}
          />
          <Route
            path="/users/:userId/verify/:token"
            element={user ? <Navigate to={"/"} /> : <VerifyEmail />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:userId/:token"
            element={<ResetPassword />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

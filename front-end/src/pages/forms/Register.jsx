import "./form.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAuthApiCall } from "../redux/apicalls/AuthApiCall";
import swal from "sweetalert";
import { CiLock } from "react-icons/ci";
import { LuUser } from "react-icons/lu";
import { HiOutlineMail } from "react-icons/hi";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerMessage } = useSelector((state) => state.auth);
  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (username.trim() === "") return toast.error("Username is required");
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");
    dispatch(registerAuthApiCall({ username, email, password }));
  };

  if (registerMessage) {
    swal({
      title: registerMessage,

      icon: "success",
    }).then((isOk) => {
      if (isOk) {
        navigate("/login");
      }
    });
  }

  return (
    <section className="form-container">
      <h1 className="form-title">Create new account</h1>
      <form
        onSubmit={formSubmitHandler}
        className="md:w-[500px] w-full mx-auto flex  flex-col gap-6"
      >
        <div className="relative w-full">
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="username"
            id="username"
            placeholder="Enter your username"
            className="py-3 pl-6 pr-10 rounded-full border focus:outline-none w-full  "
          />
          <LuUser
            size={18}
            className="absolute top-1/2 -translate-y-1/2 right-6"
          />
        </div>
        <div className="relative w-full">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            id="email"
            placeholder="Enter your email"
            className="py-3 pl-6 pr-10 rounded-full border focus:outline-none w-full  "
          />
          <HiOutlineMail
            size={18}
            className="absolute top-1/2 -translate-y-1/2 right-6"
          />
        </div>
        <div className="relative w-full">
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            id="password"
            placeholder="Enter your password"
            className="py-3 pl-6 pr-10 rounded-full border focus:outline-none w-full  "
          />
          <CiLock
            size={18}
            className="absolute top-1/2 -translate-y-1/2 right-6"
          />
        </div>

        <button
          type="submit"
          className="bg-zinc-700 group mx-auto transition duration-300 px-10 py-3 rounded-full text-zinc-50 w-fit flex gap-2 items-center"
        >
          Signup
        </button>
      </form>
      <div className="text-sm  font-medium text-zinc-500 gap-2 flex items-center mt-6">
        Already have an account?{" "}
        <Link
          to="/login"
          className="hover:text-zinc-950 text-zinc-800 underline"
        >
          Login
        </Link>
      </div>
    </section>
  );
};

export default Register;

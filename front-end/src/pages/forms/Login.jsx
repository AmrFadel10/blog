import "./form.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authApiCall } from "../redux/apicalls/AuthApiCall";
import { authActions } from "../redux/slices/AuthSlice";
import { CiLock } from "react-icons/ci";
import { HiOutlineMail } from "react-icons/hi";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");
    dispatch(authApiCall({ email, password }));
  };
  useEffect(() => {
    dispatch(authActions.clearRegister());
  }, []);

  return (
    <section className="form-container">
      <h1 className="text-2xl font-bold mb-10">Login</h1>
      <form
        onSubmit={formSubmitHandler}
        className="md:w-[500px] w-full mx-auto flex  flex-col gap-6"
      >
        <div className="relative w-full">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            value={email}
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
          Login
        </button>
      </form>
      <div className="text-sm  font-medium text-zinc-500 gap-2 flex items-center mt-6">
        Did you forget your password?
        <Link
          to="/forgot-password"
          className="hover:text-zinc-950 text-zinc-800 underline"
        >
          Forgot Password
        </Link>
      </div>
    </section>
  );
};

export default Login;

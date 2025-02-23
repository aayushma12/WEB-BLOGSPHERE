import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input } from "./index";
import { useDispatch } from "react-redux";
import authService from '../services/mysql_auth_service';
import { useForm } from "react-hook-form";
import logo from '../assets/favicon.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch } = useForm();

  const password = watch("password");

  const validatePassword = (pwd) => {
    const lengthCheck = /.{8,}/;
    const uppercaseCheck = /[A-Z]/;
    const lowercaseCheck = /[a-z]/;
    const numberCheck = /[0-9]/;
    const specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/;

    if (!lengthCheck.test(pwd)) {
      toast.error("🚫 Password must be at least 8 characters long.", { position: "top-center" });
      return false;
    }
    if (!uppercaseCheck.test(pwd)) {
      toast.error("🚫 Password must contain at least one uppercase letter.", { position: "top-center" });
      return false;
    }
    if (!lowercaseCheck.test(pwd)) {
      toast.error("🚫 Password must contain at least one lowercase letter.", { position: "top-center" });
      return false;
    }
    if (!numberCheck.test(pwd)) {
      toast.error("🚫 Password must contain at least one number.", { position: "top-center" });
      return false;
    }
    if (!specialCharCheck.test(pwd)) {
      toast.error("🚫 Password must contain at least one special character.", { position: "top-center" });
      return false;
    }

    return true;
  };

  const signUp = async (data) => {
    setLoading(true);

    try {
      if (data.password !== data.reenterPassword) {
        toast.error("🚫 Passwords do not match!", { position: "top-center" });
        setLoading(false);
        return;
      }

      if (!validatePassword(data.password)) {
        setLoading(false);
        return;
      }

      const userData = await authService.createAccount(data);

      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(authLogin(currentUser));
          toast.success("✅ Account created successfully!", { position: "top-center" });
          navigate("/");
        }
      }
    } catch (err) {
      const serverMessage = err.response?.data?.message || err.message || "Unknown error occurred.";

      // 🔔 Display toast with the reason for failure
      toast.error(`🚫 Account creation failed: ${serverMessage}`, { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <ToastContainer />
      <div className="mx-auto w-full max-w-md bg-gray-100 rounded-xl p-8 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[80px]">
            <img src={logo} alt="logo" className="w-10" />
          </span>
        </div>
        <h2 className="text-center text-xl font-bold">Sign up</h2>
        <p className="mt-2 text-center text-sm text-black/60">
          Already have an account?&nbsp;
          <Link to="/login" className="font-medium text-primary hover:underline">
            Log In
          </Link>
        </p>
        <form onSubmit={handleSubmit(signUp)} className="mt-6">
          <div className="space-y-4">
            <Input label="Name:" placeholder="Enter your full name" {...register("name", { required: true })} />
            <Input label="Email:" placeholder="Enter your email" type="email" {...register("email", { required: true })} />
            
            <div>
              <Input
                label="Password:"
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
              <p className="text-xs text-gray-600 mt-1">
                🔑 Include at least 8 characters with one uppercase, one lowercase, one number, and one special character.
              </p>
            </div>

            <Input
              label="Re-enter Password:"
              type="password"
              placeholder="Re-enter your password"
              {...register("reenterPassword", { required: true })}
            />

            <Button type="submit" className="w-full bg-slate-600 hover:bg-slate-700" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

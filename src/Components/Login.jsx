import React, { useState } from "react";

import axios from "../utils/axiosInstance";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import {

  FaEnvelope,
  FaLock,
  FaUser,
  FaPhone,
  FaBirthdayCake

} from "react-icons/fa";

function Login() {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] =
        useState(true);

  // =========================
  // REGISTER DATA
  // =========================

  const [registerData,
        setRegisterData] =
        useState({

    userName: "",
    emailId: "",
    mobileNo: "",
    age: "",
    password: "",
    role: "USER"

  });

  // =========================
  // LOGIN DATA
  // =========================

  const [loginData,
        setLoginData] =
        useState({

    emailId: "",
    password: ""

  });

  // =========================
  // REGISTER CHANGE
  // =========================

  const handleRegisterChange =
  (e) => {

    setRegisterData({

      ...registerData,

      [e.target.name]:
      e.target.value

    });
  };

  // =========================
  // LOGIN CHANGE
  // =========================

  const handleLoginChange =
  (e) => {

    setLoginData({

      ...loginData,

      [e.target.name]:
      e.target.value

    });
  };

  // =========================
  // REGISTER
  // =========================

  const handleRegister =
  async (e) => {

    e.preventDefault();

    try {

      const response =
            await axios.post(

        "/auth/register",

        registerData
      );

      alert(response.data);

      setIsLogin(true);

    } catch (error) {

      console.log(error);

      alert(error.response.data);
    }
  };

  // =========================
  // LOGIN
  // =========================

  const handleLogin =
  async (e) => {

    e.preventDefault();

    try {

      const response =
            await axios.post(

        "/auth/login",

        loginData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      localStorage.setItem(
        "id",
        response.data.id
      );

      localStorage.setItem(
        "premium",
        response.data.premium
      );

      localStorage.setItem(
        "userName",
        response.data.userName
      );

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Login Failed ❌");
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex justify-center items-center overflow-hidden relative px-5">

      {/* BLUR EFFECT */}

      <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-[150px] top-0 left-0"></div>

      <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-[150px] bottom-0 right-0"></div>

      {/* CARD */}

      <motion.div

        initial={{ opacity: 0, y: 50 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.5 }}

        className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/10 rounded-[40px] p-10 shadow-2xl"
      >

        {/* LOGO */}

        <h1 className="text-5xl font-black text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

          Medicare

        </h1>

        <p className="text-center text-gray-300 mt-3">

          Smart Healthcare System

        </p>

        {/* LOGIN */}

        {

          isLogin

          ?

          (

            <form
              onSubmit={handleLogin}
              className="mt-10 space-y-5"
            >

              {/* EMAIL */}

              <div className="flex items-center bg-white/10 border border-white/10 rounded-2xl px-5">

                <FaEnvelope className="text-cyan-400" />

                <input
                  type="email"
                  name="emailId"
                  placeholder="Enter Email"
                  value={loginData.emailId}
                  onChange={handleLoginChange}
                  className="w-full bg-transparent p-4 outline-none text-white"
                />

              </div>

              {/* PASSWORD */}

              <div className="flex items-center bg-white/10 border border-white/10 rounded-2xl px-5">

                <FaLock className="text-cyan-400" />

                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className="w-full bg-transparent p-4 outline-none text-white"
                />

              </div>

              {/* BUTTON */}

              <button
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/30"
              >

                Login

              </button>

            </form>
          )

          :

          (

            <form
              onSubmit={handleRegister}
              className="mt-10 space-y-5"
            >

              {/* USERNAME */}

              <div className="flex items-center bg-white/10 border border-white/10 rounded-2xl px-5">

                <FaUser className="text-cyan-400" />

                <input
                  type="text"
                  name="userName"
                  placeholder="Username"
                  value={registerData.userName}
                  onChange={handleRegisterChange}
                  className="w-full bg-transparent p-4 outline-none text-white"
                />

              </div>

              {/* EMAIL */}

              <div className="flex items-center bg-white/10 border border-white/10 rounded-2xl px-5">

                <FaEnvelope className="text-cyan-400" />

                <input
                  type="email"
                  name="emailId"
                  placeholder="Email"
                  value={registerData.emailId}
                  onChange={handleRegisterChange}
                  className="w-full bg-transparent p-4 outline-none text-white"
                />

              </div>

              {/* MOBILE */}

              <div className="flex items-center bg-white/10 border border-white/10 rounded-2xl px-5">

                <FaPhone className="text-cyan-400" />

                <input
                  type="number"
                  name="mobileNo"
                  placeholder="Mobile Number"
                  value={registerData.mobileNo}
                  onChange={handleRegisterChange}
                  className="w-full bg-transparent p-4 outline-none text-white"
                />

              </div>

              {/* AGE */}

              <div className="flex items-center bg-white/10 border border-white/10 rounded-2xl px-5">

                <FaBirthdayCake className="text-cyan-400" />

                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={registerData.age}
                  onChange={handleRegisterChange}
                  className="w-full bg-transparent p-4 outline-none text-white"
                />

              </div>

              {/* PASSWORD */}

              <div className="flex items-center bg-white/10 border border-white/10 rounded-2xl px-5">

                <FaLock className="text-cyan-400" />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  className="w-full bg-transparent p-4 outline-none text-white"
                />

              </div>

              {/* ROLE */}

              <select
                name="role"
                value={registerData.role}
                onChange={handleRegisterChange}
                className="w-full bg-white/10 border border-white/10 p-4 rounded-2xl text-white outline-none"
              >

                <option value="USER" className="text-black">

                  User

                </option>

                <option value="DOCTOR" className="text-black">

                  Doctor

                </option>

              </select>

              {/* BUTTON */}

              <button
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/30"
              >

                Register

              </button>

            </form>
          )
        }

        {/* TOGGLE */}

        <p className="text-center text-gray-300 mt-8">

          {

            isLogin

            ?

            "Don't Have Account?"

            :

            "Already Have Account?"
          }

          <button

            onClick={() =>
              setIsLogin(!isLogin)
            }

            className="ml-3 text-cyan-400 font-bold"
          >

            {

              isLogin

              ?

              "Register"

              :

              "Login"
            }

          </button>

        </p>

      </motion.div>

    </div>
  );
}

export default Login;
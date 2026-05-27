import React, {
  useState
} from "react";

import axios from "../utils/axiosInstance";

import {
  useNavigate
} from "react-router-dom";

import { motion } from "framer-motion";

function Register() {

  const navigate =
        useNavigate();

  const [userName,
        setUserName] =
        useState("");

  const [emailId,
        setEmailId] =
        useState("");

  const [password,
        setPassword] =
        useState("");

  const [role,
        setRole] =
        useState("USER");

  // REGISTER

  const handleRegister =
  async (e) => {

    e.preventDefault();

    try {

      await axios.post(

        "/auth/register",

        {
          userName,
          emailId,
          password,
          role
        }
      );

      alert(
        "Register Success"
      );

      navigate("/login");

    } catch (error) {

      console.log(error);
    }
  };

  return (

<div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#071330] to-[#0f172a] flex justify-center items-center px-5 py-10">

<motion.form

initial={{
opacity: 0,
y: 40
}}

animate={{
opacity: 1,
y: 0
}}

transition={{
duration: 0.5
}}

onSubmit={handleRegister}

className="w-full max-w-[650px] bg-white/10 backdrop-blur-xl border border-white/10 rounded-[40px] p-10 shadow-2xl"
>

<h1 className="text-6xl font-black text-white text-center">

Create Account

</h1>

<p className="text-gray-300 text-center text-xl mt-4">

Premium Healthcare System

</p>

{/* NAME */}

<input

type="text"

placeholder="Enter Username"

value={userName}

onChange={(e)=>

setUserName(
e.target.value
)
}

className="w-full h-[70px] bg-white/10 border border-white/10 rounded-[20px] px-6 mt-10 text-white text-xl outline-none"
/>

{/* EMAIL */}

<input

type="email"

placeholder="Enter Email"

value={emailId}

onChange={(e)=>

setEmailId(
e.target.value
)
}

className="w-full h-[70px] bg-white/10 border border-white/10 rounded-[20px] px-6 mt-6 text-white text-xl outline-none"
/>

{/* PASSWORD */}

<input

type="password"

placeholder="Enter Password"

value={password}

onChange={(e)=>

setPassword(
e.target.value
)
}

className="w-full h-[70px] bg-white/10 border border-white/10 rounded-[20px] px-6 mt-6 text-white text-xl outline-none"
/>

{/* ROLE */}

<select

value={role}

onChange={(e)=>

setRole(
e.target.value
)
}

className="w-full h-[70px] bg-white/10 border border-white/10 rounded-[20px] px-6 mt-6 text-white text-xl outline-none"
>

<option
value="USER"
className="text-black"
>

USER

</option>

<option
value="DOCTOR"
className="text-black"
>

DOCTOR

</option>

</select>

{/* BUTTON */}

<button

className="w-full mt-10 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white h-[75px] rounded-[22px] text-2xl font-black transition-all duration-300 shadow-xl"
>

Create Account

</button>

</motion.form>

</div>
  );
}

export default Register;
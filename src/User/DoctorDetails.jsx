import React, {
  useEffect,
  useState
} from "react";

import axios from "../utils/axiosInstance";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  FaGraduationCap,
  FaStar,
  FaHeartbeat,
  FaUserMd,
  FaCertificate
} from "react-icons/fa";

import { motion } from "framer-motion";

function DoctorDetails() {

  // =========================
  // PARAMS
  // =========================

  const { id } =
        useParams();

  const navigate =
        useNavigate();

  // =========================
  // STATE
  // =========================

  const [doctor,
        setDoctor] =
        useState(null);

  // =========================
  // FETCH DOCTOR
  // =========================

  useEffect(() => {

    fetchDoctor();

  }, []);

  const fetchDoctor =
  async () => {

    try {

      const response =
            await axios.get(
        "/show"
      );

      const singleDoctor =

            response.data.find(

        (item) =>

          item.id === Number(id)
      );

      setDoctor(singleDoctor);

    } catch (error) {

      console.log(error);
    }
  };

  // =========================
  // CHAT
  // =========================

  const handleChat = () => {

    const premium =
          localStorage.getItem(
            "premium"
          );

    if (premium === "true") {

      navigate(
        `/message/${doctor.authId}`
      );

    } else {

      navigate("/premium");
    }
  };

  // =========================
  // LOADING
  // =========================

  if (!doctor) {

    return (

      <div className="min-h-screen bg-[#020617] flex justify-center items-center">

        <h1 className="text-5xl font-black text-white">

          Loading...

        </h1>

      </div>
    );
  }

  return (

<div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#071330] to-[#0f172a] px-5 md:px-10 py-10">

<motion.div

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

className="max-w-[1700px] mx-auto bg-white/10 backdrop-blur-xl border border-white/10 rounded-[40px] overflow-hidden shadow-[0_0_40px_rgba(0,255,255,0.08)]"
>

<div className="flex flex-col xl:flex-row">

{/* ========================= */}
{/* LEFT SIDE */}
{/* ========================= */}

<div className="xl:w-[40%] bg-white relative p-8 flex justify-center items-center">

{/* DOCTOR IMAGE */}

<img

src={`http://localhost:8080/uploads/profile/${doctor.file1Path}`}

alt=""

className="w-full h-[700px] object-cover rounded-[35px] shadow-2xl"
/>

{/* TAG */}

<div className="absolute top-6 left-6 bg-cyan-500 text-black px-6 py-3 rounded-full font-black shadow-xl">

Top Doctor

</div>

</div>

{/* ========================= */}
{/* RIGHT SIDE */}
{/* ========================= */}

<div className="flex-1 p-10 flex flex-col justify-between">

<div>

{/* SMALL TEXT */}

<p className="text-cyan-400 uppercase tracking-[5px] font-bold text-sm">

Professional Specialist

</p>

{/* NAME */}

<h1 className="text-5xl md:text-6xl font-black text-white mt-5 leading-tight">

Dr. {doctor.userName}

</h1>

{/* SPECIALIST */}

<div className="flex items-center gap-4 mt-8 text-cyan-400 text-3xl font-bold">

<FaHeartbeat />

<span>

{doctor.specialist}

</span>

</div>

{/* DEGREE */}

<div className="flex items-center gap-4 mt-8 text-gray-300 text-2xl">

<FaGraduationCap className="text-purple-400" />

<span>

{doctor.degree}

</span>

</div>

{/* EXPERIENCE */}

<div className="flex items-center gap-4 mt-8 text-gray-300 text-2xl">

<FaStar className="text-yellow-400" />

<span>

10+ Years Experience

</span>

</div>

{/* ABOUT */}

<div className="mt-10 bg-white/5 border border-white/10 rounded-[30px] p-8">

<h2 className="text-white text-3xl font-black mb-5">

About Doctor

</h2>

<p className="text-gray-300 text-xl leading-10">

Highly experienced healthcare specialist providing modern medical treatments, premium healthcare consultation, and trusted patient services.

</p>

</div>

{/* ========================= */}
{/* CERTIFICATE */}
{/* ========================= */}

<div className="mt-10">

<div className="flex items-center gap-4 mb-5">

<FaCertificate className="text-cyan-400 text-3xl" />

<h2 className="text-white text-3xl font-black">

Certificate

</h2>

</div>

{/* CERTIFICATE BOX */}

<div className="bg-white rounded-[30px] p-5 shadow-2xl">

<img

src={`http://localhost:8080/uploads/certificates/${doctor.file2Path}`}

alt=""

className="w-full max-h-[550px] object-contain rounded-[25px]"
/>

</div>

</div>

</div>

{/* ========================= */}
{/* BUTTON */}
{/* ========================= */}

<button

onClick={handleChat}

className="mt-10 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-5 rounded-[25px] font-black text-2xl transition-all duration-300 shadow-[0_0_30px_rgba(0,255,255,0.2)] flex justify-center items-center gap-4 hover:scale-[1.02]"
>

<FaUserMd />

Chat With Doctor

</button>

</div>

</div>

</motion.div>

</div>
  );
}

export default DoctorDetails;